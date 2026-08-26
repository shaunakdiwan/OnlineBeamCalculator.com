/**
 * Direct stiffness assembly, Gaussian-elimination solve, support handling,
 * and full post-processing into piecewise diagram curves.
 */

import { buildMesh } from './mesh';
import { loadOnElement } from './fef';
import { GRAVITY, type BeamModel, type Load, type Support } from './model';

export class StabilityError extends Error {
  constructor(message = 'Structure is unstable (mechanism). Add more supports or fix a support to restrain it.') {
    super(message);
    this.name = 'StabilityError';
  }
}

export interface Reaction {
  x: number;
  type: Support['type'];
  /** Vertical reaction [N], upward-positive reported as support force on beam (downward-positive solver → multiply by -1 for "up" display) */
  R: number;
  /** Fixing moment [N·m] for fixed supports */
  M: number;
}

export interface DiagramSeries {
  x: number[];
  values: number[];
  max: { value: number; x: number };
  min: { value: number; x: number };
}

export interface SolveResult {
  reactions: Reaction[];
  shear: DiagramSeries; // V(x) [N]
  moment: DiagramSeries; // M(x) [N·m]
  slope: DiagramSeries; // θ(x) [rad]
  deflection: DiagramSeries; // δ(x) [m]
  /** Max bending stress top/bottom [Pa] */
  stress: {
    topMax: { value: number; x: number };
    botMax: { value: number; x: number };
    topMin: { value: number; x: number };
    botMin: { value: number; x: number };
    shearAvgMax: { value: number; x: number };
  };
  nSamples: number;
}

const SAMPLES = 400;

/** Dense linear solve with partial pivoting. Throws StabilityError on singular. */
function denseSolve(A: number[][], b: number[]): number[] {
  const n = b.length;
  const M = A.map((row, i) => [...row, b[i]]);
  // Pre-scan: track the largest diagonal to scale the singularity threshold.
  let kMax = 0;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) kMax = Math.max(kMax, Math.abs(M[i][j]));
  const singTol = 1e-8 * Math.max(1, kMax);
  for (let col = 0; col < n; col++) {
    let piv = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(M[r][col]) > Math.abs(M[piv][col])) piv = r;
    }
    if (Math.abs(M[piv][col]) < singTol) {
      throw new StabilityError();
    }
    [M[col], M[piv]] = [M[piv], M[col]];
    for (let r = col + 1; r < n; r++) {
      const f = M[r][col] / M[col][col];
      if (f === 0) continue;
      for (let c = col; c <= n; c++) M[r][c] -= f * M[col][c];
    }
  }
  const x = new Array<number>(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let s = M[i][n];
    for (let c = i + 1; c < n; c++) s -= M[i][c] * x[c];
    x[i] = s / M[i][i];
  }
  return x;
}

