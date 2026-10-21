/**
 * Tests for the public calculation API (src/lib/api/handler.ts) and the
 * Pages Function wrapper (functions/api/calculate.ts).
 *
 * Textbook cases are cross-checked against closed-form solutions, matching
 * the formulas listed on the site's formulas pages.
 */
import { describe, it, expect } from 'vitest';
import { handleRequest, LIMITS } from './handler';
import { sanitizeAndDeserialize } from '../ui/state';
import { onRequest } from '../../../functions/api/calculate';

// Rect 200×100 mm steel section, SI.
const STEEL = { id: 'steel', name: 'Structural Steel (A36)', E: 200e9, density: 7850, fy: 250e6, nu: 0.3 };
const RECT = { id: 'r', name: 'Rect 200×100 mm', A: 0.02, I: 6.667e-5, depth: 0.2, cTop: 0.1, cBot: 0.1 };
const EI = STEEL.E * RECT.I;
// Bending stress at x=2 for the golden beam: M·c/I (I is the rounded 6.667e-5, so ≈20.001 MPa).
const SIGMA = ((10000 * 4) / 6 * 2) * RECT.cBot / RECT.I;

function post(body: unknown): { status: number; json: any } {
  return handleRequest(JSON.stringify(body));
}

const beam = (over: Record<string, unknown>): Record<string, unknown> => ({
  length: 6,
  supports: [
    { x: 0, type: 'pin' },
    { x: 6, type: 'roller' },
  ],
  material: STEEL,
  section: RECT,
  ...over,
});

interface SuccessJson {
  ok: true;
  units: Record<string, string>;
  results: {
    reactions: { x: number; type: string; R: number; M: number }[];
    maxShear: { value: number; x: number };
    maxMoment: { value: number; x: number };
    maxDeflection: { value: number; x: number };
    maxBendingStress: { top: { value: number; x: number }; bottom: { value: number; x: number } };
    maxAvgShearStress: { value: number; x: number };
    diagrams?: { x: number[]; shear: number[]; moment: number[]; slope: number[]; deflection: number[] };
  };
  samples: number;
  calculatorUrl: string;
}

function ok(body: unknown): SuccessJson {
  const res = post(body);
  expect(res.status).toBe(200);
  expect(res.json.ok).toBe(true);
  return res.json as SuccessJson;
}

function failure(body: unknown): { status: number; json: { ok: false; error: { code: string; message: string; details: { path: string; message: string }[] } } } {
  return post(body) as never;
}

