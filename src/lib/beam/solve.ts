/**
 * Direct stiffness assembly, Gaussian-elimination solve, support handling,
 * and full post-processing into piecewise diagram curves.
 */

import { buildMesh, snapX } from './mesh';
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

/**
 * Relative pivot tolerance for the singularity test, applied to the
 * *equilibrated* matrix (whose entries are O(1) by construction). This is only
 * a numerical backstop — mechanisms are decided exactly by hasMechanism() —
 * so the threshold just has to catch round-off-level pivots and reject NaN.
 */
const SINGULARITY_TOL = 1e-12;

/**
 * Dense linear solve with partial pivoting. Throws StabilityError on singular.
 *
 * The system is equilibrated first. A beam element couples translational
 * DOFs (stiffness ~ EI/L³) with rotational DOFs (~ EI/L) — a spread of
 * 3/L². Because the mesh always refines a beam to ~100 elements, a short
 * beam ends up with translation entries orders of magnitude larger than the
 * rotation entries, and the raw matrix is badly scaled. A pivot threshold
 * tied to the largest matrix entry then rejects perfectly stable structures
 * ("unstable mechanism"): the large entries set the threshold, while the
 * pivots that actually carry the physics are the small rotation-dominated
 * ones.
 *
 * Scaling row and column i by 1/sqrt(|K_ii|) gives the scaled matrix a unit
 * diagonal and O(1) off-diagonals, so the threshold becomes meaningful for
 * any beam length. The transform is an invertible congruence, so it leaves
 * the solution and the rank of the system unchanged.
 */
function denseSolve(A: number[][], b: number[]): number[] {
  const n = b.length;
  if (n === 0) return [];

  // --- symmetric diagonal equilibration ---
  const d = new Array<number>(n).fill(1);
  for (let i = 0; i < n; i++) {
    const diag = Math.abs(A[i][i]);
    if (diag > 0 && Number.isFinite(diag)) d[i] = 1 / Math.sqrt(diag);
  }

  // --- build the scaled augmented system, tracking its largest entry ---
  const M: number[][] = Array.from({ length: n }, () => new Array<number>(n + 1).fill(0));
  let kMax = 0;
  for (let i = 0; i < n; i++) {
    const row = M[i];
    const di = d[i];
    for (let j = 0; j < n; j++) {
      const v = A[i][j] * di * d[j];
      row[j] = v;
      const av = Math.abs(v);
      if (av > kMax) kMax = av;
    }
    row[n] = b[i] * di;
  }

  // --- elimination with partial pivoting on the scaled matrix ---
  // The stiffness matrix is banded, so skipping zero multipliers keeps this
  // O(n·band²) instead of O(n³).
  const singTol = SINGULARITY_TOL * Math.max(1, kMax);
  for (let col = 0; col < n; col++) {
    let piv = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(M[r][col]) > Math.abs(M[piv][col])) piv = r;
    }
    // `!(pv > tol)` also rejects NaN, which can only arise from a degenerate
    // model (zero or non-finite stiffness) that has no solution anyway.
    if (!(Math.abs(M[piv][col]) > singTol)) {
      throw new StabilityError();
    }
    [M[col], M[piv]] = [M[piv], M[col]];
    const pivotRow = M[col];
    const pivot = pivotRow[col];
    for (let r = col + 1; r < n; r++) {
      const row = M[r];
      const f = row[col] / pivot;
      if (f === 0) continue;
      row[col] = 0;
      for (let c = col + 1; c <= n; c++) row[c] -= f * pivotRow[c];
    }
  }
  const y = new Array<number>(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    const row = M[i];
    let s = row[n];
    for (let c = i + 1; c < n; c++) s -= row[c] * y[c];
    y[i] = s / row[i];
  }
  // undo the equilibration: u = D·y
  for (let i = 0; i < n; i++) y[i] *= d[i];
  return y;
}

