/**
 * Benchmark solve() CPU cost at various input sizes, to pick API input caps
 * that stay within the Cloudflare Workers Free plan limit (10 ms CPU/request).
 * Run: npx tsx scripts/bench-solve.ts
 */
import { solve, StabilityError } from '../src/lib/beam/solve';
import type { BeamModel, InternalHinge, Load, Support } from '../src/lib/beam/model';

const STEEL = { id: 'steel', name: 'Steel', E: 200e9, density: 7850 };
const RECT = { id: 'r', name: 'Rect', A: 0.02, I: 6.667e-5, depth: 0.2, cTop: 0.1, cBot: 0.1 };

let n = 0;
const id = () => `b${++n}`;
const sup = (x: number, type: Support['type']): Support => ({ id: id(), x, type });
const hinge = (x: number): InternalHinge => ({ id: id(), x });

function model(length: number, supports: Support[], hinges: InternalHinge[], loads: Load[]): BeamModel {
  return { length, supports, hinges, loads, material: STEEL, section: RECT, selfWeight: false };
}

/** Evenly spread `count` distributed loads over the beam. */
function spreadTraps(count: number, L: number): Load[] {
  const out: Load[] = [];
  for (let i = 0; i < count; i++) {
    const x0 = (L * i) / count + L / (count * 10);
    const x1 = (L * (i + 1)) / count - L / (count * 10);
    out.push({ id: id(), type: 'trapezoid', x1: x0, x2: x1, w1: 1e3, w2: 2e3 });
  }
  return out;
}

function time(fn: () => void, reps: number): number {
  const t0 = performance.now();
  for (let i = 0; i < reps; i++) fn();
  return (performance.now() - t0) / reps;
}

/** Best (minimum) of several rounds — wall-time proxy for per-solve CPU cost. */
function bench(name: string, fn: (m: BeamModel) => unknown, m: BeamModel, reps = 30, rounds = 5): void {
  for (let i = 0; i < 50; i++) fn(m); // JIT warmup
  let best = Infinity;
  for (let r = 0; r < rounds; r++) best = Math.min(best, time(() => fn(m), reps));
  console.log(`${name.padEnd(58)} ${best.toFixed(2)} ms/solve`);
}

const L = 12;
const supportGrid = (n: number): Support[] => [sup(0, 'pin'), ...Array.from({ length: n - 1 }, (_, i) => sup((L * (i + 1)) / n, 'roller'))];

bench('minimal (2 supports, 1 point load)', (m) => solve(m), model(6, [sup(0, 'pin'), sup(6, 'roller')], [], [{ id: id(), type: 'point', x: 2, P: 10e3 }]));
bench('10 trapezoid loads + 4 supports', (m) => solve(m), model(L, [sup(0, 'pin'), sup(4, 'roller'), sup(8, 'roller'), sup(12, 'roller')], [], spreadTraps(10, L)));
bench('25 trapezoid loads + 8 supports', (m) => solve(m), model(L, supportGrid(8), [], spreadTraps(25, L)));
bench('40 trapezoid loads + 12 supports', (m) => solve(m), model(L, supportGrid(12), [], spreadTraps(40, L)));

// Heaviest beam allowed by the API caps: 12 supports, 8 hinges, 40 trapezoid
// loads. Hinges sit midway between adjacent supports (Gerber-style, stable).
const heaviest = model(
  L,
  supportGrid(12),
  Array.from({ length: 8 }, (_, i) => hinge(i + 0.5)),
  spreadTraps(40, L),
);
bench('heaviest allowed (12 sup, 8 hinges, 40 loads)', (m) => solve(m), heaviest);
bench('heaviest allowed, incl. diagram JSON serialization', (m) => {
  const r = solve(m);
  JSON.stringify({ x: r.deflection.x, shear: r.shear.values, moment: r.moment.values, slope: r.slope.values, deflection: r.deflection.values });
}, heaviest);

// Error path cost (unstable beams still assemble + attempt the solve)
const unstable = model(6, [sup(0, 'roller')], [], [{ id: id(), type: 'point', x: 2, P: 10e3 }]);
bench('unstable beam (error path)', (m) => {
  try { solve(m); } catch (e) { if (!(e instanceof StabilityError)) throw e; }
}, unstable);
