/**
 * Public beam-calculation API: request validation, unit conversion, solve and
 * response assembly. Pure logic — no DOM or Workers APIs — so it is unit
 * testable and reused by the thin Pages Function in functions/api/calculate.ts.
 *
 * The request mirrors the calculator's internal beam model
 * (src/lib/beam/model.ts): supports, internal hinges, point/moment/UDL/
 * trapezoid loads, material and section. All inputs are converted to SI,
 * solved by the same `solve()` the UI uses, and results are converted back
 * to the requested units.
 *
 * Sign conventions (same as the calculator's default "sagging-positive"):
 *   - loads: point P and distributed w are DOWNWARD positive; applied
 *     moment M is CLOCKWISE positive
 *   - reactions: R is UPWARD positive; fixing moment M is sagging-positive
 *   - internal moment: sagging positive
 *   - deflection: DOWNWARD negative; slope = d(deflection)/dx [rad]
 */

import { solve, StabilityError, type DiagramSeries, type SolveResult } from '../beam/solve';
import type { BeamModel, InternalHinge, Load, Material, Section, Support, SupportType } from '../beam/model';
import { MATERIALS } from '../catalog';
import { UNITS, toSI, fromSI, type Quantity, type UnitSelection } from '../units';
import { buildCalculatorUrl } from './share';

export const LIMITS = {
  /** Hard byte cap on the request body (enforced via Content-Length in the wrapper). */
  MAX_BODY_BYTES: 65_536,
  MAX_SUPPORTS: 12,
  MAX_HINGES: 8,
  MAX_LOADS: 40,
  /** Matches the calculator's own URL-share sanitizer limit [m]. */
  MAX_LENGTH_SI: 1000,
} as const;

/** Units used for any quantity the request does not override (pure SI). */
export const DEFAULT_SI_UNITS: UnitSelection = {
  length: 'm',
  force: 'N',
  moment: 'Nm',
  distributed: 'N/m',
  pressure: 'Pa',
  density: 'kg/m3',
  area: 'm2',
  inertia: 'm4',
  stiffness: 'N/m',
};

const QUANTITIES = Object.keys(UNITS) as Quantity[];
const SUPPORT_TYPES: SupportType[] = ['pin', 'roller', 'fixed', 'spring'];
const LOAD_TYPES = ['point', 'moment', 'udl', 'trapezoid'] as const;

// ---------- error shape ----------

export interface ApiIssue {
  /** JSON path of the offending field, e.g. "supports[2].x". Empty for the root. */
  path: string;
  message: string;
}

export interface ApiErrorBody {
  code:
    | 'invalid_json'
    | 'invalid_input'
    | 'request_too_large'
    | 'unstable'
    | 'method_not_allowed'
    | 'rate_limited'
    | 'internal_error';
  message: string;
  details?: ApiIssue[];
  retryAfterSeconds?: number;
}

export interface ApiResponse {
  status: number;
  json: unknown;
}

function fail(status: number, code: ApiErrorBody['code'], message: string, details?: ApiIssue[]): ApiResponse {
  const error: ApiErrorBody = details?.length ? { code, message, details } : { code, message };
  return { status, json: { ok: false, error } };
}

// ---------- request normalization ----------

interface NormalizedRequest {
  model: BeamModel;
  units: UnitSelection;
  unitSystem: 'metric' | 'imperial';
  includeDiagrams: boolean;
}

function isNum(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v);
}

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function isStr(v: unknown): v is string {
  return typeof v === 'string';
}

/** Reject keys that are not part of the documented schema (typo guard for API consumers). */
function checkKeys(obj: Record<string, unknown>, allowed: string[], path: string, issues: ApiIssue[]): void {
  for (const key of Object.keys(obj)) {
    if (!allowed.includes(key)) {
      issues.push({ path: path ? `${path}.${key}` : key, message: `Unknown field. Allowed fields: ${allowed.join(', ')}.` });
    }
  }
}