describe('API golden test and textbook cases', () => {
  it('golden: simply supported, L=6 m, 10 kN point at x=2 m (SI defaults)', () => {
    const json = ok(beam({ loads: [{ type: 'point', x: 2, P: 10000 }] }));
    const [r0, r1] = json.results.reactions;
    expect(r0.R).toBeCloseTo(6666.67, 1); // upward
    expect(r0.type).toBe('pin');
    expect(r1.R).toBeCloseTo(3333.33, 1);
    expect(r0.M).toBe(0);
    expect(json.results.maxShear.value).toBeCloseTo(6666.67, 1);
    expect(json.results.maxMoment.value).toBeCloseTo(13333.33, 0);
    expect(json.results.maxMoment.x).toBeCloseTo(2, 6);
    // bending stress at x=2: σ = M·c/I = 13.333 kN·m · 0.1 m / 6.667e-5 m⁴ ≈ 20 MPa
    expect(json.results.maxBendingStress.bottom.value).toBeCloseTo(SIGMA, 0);
    expect(json.results.maxBendingStress.top.value).toBeCloseTo(-SIGMA, 0);
    // deflection at the load: δ = P·a²·b²/(3LEI), downward = negative
    const expected = (10000 * 2 ** 2 * 4 ** 2) / (3 * 6 * EI);
    const xArr = json.results.diagrams!.x;
    const dArr = json.results.diagrams!.deflection;
    const i = xArr.findIndex((x) => Math.abs(x - 2) < 1e-9);
    expect(dArr[i]).toBeCloseTo(-expected, 6);
    expect(json.results.maxDeflection.value).toBeLessThan(0);
    expect(Math.abs(json.results.maxDeflection.value)).toBeGreaterThanOrEqual(expected - 1e-12);
    expect(json.units.force).toBe('N');
  });

  it('golden beam expressed in kN/m units returns kN and kN·m', () => {
    const json = ok(beam({
      units: { force: 'kN', moment: 'kNm', distributed: 'kN/m', pressure: 'MPa', area: 'cm2', inertia: 'cm4' },
      section: { A: 200, I: 6666.7, depth: 0.2 }, // cm², cm⁴, m
      loads: [{ type: 'point', x: 2, P: 10 }],
    }));
    expect(json.units.force).toBe('kN');
    expect(json.results.reactions[0].R).toBeCloseTo(6.667, 2);
    expect(json.results.reactions[1].R).toBeCloseTo(3.333, 2);
    expect(json.results.maxShear.value).toBeCloseTo(6.667, 2);
    expect(json.results.maxMoment.value).toBeCloseTo(13.333, 2);
    expect(json.results.maxMoment.x).toBeCloseTo(2, 6);
    expect(json.results.maxBendingStress.bottom.value).toBeCloseTo(SIGMA / 1e6, 2); // MPa
  });

  it('UDL: L=6 m, w=10 kN/m over full span → R=30 kN each, Mmax=wL²/8=45 kN·m at 3 m', () => {
    const json = ok(beam({
      units: { force: 'kN', moment: 'kNm', distributed: 'kN/m' },
      loads: [{ type: 'udl', x1: 0, x2: 6, w: 10 }],
    }));
    expect(json.results.reactions[0].R).toBeCloseTo(30, 2);
    expect(json.results.reactions[1].R).toBeCloseTo(30, 2);
    expect(json.results.maxMoment.value).toBeCloseTo(45, 1);
    expect(json.results.maxMoment.x).toBeCloseTo(3, 6);
    // δmid = 5wL⁴/384EI
    const xArr = json.results.diagrams!.x;
    const dArr = json.results.diagrams!.deflection;
    const i = xArr.findIndex((x) => Math.abs(x - 3) < 1e-9);
    expect(dArr[i]).toBeCloseTo(-(5 * 10000 * 6 ** 4) / (384 * EI), 5);
  });

  it('overhang: L=6 m, pin@0, roller@4, 10 kN tip load → RA=-5 kN, RB=15 kN, |M|max=20 kN·m at 4 m', () => {
    const json = ok(beam({
      units: { force: 'kN', moment: 'kNm' },
      supports: [
        { x: 0, type: 'pin' },
        { x: 4, type: 'roller' },
      ],
      loads: [{ type: 'point', x: 6, P: 10 }],
    }));
    const [r0, r1] = json.results.reactions;
    expect(r0.R).toBeCloseTo(-5, 2); // hold-down reaction
    expect(r1.R).toBeCloseTo(15, 2);
    expect(json.results.maxMoment.value).toBeCloseTo(-20, 1); // hogging at the roller
    expect(json.results.maxMoment.x).toBeCloseTo(4, 6);
    expect(Math.abs(json.results.maxShear.value)).toBeCloseTo(10, 1);
    // tip deflection δ = P·a²(l+a)/3EI with l=4, a=2
    const xArr = json.results.diagrams!.x;
    const dArr = json.results.diagrams!.deflection;
    const i = xArr.findIndex((x) => Math.abs(x - 6) < 1e-9);
    expect(dArr[i]).toBeCloseTo(-(10000 * 2 ** 2 * (4 + 2)) / (3 * EI), 5);
  });
});