/**
 * Exact (combinatorial) stability check: does the beam have a mechanism?
 *
 * The numeric pivot test in denseSolve cannot separate a mechanism from a
 * merely soft structure: over the ~100-element mesh, round-off leaves a
 * rank-deficient matrix with a small *positive* pivot (~1e-6 in the
 * equilibrated matrix — the same order as a legitimately soft spring
 * support), so the numeric test alone both rejects good beams and lets
 * mechanisms through. This check decides stability on the zero-energy
 * fields instead, where the arithmetic is exact and O(1).
 *
 * A zero-bending-energy field of a beam is a deflection v that is
 * piecewise linear, continuous everywhere, and whose slope may jump only
 * at internal hinges. So the beam splits into spans at the hinges; span j
 * contributes two unknowns, its value w_j and slope s_j at its left end:
 * v(x) = w_j + s_j·(x − a_j)/L. A rigid support pins v at its position (a
 * fixed support also pins the slope, on both spans when it sits on a hinge);
 * a spring support only grounds a mode where that mode's displacement is
 * non-zero. The stiffness matrix is singular iff this small homogeneous
 * system has a non-trivial solution.
 */
function hasMechanism(model: BeamModel): boolean {
  const L = model.length;
  const end = snapX(L);
  const clampX = (x: number) => Math.min(Math.max(x, 0), L);
  // Internal hinges become span cuts. Hinges at the very ends open no
  // release (buildMesh gives them a single node as well), so skip them.
  const hingePos = [...new Set(model.hinges.map((h) => snapX(clampX(h.x))))].filter((x) => x > 0 && x < end);
  const bs = [0, ...hingePos.sort((a, b) => a - b), end]; // span boundaries
  const m = bs.length - 1; // number of spans
  if (m < 1) return true; // degenerate beam

  const n = 2 * m; // unknowns: [w_0, s_0, w_1, s_1, ...]
  const rows: number[][] = [];
  const row = (pairs: [number, number][]) => {
    const r = new Array<number>(n).fill(0);
    for (const [c, v] of pairs) r[c] += v;
    rows.push(r);
  };
  // v continuous across each internal hinge
  for (let i = 1; i < m; i++) {
    row([
      [2 * (i - 1), 1],
      [2 * (i - 1) + 1, (bs[i] - bs[i - 1]) / L],
      [2 * i, -1],
    ]);
  }
  const spanOf = (p: number): number => {
    for (let j = 0; j < m; j++) if (p <= bs[j + 1] + 1e-12) return j;
    return m - 1;
  };
  for (const s of model.supports) {
    const p = snapX(clampX(s.x));
    const j = spanOf(p);
    const t = (p - bs[j]) / L;
    // v(p) = 0 for a rigid support; for a spring this is "zero spring
    // stretch", i.e. exactly the modes the spring fails to ground.
    row([
      [2 * j, 1],
      [2 * j + 1, t],
    ]);
    if (s.type === 'fixed') {
      row([[2 * j + 1, 1]]); // slope pinned on the span left of p
      if (j + 1 < m && Math.abs(p - bs[j + 1]) <= 1e-9) row([[2 * (j + 1) + 1, 1]]); // on a hinge: right span too
    }
  }

  // Rank of the tiny, O(1)-scaled system by Gaussian elimination.
  const A = rows.map((r) => [...r]);
  let rank = 0;
  for (let col = 0; col < n && rank < A.length; col++) {
    let piv = rank;
    for (let r = rank; r < A.length; r++) if (Math.abs(A[r][col]) > Math.abs(A[piv][col])) piv = r;
    if (Math.abs(A[piv][col]) < 1e-12) continue;
    [A[rank], A[piv]] = [A[piv], A[rank]];
    for (let r = rank + 1; r < A.length; r++) {
      const f = A[r][col] / A[rank][col];
      if (f === 0) continue;
      for (let c = col; c < n; c++) A[r][c] -= f * A[rank][c];
    }
    rank++;
  }
  return n - rank > 0; // non-trivial zero-energy field ⇒ mechanism
}