export function solve(model: BeamModel): SolveResult {
  if (model.length <= 0) throw new StabilityError('Beam length must be positive.');
  if (model.supports.length === 0) throw new StabilityError('No supports: the beam is floating. Add at least one support.');

  const mesh = buildMesh(model);
  const { nodeX, elNodes, nDof, nodeAtX } = mesh;
  const E = model.material.E;
  const I = model.section.I;
  const EI = E * I;

  const K: number[][] = Array.from({ length: nDof }, () => new Array(nDof).fill(0));
  const F = new Array<number>(nDof).fill(0);
  // Equivalent nodal loads per element (for recovery).
  const elF: [number, number, number, number][] = elNodes.map(() => [0, 0, 0, 0]);

  // Element stiffness assembly: standard Hermitian beam k = EI/L³·[[12,6L,-12,6L],[6L,4L²,-6L,2L²],...]
  const elLen: number[] = [];
  elNodes.forEach(([n1, n2], e) => {
    const L = nodeX[n2] - nodeX[n1];
    elLen.push(L);
    const L2 = L * L, L3 = L2 * L;
    const k = [
      [12, 6 * L, -12, 6 * L],
      [6 * L, 4 * L2, -6 * L, 2 * L2],
      [-12, -6 * L, 12, -6 * L],
      [6 * L, 2 * L2, -6 * L, 4 * L2],
    ].map((r) => r.map((v) => (EI / L3) * v));
    const dofs = [2 * n1, 2 * n1 + 1, 2 * n2, 2 * n2 + 1];
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) K[dofs[i]][dofs[j]] += k[i][j];
  });

  // Load assembly
  const allLoads: Load[] = [...model.loads];
  if (model.selfWeight) {
    const w = model.section.A * model.material.density * GRAVITY;
    if (w > 0) {
      allLoads.push({ id: '__selfweight', type: 'udl', x1: 0, x2: model.length, w });
    }
  }

  for (const load of allLoads) {
    // Point loads/moments falling exactly on a mesh node go in as direct nodal loads.
    if (load.type === 'point') {
      const xKey = Math.round(load.x * 1e9) / 1e9;
      const nodes = nodeAtX.get(xKey);
      if (nodes) {
        F[2 * nodes[0]] += load.P;
        continue;
      }
    }
    if (load.type === 'moment') {
      const xKey = Math.round(load.x * 1e9) / 1e9;
      const nodes = nodeAtX.get(xKey);
      if (nodes) {
        F[2 * nodes[0] + 1] -= load.M; // external moment: see convention note below
        continue;
      }
    }
    // Otherwise distribute to elements (exact integration)
    elNodes.forEach(([n1, n2], e) => {
      const f = loadOnElement(load, nodeX[n1], nodeX[n2]);
      if (!f) return;
      const dofs = [2 * n1, 2 * n1 + 1, 2 * n2, 2 * n2 + 1];
      for (let i = 0; i < 4; i++) {
        F[dofs[i]] += f[i];
        elF[e][i] += f[i];
      }
    });
  }

  // Supports: build prescribed-DOF sets
  const prescribed = new Map<number, number>(); // dof -> value
  const springDofs: { dof: number; k: number; settle: number }[] = [];
  for (const s of model.supports) {
    const xKey = Math.round(s.x * 1e9) / 1e9;
    const nodes = nodeAtX.get(xKey);
    if (!nodes) continue;
    const settle = s.settlement ?? 0;
    const fixV = (n: number) => {
      const dof = 2 * n;
      if (s.type === 'spring') {
        springDofs.push({ dof, k: s.k ?? 1e6, settle });
      } else {
        prescribed.set(dof, settle);
      }
    };
    const fixT = (n: number) => {
      prescribed.set(2 * n + 1, 0);
    };
    if (s.type === 'fixed') {
      // All coincident nodes fixed in v and θ (a fixed support on both sides of a hinge fixes both releases)
      for (const n of nodes) {
        fixV(n);
        fixT(n);
      }
    } else {
      // pin/roller/spring restrain v of all coincident nodes except one side stays connected anyway
      for (const n of nodes) fixV(n);
    }
  }

  for (const { dof, k } of springDofs) K[dof][dof] += k;

  // Internal hinge: rotational release via the second θ-DOF, but vertical
  // translation is SHARED. Couple v_left = v_right with a stiff penalty spring
  // so a hinge between two stable spans doesn't decouple vertically.
  // (Penalty method is approximate but numerically sufficient — EI·1e6 is
  // much larger than typical element stiffness terms.)
  const hingePenalty = EI * 1e6; // large relative to element stiffness
  for (const h of model.hinges) {
    const xKey = Math.round(h.x * 1e9) / 1e9;
    const nodes = nodeAtX.get(xKey);
    if (!nodes || nodes.length < 2) continue;
    const v1 = 2 * nodes[0];
    const v2 = 2 * nodes[1];
    K[v1][v1] += hingePenalty;
    K[v2][v2] += hingePenalty;
    K[v1][v2] -= hingePenalty;
    K[v2][v1] -= hingePenalty;
  }

  // Partition free/prescribed
  const freeIdx: number[] = [];
  const freeMap = new Map<number, number>();
  for (let d = 0; d < nDof; d++) {
    if (!prescribed.has(d)) {
      freeMap.set(d, freeIdx.length);
      freeIdx.push(d);
    }
  }

  const u = new Array<number>(nDof).fill(0);
  for (const [dof, val] of prescribed) u[dof] = val;

  // Springs with settlement: K·u = F + k·settle on that dof
  const Ff = new Array<number>(freeIdx.length).fill(0);
  const Kff = Array.from({ length: freeIdx.length }, () => new Array<number>(freeIdx.length).fill(0));
  for (let i = 0; i < freeIdx.length; i++) {
    const di = freeIdx[i];
    let fi = F[di];
    for (const [dof, val] of prescribed) fi -= K[di][dof] * val;
    for (const sd of springDofs) {
      if (sd.dof === di) fi += sd.k * sd.settle;
    }
    Ff[i] = fi;
    for (let j = 0; j < freeIdx.length; j++) Kff[i][j] = K[di][freeIdx[j]];
  }

  if (freeIdx.length === 0 && Math.max(0, ...F.map(Math.abs)) > 1e-6) {
    throw new StabilityError('All DOFs are prescribed but external loads exist.');
  }

  const uf = freeIdx.length > 0 ? denseSolve(Kff, Ff) : [];
  for (let i = 0; i < freeIdx.length; i++) u[freeIdx[i]] = uf[i];

  // Reactions: R = (K·u − F) at vertical DOFs of supports (+ spring force)
  const Ku = new Array<number>(nDof).fill(0);
  for (let i = 0; i < nDof; i++) {
    let s = 0;
    const row = K[i];
    for (let j = 0; j < nDof; j++) if (row[j] !== 0) s += row[j] * u[j];
    Ku[i] = s;
  }

  const reactions: Reaction[] = [];
  for (const s of model.supports) {
    const xKey = Math.round(s.x * 1e9) / 1e9;
    const nodes = nodeAtX.get(xKey) ?? [];
    let R = 0, M = 0;
    for (const n of nodes) {
      const dv = 2 * n, dt = 2 * n + 1;
      R += Ku[dv] - F[dv];
      if (s.type === 'spring') {
        // Ku[dv]-F[dv] at spring dof already includes k·(u - settle)? Ku includes K with spring, u includes settle effect. Yes.
      }
      if (s.type === 'fixed') M += Ku[dt] - F[dt];
    }
    reactions.push({ x: s.x, type: s.type, R, M });
  }

  // ---- Post-processing: exact piecewise internal forces ----
  // For each element, end actions = k·u_e − f_eq(e). Internal V(x), M(x)
  // follow from equilibrium with the distributed load shape; θ, v from
  // integrating curvature with end conditions (Hermite interpolation exact
  // for the total solution since u is the exact FE solution of a cubic field
  // --- for distributed loads the total v is a polynomial we reconstruct by
  // direct evaluation of the solved nodal DOFs plus the particular part.
  // Simplest exact approach: evaluate V, M via equilibrium from the LEFT end
  // using released forces, and θ, δ via integration of M/EI with boundary
  // continuity (cumulative integration anchored at solved nodal θ, v).

  // Element end shears/moments (actions applied BY element ON nodes in global
  // sense): f_end = k·u_e − f_eq. Then internal shear just right of node n1
  // V(x1+) = −(k·u−f)[0]... we instead build the shear/moment diagram by
  // marching along x with applied loads, seeded by reactions. That is exact
  // and robust: ΣFy, cut equilibrium.
  //
  // March: events at loads, supports. V(x) = Σ (upward reactions) − Σ (downward loads) to the left, flipping signs to the "sagging positive" convention.

  const nSeg = SAMPLES;
  // Build refined sample grid: uniform samples PLUS all event positions so
  // jumps are rendered exactly. Sorted, deduped.
  const eventXs = new Set<number>();
  const addEv = (x: number) => eventXs.add(Math.round(x * 1e9) / 1e9);
  addEv(0); addEv(model.length);
  for (const s of model.supports) addEv(s.x);
  for (const h of model.hinges) addEv(h.x);
  for (const l of allLoads) {
    if (l.type === 'point' || l.type === 'moment') addEv(l.x);
    else { addEv(l.x1); addEv(l.x2); }
  }
  const baseXs: number[] = [];
  for (let i = 0; i <= nSeg; i++) baseXs.push((model.length * i) / nSeg);
  const xs = [...new Set([...baseXs, ...[...eventXs]])].sort((a, b) => a - b);

  // Load classifications for the march
  const distLoads = allLoads.filter((l) => l.type === 'udl' || l.type === 'trapezoid') as (Load & { type: 'udl' | 'trapezoid' })[];
  const pointLoads = allLoads.filter((l) => l.type === 'point') as (Load & { type: 'point' })[];
  const momentLoads = allLoads.filter((l) => l.type === 'moment') as (Load & { type: 'moment' })[];

  // Distributed load intensity q(x) (downward positive) at any x
  const q = (x: number): number => {
    let s = 0;
    for (const l of distLoads) {
      const a = Math.min(l.x1, l.x2), b = Math.max(l.x1, l.x2);
      if (x < a || x > b) continue;
      if (l.type === 'udl') s += l.w;
      else {
        const t = l.x2 === l.x1 ? 0 : (x - l.x1) / (l.x2 - l.x1);
        s += l.w1 + (l.w2 - l.w1) * t;
      }
    }
    return s;
  };

  // Exact antiderivatives of q for udl/trapezoid between x0 and x1
  const intQ = (x0: number, x1: number): number => {
    let s = 0;
    for (const l of distLoads) {
      const a = Math.max(Math.min(l.x1, l.x2), x0);
      const b = Math.min(Math.max(l.x1, l.x2), x1);
      if (b <= a) continue;
      if (l.type === 'udl') s += l.w * (b - a);
      else {
        // ∫ w(x) dx from a to b where w linearly varies from w1@x1 to w2@x2
        const L = l.x2 - l.x1;
        if (Math.abs(L) < 1e-12) continue;
        const w = (x: number) => l.w1 + (l.w2 - l.w1) * (x - l.x1) / L;
        // linear function on [a,b]: integral = (w(a)+w(b))/2 * (b-a)
        s += ((w(a) + w(b)) / 2) * (b - a);
      }
    }
    return s;
  };

  // Events: v-jumps (point + reactions) and m-jumps (moments + fixed-end reactions)
  const vEvents = new Map<number, number>();
  const bumpV = (x: number, dv: number) => vEvents.set(x, (vEvents.get(x) ?? 0) + dv);
  for (const r of reactions) bumpV(r.x, -r.R); // upward positive
  for (const p of pointLoads) bumpV(p.x, -p.P);

  const mEvents = new Map<number, number>();
  const bumpM = (x: number, dM: number) => mEvents.set(x, (mEvents.get(x) ?? 0) + dM);
  for (const m of momentLoads) bumpM(m.x, -m.M); // CW moment applied → internal M jumps by -m.M
  for (const r of reactions) if (r.type === 'fixed') bumpM(r.x, r.M);

  const V: number[] = new Array(xs.length).fill(0);
  const M: number[] = new Array(xs.length).fill(0);
  let Vcur = vEvents.get(0) ?? 0;
  let Mcur = mEvents.get(0) ?? 0;
  V[0] = Vcur;
  M[0] = Mcur;

  for (let i = 1; i < xs.length; i++) {
    const x0 = xs[i - 1], x1 = xs[i];
    const dq = intQ(x0, x1);           // total distributed load over interval
    // ∫V dx over interval = V(x0)·Δ − (1/2)·q_avg·Δ² but use trapezoid
    // with the new V after integrating distributed load.
    const Vnew = Vcur - dq;
    Mcur += (Vcur + Vnew) / 2 * (x1 - x0);
    Vcur = Vnew;
    // Apply jumps at x1
    Vcur += vEvents.get(x1) ?? 0;
    Mcur += mEvents.get(x1) ?? 0;
    V[i] = Vcur;
    M[i] = Mcur;
  }
  // θ, δ: integrate curvature κ = −M/EI? Convention: with v positive downward and sagging
  // positive M, curvature v'' = −M/EI (hogging curvature sign). We anchor at solved
  // nodal DOFs to avoid drift: use FE nodal u for v and θ at nodes, and Hermite
  // interpolation between nodes for deflection/slope — exact for the solved field.
  const theta: number[] = new Array(xs.length).fill(0);
  const delta: number[] = new Array(xs.length).fill(0);

  // Map each sampling x to its element for Hermite evaluation
  const nodeIndexAtX = new Map<number, number>();
  nodeX.forEach((x, i) => nodeIndexAtX.set(Math.round(x * 1e9) / 1e9, i));

  let elIdx = 0;
  for (let i = 0; i < xs.length; i++) {
    const x = xs[i];
    while (elIdx < elNodes.length - 1) {
      const [, n2] = elNodes[elIdx];
      if (nodeX[n2] >= x - 1e-12) break;
      elIdx++;
    }
    const [n1, n2] = elNodes[elIdx];
    const x1 = nodeX[n1], x2 = nodeX[n2];
    const L = x2 - x1;
    const t = Math.min(Math.max((x - x1) / L, 0), 1);
    const u1 = u[2 * n1], th1 = u[2 * n1 + 1], u2 = u[2 * n2], th2 = u[2 * n2 + 1];
    const N1 = 1 - 3 * t * t + 2 * t * t * t;
    const N2 = x1 === x2 ? 0 : (x - x1) * (1 - t) * (1 - t);
    const N3 = 3 * t * t - 2 * t * t * t;
    const N4 = x1 === x2 ? 0 : (x - x1) * (t * t - t);
    delta[i] = N1 * u1 + N2 * th1 + N3 * u2 + N4 * th2;
    // dN/dx
    const dN1 = (-6 * t + 6 * t * t) / L;
    const dN2 = 1 - 4 * t + 3 * t * t;
    const dN3 = (6 * t - 6 * t * t) / L;
    const dN4 = 3 * t * t - 2 * t;
    theta[i] = dN1 * u1 + dN2 * th1 + dN3 * u2 + dN4 * th2;
  }

  // Output convention: deflection plotted with DOWNWARD = negative (standard
  // engineering "sagging below chord" diagram), slope = dδ/dx of that.
  const deltaOut = delta.map((v) => -v);
  const thetaOut = theta.map((v) => -v);

  const mkSeries = (values: number[]): DiagramSeries => {
    let max = { value: -Infinity, x: 0 };
    let min = { value: Infinity, x: 0 };
    values.forEach((v, i) => {
      if (v > max.value) max = { value: v, x: xs[i] };
      if (v < min.value) min = { value: v, x: xs[i] };
    });
    return { x: xs, values, max, min };
  };

  const shear = mkSeries(V);
  const moment = mkSeries(M);
  const slopeS = mkSeries(thetaOut);
  const defl = mkSeries(deltaOut);

  // Stresses: σ_top = −M·cTop/I (compression negative for sagging), σ_bot = +M·cBot/I
  const I_ = model.section.I;
  const cT = model.section.cTop, cB = model.section.cBot;
  const sTop = M.map((m) => (-m * cT) / I_);
  const sBot = M.map((m) => (m * cB) / I_);
  const sTopS = mkSeries(sTop);
  const sBotS = mkSeries(sBot);
  const tau = V.map((v) => v / model.section.A);
  const tauS = mkSeries(tau);
  const absMax = (s: DiagramSeries) => (Math.abs(s.max.value) >= Math.abs(s.min.value) ? s.max : s.min);

  return {
    reactions,
    shear,
    moment,
    slope: slopeS,
    deflection: defl,
    stress: {
      topMax: absMax(sTopS),
      botMax: absMax(sBotS),
      topMin: sTopS.min,
      botMin: sBotS.min,
      shearAvgMax: absMax(tauS),
    },
    nSamples: SAMPLES,
  };
}
