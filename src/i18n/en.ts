/**
 * English copy module — the canonical source for all page content.
 * Every other locale mirrors this structure; missing keys are a compile error.
 */

import type {
  MetaCopy,
  ChromeCopy,
  HomeCopy,
  HubCopy,
  FormulasCopy,
  GuideCopy,
  AboutCopy,
  ContactCopy,
  LegalCopy,
  CalculatorsCopy,
  LocaleCopy,
  PresetSlug,
  VariantSlug,
  CalculatorSlug,
} from './types';

const meta: MetaCopy = {
  defaultTitle: 'Beam Calculator — Free Online Shear, Moment & Deflection Diagrams',
  defaultDescription:
    'Free online beam calculator for simply supported, cantilever, fixed, overhanging and continuous beams. Instant shear force, bending moment & deflection diagrams. No signup, no limits.',
  defaultKeywords: [
    'beam calculator',
    'free beam calculator',
    'online beam calculator',
    'beam calculator online',
    'steel beam calculator',
    'wood beam calculator',
    'cantilever beam calculator',
    'simply supported beam calculator',
    'ridge beam calculator',
    'simple beam calculator',
  ],
  ogImageAlt: 'Online Beam Calculator: free shear, moment and deflection diagrams',
};

const chrome: ChromeCopy = {
  nav: {
    calculator: 'Calculator',
    formulas: 'Formulas',
    guide: 'Guide',
    faq: 'FAQ',
    about: 'About',
    openCalculator: 'Open calculator',
    freeBadge: '100% FREE',
    toggleTheme: 'Toggle dark mode',
    languageLabel: 'Language',
  },
  noscript:
    'The beam calculator needs JavaScript to run because all analysis happens in your browser. Please enable JavaScript and reload.',
  footer: {
    calculatorsHead: 'Calculators',
    materialsHead: 'Materials',
    learnHead: 'Learn',
    resourcesHead: 'Resources',
    brandHead: 'OnlineBeamCalculator.com',
    tagline: 'Free structural beam analysis in your browser. No account, no limits, no install.',
    runsClientSide: 'Runs 100% client-side',
    linkBeamCalculator: 'Beam calculator',
    linkSimplySupported: 'Simply supported beams',
    linkCantilever: 'Cantilever beams',
    linkContinuous: 'Continuous beams',
    linkSteel: 'Steel beams',
    linkWood: 'Wood beams',
    linkRidge: 'Ridge beams',
    linkOverhanging: 'Overhanging beams',
    linkFormulas: 'Beam formulas',
    linkSfdBmd: 'Reading SFD & BMD',
    linkSignConventions: 'Sign conventions',
    linkFixedFixed: 'Fixed–fixed beam',
    linkAbout: 'About',
    linkContactUs: 'Contact us',
    linkPrivacyPolicy: 'Privacy policy',
    linkTerms: 'Terms & conditions',
    bottomPrivacy: 'Privacy',
    bottomTerms: 'Terms',
    bottomContact: 'Contact',
  },
};

