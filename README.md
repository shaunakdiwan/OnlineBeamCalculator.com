# OnlineBeamCalculator.com

A browser-based structural beam analysis tool that runs a full finite element solver entirely client-side, with no backend computation required.

**Live:** [https://onlinebeamcalculator.com](https://onlinebeamcalculator.com) &nbsp;|&nbsp; **Repo:** [github.com/shaunakdiwan/OnlineBeamCalculator.com](https://github.com/shaunakdiwan/OnlineBeamCalculator.com)

![Astro](https://img.shields.io/badge/Astro-7.x-FF5D01?logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4.x-6E9F18?logo=vitest&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-deployed-F38020?logo=cloudflare&logoColor=white)

---

## Project Overview

OnlineBeamCalculator.com solves a problem common in early-stage structural and mechanical engineering work: getting a quick, accurate answer for beam reactions, shear force, bending moment, slope, and deflection without reaching for dedicated software like STAAD or SAP2000.

The application implements a complete 2D Euler–Bernoulli finite element beam solver entirely in the browser using TypeScript. Users define a beam's geometry, support conditions, loading, material, and cross-section through an interactive canvas, and the solver produces results instantly — shear force and bending moment diagrams, slope and deflection curves, support reactions, and fibre bending stress extremes.

**Intended users:** engineering students, practicing structural and mechanical engineers doing preliminary sizing, and developers who want programmatic access to beam analysis via the public REST API.

The project was developed to combine a Mechanical Engineering background with modern web development — demonstrating that rigorous numerical methods can be built and shipped as a production web application without specialized commercial tools.

---

## Screenshots

The application's OG image is available at [`public/og.png`](public/og.png). No additional screenshots are currently stored in the repository. The following pages are worth capturing if screenshots are added in the future:

- The interactive calculator with a beam diagram, input panel, and four result diagrams (SFD, BMD, slope, deflection).
- The `/formulas` reference page with KaTeX-rendered beam equations.
- The mobile layout with the hamburger navigation.

---

## Features

### Beam Configurations (Presets)

Eight one-click preset configurations are built into the application ([`src/lib/ui/presets.ts`](src/lib/ui/presets.ts)):

| Preset slug | Description |
|---|---|
| `simply-supported-point` | Pin + roller, centre point load |
| `simply-supported-udl` | Pin + roller, full uniform load |
| `cantilever-tip-load` | Fixed left end, tip point load |
| `cantilever-udl` | Fixed left end, full uniform load |
| `fixed-fixed-udl` | Both ends fixed, uniform load |
| `overhanging-beam` | Interior supports with overhang |
| `continuous-two-span` | Three supports, two equal spans |
| `gerber-hinge` | Fixed + rollers with internal moment release |

### Support Conditions

Four support types are implemented ([`src/lib/beam/model.ts`](src/lib/beam/model.ts)):

- **Pin** — restrains vertical displacement; rotation and horizontal displacement free.
- **Roller** — restrains vertical displacement only.
- **Fixed** — restrains vertical displacement and rotation.
- **Spring** — elastic vertical support with user-defined stiffness $k$ [N/m].

Prescribed support settlements (downward positive) are supported for pin, roller, and fixed supports.

### Internal Hinges

Internal moment releases (Gerber hinges) can be placed at any interior position. The mesh gives each hinge two coincident nodes with independent rotational DOFs, enforcing $M = 0$ at that position exactly.

### Load Types

Four load types are supported:

- **Point load** — concentrated force $P$ [N], downward positive, at any position along the beam.
- **Applied moment** — concentrated couple $M$ [N·m], clockwise positive.
- **Uniform distributed load (UDL)** — constant intensity $w$ [N/m] over a specified span.
- **Trapezoidal load** — linearly varying intensity from $w_1$ at $x_1$ to $w_2$ at $x_2$ [N/m].

**Self-weight** can be enabled as a full-span UDL derived from the section area, material density, and $g = 9.80665\ \text{m/s}^2$.

### Structural Analysis Outputs

| Output | Symbol | Units |
|---|---|---|
| Support reactions | $R$, $M_\text{fix}$ | N, N·m |
| Shear force diagram | $V(x)$ | N |
| Bending moment diagram | $M(x)$ | N·m |
| Slope | $\theta(x)$ | rad |
| Deflection | $\delta(x)$ | m |
| Extreme fibre bending stress (top/bottom) | $\sigma$ | Pa |
| Average shear stress extremum | $\tau_\text{avg}$ | Pa |

All diagrams are rendered at 400 uniformly-spaced sample points plus exact event positions (load application points, support locations, hinge positions), so discontinuities are always captured precisely.

### Material Library

Four preset materials are defined in [`src/lib/catalog/index.ts`](src/lib/catalog/index.ts):

| Preset | $E$ (GPa) | Density (kg/m³) | $f_y$ (MPa) |
|---|---|---|---|
| Structural Steel A36 | 200 | 7850 | 250 |
| Aluminum 6061-T6 | 68.9 | 2700 | 276 |
| Concrete f′c 30 MPa | 27 | 2400 | 30 |
| Timber (Douglas Fir) | 13 | 530 | 30 |

Custom material properties (E, density, $f_y$, $\nu$) can also be entered directly.

### Cross-Section Library

Six parametric section shapes are supported, plus a custom entry and a curated AISC W-shape library:

| Shape | Parameters |
|---|---|
| Rectangle | $b$, $h$ |
| Solid circle | $d$ |
| Hollow rectangle (RHS) | $b$, $h$, $t$ |
| Hollow circle (CHS) | $d$, $t$ |
| I-beam | $h$, $b_f$, $t_f$, $t_w$ |
| Channel (C-section) | $h$, $b_f$, $t_f$, $t_w$ |
| Custom | $A$, $I$, depth, $c_\text{top}$, $c_\text{bot}$ |

The AISC W-shape library covers 22 common sections from W4×13 through W24×84, with properties from AISC Shapes Database v15.0 (converted to SI internally).

### Unit Systems

The application supports full metric and imperial unit switching. All internal calculations use SI base units (m, N, Pa). Display conversion is handled by [`src/lib/units/index.ts`](src/lib/units/index.ts).

| Quantity | Metric options | Imperial options |
|---|---|---|
| Length | mm, cm, m | in, ft |
| Force | N, kN | lb, kip |
| Moment | N·mm, N·m, kN·m | lb·ft, kip·ft, lb·in, kip·in |
| Distributed load | N/m, kN/m, N/mm | lb/ft, kip/ft, lb/in |
| Stress / Modulus | Pa, kPa, MPa, GPa | psi, ksi |
| Spring stiffness | N/m, kN/m, kN/mm | lb/ft, kip/in |

### UI Features

- **Interactive SVG canvas** — click to place and drag supports, hinges, and loads; in-diagram delete.
- **Undo / Redo** — full history with up to 200 steps.
- **URL hash sharing** — the entire beam model is Base64-encoded into the URL hash, enabling bookmarking and sharing of configurations.
- **localStorage autosave** — the last-used model is restored on next visit.
- **Dark mode** — CSS custom property theme with `localStorage` and `prefers-color-scheme` detection.
- **Print stylesheet** — marketing content is hidden, diagrams are optimised for printing.
- **CSV export** — diagram data can be exported for use in other tools.
- **Copy summary button** — copies a text summary of the calculation to the clipboard.
- **Mobile hamburger menu** — responsive layout with collapsible navigation.

### Public REST API

A JSON beam-calculation API is available at `POST /api/calculate`. It accepts the same beam model as the UI (supports, hinges, loads, material, section), runs the same solver, and returns reactions, diagram extrema, and optionally the full diagram data series. Full request/response documentation is in [`public/openapi.json`](public/openapi.json). An `llms.txt` discovery file is served at [`/llms.txt`](https://onlinebeamcalculator.com/llms.txt).

### Internationalization

The site is available in five languages: English (default), Spanish (`/es`), French (`/fr`), German (`/de`), and Russian (`/ru`). Each locale has a full mirror of all pages. The language switcher preserves the URL hash (beam state) across locale changes.

---

## Engineering Methodology

### Beam Theory

The solver is based on **Euler–Bernoulli beam theory**, which assumes:
- Plane sections remain plane after bending.
- The beam is slender (depth ≪ span), so shear deformation is negligible.
- Material behaviour is linear elastic.
- Deflections are small relative to the beam length.

### Finite Element Formulation

The solver in [`src/lib/beam/solve.ts`](src/lib/beam/solve.ts) uses the **direct stiffness method** with standard cubic Hermitian beam elements. Each element has two nodes with two DOFs each — vertical displacement $v$ and rotation $\theta = dv/dx$.

**Element stiffness matrix** (for an element of length $L$ and flexural rigidity $EI$):

$$
\mathbf{k}_e = \frac{EI}{L^3} \begin{bmatrix} 12 & 6L & -12 & 6L \\ 6L & 4L^2 & -6L & 2L^2 \\ -12 & -6L & 12 & -6L \\ 6L & 2L^2 & -6L & 4L^2 \end{bmatrix}$$

The global stiffness matrix $\mathbf{K}$ is assembled by standard DOF-index scatter.

### Mesh Generation

The mesh is built in [`src/lib/beam/mesh.ts`](src/lib/beam/mesh.ts). Nodes are placed at:
- Both beam ends.
- Every support position.
- Every internal hinge position (two coincident nodes — see below).
- Every load application point (point loads, moment locations, distributed load boundaries).

Between consecutive breakpoints the span is subdivided so no element exceeds $L/100$ of the total beam length, up to a cap of 400 elements. All positions are snapped to a 1 nm grid to avoid floating-point-induced near-duplicate nodes.

**Internal hinges** receive two coincident nodes sharing the same coordinate but with independent rotational DOFs. The vertical DOFs of the two nodes are merged (master/slave constraint) during the global assembly reduction, enforcing displacement continuity while releasing the moment.

### Equivalent Nodal Load Vectors

Distributed and trapezoidal loads are converted to consistent nodal loads in [`src/lib/beam/fef.ts`](src/lib/beam/fef.ts) using the standard Hermitian shape function integral:

$$\mathbf{f}_e = \int_0^L \mathbf{N}^\top(x)\, q(x)\, dx$$

For trapezoidal loads this integral is evaluated numerically using a 5-point Gauss–Legendre quadrature rule (exact for polynomials up to degree 9):

$$\mathbf{f}_e \approx \sum_{g=1}^{5} w_g \, q(\xi_g) \, \mathbf{N}(\xi_g)$$

Point loads and applied moments that fall exactly on mesh nodes are assembled directly as nodal forces.

### Boundary Conditions and System Reduction

Prescribed DOFs (supports) and spring supports are handled as follows:
- **Pin / roller / fixed supports** — the corresponding vertical (and for fixed, rotational) DOFs are removed from the free-DOF set by static condensation. Prescribed settlements are applied as non-zero displacement boundary conditions.
- **Spring supports** — the spring stiffness $k$ is added to the diagonal of $\mathbf{K}$ at the spring DOF; the DOF remains free.
- **Internal hinge slaves** — each hinge slave vertical DOF is condensed onto its master DOF ($u_\text{slave} = u_\text{master}$) via a transformation $\mathbf{T}^\top \mathbf{K} \mathbf{T}$.

The reduced system is:

$$\mathbf{K}_{ff} \, \mathbf{u}_f = \mathbf{F}_f - \mathbf{K}_{fp} \, \mathbf{u}_p$$

### Linear Solve

The reduced system is solved by **Gaussian elimination with partial pivoting** on a dense matrix. Before elimination, the matrix is **diagonally equilibrated** (each row and column $i$ is scaled by $1/\sqrt{|K_{ii}|}$) to give the scaled matrix a unit diagonal and $O(1)$ off-diagonals. This avoids false singularity detections on short beams, where the raw translational stiffness ($EI/L^3$) can be orders of magnitude larger than the rotational stiffness ($EI/L$).

A **combinatorial stability pre-check** (`hasMechanism`) runs before the numerical solve. It tests whether the beam's zero-bending-energy field (piecewise-linear deflections with possible slope jumps at hinges) has a non-trivial solution, which is equivalent to the structure being a mechanism. This check is exact and $O(n)$ in the number of spans, separating true mechanisms from merely soft (spring-supported) structures.

### Post-Processing

**Reactions** are recovered as the residual of the full system: $\mathbf{R} = \mathbf{K}\mathbf{u} - \mathbf{F}$ at the prescribed DOFs. For spring supports the spring force $k(u - \delta_\text{settle})$ is reported directly.

**Shear force and bending moment** are computed by a left-to-right equilibrium march on the sample grid. At each point:

$$V(x) = V(x_0) - \int_{x_0}^{x} q(\xi)\, d\xi + \sum_{\text{events at } x} \Delta V$$

$$M(x) = M(x_0) + \int_{x_0}^{x} V(\xi)\, d\xi + \sum_{\text{events at } x} \Delta M$$

The distributed load integrals are evaluated analytically for UDL and by the trapezoid rule for linearly-varying loads. Event positions (load application, support, hinge) are always included in the sample grid, so jumps are captured exactly.

**Deflection and slope** are computed by **Hermitian interpolation** of the solved nodal DOFs within each element. This is exact for the finite element solution (the cubic Hermitian polynomials reproduce the exact deflected shape of a prismatic beam between breakpoints).

**Bending stress** at extreme fibres:

$$\sigma_\text{top}(x) = -\frac{M(x) \cdot c_\text{top}}{I}, \qquad \sigma_\text{bot}(x) = \frac{M(x) \cdot c_\text{bot}}{I}$$

**Average shear stress**: $\tau_\text{avg}(x) = V(x) / A$.

### Sign Conventions

| Quantity | Positive direction |
|---|---|
| Deflection $v$ (solver internal) | Downward |
| Rotation $\theta$ | $dv/dx$ (clockwise for downward curvature) |
| Shear $V(x)$ | Sagging-positive convention |
| Moment $M(x)$ | Sagging positive (tension on bottom fibre) |
| Reactions $R$ | Upward (UI output sign; solver uses downward-positive) |
| Loads $P$, $w$ | Downward positive |
| Applied moments $M$ | Clockwise positive |

### Engineering Assumptions and Limitations

- **Euler–Bernoulli theory only.** Shear deformation (Timoshenko) is not modelled. The solver may overestimate stiffness for deep or short beams.
- **Linear elastic material.** No plasticity, no yield checking, no load redistribution.
- **Prismatic beam.** Section properties $E$, $I$, $A$ are constant along the full beam length. Tapered sections and splices are not modelled.
- **In-plane loading only.** Lateral (out-of-plane) loads, torsion, and lateral-torsional buckling are outside scope.
- **Axial forces are not modelled.** No horizontal reactions, no second-order ($P$-$\Delta$) effects.
- **Small deflection assumption.** The geometric stiffness matrix is not included; large-deflection problems are not applicable.
- **Average shear stress only.** The shear stress distribution across the section is not computed; $\tau = V/A$ is an average.

> [!IMPORTANT]
> Results from this tool are intended for educational purposes, preliminary sizing, and cross-checking. They should be independently verified by a qualified engineer before being used in any safety-critical or regulatory context.

---

## Technology Stack

| Category | Technology |
|---|---|
| **Frontend framework** | [Astro 7.x](https://astro.build) (static output, no server runtime) |
| **Language** | TypeScript 6.x |
| **Styling** | Tailwind CSS 4.x (Vite plugin) |
| **Math rendering** | [KaTeX 0.18](https://katex.org) |
| **Fonts** | Geist (variable sans) + Geist Mono (variable mono) via `@fontsource-variable` |
| **Testing** | [Vitest 4.x](https://vitest.dev) |
| **Build** | Astro CLI (`astro build`), Vite under the hood |
| **Deployment** | [Cloudflare Pages](https://pages.cloudflare.com) |
| **API layer** | Cloudflare Pages Functions (`functions/api/calculate.ts`) |
| **Sitemap** | `@astrojs/sitemap` with i18n hreflang alternate links |
| **Analytics** | Google Analytics 4 (G-L9C6S6PT5K) |
| **Ads** | Google AdSense |

---

## Architecture and Code Organization

### Directory Structure

```
OnlineBeamCalculator.com/
├── astro.config.mjs            # Astro configuration: site URL, i18n, sitemap
├── package.json                # Dependencies and scripts
├── tsconfig.json
├── vitest.config.ts
│
├── public/
│   ├── _headers                # Cloudflare Pages HTTP security headers + CSP
│   ├── _routes.json            # Cloudflare Pages route configuration
│   ├── openapi.json            # OpenAPI 3.x specification for the REST API
│   ├── llms.txt                # AI discoverability manifest
│   ├── robots.txt
│   ├── site.webmanifest
│   └── og.png                  # Open Graph image
│
├── src/
│   ├── layouts/
│   │   └── Layout.astro        # Base HTML shell: GA4, CSP, fonts, theme
│   │
│   ├── components/
│   │   ├── Hreflang.astro      # <link rel="alternate"> generation
│   │   ├── LanguageSwitcher.astro
│   │   ├── calculator/
│   │   │   └── BeamCalculatorApp.astro  # Calculator shell (loads app.ts)
│   │   └── pages/              # Page-specific content components
│   │       ├── CalculatorPage.astro
│   │       ├── FormulasPage.astro
│   │       ├── HomePage.astro
│   │       └── ...
│   │
│   ├── pages/                  # Astro file-based routing
│   │   ├── index.astro
│   │   ├── calculator/
│   │   │   ├── index.astro     # /calculator hub
│   │   │   └── [slug].astro    # Dynamic preset/variant pages
│   │   ├── formulas.astro
│   │   ├── guide.astro
│   │   ├── about.astro
│   │   ├── privacy.astro
│   │   ├── terms.astro
│   │   ├── contact.astro
│   │   ├── de/, es/, fr/, ru/  # Locale mirrors of all pages
│   │   └── api/
│   │       └── calculate.ts    # Cloudflare Pages Function (REST endpoint)
│   │
│   ├── i18n/
│   │   ├── config.ts           # Locale list, hreflang map, URL helpers
│   │   ├── url.mjs             # Canonical URL helper (used by astro.config.mjs)
│   │   ├── types.ts            # Translation string type
│   │   └── en.ts, es.ts, fr.ts, de.ts, ru.ts   # Translation dictionaries
│   │
│   ├── styles/
│   │   └── global.css          # Tailwind v4 @import, CSS custom properties
│   │
│   └── lib/
│       ├── beam/               # ── Calculation engine ──
│       │   ├── model.ts        # Type definitions (BeamModel, Load, Support, …)
│       │   ├── mesh.ts         # Node placement, element connectivity, hinge nodes
│       │   ├── fef.ts          # Equivalent nodal load vectors (Hermitian FEF)
│       │   ├── solve.ts        # Stiffness assembly, solve, post-processing
│       │   └── __tests__/
│       │       └── solve.test.ts
│       │
│       ├── catalog/
│       │   └── index.ts        # Material presets, section shapes, AISC W-shapes
│       │
│       ├── units/
│       │   └── index.ts        # Unit definitions, SI conversion, formatting
│       │
│       ├── api/
│       │   ├── handler.ts      # REST API: validation, unit conversion, response
│       │   ├── share.ts        # URL hash encoder for the API's calculatorUrl field
│       │   ├── api.test.ts     # API handler integration tests
│       │   └── openapi.test.ts # OpenAPI spec validation tests
│       │
│       └── ui/
│           ├── state.ts        # Central store: pub/sub, undo/redo, URL hash, localStorage
│           ├── app.ts          # Main application loop: solve-on-change, render orchestration
│           ├── canvas.ts       # Interactive SVG beam diagram (click/drag interactions)
│           ├── diagrams.ts     # SVG diagram rendering (SFD, BMD, slope, deflection)
│           ├── dashboard.ts    # Results dashboard: reactions table, stress summary
│           ├── panel.ts        # Input panel: supports, loads, hinges, material, section
│           ├── presets.ts      # Preset definitions, variant landing pages
│           └── theme.ts        # Dark mode detection and toggling
```

### Data Flow

```
User interaction (canvas.ts / panel.ts)
        │
        ▼
    Store.update()   ←── URL hash / localStorage restore
        │
        ▼
    app.ts (solve loop)
        │  ┌─────────────────────────────────────────────┐
        ├──► buildMesh()   ─►   model.ts types             │
        ├──► loadOnElement()  (fef.ts)                     │
        ├──► solve()          (solve.ts)                   │
        │       │  denseSolve() — Gaussian elim w/ pivoting │
        │       │  hasMechanism() — combinatorial check     │
        │       └──► SolveResult (reactions, V, M, θ, δ)   │
        └─────────────────────────────────────────────────┘
                │
                ▼
    canvas.ts   diagrams.ts   dashboard.ts
    (beam viz)  (SFD/BMD/etc) (results table)
```

The entire solver runs synchronously on the main thread. No Web Workers are used. For the typical mesh size (~100–400 elements), solve time is well under 5 ms in modern browsers.

---

## Installation and Local Development

### Prerequisites

- Node.js ≥ 22.12.0 (as specified in `package.json` `engines` field)

### Setup

```bash
git clone https://github.com/shaunakdiwan/OnlineBeamCalculator.com.git
cd OnlineBeamCalculator.com
npm install
```

### Development Server

```bash
npm run dev
```

Starts Astro's development server at `http://localhost:4321` with hot module replacement.

> [!NOTE]
> When running in a scripted environment, use `astro dev --background` and manage with `astro dev stop` / `astro dev status` / `astro dev logs`.

### Production Build

```bash
npm run build
```

Outputs a fully static site to `dist/`. Astro compiles all pages at build time.

### Preview Production Build Locally

```bash
npm run preview
```

Serves the `dist/` output locally for final checks before deployment.

### Running Tests

```bash
npx vitest run
```

Or in watch mode:

```bash
npx vitest
```

---

## Deployment

The site is deployed on **Cloudflare Pages**.

### Automatic deployment (recommended)

The repository is connected to Cloudflare Pages via Git integration. Pushing to the main branch triggers an automatic build and deployment using the following settings:

| Setting | Value |
|---|---|
| Build command | `astro build` |
| Output directory | `dist` |
| Node version | 22 |

### Manual deployment

The `deploy` script builds the site and deploys it using the Wrangler CLI:

```bash
npm run deploy
```

This runs `astro build && npx wrangler pages deploy dist --project-name=onlinebeamcalculator`.

### Configuration

- **HTTP headers and CSP** — defined in [`public/_headers`](public/_headers), applied by Cloudflare Pages at the edge.
- **Route configuration** — [`public/_routes.json`](public/_routes.json) explicitly maps the `/api/calculate` endpoint to a Pages Function while serving everything else as static files.
- **API endpoint** — the Pages Function in `src/pages/api/calculate.ts` handles `POST /api/calculate` requests.

> [!CAUTION]
> Do not commit `wrangler.toml` account IDs, API tokens, or other credentials to the repository.

---

## SEO and Internationalization

### Sitemap

Generated at build time by `@astrojs/sitemap`. The sitemap includes hreflang `<link rel="alternate">` entries for all five locales and uses canonical URLs (trailing slashes stripped by the custom `serialize` hook in `astro.config.mjs`).

### Canonical URLs

Each page specifies a `<link rel="canonical">` pointing to the trailing-slash-free canonical URL. The URL helper in [`src/i18n/url.mjs`](src/i18n/url.mjs) is used both by the sitemap serializer and by page components.

### Internationalization

Five locales are supported: English (`en`, default — no prefix), Spanish (`/es`), French (`/fr`), German (`/de`), Russian (`/ru`). Locale routing is configured in `astro.config.mjs`:

```js
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'es', 'fr', 'de', 'ru'],
  routing: { prefixDefaultLocale: false },
}
```

Each locale has a complete mirror of all pages under `src/pages/{locale}/`. The `Hreflang.astro` component injects `<link rel="alternate" hreflang="...">` tags (including `x-default`) on every page. Translation strings are in separate locale files (`src/i18n/en.ts`, `es.ts`, etc.).

### Structured Data

JSON-LD structured data is included on calculator pages:
- `WebApplication` schema with `@id` deduplication.
- `BreadcrumbList` for calculator variant pages.
- `FAQPage` on preset/variant calculator pages.

### Metadata

Page titles, descriptions, Open Graph (`og:title`, `og:description`, `og:image`), and Twitter Card tags are set per-page. The OG image is at [`public/og.png`](public/og.png).

---

## Testing and Quality Assurance

Tests are located in `src/**/*.test.ts` and run with Vitest.

### Solver tests (`src/lib/beam/__tests__/solve.test.ts`)

The test suite validates the FE solver against **closed-form analytical solutions** for standard beam configurations. Tested cases include:

| Test case | Quantities verified |
|---|---|
| Simply supported + centre point load | Reactions, $M_\text{max} = PL/4$, $\delta_\text{max} = PL^3/(48EI)$ |
| Simply supported + full UDL | Reactions, $M_\text{max} = wL^2/8$, $\delta_\text{max} = 5wL^4/(384EI)$ |
| Cantilever + tip point load | Fixed-end reaction, $M_\text{max} = PL$, $\delta_\text{tip} = PL^3/(3EI)$ |
| Cantilever + full UDL | Fixed-end reaction, $M_\text{max} = wL^2/2$, $\delta_\text{tip} = wL^4/(8EI)$ |
| Propped cantilever + UDL | Reactions ($3wL/8$, $5wL/8$), fixed moment $wL^2/8$ |
| Two-span continuous + UDL | Reactions ($0.375wL$, $1.25wL$, $0.375wL$), hogging moment |
| Internal hinge | $M = 0$ at hinge position |
| Spring support | Spring reaction softer than rigid roller |
| Overhanging beam | Symmetric reactions for symmetric loading |
| Trapezoidal load | Resultant and centroid match hand solution |
| Applied moment | Reactions $\pm M/L$, moment jump at application point |
| Fixed–fixed + centre point | End moments $PL/8$, midspan moment $PL/8$, $\delta_\text{max} = PL^3/(192EI)$ |
| Mechanism detection | Single pin throws `StabilityError` |
| Shear diagram at off-grid load | Jump captured at non-sample-grid position |
| Constant moment on cantilever | Applied end moment yields constant $M$ diagram |
| Off-grid applied moment | Moment jump correct with drift correction |
| Gerber beam (Gerber hinge) | $M = 0$ at hinge, stable solve |
| Self-weight | Reactions and moment match equivalent UDL |
| State deserialization | Valid/invalid model sanitization round-trips |

**Test counts as of v1.17.0:** 21 cases in the solver test suite.

Additional tests cover the API handler (`src/lib/api/api.test.ts`) and OpenAPI spec (`src/lib/api/openapi.test.ts`). The units module has its own test file (`src/lib/units/units.test.ts`).

> [!NOTE]
> Tests verify correctness against analytical benchmarks. No automated browser testing (Playwright/Cypress) or end-to-end visual regression testing is currently set up.

---

## Project Ownership and Development

This project was independently conceptualized and is owned by Shaunak Diwan. The engineering domain knowledge — defining structural analysis requirements, specifying beam boundary conditions, load types, section properties, and verification against closed-form solutions — came from a Mechanical Engineering background.

Specific contributions include:

- Independent conception of the project concept, scope, and feature roadmap.
- Defining the engineering calculation requirements and guiding the choice of finite element methodology.
- Reviewing and verifying engineering outputs against known analytical solutions.
- Making decisions about which beam types, support conditions, load types, and cross-sections to include.
- Personally handling GitHub repository setup, Cloudflare Pages deployment, custom domain configuration, Google Analytics 4 integration, Google Search Console setup, sitemap configuration, indexing, and all SEO improvements.
- All project management, versioning, and release decisions.

AI coding agents were used to accelerate code generation and implementation. Engineering formulas and solver logic were developed through a combination of AI assistance and owner engineering judgment, with the owner verifying the numerical outputs against textbook solutions.

---

## Project Impact

The following are owner-reported metrics, not independently verified:

- Approximately **1,500–2,000 monthly page views**.
- Meaningful organic traffic from **Germany and the United States**, consistent with the multilingual SEO strategy (German locale added in v1.14.0).

---

## Future Improvements

Based on the current codebase, realistic next steps include:

| Area | Potential improvement |
|---|---|
| **Solver** | Timoshenko beam elements (shear deformation for deep beams) |
| **Solver** | Second-order ($P$-$\Delta$) geometric stiffness |
| **Solver** | Multiple load cases and load combinations |
| **Sections** | European standard sections (HEA, IPE, UB/UC) |
| **UI** | Serviceability deflection limit badges (L/240, L/360, L/480) — noted in variant landing copy but not yet surfaced in the main calculator |
| **UI** | Side-by-side load case comparison |
| **API** | Rate limiting and usage analytics |
| **Testing** | End-to-end browser tests (Playwright) |
| **Testing** | Property-based / fuzz testing for the solver |
| **i18n** | Additional languages (e.g. Portuguese, Italian) |

---

## License

This repository does not currently include a `LICENSE` file. All rights are reserved by the project owner unless otherwise stated. The absence of a license means the code is not open-source and may not be used, copied, modified, or distributed without explicit permission from the owner.
