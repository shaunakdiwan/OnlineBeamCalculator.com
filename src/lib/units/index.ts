/**
 * Unit system. SI internal (m, N, N·m, N/m, Pa). All conversion to/from
 * display units happens here and ONLY here.
 */

export type Quantity =
  | 'length'
  | 'force'
  | 'moment'
  | 'distributed' // force per length
  | 'pressure'    // Pa (stress / E)
  | 'density'     // kg/m³
  | 'area'        // m²
  | 'inertia'     // m⁴
  | 'stiffness';  // N/m (spring)

export interface UnitDef {
  id: string;
  label: string;
  system: 'metric' | 'imperial';
  /** Multiply value in this unit by `toSI` to get SI. */
  toSI: number;
}

export const UNITS: Record<Quantity, UnitDef[]> = {
  length: [
    { id: 'mm', label: 'mm', system: 'metric', toSI: 1e-3 },
    { id: 'cm', label: 'cm', system: 'metric', toSI: 1e-2 },
    { id: 'm', label: 'm', system: 'metric', toSI: 1 },
    { id: 'in', label: 'in', system: 'imperial', toSI: 0.0254 },
    { id: 'ft', label: 'ft', system: 'imperial', toSI: 0.3048 },
  ],
  force: [
    { id: 'N', label: 'N', system: 'metric', toSI: 1 },
    { id: 'kN', label: 'kN', system: 'metric', toSI: 1e3 },
    { id: 'lb', label: 'lb', system: 'imperial', toSI: 4.4482216152605 },
    { id: 'kip', label: 'kip', system: 'imperial', toSI: 4448.2216152605 },
  ],
  moment: [
    { id: 'Nmm', label: 'N·mm', system: 'metric', toSI: 1e-3 },
    { id: 'Nm', label: 'N·m', system: 'metric', toSI: 1 },
    { id: 'kNm', label: 'kN·m', system: 'metric', toSI: 1e3 },
    { id: 'lbft', label: 'lb·ft', system: 'imperial', toSI: 1.3558179483314004 },
    { id: 'kipft', label: 'kip·ft', system: 'imperial', toSI: 1355.8179483314004 },
    { id: 'lbin', label: 'lb·in', system: 'imperial', toSI: 0.1129848290276167 },
    { id: 'kipin', label: 'kip·in', system: 'imperial', toSI: 112.9848290276167 },
  ],
  distributed: [
    { id: 'N/m', label: 'N/m', system: 'metric', toSI: 1 },
    { id: 'kN/m', label: 'kN/m', system: 'metric', toSI: 1e3 },
    { id: 'N/mm', label: 'N/mm', system: 'metric', toSI: 1e3 },
    { id: 'lb/ft', label: 'lb/ft', system: 'imperial', toSI: 14.593902937206 },
    { id: 'kip/ft', label: 'kip/ft', system: 'imperial', toSI: 14593.902937206 },
    { id: 'lb/in', label: 'lb/in', system: 'imperial', toSI: 175.12683524648 },
  ],
  pressure: [
    { id: 'Pa', label: 'Pa', system: 'metric', toSI: 1 },
    { id: 'kPa', label: 'kPa', system: 'metric', toSI: 1e3 },
    { id: 'MPa', label: 'MPa', system: 'metric', toSI: 1e6 },
    { id: 'GPa', label: 'GPa', system: 'metric', toSI: 1e9 },
    { id: 'psi', label: 'psi', system: 'imperial', toSI: 6894.757293168 },
    { id: 'ksi', label: 'ksi', system: 'imperial', toSI: 6894757.293168 },
  ],
  density: [
    { id: 'kg/m3', label: 'kg/m³', system: 'metric', toSI: 1 },
    { id: 'lb/ft3', label: 'lb/ft³', system: 'imperial', toSI: 16.01846337396 },
  ],
  area: [
    { id: 'mm2', label: 'mm²', system: 'metric', toSI: 1e-6 },
    { id: 'cm2', label: 'cm²', system: 'metric', toSI: 1e-4 },
    { id: 'm2', label: 'm²', system: 'metric', toSI: 1 },
    { id: 'in2', label: 'in²', system: 'imperial', toSI: 0.0254 ** 2 },
    { id: 'ft2', label: 'ft²', system: 'imperial', toSI: 0.3048 ** 2 },
  ],
  inertia: [
    { id: 'mm4', label: 'mm⁴', system: 'metric', toSI: 1e-12 },
    { id: 'cm4', label: 'cm⁴', system: 'metric', toSI: 1e-8 },
    { id: 'm4', label: 'm⁴', system: 'metric', toSI: 1 },
    { id: 'in4', label: 'in⁴', system: 'imperial', toSI: 0.0254 ** 4 },
    { id: 'ft4', label: 'ft⁴', system: 'imperial', toSI: 0.3048 ** 4 },
  ],
  stiffness: [
    { id: 'N/m', label: 'N/m', system: 'metric', toSI: 1 },
    { id: 'kN/m', label: 'kN/m', system: 'metric', toSI: 1e3 },
    { id: 'kN/mm', label: 'kN/mm', system: 'metric', toSI: 1e6 },
    { id: 'lb/ft', label: 'lb/ft', system: 'imperial', toSI: 14.593902937206 },
    { id: 'kip/in', label: 'kip/in', system: 'imperial', toSI: 175126.83524648 },
  ],
};

/** Default unit per quantity for each overall system. */
export const DEFAULT_UNITS: Record<'metric' | 'imperial', Record<Quantity, string>> = {
  metric: {
    length: 'm',
    force: 'kN',
    moment: 'kNm',
    distributed: 'kN/m',
    pressure: 'MPa',
    density: 'kg/m3',
    area: 'cm2',
    inertia: 'cm4',
    stiffness: 'kN/m',
  },
  imperial: {
    length: 'ft',
    force: 'kip',
    moment: 'kipft',
    distributed: 'kip/ft',
    pressure: 'ksi',
    density: 'lb/ft3',
    area: 'in2',
    inertia: 'in4',
    stiffness: 'kip/in',
  },
};

function findUnit(quantity: Quantity, id: string): UnitDef {
  const u = UNITS[quantity].find((u) => u.id === id);
  if (!u) throw new Error(`Unknown ${quantity} unit: ${id}`);
  return u;
}

/** Convert a value expressed in `unitId` to SI. */
export function toSI(quantity: Quantity, value: number, unitId: string): number {
  return value * findUnit(quantity, unitId).toSI;
}

/** Convert a SI value to `unitId`. */
export function fromSI(quantity: Quantity, siValue: number, unitId: string): number {
  return siValue / findUnit(quantity, unitId).toSI;
}

/** Format a SI value in a chosen unit with sensible precision. */
export function formatSI(
  quantity: Quantity,
  siValue: number,
  unitId: string,
  digits = 4,
): string {
  const v = fromSI(quantity, siValue, unitId);
  if (!Number.isFinite(v)) return 'n/a';
  const av = Math.abs(v);
  let s: string;
  if (av === 0) s = '0';
  else if (av >= 1e6 || av < 1e-3) s = v.toExponential(2);
  else s = Number(v.toPrecision(digits)).toString();
  return `${s} ${findUnit(quantity, unitId).label}`;
}

export interface UnitSelection extends Record<Quantity, string> {}

export function defaultUnits(system: 'metric' | 'imperial'): UnitSelection {
  return { ...DEFAULT_UNITS[system] };
}
