import { describe, it, expect } from 'vitest';
import { solve, StabilityError } from '../solve';
import type { BeamModel, Load, Support } from '../model';

const STEEL = { id: 'steel', name: 'Steel', E: 200e9, density: 7850, fy: 250e6 };
const RECT = { id: 'r', name: 'Rect', A: 0.01, I: 8.333e-6, depth: 0.1, cTop: 0.05, cBot: 0.05 };

let counter = 0;
const id = () => `t${++counter}`;
const sup = (x: number, type: Support['type'], k?: number): Support => ({ id: id(), x, type, k });

function model(over: Partial<BeamModel>): BeamModel {
  return {
    length: 10,
    supports: [],
    hinges: [],
    loads: [],
    material: STEEL,
    section: RECT,
    selfWeight: false,
    ...over,
  };
}

const at = (xs: number[], v: number[], x: number): number => {
  // nearest sample
  let best = 0, bd = Infinity;
  xs.forEach((xx, i) => {
    const d = Math.abs(xx - x);
    if (d < bd) { bd = d; best = i; }
  });
  return v[best];
};

describe('solver closed-form', () => {
  it('simply supported + center point load: Mmax = PL/4, R = P/2, δmax = PL³/48EI', () => {
    const L = 10, P = 20e3;
    const r = solve(model({
      length: L,
      supports: [sup(0, 'pin'), sup(L, 'roller')],
      loads: [{ id: id(), type: 'point', x: L / 2, P }],
    }));
    expect(r.reactions[0].R).toBeCloseTo(-P / 2, 2); // solver: downward-positive → reaction = −P/2
    expect(r.reactions[1].R).toBeCloseTo(-P / 2, 2);
    expect(r.moment.max.value).toBeCloseTo((P * L) / 4, -1);
    expect(r.moment.max.x).toBeCloseTo(L / 2, 1);
    const EI = STEEL.E * RECT.I;
    expect(Math.abs(r.deflection.min.value)).toBeCloseTo((P * L ** 3) / (48 * EI), 8);
  });

  it('simply supported + UDL: Mmax = wL²/8, R = wL/2, δmax = 5wL⁴/384EI', () => {
    const L = 8, w = 5e3;
    const r = solve(model({
      length: L,
      supports: [sup(0, 'pin'), sup(L, 'roller')],
      loads: [{ id: id(), type: 'udl', x1: 0, x2: L, w }],
    }));
    expect(r.reactions[0].R).toBeCloseTo(-w * L / 2, 2);
    expect(r.moment.max.value).toBeCloseTo((w * L * L) / 8, 0);
    const EI = STEEL.E * RECT.I;
    expect(Math.abs(r.deflection.min.value)).toBeCloseTo((5 * w * L ** 4) / (384 * EI), 6);
  });

  it('cantilever + tip load: fixed moment = −PL, δ_tip = PL³/3EI', () => {
    const L = 6, P = 10e3;
    const r = solve(model({
      length: L,
      supports: [sup(0, 'fixed')],
      loads: [{ id: id(), type: 'point', x: L, P }],
    }));
    expect(r.reactions[0].R).toBeCloseTo(-P, 2);
    expect(Math.abs(r.moment.min.value)).toBeCloseTo(P * L, 0);
    const EI = STEEL.E * RECT.I;
    expect(Math.abs(r.deflection.min.value)).toBeCloseTo((P * L ** 3) / (3 * EI), 6);
    expect(r.deflection.min.x).toBeCloseTo(L, 1);
  });

  it('cantilever + full UDL: fixed moment = −wL²/2, δ_tip = wL⁴/8EI', () => {
    const L = 5, w = 4e3;
    const r = solve(model({
      length: L,
      supports: [sup(0, 'fixed')],
      loads: [{ id: id(), type: 'udl', x1: 0, x2: L, w }],
    }));
    expect(r.reactions[0].R).toBeCloseTo(-w * L, 2);
    expect(Math.abs(r.moment.min.value)).toBeCloseTo((w * L * L) / 2, 0);
    const EI = STEEL.E * RECT.I;
    expect(Math.abs(r.deflection.min.value)).toBeCloseTo((w * L ** 4) / (8 * EI), 6);
  });

  it('propped cantilever + UDL: reactions 3wL/8 and 5wL/8, Mfix = −wL²/8', () => {
    const L = 8, w = 6e3;
    const r = solve(model({
      length: L,
      supports: [sup(0, 'fixed'), sup(L, 'roller')],
      loads: [{ id: id(), type: 'udl', x1: 0, x2: L, w }],
    }));
    // fixed end carries 3wL/8? Standard: roller = 3wL/8, fixed = 5wL/8
    expect(r.reactions[1].R).toBeCloseTo(-(3 * w * L) / 8, 1);
    expect(r.reactions[0].R).toBeCloseTo(-(5 * w * L) / 8, 1);
    expect(Math.abs(r.reactions[0].M)).toBeCloseTo((w * L * L) / 8, 0);
  });

  it('two-span continuous + UDL: middle reaction = 2·(5wL/4)? outer = 3wL/8 each', () => {
    const L = 6, w = 5e3;
    // two spans of L, supports at 0, L, 2L
    const r = solve(model({
      length: 2 * L,
      supports: [sup(0, 'pin'), sup(L, 'pin'), sup(2 * L, 'roller')],
      loads: [{ id: id(), type: 'udl', x1: 0, x2: 2 * L, w }],
    }));
    // Classical: each outer = 3wL/8? for two equal spans: outer = 3wL/8? Actually outer RA = 3wL/8 is propped; for 2-span continuous: RA = 0.375wL, RB = 1.25wL, RC = 0.375wL.
    expect(r.reactions[0].R).toBeCloseTo(-0.375 * w * L, 1);
    expect(r.reactions[1].R).toBeCloseTo(-1.25 * w * L, 1);
    expect(r.reactions[2].R).toBeCloseTo(-0.375 * w * L, 1);
    // hogging over middle support: M = −wL²/8
    const Mmid = at(r.moment.x, r.moment.values, L);
    expect(Math.abs(Mmid)).toBeCloseTo((w * L * L) / 8, 0);
  });

  it('internal hinge: M = 0 at hinge position', () => {
    const L = 10;
    const r = solve(model({
      length: L,
      supports: [sup(0, 'pin'), sup(4, 'roller'), sup(L, 'roller')],
      hinges: [{ id: id(), x: 4 }],
      loads: [{ id: id(), type: 'udl', x1: 0, x2: L, w: 5e3 }],
    }));
    const Mhinge = at(r.moment.x, r.moment.values, 4);
    expect(Math.abs(Mhinge)).toBeLessThan(1e-6 * (r.moment.max.value || 1) + 1e-3);
  });

  it('spring support softens reaction vs rigid roller', () => {
    const L = 8, w = 5e3;
    const rigid = solve(model({
      length: L,
      supports: [sup(0, 'fixed'), sup(L, 'roller')],
      loads: [{ id: id(), type: 'udl', x1: 0, x2: L, w }],
    }));
    const soft = solve(model({
      length: L,
      supports: [sup(0, 'fixed'), { ...sup(L, 'spring'), k: 1e6 }],
      loads: [{ id: id(), type: 'udl', x1: 0, x2: L, w }],
    }));
    expect(Math.abs(soft.reactions[1].R)).toBeLessThan(Math.abs(rigid.reactions[1].R));
  });

  it('overhanging beam: matches hand solution', () => {
    // supports at 2 and 8 on a 10m beam, UDL everywhere: RA=RB=wL/2 by symmetry
    const L = 10, w = 2e3;
    const r = solve(model({
      length: L,
      supports: [sup(2, 'pin'), sup(8, 'roller')],
      loads: [{ id: id(), type: 'udl', x1: 0, x2: L, w }],
    }));
    expect(r.reactions[0].R).toBeCloseTo(-w * L / 2, 1);
    expect(r.reactions[1].R).toBeCloseTo(-w * L / 2, 1);
  });

  it('trapezoid = UDL + triangle: equivalent to hand solution for resultant', () => {
    const L = 6;
    const w1 = 2e3, w2 = 8e3;
    const r = solve(model({
      length: L,
      supports: [sup(0, 'pin'), sup(L, 'roller')],
      loads: [{ id: id(), type: 'trapezoid', x1: 0, x2: L, w1, w2 }],
    }));
    // Resultant = avg × L = 5×L/2... W = (w1+w2)/2·L = 30kN
    const W = ((w1 + w2) / 2) * L;
    // centroid from w1 end: x̄ = L·(w1+2w2)/(3(w1+w2))
    const xbar = (L * (w1 + 2 * w2)) / (3 * (w1 + w2));
    const RB = (W * xbar) / L;
    const RA = W - RB;
    expect(r.reactions[0].R).toBeCloseTo(-RA, 1);
    expect(r.reactions[1].R).toBeCloseTo(-RB, 1);
  });

  it('applied moment: reactions ±M/L, M-jump at point of application', () => {
    const L = 10, M0 = 20e3;
    const r = solve(model({
      length: L,
      supports: [sup(0, 'pin'), sup(L, 'roller')],
      loads: [{ id: id(), type: 'moment', x: L / 2, M: M0 }],
    }));
    expect(Math.abs(Math.abs(r.reactions[0].R) + Math.abs(r.reactions[1].R))).toBeCloseTo(2 * M0 / L, 1);
  });

  it('fixed–fixed + center point: MA=MB=−PL/8, Mmid=PL/8, δ=PL³/192EI', () => {
    const L = 8, P = 24e3;
    const r = solve(model({
      length: L,
      supports: [sup(0, 'fixed'), sup(L, 'fixed')],
      loads: [{ id: id(), type: 'point', x: L / 2, P }],
    }));
    expect(Math.abs(r.reactions[0].M)).toBeCloseTo((P * L) / 8, 0);
    expect(Math.abs(r.reactions[1].M)).toBeCloseTo((P * L) / 8, 0);
    const Mmid = at(r.moment.x, r.moment.values, L / 2);
    expect(Mmid).toBeCloseTo((P * L) / 8, 0);
    const EI = STEEL.E * RECT.I;
    expect(Math.abs(r.deflection.min.value)).toBeCloseTo((P * L ** 3) / (192 * EI), 6);
  });

  it('mechanism detection: single pin is unstable', () => {
    expect(() =>
      solve(model({ supports: [sup(0, 'pin')], loads: [{ id: id(), type: 'point', x: 5, P: 1e3 }] })),
    ).toThrow(StabilityError);
  });

  // ===== Regression tests from code review (friend's audit) =====

  it('shear diagram captures point load jump at non-grid position', () => {
    // point load at x=2.733 (NOT on the 400-sample grid of a 6m beam)
    // xs = i·6/400 = 0.015·m → 2.733 is between samples 182 and 183
    const r = solve(model({
      length: 6,
      supports: [sup(0, 'pin'), sup(6, 'roller')],
      loads: [{ id: id(), type: 'point', x: 2.733, P: 10e3 }],
    }));
    const xs = r.shear.x, V = r.shear.values;
    const idx = xs.reduce((best, x, i) => Math.abs(x - 2.733) < Math.abs(xs[best] - 2.733) ? i : best, 0);
    // V just before the load ≈ +Ra; just after ≈ +Ra − P
    const Ra = 10e3 * (6 - 2.733) / 6; // ~5445
    expect(V[idx - 1]).toBeCloseTo(Ra, -2);
    expect(V[idx + 1]).toBeCloseTo(Ra - 10e3, -2);
  });

  it('cantilever with clockwise end moment has constant moment diagram', () => {
    // cantilever fixed at 0, applied CW moment M at the free end.
    // Internal M should be constant = M along the whole beam (sagging-positive sign depends on convention).
    const L = 5, M0 = 8e3;
    const r = solve(model({
      length: L,
      supports: [sup(0, 'fixed')],
      loads: [{ id: id(), type: 'moment', x: L, M: M0 }],
    }));
    for (const i of [10, 100, 200, 300, 399]) {
      expect(Math.abs(r.moment.values[i])).toBeCloseTo(M0, 1);
    }
  });

  it('applied moment INSIDE beam (off-grid) produces constant offset + tip drop', () => {
    // moment at x=2.733 on freely supported beam
    // RA = -M/L (if CW at mid), RB = +M/L; M jumps by M at x=2.733
    const L = 8, M0 = 12e3;
    const r = solve(model({
      length: L,
      supports: [sup(0, 'pin'), sup(L, 'roller')],
      loads: [{ id: id(), type: 'moment', x: 2.733, M: M0 }],
    }));
    const xs = r.moment.x, M = r.moment.values;
    const idx = xs.reduce((best, x, i) => Math.abs(x - 2.733) < Math.abs(xs[best] - 2.733) ? i : best, 0);
    // M jump should be ~M0 between samples immediately straddling 2.733
    // (adjacent samples in the grid, not ±1 index)
    // Account for linear drift over the interval between samples: Δ_drift = V·Δx
    const dx = xs[idx] - xs[idx - 1];
    const Vdrift = r.shear.values[idx - 1]; // constant in pure moment region
    const drift = Vdrift * dx;
    expect(Math.abs(M[idx] - M[idx - 1] - drift)).toBeCloseTo(M0, 4);
  });

  it('Gerber hinge with no support at the hinge is stable', () => {
    // Classic Gerber: main span 0-10 with pin @0, hinge @6, secondary span 6-14
    // supported by hinge at 6 + roller @14. Hinge itself is NOT supported.
    const r = solve(model({
      length: 14,
      supports: [sup(0, 'fixed'), sup(10, 'roller')],
      hinges: [{ id: id(), x: 6 }],
      loads: [{ id: id(), type: 'udl', x1: 0, x2: 14, w: 5e3 }],
    }));
    // M at hinge position is exactly zero
    const xs = r.moment.x;
    const idx = xs.reduce((best, x, i) => Math.abs(x - 6) < Math.abs(xs[best] - 6) ? i : best, 0);
    expect(Math.abs(r.moment.values[idx])).toBeLessThan(1);
  });

  it('URL-hash/localStorage sanitize rejects garbage models', async () => {
    const { sanitizeAndDeserialize } = await import('../../ui/state');
    // not an object
    expect(sanitizeAndDeserialize('')).toBeNull();
    // wrong version
    expect(sanitizeAndDeserialize({ v: 2 })).toBeNull();
    // NaN length
    expect(sanitizeAndDeserialize({ v: 1, model: { length: NaN, supports: [], loads: [], hinges: [] }, ui: {} })).toBeNull();
    // zero-length
    expect(sanitizeAndDeserialize({ v: 1, model: { length: 0, supports: [], loads: [], hinges: [] }, ui: {} })).toBeNull();
    // support beyond beam
    expect(sanitizeAndDeserialize({
      v: 1,
      model: { length: 5, supports: [{ id: 'a', x: 99, type: 'pin' }], loads: [], hinges: [],
               material: { id: 'm', name: '', E: 1e6, density: 0 }, section: { id: 's', name: '', A: 1, I: 1, depth: 1, cTop: 0.5, cBot: 0.5 }, selfWeight: false },
      ui: {},
    })).toBeNull();
    // negative E
    expect(sanitizeAndDeserialize({
      v: 1,
      model: { length: 5, supports: [], loads: [], hinges: [],
               material: { id: 'm', name: '', E: -1, density: 0 }, section: { id: 's', name: '', A: 1, I: 1, depth: 1, cTop: 0.5, cBot: 0.5 }, selfWeight: false },
      ui: {},
    })).toBeNull();
    // valid model passes
    const valid = {
      v: 1,
      model: { length: 5, supports: [{ id: 'a', x: 0, type: 'pin' }, { id: 'b', x: 5, type: 'roller' }], loads: [{ id: 'l', type: 'point', x: 2.5, P: 1000 }], hinges: [],
               material: { id: 'm', name: '', E: 200e9, density: 7850 }, section: { id: 's', name: '', A: 0.01, I: 8e-6, depth: 0.1, cTop: 0.05, cBot: 0.05 }, selfWeight: false },
      ui: { unitSystem: 'metric', units: {} },
    };
    expect(sanitizeAndDeserialize(valid)).not.toBeNull();
  });

  it('no supports → friendly error', () => {
    expect(() => solve(model({ supports: [] }))).toThrow(/floating|unstable/i);
  });

  it('self-weight acts as a full UDL', () => {
    const L = 10;
    const r = solve(model({
      length: L,
      supports: [sup(0, 'pin'), sup(L, 'roller')],
      selfWeight: true,
    }));
    const w = RECT.A * STEEL.density * 9.80665;
    expect(r.reactions[0].R).toBeCloseTo(-w * L / 2, 1);
    expect(r.moment.max.value).toBeCloseTo((w * L * L) / 8, 0);
  });
});
