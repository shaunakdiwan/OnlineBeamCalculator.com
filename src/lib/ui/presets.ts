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
    name: 'Simply supported, center point load',
    description: 'Pin + roller with a single point load at midspan.',
    build: () => base({
      length: 6,
      supports: [{ id: uid(), x: 0, type: 'pin' }, { id: uid(), x: 6, type: 'roller' }],
      loads: [{ id: uid(), type: 'point', x: 3, P: 20000 }],
    }),
  },
  {
    slug: 'simply-supported-udl',
    name: 'Simply supported, UDL',
    description: 'Classic textbook case: uniform load over the whole span.',
    build: () => base({
      length: 6,
      supports: [{ id: uid(), x: 0, type: 'pin' }, { id: uid(), x: 6, type: 'roller' }],
      loads: [{ id: uid(), type: 'udl', x1: 0, x2: 6, w: 10000 }],
    }),
  },
  {
    slug: 'cantilever-tip-load',
    name: 'Cantilever, tip point load',
    description: 'Fixed at the left end with a point load at the free tip.',
    build: () => base({
      length: 4,
      supports: [{ id: uid(), x: 0, type: 'fixed' }],
      loads: [{ id: uid(), type: 'point', x: 4, P: 15000 }],
    }),
  },
  {
    slug: 'cantilever-udl',
    name: 'Cantilever, UDL',
    description: 'Fixed cantilever under uniform load over its full length.',
    build: () => base({
      length: 4,
      supports: [{ id: uid(), x: 0, type: 'fixed' }],
      loads: [{ id: uid(), type: 'udl', x1: 0, x2: 4, w: 8000 }],
    }),
  },
  {
    slug: 'fixed-fixed-udl',
    name: 'Fixed-fixed, UDL',
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
    name: 'Continuous, two spans',
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

/**
 * Related-calculator links for /calculator/[slug] pages.
 * Weighted toward pages already earning impressions in search; /about gets a
 * contextual mention on cantilever-family pages which currently perform.
 */
export const RELATED_LINKS: Record<string, { slug: string; label: string }[]> = {
  'cantilever-beam-calculator': [
    { slug: 'cantilever-udl', label: 'Cantilever beam under uniform load' },
    { slug: 'cantilever-tip-load', label: 'Cantilever with tip point load' },
    { slug: 'steel-beam-calculator', label: 'Steel beam calculator' },
    { slug: 'wood-beam-calculator', label: 'Wood beam calculator' },
  ],
  'cantilever-udl': [
    { slug: 'cantilever-beam-calculator', label: 'Cantilever beam calculator' },
    { slug: 'cantilever-tip-load', label: 'Cantilever with tip point load' },
    { slug: 'fixed-fixed-udl', label: 'Fixed–fixed beam, UDL' },
    { slug: 'simply-supported-udl', label: 'Simply supported beam, UDL' },
  ],
  'cantilever-tip-load': [
    { slug: 'cantilever-beam-calculator', label: 'Cantilever beam calculator' },
    { slug: 'cantilever-udl', label: 'Cantilever with uniform load' },
    { slug: 'simply-supported-point', label: 'Simply supported, center point load' },
    { slug: 'overhanging-beam', label: 'Overhanging beam' },
  ],
  'steel-beam-calculator': [
    { slug: 'simply-supported-beam-calculator', label: 'Simply supported beam calculator' },
    { slug: 'cantilever-beam-calculator', label: 'Cantilever beam calculator' },
    { slug: 'wood-beam-calculator', label: 'Wood beam calculator' },
    { slug: 'ridge-beam-calculator', label: 'Ridge beam calculator' },
  ],
  'wood-beam-calculator': [
    { slug: 'ridge-beam-calculator', label: 'Ridge beam calculator' },
    { slug: 'steel-beam-calculator', label: 'Steel beam calculator' },
    { slug: 'simply-supported-beam-calculator', label: 'Simply supported beam calculator' },
    { slug: 'cantilever-beam-calculator', label: 'Cantilever beam calculator' },
  ],
  'ridge-beam-calculator': [
    { slug: 'wood-beam-calculator', label: 'Wood beam calculator' },
    { slug: 'overhanging-beam', label: 'Overhanging beam' },
    { slug: 'steel-beam-calculator', label: 'Steel beam calculator' },
    { slug: 'simply-supported-beam-calculator', label: 'Simply supported beam calculator' },
  ],
  'simply-supported-beam-calculator': [
    { slug: 'simply-supported-point', label: 'Simply supported, center point load' },
    { slug: 'simply-supported-udl', label: 'Simply supported, uniform load' },
    { slug: 'steel-beam-calculator', label: 'Steel beam calculator' },
    { slug: 'wood-beam-calculator', label: 'Wood beam calculator' },
  ],
  'simple-beam-calculator': [
    { slug: 'simply-supported-beam-calculator', label: 'Simply supported beam calculator' },
    { slug: 'simply-supported-udl', label: 'Simply supported, uniform load' },
    { slug: 'cantilever-beam-calculator', label: 'Cantilever beam calculator' },
    { slug: 'steel-beam-calculator', label: 'Steel beam calculator' },
  ],
};

/** Fallback related links for preset pages without an explicit entry. */
export const DEFAULT_RELATED = (selfSlug: string) =>
  [
    { slug: 'simply-supported-beam-calculator', label: 'Simply supported beam calculator' },
    { slug: 'cantilever-beam-calculator', label: 'Cantilever beam calculator' },
    { slug: 'steel-beam-calculator', label: 'Steel beam calculator' },
    { slug: 'wood-beam-calculator', label: 'Wood beam calculator' },
  ].filter((l) => l.slug !== selfSlug);

/**
 * Keyword-targeted landing pages. Each maps to a preset with tailored
 * title/description copy rendered on /calculator/<slug>.
 */
export interface VariantLanding {
  slug: string;
  presetSlug: string; // which preset to load
  title: string;
  h1: string;
  description: string; // SEO meta
  intro: string;       // visible intro paragraph
}

export const VARIANT_LANDINGS: VariantLanding[] = [
  {
    slug: 'steel-beam-calculator',
    presetSlug: 'simply-supported-udl',
    title: 'Steel Beam Calculator — Free W-Shape Analysis',
    h1: 'Steel beam calculator',
    description: 'Free steel beam calculator with AISC W-shapes, structural steel material presets, instant shear/moment/deflection diagrams and L/240–L/480 serviceability checks.',
    intro: 'Analyze steel beams with real AISC W-shapes (W4 through W24) and structural steel material properties (E = 200 GPa, fy = 250 MPa). Pick a section from the library or enter a custom I, and the solver returns reactions, SFD, BMD, slope, deflection and bending stress instantly.',
  },
  {
    slug: 'wood-beam-calculator',
    presetSlug: 'simply-supported-udl',
    title: 'Wood Beam Calculator — Timber Span Analysis',
    h1: 'Wood beam calculator',
    description: 'Free wood beam calculator for timber framing: rectangular lumber sections, Douglas Fir material preset, deflection limits for L/240, L/360 and L/480.',
    intro: 'Size wood beams and joists with the timber material preset (E = 13 GPa) and a rectangular section matching your nominal lumber size. The deflection badges check the L/240 and L/360 limits commonly used for floors and roofs.',
  },
  {
    slug: 'ridge-beam-calculator',
    presetSlug: 'overhanging-beam',
    title: 'Ridge Beam Calculator — Roof Ridge Sizing',
    h1: 'Ridge beam calculator',
    description: 'Free ridge beam calculator for roof framing: model rafter point loads on a structural ridge beam, check moment, shear and deflection.',
    intro: 'A structural ridge beam carries half the roof load delivered by the rafters as a series of point loads or an equivalent UDL. Set the span between the ridge supports, add the rafter reactions, and check the maximum moment and deflection against your design limits.',
  },
  {
    slug: 'cantilever-beam-calculator',
    presetSlug: 'cantilever-udl',
    title: 'Cantilever Beam Calculator | Free SFD, BMD & Deflection',
    h1: 'Cantilever beam calculator',
    description: 'Free cantilever beam calculator: fixed-end moments, tip deflection, shear and moment diagrams for point loads, moments and distributed loads on cantilevers.',
    intro: 'Cantilevers concentrate everything at the fixed support: the maximum moment and shear both occur at the wall, and deflection grows toward the free tip. This page loads a cantilever preset; extend it with multiple loads, a propped tip or an internal hinge.',
  },
  {
    slug: 'simply-supported-beam-calculator',
    presetSlug: 'simply-supported-point',
    title: 'Simply Supported Beam Calculator — SFD, BMD & Deflection',
    h1: 'Simply supported beam calculator',
    description: 'Free simply supported beam calculator: reactions, shear force and bending moment diagrams, midspan deflection for point loads, UDLs and combined load cases.',
    intro: 'The simply supported beam is the workhorse of structural analysis: a pin and a roller with loads anywhere along the span. Add any combination of point loads, moments and distributed loads and read the reactions and diagrams instantly.',
  },
  {
    slug: 'simple-beam-calculator',
    presetSlug: 'simply-supported-udl',
    title: 'Simple Beam Calculator — Quick Free Analysis',
    h1: 'Simple beam calculator',
    description: 'A simple beam calculator for quick answers: enter span, supports and loads, get reactions, moment, shear and deflection instantly. Free, no signup.',
    intro: 'Sometimes you just need a quick answer: span, load, maximum moment, deflection. This simple beam calculator starts with a uniform load on a pin-and-roller beam. Replace the defaults with your numbers and the diagrams update live.',
  },
];
