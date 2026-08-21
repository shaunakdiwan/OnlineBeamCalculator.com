import { describe, it, expect } from 'vitest';
import { toSI, fromSI, formatSI, UNITS, defaultUnits } from '../index';

describe('units', () => {
  it('length round-trips', () => {
    expect(toSI('length', 1, 'ft')).toBeCloseTo(0.3048);
    expect(fromSI('length', 0.3048, 'ft')).toBeCloseTo(1);
    expect(toSI('length', 1000, 'mm')).toBeCloseTo(1);
  });
  it('force: kip = 1000 lb', () => {
    expect(toSI('force', 1, 'kip')).toBeCloseTo(1000 * toSI('force', 1, 'lb'));
  });
  it('pressure: psi and MPa', () => {
    expect(toSI('pressure', 1, 'MPa')).toBeCloseTo(1e6);
    expect(toSI('pressure', 1, 'ksi')).toBeCloseTo(1000 * toSI('pressure', 1, 'psi'));
  });
  it('moment: lb·ft & kN·m', () => {
    expect(fromSI('moment', toSI('moment', 1, 'kipft'), 'kNm')).toBeCloseTo(1.355817, 4);
  });
  it('formats with unit label', () => {
    expect(formatSI('force', 12345, 'kN')).toContain('kN');
  });
  it('every default unit exists in its quantity table', () => {
    for (const sys of ['metric', 'imperial'] as const) {
      const d = defaultUnits(sys);
      for (const q of Object.keys(d) as (keyof typeof UNITS)[]) {
        expect(UNITS[q].some((u) => u.id === d[q])).toBe(true);
        expect(UNITS[q].find((u) => u.id === d[q])!.system).toBe(sys);
      }
    }
  });
});