describe('API unstable and error handling', () => {
  it('single roller → structured 422, not a 500', () => {
    const res = failure(beam({
      supports: [{ x: 3, type: 'roller' }],
      loads: [{ type: 'point', x: 2, P: 10000 }],
    }));
    expect(res.status).toBe(422);
    expect(res.json.error.code).toBe('unstable');
    expect(res.json.error.message).toMatch(/unstable|support/i);
  });

  it('no supports → structured 422', () => {
    const res = failure(beam({ supports: [], loads: [{ type: 'point', x: 2, P: 10000 }] }));
    expect(res.status).toBe(422);
    expect(res.json.error.code).toBe('unstable');
  });

  it('malformed JSON → 400 invalid_json', () => {
    const res = handleRequest('{not json');
    expect(res.status).toBe(400);
    expect((res.json as any).error.code).toBe('invalid_json');
  });

  it('non-object body → 422 with root detail', () => {
    for (const bad of ['"hello"', '[1,2]', 'null', '42']) {
      const res = handleRequest(bad);
      expect(res.status).toBe(422);
      expect((res.json as any).error.code).toBe('invalid_input');
      expect((res.json as any).error.details[0].path).toBe('');
    }
  });

  it('missing / out-of-range length → 422 with field path', () => {
    const missing = failure(beam({ length: undefined }));
    expect(missing.status).toBe(422);
    expect(missing.json.error.details.some((d) => d.path === 'length')).toBe(true);

    const zero = failure(beam({ length: 0 }));
    expect(zero.status).toBe(422);
    expect(zero.json.error.details[0].path).toBe('length');

    const huge = failure(beam({ length: 2000 }));
    expect(huge.status).toBe(422);
  });

  it('too many loads / supports → 422 naming the cap', () => {
    const loads = failure(beam({ loads: Array.from({ length: LIMITS.MAX_LOADS + 1 }, (_, i) => ({ type: 'point', x: 1 + i * 0.1, P: 1 })) }));
    expect(loads.status).toBe(422);
    expect(loads.json.error.details.some((d) => d.path === 'loads')).toBe(true);

    const supports = failure(beam({
      supports: Array.from({ length: LIMITS.MAX_SUPPORTS + 1 }, (_, i) => ({ x: i * 0.5, type: i === 0 ? 'pin' : 'roller' })),
    }));
    expect(supports.status).toBe(422);
  });

  it('out-of-range support / load positions → 422', () => {
    const sup = failure(beam({ supports: [{ x: 9, type: 'roller' }] }));
    expect(sup.status).toBe(422);
    expect(sup.json.error.details[0].path).toBe('supports[0].x');

    const load = failure(beam({ loads: [{ type: 'point', x: 7, P: 100 }] }));
    expect(load.status).toBe(422);
    expect(load.json.error.details[0].path).toBe('loads[0].x');
  });

  it('zero-width distributed load → 422', () => {
    const res = failure(beam({ loads: [{ type: 'udl', x1: 2, x2: 2, w: 10 }] }));
    expect(res.status).toBe(422);
    expect(res.json.error.details[0].message).toMatch(/x1/);
  });

  it('hinge at the beam end → 422', () => {
    const res = failure(beam({ hinges: [{ x: 0 }] }));
    expect(res.status).toBe(422);
    expect(res.json.error.details[0].path).toBe('hinges[0].x');
  });

  it('unknown unit / unknown load type / unknown field → 422 with clear messages', () => {
    const unit = failure(beam({ units: { force: 'kg' } }));
    expect(unit.status).toBe(422);
    expect(unit.json.error.details[0].path).toBe('units.force');
    expect(unit.json.error.details[0].message).toMatch(/N, kN/);

    const load = failure(beam({ loads: [{ type: 'elephant', x: 1 }] }));
    expect(load.status).toBe(422);
    expect(load.json.error.details[0].path).toBe('loads[0].type');

    const field = failure(beam({ colour: 'red' }));
    expect(field.status).toBe(422);
    expect(field.json.error.details[0].path).toBe('colour');
  });

  it('bad material / section / selfWeight combos → 422', () => {
    expect(failure(beam({ material: 'unobtainium' })).status).toBe(422);
    expect(failure(beam({ material: { E: -1 } })).status).toBe(422);
    expect(failure(beam({ section: { A: 0.02, I: -1, depth: 0.2 } })).status).toBe(422);
    // selfWeight requires a positive density
    const sw = failure(beam({ material: { E: 200e9, density: 0 }, selfWeight: true }));
    expect(sw.status).toBe(422);
    expect(sw.json.error.details[0].path).toBe('material.density');
  });

  it('infinite numbers (1e999 → Infinity) are rejected, not solved', () => {
    const res = handleRequest('{"length":1e999,"supports":[{"x":0,"type":"pin"}],"material":"steel","section":{"A":1,"I":1,"depth":1}}');
    expect(res.status).toBe(422);
  });

  it('oversized body → 413', () => {
    const res = handleRequest(' '.repeat(LIMITS.MAX_BODY_BYTES + 1));
    expect(res.status).toBe(413);
    expect((res.json as any).error.code).toBe('request_too_large');
  });

  it('unstable structures with extreme inputs never leak exceptions', () => {
    // stiff/soft extremes and coincident supports must not crash the handler
    const weird = [
      beam({ supports: [{ x: 0, type: 'spring', k: 1e-12 }, { x: 6, type: 'spring', k: 1e12 }], loads: [{ type: 'point', x: 3, P: 1e9 }] }),
      beam({ supports: [{ x: 3, type: 'pin' }, { x: 3, type: 'roller' }, { x: 3, type: 'fixed' }], loads: [{ type: 'trapezoid', x1: 0, x2: 6, w1: 1, w2: 2 }] }),
    ];
    for (const w of weird) {
      const res = post(w);
      expect([200, 422, 500].includes(res.status)).toBe(true);
      expect(res.json.ok !== undefined).toBe(true);
      if (res.status === 500) expect((res.json as any).error.code).toBe('internal_error');
    }
  });
});