const home: HomeCopy = {
  title: 'Beam Calculator — Free Online Shear, Moment & Deflection',
  description:
    'Free beam calculator: analyze simply supported, cantilever and continuous beams online. Instant SFD, BMD, slope & deflection diagrams. No signup.',
  eyebrow: 'Free · No signup · Runs in your browser',
  h1: 'Beam Calculator',
  hero:
    'Analyze simply supported, cantilever, fixed, overhanging and continuous beams online. Get instant shear force, bending moment, slope and deflection diagrams with reactions, stresses and deflection-limit checks.',
  s1: {
    h2: 'A free online beam calculator that works like a real tool',
    p1:
      'This beam calculator is built for engineers, students, fabricators and DIY builders who need fast, accurate structural answers without installing software or creating an account. It runs a complete Euler–Bernoulli finite-element solver directly in your browser, so results appear instantly as you type. There are no load limits, no locked features, and no signup form: open the page and analyze.',
    p2:
      'Whether you call it a simple beam calculator, an online beam calculator, or a structural analysis tool, the workflow is the same: set a beam length, place supports, add loads, and read the diagrams. The drag-and-drop canvas lets you move supports and loads like a real editor, and every change re-solves in under a millisecond.',
  },
  s2: {
    h2: 'What this beam calculator can analyze',
    beamTypes: {
      h3: 'Beam types',
      p: 'Simply supported beams, cantilevers, fixed–fixed beams, propped cantilevers, overhanging beams, multi-span continuous beams, and Gerber beams with internal hinges (moment releases). If you are searching for a cantilever beam calculator or a simply supported beam calculator, those configurations are one click away in the examples menu.',
    },
    supports: {
      h3: 'Supports and connections',
      p: 'Pin, roller, fixed and spring supports can be placed anywhere along the beam, including at overhangs. Spring stiffness is fully adjustable, and you can prescribe support settlement to study differential settlement effects. Internal hinges create true moment releases between spans, which is essential for modeling Gerber girders.',
    },
    loads: {
      h3: 'Loads',
      p: 'Add unlimited loads: concentrated point loads, applied moments, uniform distributed loads, triangular loads, and general linearly varying (trapezoidal) loads with independent start and end intensities. Loads can start and end anywhere on the beam, and a self-weight toggle automatically applies the beam\'s weight as a distributed load from the section area and material density.',
    },
  },
  s3: {
    h2: 'A steel beam calculator and a wood beam calculator in one',
    p: 'Material and section libraries make this tool equally useful as a steel beam calculator and a wood beam calculator. Presets include structural steel (A36), aluminum (6061-T6), concrete and timber, each with realistic Young\'s modulus, density and yield strength. The section library covers rectangles, hollow sections, circles, I-beams, channels, and a curated set of common AISC W-shapes, and you can always enter a custom area and moment of inertia by hand. For ridge beam sizing in roof framing, model the ridge as a simply supported or overhanging timber beam with rafter point loads: the calculator reports reactions, maximum moment and deflection so you can compare the result to allowable-span tables.',
  },
  s4: {
    h2: 'Results you can actually use',
    p1: 'A results dashboard surfaces the maximum shear, maximum moment, maximum deflection and maximum bending stress with the exact location of each, so you never have to hunt through a chart. Below it, interactive shear force, bending moment, slope and deflection diagrams let you hover or tap to read values at any point along the span. Deflection-limit badges check your beam against the common L/240, L/360 and L/480 serviceability limits automatically.',
    p2: 'Everything is built for real workflows: full metric and imperial unit systems with granular unit pickers (mm, cm, m, in, ft; N, kN, lb, kip; Pa, MPa, GPa, psi, ksi), a sign-convention toggle, undo and redo, shareable links that encode the entire model in the URL, CSV export of all diagram data, and a print-optimized report you can save as PDF.',
  },
  s5: {
    h2: 'How to use the beam calculator',
    items: [
      'Set the beam length and pick a preset from the examples menu, or start from scratch.',
      'Click the beam to add supports and hinges; drag glyphs to reposition them.',
      'Add loads from the input panel: point loads, moments, UDLs, triangular or trapezoidal loads.',
      'Choose a material and cross-section, or enter custom properties.',
      'Read reactions and maximum values from the dashboard; hover the diagrams to query any point.',
      'Share the link, download the CSV, or print the report for your records.',
    ],
  },
  s6: {
    h2: 'Why engineers choose this free beam calculator',
    p1:
      'Most free tools cap the number of loads, hide deflection results behind a paywall, or push you into a signup funnel. This one does not. It handles statically indeterminate structures, continuous spans, spring supports, internal hinges and support settlement for free, and it keeps your data private because every calculation happens locally on your device. Bookmark it, share it, and use it as your everyday online beam calculator.',
    p2:
      'Looking for theory? The <a class="text-link hover:underline" href="/formulas">beam formulas</a> page lists closed-form reactions, moments and deflections for the standard cases, and the <a class="text-link hover:underline" href="/guide"> guide</a> explains how to read shear and moment diagrams. Our methods and assumptions are documented on the <a class="text-link hover:underline" href="/about">about page</a>. Ready to start? <a class="text-link hover:underline" href="/calculator">Open the calculator</a>.',
  },
  faqEyebrow: 'Common questions',
  faqH2: 'Frequently asked questions',
  faqVisible: [
    {
      q: 'What is a beam calculator?',
      a: 'A beam calculator computes reactions, shear force, bending moment, slope and deflection for a beam under given supports and loads. This tool uses an exact finite-element method and returns piecewise-exact diagrams.',
    },
    {
      q: 'Is this beam calculator really free?',
      a: 'Yes: unlimited loads, unlimited spans, all materials and sections, export and printing. No account is ever required.',
    },
    {
      q: 'Can I use it as a wood or steel beam calculator?',
      a: 'Yes. Pick steel, aluminum, concrete or timber presets, or enter a custom modulus. W-shapes are included for steel, and rectangular sections cover typical lumber sizes.',
    },
    {
      q: 'Which beam types are supported?',
      a: 'Simply supported, cantilever, fixed–fixed, propped cantilever, overhanging, continuous multi-span and Gerber beams with internal hinges, plus spring supports and settlement.',
    },
    {
      q: 'Can I share or save my model?',
      a: 'Yes. The model is encoded in the URL, so copying the link shares the exact beam. Your last model is also auto-saved in the browser.',
    },
    {
      q: 'How do I calculate the load on a beam?',
      a: 'Add up every load the beam carries: dead loads (self-weight of the beam, floor, roof, finishes), live loads (occupancy, snow, furniture), and concentrated loads from walls or equipment. Multiply floor loads in kN/m² by the tributary width to get a line load in kN/m, then enter it here. The calculator returns reactions and internal shear and moment along the span.',
    },
    {
      q: 'What is the formula for beam calculation?',
      a: 'For a simply supported beam with a central point load: R = P/2, M<sub>max</sub> = PL/4, δ<sub>max</sub> = PL³/(48EI). With a uniform load w: R = wL/2, M<sub>max</sub> = wL²/8, δ<sub>max</sub> = 5wL⁴/(384EI). Cantilever with tip load: M_max = PL at the wall, δ_tip = PL³/(3EI). Full reference on the <a class="text-link hover:underline" href="/formulas">formulas page</a>.',
    },
    {
      q: 'How do I calculate how much weight a beam can hold?',
      a: 'Run two checks and take the lower answer. Strength: keep bending stress σ = M·c/I below the allowable stress (yield ÷ safety factor). Serviceability: keep deflection δ<sub>max</sub> ≤ L/360 (or L/240). Enter your section, read M_max and δ_max from the dashboard, and compare σ_max to the material\'s allowable stress.',
    },
    {
      q: 'How do I calculate structural load capacity?',
      a: 'Capacity combines bending, shear and deflection. Bending: the largest P such that M_max ≤ f<sub>y</sub>·I/c. Shear: V_max ≤ τ_allow·A. Deflection: choose E·I so δ_max ≤ L/limit. This tool reports all three with locations, so each check is a direct read-off; code design (AISC, NDS, Eurocode) additionally applies resistance factors.',
    },
  ],
  faqLd: [
    {
      q: 'What is a beam calculator?',
      a: 'A beam calculator is a structural analysis tool that computes reactions, shear force, bending moment, slope and deflection for a beam under given supports and loads. This free online beam calculator uses an exact Euler–Bernoulli finite-element solver that runs entirely in your browser.',
    },
    {
      q: 'Is this beam calculator really free?',
      a: 'Yes. Unlimited loads, unlimited spans, all section libraries, CSV export and print reports are completely free with no signup, no trial and no paywall.',
    },
    {
      q: 'Can I use it as a wood beam calculator or steel beam calculator?',
      a: 'Yes. Pick from preset materials including structural steel, aluminum, concrete and timber, or enter a custom Young\'s modulus. A library of common AISC W-shapes is included for steel design, and rectangular sections work for wood beams.',
    },
    {
      q: 'Which beam types does it support?',
      a: 'Simply supported, cantilever, fixed–fixed, propped cantilever, overhanging, continuous multi-span beams, and Gerber beams with internal hinges. Spring supports and support settlement are also supported.',
    },
    {
      q: 'Can I share or save my beam model?',
      a: 'Yes. The entire model is serialized into the URL, so you can copy the link to share the exact beam with a colleague, or bookmark it. Your last model is also auto-saved locally in your browser.',
    },
    {
      q: 'How do I calculate the load on a beam?',
      a: 'Tally every force the beam must carry: dead loads (self-weight of the beam, floor, roof, finishes), live loads (occupancy, snow, furniture), and any concentrated loads from walls, columns or equipment resting on it. Multiply floor loads in kN/m² by the tributary width to get a line load (UDL) in kN/m, then enter those loads here. The calculator returns reactions and internal shear/moment along the span.',
    },
    {
      q: 'What is the formula for beam calculation?',
      a: 'For a simply supported beam with a central point load: reactions R = P/2, maximum moment M = PL/4 at midspan, and maximum deflection δ = PL³/(48EI). With a uniform load w: R = wL/2, M = wL²/8, δ = 5wL⁴/(384EI). Cantilever with tip load: M = PL at the wall, δ = PL³/(3EI). The full formula table is on the /formulas page.',
    },
    {
      q: 'How do I calculate how much weight a beam can hold?',
      a: 'Capacity is governed by the lower of a strength check and a serviceability check. Strength: require σ = M·c/I ≤ fy (bending stress below yield, with safety factor). Serviceability: require δmax ≤ L/360 (or L/240) so the beam does not sag visibly or crack finishes. Model your section here, read M_max and δ_max, and compare against the material\'s allowable stress.',
    },
    {
      q: 'How do I calculate structural load capacity?',
      a: 'Structural capacity combines bending strength, shear strength and deflection. Bending: allowable load P such that M_max ≤ fy·I/c. Shear: V_max ≤ τ_allow·A. Deflection: choose E·I so δ_max ≤ L/limit. This tool reports M_max, V_max and δ_max with their locations so you can run each check directly; designing to a code (AISC, NDS, Eurocode) additionally applies safety and resistance factors.',
    },
  ],
};

