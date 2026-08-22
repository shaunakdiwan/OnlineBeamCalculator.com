/**
 * Preset beam configurations — one-click examples + SEO landing routes.
 */
import type { BeamModel } from '../beam/model';
import { MATERIALS, makeSection } from '../catalog';
import type { AppState } from './state';
import { uid, defaultModel } from './state';
import { defaultUnits } from '../units';

const steel = MATERIALS[0];
const rect = makeSection({ kind: 'rect', b: 0.1, h: 0.2 });

export interface Preset {
  slug: string;
  name: string;
  description: string;
  build: () => BeamModel;
}

const base = (over: Partial<BeamModel>): BeamModel => ({
  ...defaultModel(),
  material: { ...steel },
  section: { ...rect },
  selfWeight: false,
  ...over,
});

export const PRESETS: Preset[] = [
  {
    slug: 'simply-supported-point',
    name: 'Simply supported — center point load',
    description: 'Pin + roller with a single point load at midspan.',
    build: () => base({
      length: 6,
      supports: [{ id: uid(), x: 0, type: 'pin' }, { id: uid(), x: 6, type: 'roller' }],
      loads: [{ id: uid(), type: 'point', x: 3, P: 20000 }],
    }),
  },
  {
    slug: 'simply-supported-udl',
    name: 'Simply supported — UDL',
    description: 'Classic textbook case: uniform load over the whole span.',
    build: () => base({
      length: 6,
      supports: [{ id: uid(), x: 0, type: 'pin' }, { id: uid(), x: 6, type: 'roller' }],
      loads: [{ id: uid(), type: 'udl', x1: 0, x2: 6, w: 10000 }],
    }),
  },
  {
    slug: 'cantilever-tip-load',
    name: 'Cantilever — tip point load',
    description: 'Fixed at the left end with a point load at the free tip.',
    build: () => base({
      length: 4,
      supports: [{ id: uid(), x: 0, type: 'fixed' }],
      loads: [{ id: uid(), type: 'point', x: 4, P: 15000 }],
    }),
  },
  {
    slug: 'cantilever-udl',
    name: 'Cantilever — UDL',
    description: 'Fixed cantilever under uniform load over its full length.',
    build: () => base({
      length: 4,
      supports: [{ id: uid(), x: 0, type: 'fixed' }],
      loads: [{ id: uid(), type: 'udl', x1: 0, x2: 4, w: 8000 }],
    }),
  },
  {
    slug: 'fixed-fixed-udl',
    name: 'Fixed–fixed — UDL',
    description: 'Fully restrained beam; hogging at ends, sagging at midspan.',
    build: () => base({
      length: 8,
      supports: [{ id: uid(), x: 0, type: 'fixed' }, { id: uid(), x: 8, type: 'fixed' }],
      loads: [{ id: uid(), type: 'udl', x1: 0, x2: 8, w: 10000 }],
    }),
  },
  {
    slug: 'overhanging-beam',
    name: 'Overhanging beam',
    description: 'Two supports with an overhang past the right support.',
    build: () => base({
      length: 10,
      supports: [{ id: uid(), x: 2, type: 'pin' }, { id: uid(), x: 8, type: 'roller' }],
      loads: [{ id: uid(), type: 'udl', x1: 0, x2: 10, w: 6000 }],
    }),
  },
  {
    slug: 'continuous-two-span',
    name: 'Continuous — two spans',
    description: 'Three supports, two equal spans under uniform load.',
    build: () => base({
      length: 12,
      supports: [{ id: uid(), x: 0, type: 'pin' }, { id: uid(), x: 6, type: 'pin' }, { id: uid(), x: 12, type: 'roller' }],
      loads: [{ id: uid(), type: 'udl', x1: 0, x2: 12, w: 10000 }],
    }),
  },
  {
    slug: 'gerber-hinge',
    name: 'Gerber beam with internal hinge',
    description: 'Continuous beam spliced with an internal hinge (M = 0 at hinge).',
    build: () => base({
      length: 14,
      supports: [{ id: uid(), x: 0, type: 'fixed' }, { id: uid(), x: 9, type: 'roller' }, { id: uid(), x: 14, type: 'roller' }],
      hinges: [{ id: uid(), x: 11 }],
      loads: [{ id: uid(), type: 'udl', x1: 0, x2: 14, w: 8000 }],
    }),
  },
];

export function applyPreset(slug: string): AppState | null {
  const p = PRESETS.find((x) => x.slug === slug);
  if (!p) return null;
  return {
    model: p.build(),
    ui: {
      unitSystem: 'metric',
      units: defaultUnits('metric'),
      signConvention: 'sagging-positive',
      selection: { kind: null, id: null },
      showLabels: true,
    },
  };
}
