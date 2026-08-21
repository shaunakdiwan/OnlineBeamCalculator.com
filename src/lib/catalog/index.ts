import type { Material, Section } from '../beam/model';

/** Predefined materials (SI). */
export const MATERIALS: Material[] = [
  { id: 'steel', name: 'Structural Steel (A36)', E: 200e9, density: 7850, fy: 250e6, nu: 0.3 },
  { id: 'aluminum', name: 'Aluminum (6061-T6)', E: 68.9e9, density: 2700, fy: 276e6, nu: 0.33 },
  { id: 'concrete', name: 'Concrete (f′c 30 MPa)', E: 27e9, density: 2400, fy: 30e6, nu: 0.2 },
  { id: 'timber', name: 'Timber (Douglas Fir)', E: 13e9, density: 530, fy: 30e6, nu: 0.35 },
];

export function customMaterial(E: number, density = 0, fy?: number, nu?: number): Material {
  return { id: 'custom', name: 'Custom material', E, density, fy, nu };
}

/** Parametric section shapes. All dims in metres. */
export type SectionParams =
  | { kind: 'rect'; b: number; h: number }
  | { kind: 'circle'; d: number }
  | { kind: 'hollow-rect'; b: number; h: number; t: number }
  | { kind: 'hollow-circle'; d: number; t: number }
  | { kind: 'i-beam'; h: number; bf: number; tf: number; tw: number }
  | { kind: 'channel'; h: number; bf: number; tf: number; tw: number }
  | { kind: 'custom'; A: number; I: number; depth: number; cTop?: number; cBot?: number };

export function makeSection(params: SectionParams, name?: string): Section {
  switch (params.kind) {
    case 'rect': {
      const { b, h } = params;
      return {
        id: 'rect', name: name ?? `Rect ${fmt(b)}×${fmt(h)}`,
        A: b * h, I: (b * h ** 3) / 12, depth: h, cTop: h / 2, cBot: h / 2,
      };
    }
    case 'circle': {
      const { d } = params;
      return {
        id: 'circle', name: name ?? `Circle Ø${fmt(d)}`,
        A: (Math.PI * d ** 2) / 4, I: (Math.PI * d ** 4) / 64, depth: d, cTop: d / 2, cBot: d / 2,
      };
    }
    case 'hollow-rect': {
      const { b, h, t } = params;
      const bi = b - 2 * t, hi = h - 2 * t;
      return {
        id: 'hollow-rect', name: name ?? `RHS ${fmt(b)}×${fmt(h)}×${fmt(t)}`,
        A: b * h - bi * hi, I: (b * h ** 3 - bi * hi ** 3) / 12, depth: h, cTop: h / 2, cBot: h / 2,
      };
    }
    case 'hollow-circle': {
      const { d, t } = params;
      const di = d - 2 * t;
      return {
        id: 'hollow-circle', name: name ?? `CHS Ø${fmt(d)}×${fmt(t)}`,
        A: (Math.PI * (d ** 2 - di ** 2)) / 4, I: (Math.PI * (d ** 4 - di ** 4)) / 64,
        depth: d, cTop: d / 2, cBot: d / 2,
      };
    }
    case 'i-beam': {
      const { h, bf, tf, tw } = params;
      const hw = h - 2 * tf;
      const A = 2 * bf * tf + hw * tw;
      const I = (bf * h ** 3) / 12 - ((bf - tw) * hw ** 3) / 12;
      return {
        id: 'i-beam', name: name ?? `I ${fmt(h)}×${fmt(bf)}`,
        A, I, depth: h, cTop: h / 2, cBot: h / 2,
      };
    }
    case 'channel': {
      const { h, bf, tf, tw } = params;
      const hw = h - 2 * tf;
      const A = 2 * bf * tf + hw * tw;
      const I = (bf * h ** 3) / 12 - ((bf - tw) * hw ** 3) / 12;
      return {
        id: 'channel', name: name ?? `C ${fmt(h)}×${fmt(bf)}`,
        A, I, depth: h, cTop: h / 2, cBot: h / 2,
      };
    }
    case 'custom': {
      const { A, I, depth } = params;
      const cTop = params.cTop ?? depth / 2;
      const cBot = params.cBot ?? depth / 2;
      return { id: 'custom', name: name ?? 'Custom section', A, I, depth, cTop, cBot };
    }
  }
}

function fmt(x: number): string {
  return `${Math.round(x * 1000)}mm`;
}

/**
 * Curated AISC W-shape subset (~20 common sizes), imperial designation with
 * SI properties.
 * Sources: AISC Shapes Database v15.0 (d, bf, tf, tw, A in², Ix in⁴).
 */
export interface WShape {
  designation: string;
  A: number; // m²
  I: number; // m⁴
  depth: number; // m
}

const IN = 0.0254;
const W = (
  designation: string,
  Ain2: number,
  Ixin4: number,
  din: number,
): WShape => ({
  designation,
  A: Ain2 * IN ** 2,
  I: Ixin4 * IN ** 4,
  depth: din * IN,
});

export const W_SHAPES: WShape[] = [
  W('W4x13', 3.83, 11.3, 4.16),
  W('W5x16', 4.71, 21.4, 5.01),
  W('W6x9', 2.68, 16.4, 5.9),
  W('W6x15', 4.43, 29.1, 5.99),
  W('W8x10', 2.96, 30.8, 7.89),
  W('W8x18', 5.26, 61.9, 8.14),
  W('W8x31', 9.13, 110, 8.0),
  W('W10x12', 3.54, 53.8, 9.87),
  W('W10x22', 6.49, 118, 10.17),
  W('W10x33', 9.71, 170, 9.73),
  W('W12x14', 4.16, 88.6, 11.91),
  W('W12x26', 7.65, 204, 12.22),
  W('W12x40', 11.8, 307, 11.94),
  W('W14x22', 6.49, 199, 13.74),
  W('W14x38', 11.2, 385, 14.1),
  W('W16x26', 7.68, 301, 15.69),
  W('W16x40', 11.8, 518, 16.01),
  W('W18x35', 10.3, 510, 17.7),
  W('W18x55', 16.2, 890, 18.11),
  W('W21x44', 13.0, 843, 20.66),
  W('W24x55', 16.2, 1350, 23.57),
  W('W24x84', 24.7, 2370, 24.1),
];

export function wShapeSection(w: WShape): Section {
  return {
    id: `W:${w.designation}`,
    name: w.designation,
    A: w.A,
    I: w.I,
    depth: w.depth,
    cTop: w.depth / 2,
    cBot: w.depth / 2,
  };
}