const hub: HubCopy = {
  title: 'Online Beam Calculator | SFD, BMD & Deflection',
  description:
    'Free online beam calculator: analyze simply supported, cantilever, and continuous beams with instant SFD, BMD and deflection diagrams.',
  keywords: ['online beam calculator', 'beam calculator online', 'free beam calculator', 'beam calculator free'],
  h1: 'Online beam calculator',
  s1: {
    h2: 'Every beam case, one directory',
    p: 'The tool above starts blank. If your problem matches a standard configuration, the calculators below load it pre-configured: just swap in your span, loads and section. All of them are the same free tool running in your browser, with the same reactions, shear force and bending moment diagrams, slope, deflection curves and stress checks.',
  },
  byTypeH2: 'Calculators by beam type',
  byTypeExtra: [
    'Fixed–fixed beam, UDL',
    'Overhanging beam',
    'Continuous beam, two spans',
    'Gerber beam with internal hinge',
  ],
  workedH2: 'Worked examples',
  workedIntro:
    'Standard textbook cases, ready to run and compare against the closed-form answers on the <a class="text-link hover:underline" href="/formulas"> beam formulas</a> page.',
  whichH2: 'Which calculator do I need?',
  whichP:
    'For floor and roof framing in timber, start with the <a class="text-link hover:underline" href="/calculator/wood-beam-calculator"> wood beam calculator</a>. For structural steel with AISC W-shapes, use the <a class="text-link hover:underline" href="/calculator/steel-beam-calculator"> steel beam calculator</a>. For rafters bearing on a structural ridge, the <a class="text-link hover:underline" href="/calculator/ridge-beam-calculator"> ridge beam calculator</a> models rafter reactions as point loads. For beams running over three or more supports, start from the <a class="text-link hover:underline" href="/calculator/continuous-two-span">continuous two-span</a> example. Background reading: the <a class="text-link hover:underline" href="/guide">SFD & BMD guide</a> explains how to read the output, and the <a class="text-link hover:underline" href="/about">about page</a> covers the tool\'s assumptions and limitations.',
};

const formulas: FormulasCopy = {
  title: 'Beam Formulas | Reactions, Moments & Deflections',
  description:
    'Closed-form beam formulas: reactions, maximum moment and deflection for simply supported, cantilever, fixed–fixed and continuous beams.',
  eyebrow: 'Reference',
  h1: 'Beam formulas',
  intro:
    'Closed-form reactions, maximum moments and maximum deflections for the standard beam cases. Every case below can be loaded interactively in the <a class="text-link hover:underline" href="/calculator">calculator</a>.',
  colReactions: 'Reactions',
  colMoment: 'Bending moment',
  colDeflection: 'Deflection',
  cases: [
    {
      name: 'Simply supported, center point load P',
      sketch: 'Pin A, roller B; P at x = L/2',
    },
    {
      name: 'Simply supported, point load P at x = a',
      sketch: 'Pin A, roller B; P at distance a from A (b = L − a)',
    },
    {
      name: 'Simply supported, UDL w (whole span)',
      sketch: 'Pin A, roller B, uniform w',
    },
    {
      name: 'Simply supported, applied moment M₀ at x = a',
      sketch: 'Concentrated couple',
    },
    {
      name: 'Cantilever, tip point load P',
      sketch: 'Fixed at A; P at free tip',
    },
    {
      name: 'Cantilever, UDL w (whole length)',
      sketch: 'Fixed at A, uniform w',
    },
    {
      name: 'Cantilever, triangular load (0 at tip → w at wall)',
      sketch: 'Linearly increasing toward the wall',
    },
    {
      name: 'Propped cantilever, UDL w',
      sketch: 'Fixed at A, roller at B',
    },
    {
      name: 'Fixed–fixed, UDL w',
      sketch: 'Both ends fixed',
    },
    {
      name: 'Fixed–fixed, center point P',
      sketch: 'Both ends fixed; P at L/2',
    },
    {
      name: 'Two equal spans, UDL w on both',
      sketch: 'Pins at A, B, C; each span L',
    },
    {
      name: 'Overhanging (symmetric), UDL w',
      sketch: 'Supports at distance a from each end, total length L',
    },
  ],
  liveH2: 'Check a formula live',
  liveP:
    'Every closed-form answer above has a matching interactive case. Verify the numbers yourself: <a class="text-link hover:underline" href="/calculator/cantilever-udl">cantilever under uniform load</a>, <a class="text-link hover:underline" href="/calculator/cantilever-tip-load">cantilever with tip load</a>, <a class="text-link hover:underline" href="/calculator/simply-supported-udl">simply supported with UDL</a>, <a class="text-link hover:underline" href="/calculator/fixed-fixed-udl">fixed–fixed with UDL</a>, or the <a class="text-link hover:underline" href="/calculator/continuous-two-span">two-span continuous beam</a>. The full directory is on the <a class="text-link hover:underline" href="/calculator">calculators page</a>.',
  legend:
    'P point load · w distributed load per unit length · L span · E Young\'s modulus · I second moment of area. Sagging moments positive; downward deflections positive-plotted.',
};

const guide: GuideCopy = {
  title: 'Guide | Reading SFD & BMD, Sign Conventions',
  description:
    'How to read shear force and bending moment diagrams, sign conventions, and how the calculator works.',
  eyebrow: 'Guide',
  h1: 'How beam analysis works',
  sfd: {
    h2: 'Shear force diagram (SFD)',
    p: 'The shear force V(x) at a section is the algebraic sum of vertical forces to one side of the cut. Downward point loads cause downward jumps; support reactions cause upward jumps; distributed loads create sloped lines (the slope equals −w). Crossings through zero mark potential extrema of the bending moment.',
  },
  bmd: {
    h2: 'Bending moment diagram (BMD)',
    p: 'The bending moment M(x) is the area under the shear curve: M(x) = M(0) + ∫V dx. Curved sagging segments appear under UDLs (parabolas), straight lines under point loads, and applied couples cause instantaneous jumps. Interior hinges force M = 0 at the hinge position.',
  },
  signs: {
    h2: 'Sign conventions',
    p: 'This calculator defaults to the <strong>sagging-positive</strong> convention: a moment that sags the beam (smile shape) is positive; downward deflection is plotted downward (negative). You can flip the moment/shear sign convention with the toggle under the results. Applied couples are clockwise-positive in inputs.',
  },
  supports: {
    h2: 'Supports',
    items: [
      '<strong>Pin:</strong> restrains vertical translation; free to rotate.',
      '<strong>Roller:</strong> same as pin in this 2D vertical model; free horizontal.',
      '<strong>Fixed:</strong> restrains translation and rotation (adds a fixing moment reaction).',
      '<strong>Spring:</strong> vertical spring with stiffness k; the reaction equals k × settlement-adjusted deflection.',
      '<strong>Internal hinge:</strong> releases the moment, so rotation is discontinuous across the hinge.',
    ],
  },
  method: {
    h2: 'Method',
    p: 'The engine is a classical Euler–Bernoulli finite-element solver: two degrees of freedom per node (v, θ), exact Hermitian beam elements, consistent nodal loads for distributed loads, and piecewise-exact post-processing. Solve time is under a millisecond for typical models and everything runs locally in your browser: nothing is sent to a server.',
  },
  tryIt: {
    h2: 'Try it on a real case',
    p: 'The fastest way to internalize these diagrams is to build a case and watch them change. Start with the <a class="text-link hover:underline" href="/calculator/cantilever-udl">cantilever under uniform load</a> to see the classic linear shear and parabolic moment, or the <a class="text-link hover:underline" href="/calculator/cantilever-beam-calculator">cantilever beam calculator</a> for tip loads and moments. For full background on the tool\'s assumptions, see the <a class="text-link hover:underline" href="/about">about page</a>.',
  },
  stresses: {
    h2: 'Stresses and serviceability',
    p: 'Bending stress is computed as σ = M·c/I separately for the top and bottom fibres (cTop, cBot may differ for asymmetric sections). Average shear stress is V/A: a coarse check; webs of I-sections carry significantly higher peak shear. Deflection badges compare against the common serviceability limits L/240, L/360 and L/480.',
  },
};

