/**
 * Shape of the per-locale copy modules (src/i18n/en.ts, es.ts, ru.ts).
 * Every locale must satisfy LocaleCopy in full: a missing translation fails
 * `astro check`, not just at runtime.
 */

export type Locale = 'en' | 'es' | 'ru';

/** Markup rendered via set:html. Only ever sourced from our own copy modules. */
export type TrustedHtml = string;

export const PRESET_SLUGS = [
  'simply-supported-point',
  'simply-supported-udl',
  'cantilever-tip-load',
  'cantilever-udl',
  'fixed-fixed-udl',
  'overhanging-beam',
  'continuous-two-span',
  'gerber-hinge',
] as const;
export type PresetSlug = (typeof PRESET_SLUGS)[number];

export const VARIANT_SLUGS = [
  'steel-beam-calculator',
  'wood-beam-calculator',
  'ridge-beam-calculator',
  'cantilever-beam-calculator',
  'simply-supported-beam-calculator',
  'simple-beam-calculator',
] as const;
export type VariantSlug = (typeof VARIANT_SLUGS)[number];

export type CalculatorSlug = PresetSlug | VariantSlug;

export interface MetaCopy {
  /** Layout <title> fallback when a page passes no title. */
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string[];
  ogImageAlt: string;
}

export interface ChromeCopy {
  nav: {
    calculator: string;
    formulas: string;
    guide: string;
    faq: string;
    about: string;
    openCalculator: string;
    freeBadge: string;
    toggleTheme: string;
    /** aria-label of the header language switcher. */
    languageLabel: string;
  };
  noscript: string;
  footer: {
    calculatorsHead: string;
    materialsHead: string;
    learnHead: string;
    resourcesHead: string;
    brandHead: string;
    tagline: string;
    runsClientSide: string;
    linkBeamCalculator: string;
    linkSimplySupported: string;
    linkCantilever: string;
    linkContinuous: string;
    linkSteel: string;
    linkWood: string;
    linkRidge: string;
    linkOverhanging: string;
    linkFormulas: string;
    linkSfdBmd: string;
    linkSignConventions: string;
    linkFixedFixed: string;
    linkAbout: string;
    linkContactUs: string;
    linkPrivacyPolicy: string;
    linkTerms: string;
    bottomPrivacy: string;
    bottomTerms: string;
    bottomContact: string;
  };
}

export interface HomeCopy {
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  hero: string;
  s1: { h2: string; p1: string; p2: string };
  s2: {
    h2: string;
    beamTypes: { h3: string; p: string };
    supports: { h3: string; p: string };
    loads: { h3: string; p: string };
  };
  s3: { h2: string; p: string };
  s4: { h2: string; p1: string; p2: string };
  s5: { h2: string; items: string[] };
  s6: { h2: string; p1: string; p2: TrustedHtml };
  faqEyebrow: string;
  faqH2: string;
  /** Visible FAQ; answers may contain inline markup. */
  faqVisible: { q: string; a: TrustedHtml }[];
  /** JSON-LD FAQ; answers are plain text (deliberately longer than visible). */
  faqLd: { q: string; a: string }[];
}

export interface HubCopy {
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  s1: { h2: string; p: string };
  byTypeH2: string;
  /** Labels for the 4 preset links below the variant links, in order: fixed-fixed-udl, overhanging-beam, continuous-two-span, gerber-hinge. */
  byTypeExtra: string[];
  workedH2: string;
  workedIntro: TrustedHtml;
  whichH2: string;
  whichP: TrustedHtml;
}

/** The KaTeX TeX is locale-neutral and lives in FormulasPage.astro; only names/sketches translate. */
export interface FormulasCaseCopy {
  name: string;
  sketch: string;
}

export interface FormulasCopy {
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: TrustedHtml;
  colReactions: string;
  colMoment: string;
  colDeflection: string;
  /** Order must match the shared TeX table in FormulasPage.astro (12 cases). */
  cases: FormulasCaseCopy[];
  liveH2: string;
  liveP: TrustedHtml;
  legend: string;
}

export interface GuideCopy {
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  sfd: { h2: string; p: string };
  bmd: { h2: string; p: string };
  signs: { h2: string; p: string };
  supports: { h2: string; items: TrustedHtml[] };
  method: { h2: string; p: string };
  tryIt: { h2: string; p: TrustedHtml };
  stresses: { h2: string; p: string };
  api: {
    h2: string;
    p: string;
    inputsH3: string;
    inputsList: TrustedHtml[];
    outputsH3: string;
    outputsList: TrustedHtml[];
  };
}

export interface AboutCopy {
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  p1: string;
  p2: string;
  p3: string;
  assumptionsH2: string;
  assumptions: string[];
}

export interface ContactCopy {
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  emailH2: string;
  emailP: TrustedHtml;
  reportH2: string;
  reportIntro: string;
  reportItems: string[];
  reportOutro: string;
  featureH2: string;
  featureP: string;
}

export interface LegalBlock {
  h2: string;
  /** Plain paragraph. */
  p?: string;
  /** List items (plain text). */
  items?: string[];
  /** Paragraph containing inline markup (links). */
  pHtml?: TrustedHtml;
}

export interface LegalCopy {
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  /** "Last updated: …" line under the H1. */
  updated: string;
  blocks: LegalBlock[];
}

export interface CalculatorPresetCopy {
  name: string;
  description: string;
}

export interface CalculatorVariantCopy {
  title: string;
  h1: string;
  description: string;
  intro: string;
}

export interface DeepDiveSection {
  heading: string;
  paragraphs: string[];
}

export interface CalculatorsCopy {
  presets: Record<PresetSlug, CalculatorPresetCopy>;
  variants: Record<VariantSlug, CalculatorVariantCopy>;
  deepDive: Record<CalculatorSlug, DeepDiveSection[]>;
  /**
   * "Related calculators" link labels, keyed by page slug → target slug.
   * Slugs/order come from RELATED_LINKS/DEFAULT_RELATED in lib/ui/presets.ts;
   * completeness is asserted in src/i18n/i18n.test.ts.
   */
  related: Record<string, Record<string, string>>;
  ui: {
    eyebrowVariant: string;
    eyebrowPreset: string;
    /** Sentence appended after the intro paragraph. */
    preloadedNote: string;
    breadcrumbHome: string;
    breadcrumbCalculators: string;
    aboutThisCaseH2: string;
    eulerNote: string;
    formulasLinkText: string;
    relatedH2: string;
    relatedOutro: TrustedHtml;
    /** ` | Free Beam Calculator` appended to preset page titles. */
    presetTitleSuffix: string;
    /** Appended to preset descriptions for the meta description. */
    presetDescSuffix: string;
    faqQuestionVariant: (h1: string) => string;
    faqQuestionPreset: (name: string) => string;
    faqAnswer: string;
  };
}

export interface LocaleCopy {
  meta: MetaCopy;
  chrome: ChromeCopy;
  home: HomeCopy;
  hub: HubCopy;
  formulas: FormulasCopy;
  guide: GuideCopy;
  about: AboutCopy;
  contact: ContactCopy;
  privacy: LegalCopy;
  terms: LegalCopy;
  calculators: CalculatorsCopy;
}
