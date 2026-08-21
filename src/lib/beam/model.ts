/**
 * Beam model types. All values in SI base units:
 *   length: m, force: N, moment: N·m, distributed load: N/m,
 *   E: Pa, density: kg/m³, yield: Pa, area: m², I: m⁴, spring k: N/m,
 *   settlement: m.
 */

export type SupportType = 'pin' | 'roller' | 'fixed' | 'spring';

export interface Support {
  id: string;
  /** Position along beam from left end [m] */
  x: number;
  type: SupportType;
  /** Spring stiffness [N/m] — only for type 'spring' */
  k?: number;
  /** Prescribed vertical settlement [m] (positive = downward) */
  settlement?: number;
}

export interface InternalHinge {
  id: string;
  x: number;
}

export type Load =
  | { id: string; type: 'point'; x: number; P: number } // P [N], downward positive
  | { id: string; type: 'moment'; x: number; M: number } // M [N·m], clockwise positive
  | { id: string; type: 'udl'; x1: number; x2: number; w: number } // w [N/m], downward positive
  | { id: string; type: 'trapezoid'; x1: number; x2: number; w1: number; w2: number }; // w(x1)=w1, w(x2)=w2 [N/m]

export interface Material {
  id: string;
  name: string;
  /** Young's modulus [Pa] */
  E: number;
  /** Density [kg/m³] — used for self-weight */
  density: number;
  /** Yield strength [Pa] (optional) */
  fy?: number;
  /** Poisson's ratio (optional, informational) */
  nu?: number;
}

export interface Section {
  id: string;
  name: string;
  /** Cross-sectional area [m²] */
  A: number;
  /** Second moment of area about bending axis [m⁴] */
  I: number;
  /** Overall depth [m] */
  depth: number;
  /** Distance from neutral axis to top fibre [m] */
  cTop: number;
  /** Distance from neutral axis to bottom fibre [m] */
  cBot: number;
}

export interface BeamModel {
  /** Beam length [m] */
  length: number;
  supports: Support[];
  hinges: InternalHinge[];
  loads: Load[];
  material: Material;
  section: Section;
  /** Include self-weight as UDL = A · density · g */
  selfWeight: boolean;
}

export const GRAVITY = 9.80665;