export function solve(model: BeamModel): SolveResult {
  if (model.length <= 0) throw new StabilityError('Beam length must be positive.');
  if (model.supports.length === 0) throw new StabilityError('No supports: the beam is floating. Add at least one support.');
  if (hasMechanism(model)) throw new StabilityError();

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
      const xKey = snapX(load.x);
      const nodes = nodeAtX.get(xKey);
      if (nodes) {
        F[2 * nodes[0]] += load.P;
        continue;
      }
    }
    if (load.type === 'moment') {
      const xKey = snapX(load.x);
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

  // Internal hinge: exact master/slave constraint on the vertical DOF.
  //
  // A hinge releases the bending moment but keeps the vertical displacement
  // continuous. The mesh gives every hinge two coincident nodes with
  // independent rotations; their vertical DOFs are merged onto a single
  // master DOF during the reduction below, which is exact.
  //
  // A stiff penalty spring used to stand in for that constraint. Its
  // magnitude (EI·1e6) was not scale-invariant: the element stiffness it
  // has to restrain scales as EI/L³, so on short beams the "stiff" penalty
  // was orders of magnitude softer than the elements around it. The hinge
  // then behaved like a free link, leaving the model nearly singular — the
  // solver rejected perfectly valid hinged beams as unstable, and where it
  // did solve, the hinge sat at the wrong deflection.
  const hingeMaster = new Map<number, number>(); // slave vertical DOF -> master vertical DOF
  for (const h of model.hinges) {
    const xKey = snapX(h.x);
    const nodes = nodeAtX.get(xKey);
    if (!nodes || nodes.length < 2) continue;
    hingeMaster.set(2 * nodes[1], 2 * nodes[0]);
  }
  /** Master DOF for a full DOF index (the identity unless it is a hinge slave). */
  const masterOf = (dof: number): number => hingeMaster.get(dof) ?? dof;

  // Supports: build prescribed-DOF sets
  const prescribed = new Map<number, number>(); // dof -> value
  const springDofs: { dof: number; k: number; settle: number }[] = [];
  for (const s of model.supports) {
    const xKey = snapX(s.x);
    const nodes = nodeAtX.get(xKey);
    if (!nodes) continue;
    const settle = s.settlement ?? 0;
    // A support sitting on a hinge sees both coincident nodes, which share
    // one vertical DOF after the hinge reduction — restrain it once.
    const fixedV = new Set<number>();
    const fixV = (n: number) => {
      const dof = masterOf(2 * n);
      if (fixedV.has(dof)) return;
      fixedV.add(dof);
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

  // A hinge slave shares its master's vertical DOF, so a prescribed value on
  // one is a prescribed value on the other (e.g. a support sitting exactly on
  // a hinge restrains the shared DOF).
  for (const [slave, master] of hingeMaster) {
    if (prescribed.has(master) && !prescribed.has(slave)) prescribed.set(slave, prescribed.get(master)!);
    else if (prescribed.has(slave) && !prescribed.has(master)) prescribed.set(master, prescribed.get(slave)!);
  }

  // ---- Reduction ----
  // Prescribed DOFs are condensed out and the vertical DOFs of an internal
  // hinge are condensed onto their master (u_slave = u_master), i.e. the
  // reduced system is Tᵀ·K·T·u = Tᵀ·F with T the identity except for the
  // hinge slave columns, which repeat the master column.
  const freeFull: number[] = [];
  for (let d = 0; d < nDof; d++) {
    if (prescribed.has(d)) continue;
    if (hingeMaster.has(d)) continue; // slave: carried by its master
    freeFull.push(d);
  }
  const nf = freeFull.length;
  const idxOf = new Map<number, number>();
  freeFull.forEach((d, i) => idxOf.set(d, i));

  // Springs with settlement: K·u = F + k·settle on that dof
  const Ff = new Array<number>(nf).fill(0);
  const Kff = Array.from({ length: nf }, () => new Array<number>(nf).fill(0));
  for (let i = 0; i < nf; i++) {
    const di = freeFull[i];
    let fi = F[di];
    for (const [dof, val] of prescribed) fi -= K[di][dof] * val;
    for (const sd of springDofs) {
      if (sd.dof === di) fi += sd.k * sd.settle;
    }
    Ff[i] = fi;
    for (let j = 0; j < nf; j++) Kff[i][j] = K[di][freeFull[j]];
  }
  // Fold each hinge slave DOF onto its master (Tᵀ·K·T): O(n) per hinge.
  for (const [slave, master] of hingeMaster) {
    const im = idxOf.get(master);
    if (im === undefined) continue; // master prescribed: slave already condensed out
    let fs = F[slave];
    for (const [dof, val] of prescribed) fs -= K[slave][dof] * val;
    for (const sd of springDofs) {
      if (sd.dof === slave) fs += sd.k * sd.settle;
    }
    Ff[im] += fs;
    for (let j = 0; j < nf; j++) {
      const b = freeFull[j];
      Kff[im][j] += K[slave][b];
      Kff[j][im] += K[b][slave];
    }
    Kff[im][im] += K[slave][slave];
  }

  let maxLoad = 0;
  for (const f of F) maxLoad = Math.max(maxLoad, Math.abs(f));
  if (nf === 0 && maxLoad > 1e-6) {
    throw new StabilityError('All DOFs are prescribed but external loads exist.');
  }

  const u = new Array<number>(nDof).fill(0);
  for (const [dof, val] of prescribed) u[dof] = val;
  const uf = nf > 0 ? denseSolve(Kff, Ff) : [];
  for (let i = 0; i < nf; i++) u[freeFull[i]] = uf[i];
  // The hinge slave rides on its master.
  for (const [slave, master] of hingeMaster) u[slave] = u[master];

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
    const xKey = snapX(s.x);
    const nodes = nodeAtX.get(xKey) ?? [];
    let R = 0, M = 0;
    if (s.type === 'spring') {
      // The spring stiffness is folded into K, so the equilibrium residual at
      // its DOF is zero by construction and says nothing about the force the
      // spring carries. Report the spring force itself: it pushes the beam
      // up by k·(settlement − displacement), i.e. upward-positive it is
      // k·(u − settle) with u downward-positive, so in the solver's
      // downward-positive convention the reaction is −k·(u − settle).
      const dof = masterOf(2 * nodes[0]);
      const k = s.k ?? 1e6;
      R = -k * (u[dof] - (s.settlement ?? 0));
    } else {
      for (const n of nodes) {
        const dv = 2 * n, dt = 2 * n + 1;
        // For a support on a hinge the two coincident nodes carry the merged
        // vertical DOF, so their residuals add up to the support reaction.
        R += Ku[dv] - F[dv];
        if (s.type === 'fixed') M += Ku[dt] - F[dt];
      }
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
  // jumps are rendered exactly. Sorted, deduped. Every position is snapped to
  // the same 1e-9 grid the mesh uses — a raw value such as
  // 0.07619999999999999 would otherwise miss the map lookups below and the
  // jump would silently vanish from the diagrams.
  const eventXs = new Set<number>();
  const addEv = (x: number) => eventXs.add(snapX(x));
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
  const bumpV = (x: number, dv: number) => {
    const k = snapX(x);
    vEvents.set(k, (vEvents.get(k) ?? 0) + dv);
  };
  for (const r of reactions) bumpV(r.x, -r.R); // upward positive
  for (const p of pointLoads) bumpV(p.x, -p.P);

  const mEvents = new Map<number, number>();
  const bumpM = (x: number, dM: number) => {
    const k = snapX(x);
    mEvents.set(k, (mEvents.get(k) ?? 0) + dM);
  };
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