const about: AboutCopy = {
  title: 'About: Free Beam Calculator',
  description:
    'Why this calculator exists: unlimited spans, springs, hinges, trapezoid loads and instant diagrams: 100% free with no account.',
  eyebrow: 'About',
  h1: 'A beam calculator that stays out of your way',
  p1:
    'OnlineBeamCalculator.com is a free structural analysis tool for engineers, students and builders. It runs an exact finite-element beam solver entirely in your browser: no account, no upload, no server, no cost.',
  p2:
    'It supports unlimited spans, pin/roller/fixed/spring supports, internal hinges (moment releases), point loads, moments, uniform and linearly varying (trapezoidal) distributed loads, self-weight, prescribed support settlement, and full metric/imperial unit switching with granular unit pickers.',
  p3:
    'Results include reactions, shear/moment/slope/deflection diagrams with point queries, max/min values with locations, bending and average shear stress, and deflection serviceability checks (L/240, L/360, L/480). Everything can be exported as CSV or printed as a report, and models can be shared via a link: no login ever required.',
  assumptionsH2: 'Assumptions & limitations',
  assumptions: [
    'Euler–Bernoulli beam theory (plane sections remain plane; shear deformation neglected).',
    'Linear-elastic, prismatic section over the whole beam (stepped sections are not yet supported).',
    '2D vertical bending only; no axial/torsional analysis.',
    'Average shear stress V/A only; for local web shear checks use a code-based design tool.',
    'Results are for analysis aid only; verify critical designs against applicable codes of practice.',
  ],
};

const contact: ContactCopy = {
  title: 'Contact Us | OnlineBeamCalculator.com',
  description:
    'Get in touch with OnlineBeamCalculator.com: bug reports, feature requests and general questions about the free beam calculator.',
  eyebrow: 'Contact',
  h1: 'Contact us',
  intro:
    'Feedback, bug reports and feature requests shape this tool. If a result looks off, a load case misbehaves, or you are missing a feature you need, we want to hear about it.',
  emailH2: 'Email',
  emailP:
    'Reach us at <a class="text-link hover:underline" href="mailto:support@onlinebeamcalculator.com">support@onlinebeamcalculator.com</a>. We aim to reply within a few working days.',
  reportH2: 'Reporting a wrong result',
  reportIntro: 'The fastest way to get a bug fixed is to include:',
  reportItems: [
    'The share link of the model (use the copy-link button in the calculator; the full model is encoded in the URL).',
    'What you expected to see, and what the tool reported.',
    'Your browser and operating system, if the issue looks visual.',
  ],
  reportOutro:
    'Because everything runs client-side, the share link is usually all we need to reproduce the problem exactly.',
  featureH2: 'Feature requests',
  featureP:
    'Stepped sections, more load types, additional serviceability checks, exports: tell us what would make the tool more useful in your workflow and it will be considered for a future version.',
};

const privacy: LegalCopy = {
  title: 'Privacy Policy | OnlineBeamCalculator.com',
  description:
    'Privacy policy for OnlineBeamCalculator.com: a fully client-side beam calculator. No account, no tracking of your calculations, no data uploaded to a server.',
  eyebrow: 'Legal',
  h1: 'Privacy Policy',
  updated: 'Last updated: August 22, 2026',
  blocks: [
    {
      h2: 'The short version',
      p: 'OnlineBeamCalculator.com runs entirely in your browser. Your beam models, loads, units and results never leave your device. We do not have accounts, we do not store your calculations on a server, and there is nothing to opt out of because nothing is collected in the first place.',
    },
    {
      h2: 'What we do not collect',
      items: [
        'No personal information such as names, email addresses or account credentials (registration does not exist on this site).',
        'No calculation data. All structural analysis is computed locally by JavaScript running in your browser. Nothing you enter into the calculator is transmitted to us.',
        'No advertising or behavioural tracking cookies.',
      ],
    },
    {
      h2: 'Local storage',
      p: 'The site stores a small number of preferences in your browser\'s local storage, such as your theme choice (light or dark) and unit preferences, so they persist between visits. This data stays on your device, is never sent to us, and can be cleared at any time through your browser settings.',
    },
    {
      h2: 'Shared links',
      p: 'When you share a model via a link, the full model configuration is encoded in the URL itself. Whoever opens the link decodes it locally in their own browser. The link content is not stored in any database operated by us.',
    },
    {
      h2: 'Hosting and logs',
      p: 'The site is served as static files through a content delivery network (currently Cloudflare Pages). Like any web host, the CDN may process standard technical data (IP address, user agent, requested URL) in short-lived server logs to deliver pages and protect against abuse. We do not access, combine or retain these logs for profiling.',
    },
    {
      h2: 'Third-party services',
      pHtml:
        'Fonts are bundled with the site and served from the same origin. We use Google Analytics (GA4) to understand aggregate site usage such as page views and referrers; this involves a script from googletagmanager.com and standard GA cookies. We do not embed advertising networks or social media trackers, and your calculation inputs are never sent to Google or anyone else.',
    },
    {
      h2: 'Children',
      p: 'The site is an engineering tool directed at a general technical audience. It does not knowingly collect personal information from anyone, including children under 13.',
    },
    {
      h2: 'Changes to this policy',
      p: 'If we change how the site handles data, we will update this page and revise the date above. Material changes will be noted on the site.',
    },
    {
      h2: 'Contact',
      pHtml: 'Questions about this policy: see the <a class="text-link hover:underline" href="/contact">contact page</a>.',
    },
  ],
};

const terms: LegalCopy = {
  title: 'Terms & Conditions | OnlineBeamCalculator.com',
  description: 'Terms and conditions for using OnlineBeamCalculator.com, the free browser-based beam analysis tool.',
  eyebrow: 'Legal',
  h1: 'Terms & Conditions',
  updated: 'Last updated: August 22, 2026',
  blocks: [
    {
      h2: 'Acceptance of terms',
      p: 'By accessing or using OnlineBeamCalculator.com, you agree to these terms. If you do not agree, please do not use the site.',
    },
    {
      h2: 'The service',
      p: 'OnlineBeamCalculator.com provides a free, browser-based structural beam analysis tool. The service is provided as-is and free of charge, with no account or registration required.',
    },
    {
      h2: 'Not engineering advice',
      p: 'Results produced by this tool are analysis aids only. They do not constitute professional engineering advice, design certification or approval for construction. You are responsible for verifying all results against applicable building codes, standards of practice and your own professional judgement. Critical designs should be reviewed by a qualified and licensed structural engineer.',
    },
    {
      h2: 'Accuracy and limitations',
      p: 'The solver uses Euler-Bernoulli beam theory under the assumptions stated on the <a class="text-link hover:underline" href="/about">about page</a>. While we validate results against closed-form solutions, we do not warrant that output is error-free or suitable for any particular purpose.',
    },
    {
      h2: 'Acceptable use',
      items: [
        'Use the tool for lawful personal, educational and commercial engineering work.',
        'Do not attempt to disrupt, overload or probe the site or its hosting infrastructure.',
        'Do not misrepresent results generated by this tool as certified engineering work.',
      ],
    },
    {
      h2: 'Intellectual property',
      p: 'The site\'s design, code and content are owned by OnlineBeamCalculator.com. You retain full ownership of the models you create and the results you generate; export and share them as you wish.',
    },
    {
      h2: 'Limitation of liability',
      p: 'To the maximum extent permitted by law, OnlineBeamCalculator.com and its operators accept no liability for any direct, indirect, incidental or consequential loss arising from use of the site or reliance on its output, including but not limited to structural failure, cost overruns or project delays.',
    },
    {
      h2: 'Availability',
      p: 'We may modify, suspend or discontinue any part of the site at any time without notice. Because the calculator runs fully client-side, you can also save and share models as links independent of our continued operation.',
    },
    {
      h2: 'Governing terms',
      p: 'These terms are governed by the laws applicable in the operator\'s jurisdiction, without regard to conflict-of-law rules. If any clause is found unenforceable, the remainder stays in effect.',
    },
    {
      h2: 'Contact',
      pHtml: 'Questions about these terms: see the <a class="text-link hover:underline" href="/contact">contact page</a>.',
    },
  ],
};