function checkOptionalIdName(obj: Record<string, unknown>, path: string, issues: ApiIssue[]): { id?: string; name?: string } {
  const out: { id?: string; name?: string } = {};
  if (obj.id !== undefined) {
    if (isStr(obj.id)) out.id = obj.id;
    else issues.push({ path: `${path}.id`, message: 'id must be a string.' });
  }
  if (obj.name !== undefined) {
    if (isStr(obj.name)) out.name = obj.name;
    else issues.push({ path: `${path}.name`, message: 'name must be a string.' });
  }
  return out;
}

export function validateRequest(body: unknown): { ok: true; value: NormalizedRequest } | { ok: false; issues: ApiIssue[] } {
  const issues: ApiIssue[] = [];

  if (!isObj(body)) {
    return { ok: false, issues: [{ path: '', message: 'Request body must be a JSON object describing the beam.' }] };
  }
  checkKeys(
    body,
    ['units', 'length', 'supports', 'hinges', 'loads', 'material', 'section', 'selfWeight', 'includeDiagrams'],
    '',
    issues,
  );

  // ---- units (validated first; everything else converts through them) ----
  const units: UnitSelection = { ...DEFAULT_SI_UNITS };
  let unitSystem: 'metric' | 'imperial' = 'metric';
  if (body.units !== undefined) {
    if (!isObj(body.units)) {
      issues.push({ path: 'units', message: `Must be an object mapping quantity to unit id. Valid quantities: ${QUANTITIES.join(', ')}.` });
    } else {
      checkKeys(body.units, QUANTITIES as string[], 'units', issues);
      for (const [key, val] of Object.entries(body.units)) {
        const q = key as Quantity;
        if (!QUANTITIES.includes(q)) continue; // already reported by checkKeys
        if (!isStr(val)) {
          issues.push({ path: `units.${key}`, message: 'Unit id must be a string.' });
          continue;
        }
        const def = UNITS[q].find((d) => d.id === val);
        if (!def) {
          issues.push({ path: `units.${key}`, message: `Unknown unit '${val}'. Valid ${key} units: ${UNITS[q].map((d) => d.id).join(', ')}.` });
          continue;
        }
        units[q] = val;
        if (def.system === 'imperial') unitSystem = 'imperial';
      }
    }
  }
  if (issues.length) return { ok: false, issues };

  /** Convert a user-unit value to SI. Safe: units are fully validated by now. */
  const conv = (q: Quantity, v: number): number => toSI(q, v, units[q]);
  /** Inclusive range check on an SI length, with tolerance for unit round-trip noise. */
  const inBeam = (xSi: number, lengthSi: number): boolean => xSi >= -1e-9 * Math.max(1, lengthSi) && xSi <= lengthSi + 1e-9 * Math.max(1, lengthSi);

  // ---- length ----
  if (!isNum(body.length)) {
    return { ok: false, issues: [...issues, { path: 'length', message: `Required: beam length as a finite number (${units.length}).` }] };
  }
  const lengthSi = conv('length', body.length);
  if (!(lengthSi > 0) || lengthSi > LIMITS.MAX_LENGTH_SI) {
    issues.push({ path: 'length', message: `Beam length must be > 0 and at most ${LIMITS.MAX_LENGTH_SI} m (got ${body.length} ${units.length}).` });
    return { ok: false, issues };
  }

  // ---- supports ----
  const supports: Support[] = [];
  if (!Array.isArray(body.supports)) {
    issues.push({ path: 'supports', message: `Required: array of supports (${SUPPORT_TYPES.join(' | ')}).` });
  } else if (body.supports.length > LIMITS.MAX_SUPPORTS) {
    issues.push({ path: 'supports', message: `Too many supports: at most ${LIMITS.MAX_SUPPORTS} are allowed.` });
  } else {
    body.supports.forEach((raw, i) => {
      const path = `supports[${i}]`;
      if (!isObj(raw)) {
        issues.push({ path, message: 'Each support must be an object.' });
        return;
      }
      checkKeys(raw, ['id', 'x', 'type', 'k', 'settlement'], path, issues);
      if (raw.type !== undefined && !SUPPORT_TYPES.includes(raw.type as SupportType)) {
        issues.push({ path: `${path}.type`, message: `Support type must be one of: ${SUPPORT_TYPES.join(', ')}.` });
        return;
      }
      if (raw.type === undefined) {
        issues.push({ path: `${path}.type`, message: `Required: support type (${SUPPORT_TYPES.join(' | ')}).` });
        return;
      }
      if (!isNum(raw.x)) {
        issues.push({ path: `${path}.x`, message: `Required: support position as a finite number (${units.length}) from the left end.` });
        return;
      }
      const xSi = conv('length', raw.x);
      if (!inBeam(xSi, lengthSi)) {
        issues.push({ path: `${path}.x`, message: `Support position must be within the beam: 0 to ${body.length} ${units.length}.` });
        return;
      }
      const support: Support = { id: isStr(raw.id) ? raw.id : `s${i + 1}`, x: xSi, type: raw.type as SupportType };
      if (raw.k !== undefined) {
        if (raw.type !== 'spring') {
          issues.push({ path: `${path}.k`, message: 'Stiffness k is only valid for spring supports.' });
        } else if (!isNum(raw.k) || !(conv('stiffness', raw.k) > 0)) {
          issues.push({ path: `${path}.k`, message: `Spring stiffness must be a finite number > 0 (${units.stiffness}).` });
        } else {
          support.k = conv('stiffness', raw.k);
        }
      }
      if (raw.settlement !== undefined) {
        if (!isNum(raw.settlement)) {
          issues.push({ path: `${path}.settlement`, message: `Settlement must be a finite number (${units.length}, positive = downward).` });
        } else {
          support.settlement = conv('length', raw.settlement);
        }
      }
      supports.push(support);
    });
  }

  // ---- hinges ----
  const hinges: InternalHinge[] = [];
  if (body.hinges !== undefined) {
    if (!Array.isArray(body.hinges)) {
      issues.push({ path: 'hinges', message: 'hinges must be an array of { x }.' });
    } else if (body.hinges.length > LIMITS.MAX_HINGES) {
      issues.push({ path: 'hinges', message: `Too many internal hinges: at most ${LIMITS.MAX_HINGES} are allowed.` });
    } else {
      body.hinges.forEach((raw, i) => {
        const path = `hinges[${i}]`;
        if (!isObj(raw)) {
          issues.push({ path, message: 'Each hinge must be an object { x }.' });
          return;
        }
        checkKeys(raw, ['id', 'x'], path, issues);
        if (!isNum(raw.x)) {
          issues.push({ path: `${path}.x`, message: `Required: hinge position as a finite number (${units.length}).` });
          return;
        }
        const xSi = conv('length', raw.x);
        if (!(xSi > 0 && xSi < lengthSi)) {
          issues.push({ path: `${path}.x`, message: `Internal hinge must be strictly inside the beam: 0 < x < ${body.length} ${units.length}.` });
          return;
        }
        hinges.push({ id: isStr(raw.id) ? raw.id : `h${i + 1}`, x: xSi });
      });
    }
  }

  // ---- loads ----
  const loads: Load[] = [];
  if (body.loads !== undefined) {
    if (!Array.isArray(body.loads)) {
      issues.push({ path: 'loads', message: 'loads must be an array.' });
    } else if (body.loads.length > LIMITS.MAX_LOADS) {
      issues.push({ path: 'loads', message: `Too many loads: at most ${LIMITS.MAX_LOADS} are allowed.` });
    } else {
      body.loads.forEach((raw, i) => {
        const path = `loads[${i}]`;
        if (!isObj(raw)) {
          issues.push({ path, message: 'Each load must be an object.' });
          return;
        }
        if (raw.type === undefined || !LOAD_TYPES.includes(raw.type as (typeof LOAD_TYPES)[number])) {
          issues.push({ path: `${path}.type`, message: `Load type must be one of: ${LOAD_TYPES.join(', ')}.` });
          return;
        }
        const posError = (field: string): void => {
          issues.push({ path: `${path}.${field}`, message: `Position must be a finite number within the beam: 0 to ${body.length} ${units.length}.` });
        };
        const spanError = (): void => {
          issues.push({ path, message: `Load start must be strictly before its end: 0 ≤ x1 < x2 ≤ ${body.length} ${units.length}.` });
        };
        const id = isStr(raw.id) ? raw.id : `l${i + 1}`;
        switch (raw.type) {
          case 'point': {
            checkKeys(raw, ['id', 'type', 'x', 'P'], path, issues);
            if (!isNum(raw.x)) { posError('x'); break; }
            const xSi = conv('length', raw.x);
            if (!inBeam(xSi, lengthSi)) { posError('x'); break; }
            if (!isNum(raw.P)) {
              issues.push({ path: `${path}.P`, message: `Required: load magnitude as a finite number (${units.force}, positive = downward).` });
              break;
            }
            loads.push({ id, type: 'point', x: xSi, P: conv('force', raw.P) });
            break;
          }
          case 'moment': {
            checkKeys(raw, ['id', 'type', 'x', 'M'], path, issues);
            if (!isNum(raw.x)) { posError('x'); break; }
            const xSi = conv('length', raw.x);
            if (!inBeam(xSi, lengthSi)) { posError('x'); break; }
            if (!isNum(raw.M)) {
              issues.push({ path: `${path}.M`, message: `Required: applied moment as a finite number (${units.moment}, positive = clockwise).` });
              break;
            }
            loads.push({ id, type: 'moment', x: xSi, M: conv('moment', raw.M) });
            break;
          }
          case 'udl':
          case 'trapezoid': {
            const allowed = raw.type === 'udl' ? ['id', 'type', 'x1', 'x2', 'w'] : ['id', 'type', 'x1', 'x2', 'w1', 'w2'];
            checkKeys(raw, allowed, path, issues);
            if (!isNum(raw.x1) || !isNum(raw.x2)) { posError('x1'); posError('x2'); break; }
            const x1 = conv('length', raw.x1);
            const x2 = conv('length', raw.x2);
            if (!inBeam(x1, lengthSi) || !inBeam(x2, lengthSi)) { posError('x1'); posError('x2'); break; }
            if (x1 >= x2) { spanError(); break; }
            if (raw.type === 'udl') {
              if (!isNum(raw.w)) {
                issues.push({ path: `${path}.w`, message: `Required: load intensity as a finite number (${units.distributed}, positive = downward).` });
                break;
              }
              loads.push({ id, type: 'udl', x1, x2, w: conv('distributed', raw.w) });
            } else {
              if (!isNum(raw.w1) || !isNum(raw.w2)) {
                issues.push({ path: `${path}.w1`, message: `Required: intensity at x1 (${units.distributed}).` });
                issues.push({ path: `${path}.w2`, message: `Required: intensity at x2 (${units.distributed}).` });
                break;
              }
              loads.push({ id, type: 'trapezoid', x1, x2, w1: conv('distributed', raw.w1), w2: conv('distributed', raw.w2) });
            }
            break;
          }
        }
      });
    }
  }

  // ---- material ----
  let material: Material | undefined;
  if (isStr(body.material)) {
    const preset = MATERIALS.find((m) => m.id === body.material);
    if (!preset) {
      issues.push({ path: 'material', message: `Unknown material preset '${body.material}'. Valid presets: ${MATERIALS.map((m) => m.id).join(', ')}. Or pass an object with E, density, etc.` });
    } else {
      material = preset;
    }
  } else if (isObj(body.material)) {
    checkKeys(body.material, ['id', 'name', 'E', 'density', 'fy', 'nu'], 'material', issues);
    const { id, name } = checkOptionalIdName(body.material, 'material', issues);
    if (!isNum(body.material.E) || !(conv('pressure', body.material.E as number) > 0)) {
      issues.push({ path: 'material.E', message: `Required: Young's modulus as a finite number > 0 (${units.pressure}).` });
    } else {
      const densitySi = body.material.density === undefined ? 0 : isNum(body.material.density) ? conv('density', body.material.density) : NaN;
      if (!Number.isFinite(densitySi) || densitySi < 0) {
        issues.push({ path: 'material.density', message: `Density must be a finite number ≥ 0 (${units.density}).` });
      } else {
        material = {
          id: id ?? 'custom',
          name: name ?? 'Custom material',
          E: conv('pressure', body.material.E as number),
          density: densitySi,
        };
        if (body.material.fy !== undefined) {
          if (isNum(body.material.fy)) material.fy = conv('pressure', body.material.fy);
          else issues.push({ path: 'material.fy', message: `Yield strength must be a finite number (${units.pressure}).` });
        }
        if (body.material.nu !== undefined) {
          if (isNum(body.material.nu)) material.nu = body.material.nu;
          else issues.push({ path: 'material.nu', message: 'Poisson\'s ratio must be a finite number.' });
        }
      }
    }
  } else {
    issues.push({ path: 'material', message: `Required: material preset id (${MATERIALS.map((m) => m.id).join(' | ')}) or an object with E and optional density/fy/nu.` });
  }

  // ---- section ----
  let section: Section | undefined;
  if (!isObj(body.section)) {
    issues.push({ path: 'section', message: 'Required: section object with A, I, depth (and optional cTop/cBot).' });
  } else {
    checkKeys(body.section, ['id', 'name', 'A', 'I', 'depth', 'cTop', 'cBot'], 'section', issues);
    const { id, name } = checkOptionalIdName(body.section, 'section', issues);
    if (!isNum(body.section.A) || !(conv('area', body.section.A as number) > 0)) {
      issues.push({ path: 'section.A', message: `Required: cross-sectional area as a finite number > 0 (${units.area}).` });
    }
    if (!isNum(body.section.I) || !(conv('inertia', body.section.I as number) > 0)) {
      issues.push({ path: 'section.I', message: `Required: second moment of area as a finite number > 0 (${units.inertia}).` });
    }
    if (!isNum(body.section.depth) || !(conv('length', body.section.depth as number) > 0)) {
      issues.push({ path: 'section.depth', message: `Required: overall depth as a finite number > 0 (${units.length}).` });
    }
    const depthSi = isNum(body.section.depth) ? conv('length', body.section.depth) : NaN;
    let cTop = depthSi / 2;
    let cBot = depthSi / 2;
    if (body.section.cTop !== undefined) {
      if (isNum(body.section.cTop) && conv('length', body.section.cTop) > 0) cTop = conv('length', body.section.cTop);
      else issues.push({ path: 'section.cTop', message: `Distance to top fibre must be a finite number > 0 (${units.length}).` });
    }
    if (body.section.cBot !== undefined) {
      if (isNum(body.section.cBot) && conv('length', body.section.cBot) > 0) cBot = conv('length', body.section.cBot);
      else issues.push({ path: 'section.cBot', message: `Distance to bottom fibre must be a finite number > 0 (${units.length}).` });
    }
    if (issues.every((i) => !i.path.startsWith('section'))) {
      section = {
        id: id ?? 'custom',
        name: name ?? 'Custom section',
        A: conv('area', body.section.A as number),
        I: conv('inertia', body.section.I as number),
        depth: depthSi,
        cTop,
        cBot,
      };
    }
  }

  // ---- selfWeight / includeDiagrams ----
  let selfWeight = false;
  if (body.selfWeight !== undefined) {
    if (typeof body.selfWeight === 'boolean') selfWeight = body.selfWeight;
    else issues.push({ path: 'selfWeight', message: 'selfWeight must be a boolean.' });
  }
  if (selfWeight && material !== undefined && material.density <= 0) {
    issues.push({ path: 'material.density', message: `material.density must be > 0 (${units.density}) when selfWeight is enabled.` });
  }

  let includeDiagrams = true;
  if (body.includeDiagrams !== undefined) {
    if (typeof body.includeDiagrams === 'boolean') includeDiagrams = body.includeDiagrams;
    else issues.push({ path: 'includeDiagrams', message: 'includeDiagrams must be a boolean.' });
  }

  if (issues.length || !material || !section) {
    return { ok: false, issues: issues.length ? issues : [{ path: '', message: 'Invalid request.' }] };
  }

  const model: BeamModel = { length: lengthSi, supports, hinges, loads, material, section, selfWeight };
  return { ok: true, value: { model, units, unitSystem, includeDiagrams } };
}

