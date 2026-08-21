/**
 * Consistent nodal load vectors on a beam element.
 *
 * Solver conventions:
 *   - downward deflection v is positive
 *   - θ = dv/dx
 *   - element DOF order: [v1, θ1, v2, θ2]
 *   - external loads downward positive; applied couples clockwise positive
 *
 * The returned vector f = ∫ Nᵀ q dx is the equivalent nodal load. Assembly
 * ADDS it to the external force vector; post-processing SUBTRACTS it from
 * element end forces (f_end = k·u − f) to recover exact internal actions.
 */

import type { Load } from './model';

const GP_T = [-0.906179845938664, -0.538469310105683, 0, 0.538469310105683, 0.906179845938664];
const GP_W = [0.236926885056189, 0.478628670499366, 0.568888888888889, 0.478628670499366, 0.236926885056189];

/** Hermite shape functions [N1..N4] for v = N·d on element of length L. */
function hermite(L: number, x: number): [number, number, number, number] {
  const t = x / L;
  return [
    1 - 3 * t * t + 2 * t * t * t,
    x * (1 - t) * (1 - t),
    3 * t * t - 2 * t * t * t,
    x * (t * t - t),
  ];
}

/** Hermite derivatives dN/dx. */
function hermiteD(L: number, x: number): [number, number, number, number] {
  const t = x / L;
  return [
    (-6 * t + 6 * t * t) / L,
    1 - 4 * t + 3 * t * t,
    (6 * t - 6 * t * t) / L,
    3 * t * t - 2 * t,
  ];
}

/** ∫ Nᵀ·q dx over [x0, x1] ⊂ [0, L] with 5-pt Gauss; q is a local function. */
function integrateNTq(
  L: number,
  x0: number,
  x1: number,
  q: (x: number) => number,
): [number, number, number, number] {
  const out: [number, number, number, number] = [0, 0, 0, 0];
  const half = (x1 - x0) / 2;
  const mid = (x1 + x0) / 2;
  if (half <= 0) return out;
  for (let g = 0; g < 5; g++) {
    const x = mid + half * GP_T[g];
    const qx = q(x);
    if (qx === 0) continue;
    const w = GP_W[g] * half;
    const N = hermite(L, x);
    for (let i = 0; i < 4; i++) out[i] += w * qx * N[i];
  }
  return out;
}

/**
 * Equivalent nodal load vector for `load` acting on an element spanning
 * global [elX0, elX1]. Returns null if the load does not touch the element.
 */
export function loadOnElement(
  load: Load,
  elX0: number,
  elX1: number,
): [number, number, number, number] | null {
  const L = elX1 - elX0;
  const EPS = 1e-12;

  switch (load.type) {
    case 'point': {
      const a = load.x - elX0;
      if (a < -EPS || a > L + EPS) return null;
      const N = hermite(L, Math.min(Math.max(a, 0), L));
      return [load.P * N[0], load.P * N[1], load.P * N[2], load.P * N[3]];
    }
    case 'moment': {
      const a = load.x - elX0;
      if (a < -EPS || a > L + EPS) return null;
      // Couple M (CW +). With v down and θ=dv/dx, CW rotation is positive θ;
      // a concentrated CW couple contributes f = M · N'(a).
      const dN = hermiteD(L, Math.min(Math.max(a, 0), L));
      return [load.M * dN[0], load.M * dN[1], load.M * dN[2], load.M * dN[3]];
    }
    case 'udl':
    case 'trapezoid': {
      const a = Math.max(Math.min(load.x1, load.x2), elX0);
      const b = Math.min(Math.max(load.x1, load.x2), elX1);
      if (b - a <= EPS) return null;
      const q = (x: number): number => {
        const xg = elX0 + x;
        if (load.type === 'udl') return load.w;
        const t = load.x2 === load.x1 ? 0 : (xg - load.x1) / (load.x2 - load.x1);
        return load.w1 + (load.w2 - load.w1) * t;
      };
      return integrateNTq(L, a - elX0, b - elX0, q);
    }
  }
}