describe('API units and features', () => {
  it('imperial request matches the SI equivalent after conversion', () => {
    // 10 ft simply supported beam, 1000 lb center load, E=29e6 psi, I=100 in⁴
    const imperial = ok(beam({
      units: { length: 'ft', force: 'lb', moment: 'lbft', distributed: 'lb/ft', pressure: 'psi', area: 'in2', inertia: 'in4', density: 'lb/ft3' },
      length: 10,
      supports: [{ x: 0, type: 'pin' }, { x: 10, type: 'roller' }],
      material: { E: 29e6 },
      section: { A: 10, I: 100, depth: 8 },
      loads: [{ type: 'point', x: 5, P: 1000 }],
    }));
    expect(imperial.results.reactions[0].R).toBeCloseTo(500, 1);
    expect(imperial.results.maxMoment.value).toBeCloseTo(2500, 0); // lb·ft

    const si = ok(beam({
      length: 10 * 0.3048,
      supports: [{ x: 0, type: 'pin' }, { x: 10 * 0.3048, type: 'roller' }],
      material: { E: 29e6 * 6894.757293168 },
      section: { A: 10 * 0.0254 ** 2, I: 100 * 0.0254 ** 4, depth: 8 * 0.0254 },
      loads: [{ type: 'point', x: 5 * 0.3048, P: 1000 * 4.4482216152605 }],
    }));
    // 2500 lb·ft in N·m
    expect(si.results.maxMoment.value).toBeCloseTo(imperial.results.maxMoment.value * 1.3558179483314004, 2);
  });

  it('material preset by id works', () => {
    const json = ok(beam({ material: 'timber', loads: [{ type: 'point', x: 3, P: 1000 }] }));
    expect(json.results.reactions[0].R).toBeCloseTo(500, 0);
  });

  it('spring supports with k in kN/mm and settlement work', () => {
    const json = ok(beam({
      units: { stiffness: 'kN/mm' },
      supports: [{ x: 0, type: 'fixed' }, { x: 6, type: 'spring', k: 5 }],
      loads: [{ type: 'point', x: 3, P: 10000 }],
    }));
    expect(Number.isFinite(json.results.reactions[1].R)).toBe(true);
  });

  it('selfWeight=true adds the weight UDL (w = A·ρ·g)', () => {
    const json = ok(beam({ material: { ...STEEL }, selfWeight: true }));
    const w = RECT.A * STEEL.density * 9.80665;
    expect(json.results.reactions[0].R).toBeCloseTo((w * 6) / 2, 0);
    expect(json.results.maxMoment.value).toBeCloseTo((w * 6 * 6) / 8, -3);
  });

  it('includeDiagrams=false omits the arrays', () => {
    const json = ok(beam({ includeDiagrams: false, loads: [{ type: 'point', x: 2, P: 10000 }] }));
    expect(json.results.diagrams).toBeUndefined();
  });

  it('diagram arrays are parallel, finite, and include both beam ends', () => {
    const json = ok(beam({ loads: [{ type: 'point', x: 2, P: 10000 }] }));
    const d = json.results.diagrams!;
    expect(d.x.length).toBe(json.samples);
    for (const arr of [d.shear, d.moment, d.slope, d.deflection]) {
      expect(arr.length).toBe(d.x.length);
      expect(arr.every(Number.isFinite)).toBe(true);
    }
    expect(d.x[0]).toBeCloseTo(0, 9);
    expect(d.x[d.x.length - 1]).toBeCloseTo(6, 9);
  });
});