// ---------- solve + response ----------

/** Largest-magnitude extremum of a diagram series (keeps its sign and position). */
function absMax(s: DiagramSeries): { value: number; x: number } {
  return Math.abs(s.max.value) >= Math.abs(s.min.value) ? s.max : s.min;
}

function allFinite(r: SolveResult): boolean {
  const nums: number[] = [r.shear.max.value, r.shear.min.value, r.moment.max.value, r.moment.min.value, r.deflection.max.value, r.deflection.min.value];
  for (const rx of r.reactions) nums.push(rx.R, rx.M);
  return nums.every(Number.isFinite);
}

export function handleRequest(raw: string): ApiResponse {
  if (raw.length > LIMITS.MAX_BODY_BYTES) {
    return fail(413, 'request_too_large', `Request body exceeds the ${LIMITS.MAX_BODY_BYTES} byte limit.`);
  }
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail(400, 'invalid_json', 'Request body is not valid JSON.');
  }

  const validated = validateRequest(body);
  if (!validated.ok) {
    return fail(422, 'invalid_input', 'The beam description failed validation. Fix the listed fields and retry.', validated.issues);
  }
  const { model, units, unitSystem, includeDiagrams } = validated.value;

  let result: SolveResult;
  try {
    result = solve(model);
  } catch (e) {
    if (e instanceof StabilityError) {
      return fail(422, 'unstable', e.message);
    }
    return fail(500, 'internal_error', 'Unexpected solver error.');
  }
  if (!allFinite(result)) {
    return fail(422, 'unstable', 'The solver produced non-finite results; the structure is likely unstable or ill-conditioned. Add or change supports.');
  }

  const xOut = (x: number): number => fromSI('length', x, units.length);
  const ext = (q: Quantity, e: { value: number; x: number }) => ({
    value: fromSI(q, e.value, units[q]),
    x: xOut(e.x),
  });

  const diagrams = includeDiagrams
    ? {
        x: result.deflection.x.map(xOut),
        shear: result.shear.values.map((v) => fromSI('force', v, units.force)),
        moment: result.moment.values.map((v) => fromSI('moment', v, units.moment)),
        slope: result.slope.values.slice(), // rad
        deflection: result.deflection.values.map((v) => fromSI('length', v, units.length)),
      }
    : undefined;

  const json = {
    ok: true as const,
    units,
    results: {
      reactions: result.reactions.map((r) => ({
        x: xOut(r.x),
        type: r.type,
        R: fromSI('force', -r.R, units.force), // solver is downward-positive; report upward-positive like the UI
        M: fromSI('moment', r.M, units.moment),
      })),
      maxShear: ext('force', absMax(result.shear)),
      maxMoment: ext('moment', absMax(result.moment)),
      maxDeflection: ext('length', absMax(result.deflection)),
      maxBendingStress: {
        top: ext('pressure', result.stress.topMax),
        bottom: ext('pressure', result.stress.botMax),
      },
      maxAvgShearStress: ext('pressure', result.stress.shearAvgMax),
      ...(diagrams ? { diagrams } : {}),
    },
    samples: result.deflection.x.length,
    calculatorUrl: buildCalculatorUrl(model, unitSystem, units),
  };
  return { status: 200, json };
}