const calculators: CalculatorsCopy = {
  presets: {
    'simply-supported-point': {
      name: 'Simply supported, center point load',
      description: 'Pin at A, roller at B, point load P at midspan.',
    },
    'simply-supported-udl': {
      name: 'Simply supported, uniform load',
      description: 'Pin at A, roller at B, uniform distributed load w over full span.',
    },
    'cantilever-tip-load': {
      name: 'Cantilever, tip point load',
      description: 'Fixed at A, point load P at the free tip.',
    },
    'cantilever-udl': {
      name: 'Cantilever, uniform load',
      description: 'Fixed at A, uniform distributed load w over full length.',
    },
    'fixed-fixed-udl': {
      name: 'Fixed–fixed, uniform load',
      description: 'Both ends fixed, uniform distributed load w over full span.',
    },
    'overhanging-beam': {
      name: 'Overhanging beam, uniform load',
      description: 'Supports near ends, uniform load w over full length with overhangs.',
    },
    'continuous-two-span': {
      name: 'Continuous, two equal spans UDL',
      description: 'Pins at A, B, C; uniform load w on both spans.',
    },
    'gerber-hinge': {
      name: 'Gerber beam with internal hinge',
      description: 'Two spans with an internal hinge releasing moment at the junction.',
    },
  } as Record<PresetSlug, { name: string; description: string }>,
  variants: {
    'steel-beam-calculator': {
      title: 'Steel Beam Calculator',
      h1: 'Steel beam calculator',
      description:
        'Analyze steel beams with AISC W-shapes. Preset structural steel (A36, E = 200 GPa, fy = 250 MPa) and a library of common W-sections with real area and moment of inertia.',
      intro:
        'Pick a W-shape, set your span and loads, and read instant reactions, shear/moment diagrams, deflection curves and stress checks. Toggle self-weight, switch metric/imperial units, export CSV or print a report.',
    },
    'wood-beam-calculator': {
      title: 'Wood Beam Calculator',
      h1: 'Wood beam calculator',
      description:
        'Analyze timber beams with rectangular sections and realistic material properties. Preset timber (E = 11 GPa, density 500 kg/m³) or enter custom values for glulam, LVL or dimensional lumber.',
      intro:
        'Enter beam depth and width, set spans and loads (point, UDL, trapezoidal), and get reactions, diagrams, deflection and serviceability checks against L/360 and L/240.',
    },
    'ridge-beam-calculator': {
      title: 'Ridge Beam Calculator',
      h1: 'Ridge beam calculator',
      description:
        'Size a structural ridge beam for roof framing. Model the ridge as a simply supported or overhanging beam with rafter point loads applied at regular spacing.',
      intro:
        'Set the span, rafter spacing and roof loads (dead + live + snow). The calculator converts rafter reactions to point loads on the ridge and reports reactions, maximum moment, deflection and stress.',
    },
    'cantilever-beam-calculator': {
      title: 'Cantilever Beam Calculator',
      h1: 'Cantilever beam calculator',
      description:
        'Analyze cantilever beams with tip loads, moments, uniform and triangular distributed loads, spring supports and self-weight.',
      intro:
        'Fixed at one end, free at the other. Add any combination of loads, choose a section, and read wall reaction, fixing moment, tip deflection and stress. Compare against the closed-form formulas on the formulas page.',
    },
    'simply-supported-beam-calculator': {
      title: 'Simply Supported Beam Calculator',
      h1: 'Simply supported beam calculator',
      description:
        'Analyze simply supported beams with any combination of point loads, moments, uniform and trapezoidal loads, spring supports and self-weight.',
      intro:
        'Pin at one end, roller at the other. Set loads anywhere along the span, pick a material and section, and get reactions, shear/moment diagrams, deflection and stress. Ideal for floor beams, joists and purlins.',
    },
    'simple-beam-calculator': {
      title: 'Simple Beam Calculator',
      h1: 'Simple beam calculator',
      description:
        'A streamlined simply supported beam calculator with a minimal input set: span, load and section. For quick checks when you don\'t need the full feature set.',
      intro:
        'Enter the span, a single uniform or point load, and a rectangular or I-section. Instant reactions, M_max, δ_max and stress. Good for textbook problems and quick sizing.',
    },
  } as Record<VariantSlug, { title: string; h1: string; description: string; intro: string }>,
  deepDive: {
    'steel-beam-calculator': [
      {
        heading: 'How to use this steel beam calculator',
        paragraphs: [
          'Start with the pre-loaded simply supported beam, then set your real span between supports. Replace the uniform load with your own line load in kN/m (multiply your floor or roof area load in kN/m² by the tributary width), or swap it for point loads at the exact positions where other beams or columns bear on this one.',
          'Open the section library and pick a W-shape from the AISC list: W4 through W24 sections carry their real area and moment of inertia, so the deflection and bending stress results match published steel properties. The material preset uses structural steel with E = 200 GPa and fy = 250 MPa; switch to a custom modulus only if you are working with a different alloy.',
        ],
      },
      {
        heading: 'Reading the results for a steel design check',
        paragraphs: [
          'For a quick strength check, compare the reported maximum bending stress against the yield strength divided by your safety factor; a common allowable-stress approach keeps the working stress under roughly 0.6 × fy. For serviceability, watch the deflection badges: L/360 keeps brittle finishes safe on floors, and L/240 is the common roof limit.',
          'If the beam fails serviceability but passes strength, choose a deeper W-shape: deflection scales with 1/I, and deeper sections gain moment of inertia much faster than weight. Export the CSV or print the report to attach a record of the load case to your calc package.',
        ],
      },
      {
        heading: 'Common steel beam mistakes this tool helps you catch',
        paragraphs: [
          'Forgetting self-weight is the classic error; toggle self-weight on and the section\'s mass becomes a uniform load automatically. Another is underestimating tributary width, which matters more than the area load itself. And when a steel beam sits over three or more posts, it must be modelled as continuous rather than as a series of simply supported spans: the hogging moment over the middle support changes the design.',
        ],
      },
    ],
    'wood-beam-calculator': [
      {
        heading: 'How to use this wood beam calculator',
        paragraphs: [
          'Start with the pre-loaded simply supported beam and enter your actual span. Replace the uniform load with the line load your floor or roof applies: multiply the area load in psf (or kN/m²) by the joist/rafter spacing to get plf (or kN/m). For ridge beams, enter the rafter reactions as point loads at the correct spacing.',
          'The material preset uses timber with E = 11 GPa, density 500 kg/m³, and fy = 28 MPa; switch to a custom modulus for glulam (typically 12–14 GPa), LVL (13–14 GPa), or a specific species. Rectangular sections are entered by depth and width; the calculator derives area and I automatically.',
        ],
      },
      {
        heading: 'Reading the results for a wood design check',
        paragraphs: [
          'For a quick check, compare the reported maximum bending stress against the allowable bending stress F_b from your grade stamp or the NDS supplement. For serviceability, the L/360 badge keeps floors stiff enough for tile/gypsum, and L/240 is the common roof limit. Deflection is often the governing limit for wood, not bending stress.',
          'If the beam fails serviceability, increase the depth: deflection scales with 1/d³ (since I = bd³/12), so a 2× depth increase cuts deflection by 8× with only 2× the material. The print report includes the section properties for your calc package.',
        ],
      },
      {
        heading: 'Common wood beam mistakes this tool helps you catch',
        paragraphs: [
          'Using nominal lumber dimensions instead of actual (a 2×12 is 1.5″ × 11.25″) overestimates capacity significantly. Forgetting to model the ridge as overhanging when it projects past the wall underestimates the end moment. And modeling a multi-support ridge as a series of simply supported spans misses the negative moment over the interior posts — use the continuous calculator instead.',
        ],
      },
    ],
    'ridge-beam-calculator': [
      {
        heading: 'How to use this ridge beam calculator',
        paragraphs: [
          'Model the ridge as simply supported (if bearing on walls at both ends) or overhanging (if it projects past a gable end). Enter the rafter spacing, roof span, and the total design load (dead + live + snow) in psf or kPa. The calculator converts this to point loads at each rafter position: load per rafter = area_load × spacing × span / 2.',
          'Pick a timber section (rectangular) or enter a custom I and area. The material preset is timber at E = 11 GPa; upgrade to glulam/LVL by entering the manufacturer\'s modulus. Self-weight adds the ridge\'s own weight as a small UDL automatically.',
        ],
      },
      {
        heading: 'Reading the results for a ridge beam design',
        paragraphs: [
          'The dashboard shows the maximum moment (typically at midspan for a simply supported ridge, or over the interior support for an overhanging ridge) and maximum deflection. Compare bending stress against F_b from the NDS or the product\'s design values. Check deflection against L/240 for roofs; L/360 if the ridge supports a finished ceiling below.',
          'If the ridge is continuous over three or more supports, switch to the continuous two-span calculator and add more supports as needed — the negative moment over the middle support is typically the design driver.',
        ],
      },
      {
        heading: 'Common ridge beam mistakes this tool helps you catch',
        paragraphs: [
          'Applying the total roof load as a UDL instead of point loads at rafter spacing overestimates the moment (a UDL on a simply supported beam gives wL²/8, but discrete point loads produce lower midspan moment for the same total load). Forgetting snow drift or unbalanced load cases when the ridge spans different roof areas. And using a simply supported model when the ridge is actually continuous over interior posts.',
        ],
      },
    ],
    'cantilever-beam-calculator': [
      {
        heading: 'How to use this cantilever beam calculator',
        paragraphs: [
          'The preset is a fixed-left cantilever. Set the length, then add loads: tip point load, tip moment, uniform load, triangular load, or any combination. Drag loads to reposition them. The section library includes rectangles, hollow sections, and I-beams; materials include steel, aluminum, concrete and timber.',
          'Self-weight toggles the beam\'s own weight as a UDL from the section area and material density. Spring supports can be added along the length to model elastic foundations or partial fixity.',
        ],
      },
      {
        heading: 'Reading the results for a cantilever design',
        paragraphs: [
          'The wall reaction force and wall fixing moment are exactly what the bracket, weld or embedment must resist. The tip deflection against L/180 is the common serviceability check; note that for the same total load, a tip load deflects 8/3 times more than a uniform load, so converting a spread-out load into a single tip value is conservative by a wide margin but useful as a bound.',
          'Bending stress is reported at the wall (maximum) and at any load point. Average shear stress is V/A at the wall; for I-sections the web shear is higher — use a code-based tool for detailed web checks.',
        ],
      },
      {
        heading: 'Common cantilever mistakes this tool helps you catch',
        paragraphs: [
          'Modelling a genuinely distributed load as a tip load "to be safe" is defensible for a bound but can hide where the real maximum stress sits when the load actually spreads over the member. The reverse is the dangerous one: modelling a concentrated load as an equivalent UDL halves the apparent wall moment and is unconservative. Second error: applying the tip-deflection formula to a load that is not at the tip; the closed form changes, and dragging the load in the calculator shows the corrected value instantly.',
        ],
      },
    ],
    'simply-supported-beam-calculator': [
      {
        heading: 'How to use this simply supported beam calculator',
        paragraphs: [
          'The preset is pin at A, roller at B. Set the span, then add any combination of point loads, applied moments, uniform loads, triangular loads and trapezoidal loads at any position. Spring supports can be placed anywhere, including at overhangs, to model elastic bearings.',
          'Material and section presets cover steel, aluminum, concrete and timber; enter custom A and I for non-standard sections. Self-weight adds the beam weight as a UDL automatically.',
        ],
      },
      {
        heading: 'Reading the results for a simply supported design',
        paragraphs: [
          'Reactions at A and B are the support loads for your connection design. The maximum moment (with location) drives the section modulus check: σ = M·c/I. The maximum deflection (with location) drives the serviceability check against L/360 or L/240. The diagrams are piecewise-exact — hover to read V and M at any point.',
          'For a beam with overhangs, the maximum positive moment may be in the span and the maximum negative moment at the support; both are reported. Export the CSV for the full V/M/θ/δ tables if you need to feed them into a spreadsheet.',
        ],
      },
      {
        heading: 'Common simply supported mistakes this tool helps you catch',
        paragraphs: [
          'Forgetting that an overhanging beam with a load on the overhang produces negative moment at the support (hogging), which may require top-flange bracing or a larger section. Underestimating tributary area when converting area loads to line loads. And assuming a multi-span beam can be analysed as independent simply supported spans — the interior support moments are not zero, and the continuous calculator must be used.',
        ],
      },
    ],
    'simple-beam-calculator': [
      {
        heading: 'How to use this simple beam calculator',
        paragraphs: [
          'This is the minimal simply supported case: one span, one load (UDL or center point load), one rectangular or I-section. Enter the span, the load, and the section dimensions (or pick an I-shape). No support positioning, no spring supports, no self-weight toggle — just the textbook case.',
        ],
      },
      {
        heading: 'When this is the right tool (and when it isn\'t)',
        paragraphs: [
          'Use it for quick sizing: "what depth of W-shape do I need for a 20 ft span with 2 klf UDL?" Compare the reported M_max and δ_max against the allowable stress and L/360. For anything more complex (multiple loads, overhangs, spring supports, continuous spans, cantilevers, internal hinges), use the full calculator at /calculator.',
        ],
      },
      {
        heading: 'Limitations',
        paragraphs: [
          'No self-weight, no overhangs, no spring supports, no internal hinges, no continuous spans. Results are the exact closed-form textbook answers for the single-load case, which match the full solver when only one load is present. For anything else, the full calculator is the correct tool.',
        ],
      },
    ],
    'simply-supported-point': [
      {
        heading: 'How to analyze a simply supported beam with a center point load',
        paragraphs: [
          'This page pre-loads a configured model in the beam calculator. Edit positions and magnitudes directly, or drag elements on the diagram. Results update instantly in your browser.',
          'The classic textbook case: reactions R = P/2 at each support, maximum moment M = PL/4 at midspan, maximum deflection δ = PL³/(48EI) at midspan. Shear is constant at P/2 between the support and the load, then jumps to −P/2.',
        ],
      },
      {
        heading: 'What to watch for with center point loads',
        paragraphs: [
          'Real loads are rarely exactly at midspan. Drag the load off-center and watch the reactions shift (R_A = P·b/L, R_B = P·a/L) and the maximum moment move to the load point (M_max = P·a·b/L). The deflection curve becomes asymmetric — the maximum is no longer at midspan.',
          'If you have multiple point loads, superposition applies: add the moments and deflections from each load. The calculator does this automatically when you add multiple loads, so you don\'t need to do the math by hand.',
        ],
      },
      {
        heading: 'Related calculators',
        paragraphs: [
          'Compare with the <a class="text-link hover:underline" href="/calculator/simply-supported-udl">simply supported UDL</a> case (wL²/8 vs PL/4 for the same total load: a center point load gives 2× the moment of a UDL with the same total load). For steel beams, start with the <a class="text-link hover:underline" href="/calculator/steel-beam-calculator">steel beam calculator</a> and pick a W-shape from the library.',
        ],
      },
    ],
    'simply-supported-udl': [
      {
        heading: 'How to analyze a simply supported beam with uniform load',
        paragraphs: [
          'This page pre-loads a simply supported beam with a uniform distributed load over the full span. Edit the span, load intensity, or section directly in the calculator. Results update instantly.',
          'Textbook values: reactions R = wL/2, M_max = wL²/8 at midspan, δ_max = 5wL⁴/(384EI) at midspan. Shear diagram is linear from +wL/2 to −wL/2; moment diagram is parabolic.',
        ],
      },
      {
        heading: 'What to watch for with uniform loads',
        paragraphs: [
          'A partial UDL (not covering the full span) produces different reactions and a piecewise moment diagram with a flatter top. Drag the load ends to model partial coverage — the calculator handles this exactly. For a roof beam, the UDL is typically the tributary area load × spacing; make sure you\'re not double-counting self-weight (toggle it separately).',
          'Compare with the <a class="text-link hover:underline" href="/calculator/simply-supported-point">center point load</a> case: for the same total load (wL = P), the UDL gives half the midspan moment and 5/8 the midspan deflection. A UDL is always less demanding than a center point load for the same total load.',
        ],
      },
      {
        heading: 'Related calculators',
        paragraphs: [
          'For a beam with both point and distributed loads, use the full <a class="text-link hover:underline" href="/calculator/simply-supported-beam-calculator">simply supported beam calculator</a>. For continuous spans, the <a class="text-link hover:underline" href="/calculator/continuous-two-span">two-span continuous</a> case shows how the interior support moment changes the design.',
        ],
      },
    ],
    'cantilever-udl': [
      {
        heading: 'How to analyze a cantilever with uniform load',
        paragraphs: [
          'This page pre-loads a fixed-left cantilever with a uniform distributed load over the full length. Edit length, load, section or material directly. Results update instantly.',
          'Textbook values: wall reaction R = wL, wall moment M = wL²/2, tip deflection δ = wL⁴/(8EI). Shear is constant at wL; moment diagram is parabolic from 0 at the tip to wL²/2 at the wall.',
        ],
      },
      {
        heading: 'What to watch for with uniform cantilever loads',
        paragraphs: [
          'A cantilever with the same total load as a tip load (wL = P) produces half the wall moment (wL²/2 vs PL) and 3/8 the tip deflection (wL⁴/8EI vs PL³/3EI = wL⁴/3EI). So a tip load is a much more conservative bound than a UDL for the same total load.',
          'If the load is triangular (0 at tip, w at wall), the wall moment drops to wL²/6 and tip deflection to wL⁴/30EI — the triangular case is less demanding than both. The calculator lets you drag the load shape to see the transition.',
        ],
      },
      {
        heading: 'Related calculators',
        paragraphs: [
          'Compare with the <a class="text-link hover:underline" href="/calculator/cantilever-tip-load">cantilever tip load</a> case. For a cantilever with multiple loads or a spring support, use the full <a class="text-link hover:underline" href="/calculator/cantilever-beam-calculator">cantilever beam calculator</a>.',
        ],
      },
    ],
    'cantilever-tip-load': [
      {
        heading: 'How to analyze a cantilever with a tip point load',
        paragraphs: [
          'This page pre-loads a fixed-left cantilever with a point load at the free tip. Edit the length, load magnitude, section or material directly in the calculator. Results update instantly.',
          'Textbook values: wall reaction R = P, wall moment M = PL, tip deflection δ = PL³/(3EI). Shear is constant at P along the full length; moment diagram is linear from 0 at the tip to PL at the wall.',
        ],
      },
      {
        heading: 'What to watch for with tip loads',
        paragraphs: [
          'The numbers to read are the wall reaction force and wall fixing moment — together they are exactly what the bracket, weld or embedment must resist. Tip deflection against L/180 is the serviceability check; note that for the same total load, a tip load deflects 8/3 times more than a uniform load, so converting a spread-out load into a single tip value is conservative by a wide margin but useful as a bound.',
          'Drag the load inward along the beam and both the wall moment and tip deflection fall linearly and cubically respectively; a load at three-quarters length already halves the wall moment demand. That sensitivity is worth exploiting when you can position a bracket load close to its support.',
        ],
      },
      {
        heading: 'Common mistakes with this case',
        paragraphs: [
          'Modelling a genuinely distributed load as a tip load "to be safe" is defensible for a bound but can hide where the real maximum stress sits when the load actually spreads over the member. The reverse is the dangerous one: modelling a concentrated load as an equivalent UDL halves the apparent wall moment and is unconservative. Second error: applying the tip-deflection formula to a load that is not at the tip; the closed form changes, and dragging the load in the calculator shows the corrected value instantly.',
        ],
      },
    ],
    'fixed-fixed-udl': [
      {
        heading: 'How to analyze a fixed–fixed beam with uniform load',
        paragraphs: [
          'This page pre-loads a beam fixed at both ends with a uniform distributed load over the full span. Edit the span, load, section or material directly. Results update instantly.',
          'Textbook values: reactions R = wL/2 at each end, fixed-end moments M = wL²/12 (hogging, negative), midspan moment M = wL²/24 (sagging, positive), midspan deflection δ = wL⁴/(384EI). The moment diagram is parabolic with hogging at the supports and sagging at midspan.',
        ],
      },
      {
        heading: 'What to watch for with fixed–fixed beams',
        paragraphs: [
          'The support moments (wL²/12) are larger in magnitude than the midspan moment (wL²/24). The design is typically governed by the negative moment at the supports — the top flange is in compression there, so lateral-torsional bracing of the top flange is critical.',
          'If the fixity is not perfect (real connections have some flexibility), the actual moments fall between the fixed–fixed and simply supported cases. The full calculator lets you model spring rotational supports to study this.',
        ],
      },
      {
        heading: 'Related calculators',
        paragraphs: [
          'Compare with the <a class="text-link hover:underline" href="/calculator/simply-supported-udl">simply supported UDL</a> (no fixity moments, 5× the midspan deflection). For a fixed–fixed beam with a center point load, the full calculator can model it: add a point load at midspan and fixed supports at both ends.',
        ],
      },
    ],
    'overhanging-beam': [
      {
        heading: 'How to analyze an overhanging beam with uniform load',
        paragraphs: [
          'This page pre-loads a symmetric overhanging beam: supports at distance a from each end, uniform load w over the full length L. Edit a, L, w, section or material directly. Results update instantly.',
          'Reactions are symmetric: R = wL/2 at each support. The moment at the supports is M = −w·a²/2 (hogging). The maximum positive moment in the span depends on a/L; for small overhangs it\'s near midspan, for large overhangs it moves toward the supports.',
        ],
      },
      {
        heading: 'What to watch for with overhanging beams',
        paragraphs: [
          'The support moment is the design driver for small overhangs (it\'s the connection/embedment moment). For large overhangs, the span moment can exceed the support moment. The calculator reports both so you can check both locations.',
          'Asymmetric overhangs (different a on each side) produce asymmetric reactions and moments — the full calculator handles this: add supports at arbitrary positions and a full-span UDL.',
        ],
      },
      {
        heading: 'Related calculators',
        paragraphs: [
          'For a non-symmetric overhang or multiple loads, use the full <a class="text-link hover:underline" href="/calculator/overhanging-beam">overhanging beam calculator</a> (the variant landing). The <a class="text-link hover:underline" href="/calculator/continuous-two-span">continuous two-span</a> case is the natural extension when the overhang is supported at its tip, making it a three-span continuous beam.',
        ],
      },
    ],
    'continuous-two-span': [
      {
        heading: 'How to analyze a continuous beam with two equal spans',
        paragraphs: [
          'This page pre-loads a two-span continuous beam: pins at A, B, C; each span length L; uniform load w on both spans. Edit L, w, section or material directly. Results update instantly.',
          'Textbook values: reactions R_A = R_C = 3wL/8, R_B = 10wL/8; hogging moment over B: M = wL²/8; maximum sagging moment in each span: M = 9wL²/128 at x = 5L/8 from the outer support; deflection ≈ 0.0054 wL⁴/EI per span.',
        ],
      },
      {
        heading: 'What to watch for with continuous beams',
        paragraphs: [
          'The interior support B carries 1.25× the total load of one span (10/8 vs 8/8 for a simple support), and the hogging moment over B (wL²/8) is larger in magnitude than the midspan moment of a simply supported beam (wL²/8 vs wL²/8 — equal here, but for unequal spans the interior moment dominates).',
          'The midspan positive moment (9wL²/128 ≈ 0.07 wL²) is smaller than the simply supported midspan moment (wL²/8 = 0.125 wL²) because the continuity restrains the deflection. This is why continuous beams are more efficient: lower midspan moment for the same span.',
        ],
      },
      {
        heading: 'Common mistakes with continuous beams',
        paragraphs: [
          'Analysing a continuous beam as a series of simply supported spans misses the hogging moment over the interior support — the connection and top flange bracing there are critical. Assuming the interior support reaction is just wL (it\'s 1.25 wL here, and can be higher with unequal spans). Forgetting that support settlement at an interior support significantly redistributes moments — the calculator supports prescribed settlement to study this.',
        ],
      },
    ],
    'gerber-hinge': [
      {
        heading: 'How to analyze a Gerber beam with an internal hinge',
        paragraphs: [
          'This page pre-loads a two-span beam with an internal hinge at the junction (moment release). The left span is fixed at A, hinged at B; the right span is hinged at B, roller at C. Uniform load w on both spans. Edit spans, load, section or material directly.',
          'The hinge forces M = 0 at B. The left span is a propped cantilever: reaction at B is 3wL/8, moment at A is wL²/8. The right span is a simply supported beam: reaction at C is 5wL/8. The hinge carries shear but no moment.',
        ],
      },
      {
        heading: 'Why use a Gerber beam',
        paragraphs: [
          'A Gerber beam converts a statically indeterminate continuous beam into a statically determinate system by inserting a hinge. This simplifies construction (no moment connection at the hinge) and eliminates moment redistribution from support settlement. The trade-off: the left span\'s fixed end still attracts a large moment, and the hinge detail must transfer shear reliably.',
          'The hinge location is typically chosen so the maximum positive moment in each span is balanced (here at midspan of the right span and at x ≈ 0.578L of the left span). The calculator lets you move the hinge to find the optimal position.',
        ],
      },
      {
        heading: 'Common mistakes with Gerber beams',
        paragraphs: [
          'Forgetting that the hinge must be a true moment release — a partial connection that transmits some moment defeats the purpose and creates an indeterminate system that behaves differently. Not checking the shear capacity at the hinge: it carries the full span shear. And assuming the spans can be designed independently — the hinge shear is the same on both sides, so the connection must be designed for the larger of the two span shears.',
        ],
      },
    ],
  } as Record<CalculatorSlug, { heading: string; paragraphs: string[] }[]>,
  related: {} as Record<string, Record<string, string>>,
  ui: {
    eyebrowVariant: 'Calculators by beam type',
    eyebrowPreset: 'Worked examples',
    preloadedNote:
      'The calculator below is pre-loaded; change anything and results update instantly.',
    breadcrumbHome: 'Home',
    breadcrumbCalculators: 'Calculators',
    aboutThisCaseH2: 'About this case',
    eulerNote:
      'All diagrams use the Euler–Bernoulli beam theory with an exact finite-element solver that runs entirely in your browser. You can move supports by dragging them, switch unit systems at the top of the input panel, and export results as CSV or a printable report.',
    formulasLinkText: 'See closed-form formulas for this and similar cases →',
    relatedH2: 'Related calculators',
    relatedOutro:
      'New to shear and moment diagrams? Start with the <a class="text-link hover:underline" href="/guide"> SFD & BMD guide</a>, or read <a class="text-link hover:underline" href="/about">how this calculator works</a>.',
    presetTitleSuffix: ' | Free Beam Calculator',
    presetDescSuffix: ' Free online beam calculator with instant SFD, BMD, slope & deflection diagrams.',
    faqQuestionVariant: (h1: string) => `How do I analyze a ${h1.toLowerCase()}?`,
    faqQuestionPreset: (name: string) => `How do I analyze ${name.toLowerCase()}?`,
    faqAnswer:
      'This page pre-loads a configured model in the beam calculator. Edit positions and magnitudes directly, or drag elements on the diagram. Results update instantly in your browser.',
  },
};

export const en: LocaleCopy = {
  meta,
  chrome,
  home,
  hub,
  formulas,
  guide,
  about,
  contact,
  privacy,
  terms,
  calculators,
};