describe('API "open in calculator" link', () => {
  it('embeds the solved beam in the calculator URL hash, decodable by the UI', () => {
    const json = ok(beam({
      units: { force: 'kN', distributed: 'kN/m' },
      supports: [{ x: 0, type: 'pin' }, { x: 4.5, type: 'roller' }, { x: 6, type: 'roller' }],
      loads: [{ type: 'point', x: 2, P: 10 }, { type: 'udl', x1: 0, x2: 6, w: 2 }],
      hinges: [{ x: 4.5 }],
    }));
    expect(json.calculatorUrl.startsWith('https://onlinebeamcalculator.com/calculator/#')).toBe(true);

    const decoded = decodeHash(json.calculatorUrl);
    expect(decoded.v).toBe(1);
    expect(decoded.ui.unitSystem).toBe('metric');
    expect(decoded.ui.units.force).toBe('kN');

    // Round-trip through the exact function the browser uses to load hash links.
    const state = sanitizeAndDeserialize(decoded);
    expect(state).not.toBeNull();
    const m = state!.model;
    expect(m.length).toBeCloseTo(6, 12);
    expect(m.supports.map((s) => s.type)).toEqual(['pin', 'roller', 'roller']);
    expect(m.supports[1].x).toBeCloseTo(4.5, 12);
    expect(m.supports[2].x).toBeCloseTo(6, 12);
    const lp = m.loads[0] as { type: string; x: number; P: number };
    expect(lp.type).toBe('point');
    expect(lp.P).toBeCloseTo(10000, 0); // SI internally
    expect(lp.x).toBeCloseTo(2, 12);
    const lu = m.loads[1] as { type: string; x1: number; x2: number; w: number };
    expect(lu.type).toBe('udl');
    expect(lu.w).toBeCloseTo(2000, 0);
    expect(m.hinges[0].x).toBeCloseTo(4.5, 12);
    expect(m.material.E).toBeCloseTo(200e9, 0);
    expect(m.section.I).toBeCloseTo(6.667e-5, 0);
  });

  it('imperial-unit requests produce a link the UI also accepts', () => {
    const json = ok(beam({
      units: { length: 'ft', force: 'kip', moment: 'kipft' },
      length: 10,
      supports: [{ x: 0, type: 'pin' }, { x: 10, type: 'roller' }],
      loads: [{ type: 'point', x: 5, P: 1 }],
    }));
    const decoded = decodeHash(json.calculatorUrl);
    expect(decoded.ui.unitSystem).toBe('imperial');
    expect(sanitizeAndDeserialize(decoded)).not.toBeNull();
  });
});

// ---- Pages Function wrapper (functions/api/calculate.ts) ----

/** Decode a calculator share link exactly the way the browser does (UTF-8 base64 hash). */
function decodeHash(url: string): any {
  const bin = atob(url.split('#')[1]);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

async function req(method: string, body?: string, headers: Record<string, string> = {}): Promise<Response> {
  const init: RequestInit = { method, headers };
  if (body !== undefined) {
    init.body = body;
    init.headers = { 'Content-Type': 'application/json', ...headers };
  }
  return onRequest({ request: new Request('https://onlinebeamcalculator.com/api/calculate', init) });
}

const MINIMAL = JSON.stringify({
  length: 6,
  supports: [{ x: 0, type: 'pin' }, { x: 6, type: 'roller' }],
  loads: [{ type: 'point', x: 2, P: 10000 }],
  material: 'steel',
  section: { A: 0.02, I: 6.667e-5, depth: 0.2 },
});

describe('Pages Function wrapper', () => {
  it('POST solves and returns CORS + JSON content type', async () => {
    const res = await req('POST', MINIMAL);
    expect(res.status).toBe(200);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(res.headers.get('Content-Type')).toMatch(/application\/json/);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.results.maxMoment.value).toBeCloseTo(13333.33, 0);
  });

  it('OPTIONS preflight → 204 with CORS', async () => {
    const res = await req('OPTIONS');
    expect(res.status).toBe(204);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(res.headers.get('Allow')).toBe('POST, OPTIONS');
  });

  it('GET → 405 with structured error', async () => {
    const res = await req('GET');
    expect(res.status).toBe(405);
    const json = await res.json();
    expect(json.error.code).toBe('method_not_allowed');
  });

  it('oversized body → 413', async () => {
    const big = JSON.stringify({ length: 6, supports: [{ x: 0, type: 'pin' }], material: 'steel', section: { A: 1, I: 1, depth: 1 }, pad: 'x'.repeat(LIMITS.MAX_BODY_BYTES) });
    const res = await req('POST', big);
    expect(res.status).toBe(413);
    expect((await res.json()).error.code).toBe('request_too_large');
  });

  it('rate limit: >30 requests per 10 s window from one IP → 429 with Retry-After', async () => {
    const headers = { 'CF-Connecting-IP': '203.0.113.7' };
    let last: Response | undefined;
    for (let i = 0; i < 35; i++) last = await req('POST', MINIMAL, headers);
    expect(last!.status).toBe(429);
    expect(Number(last!.headers.get('Retry-After'))).toBeGreaterThan(0);
    expect((await last!.json()).error.code).toBe('rate_limited');
    // a different client is unaffected
    expect((await req('POST', MINIMAL, { 'CF-Connecting-IP': '198.51.100.9' })).status).toBe(200);
  });
});
