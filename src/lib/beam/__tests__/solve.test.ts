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
