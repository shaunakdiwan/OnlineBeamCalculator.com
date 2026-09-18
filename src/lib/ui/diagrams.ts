/**
 * Diagram stack: SFD / BMD / slope / deflection SVG charts with shared
 * crosshair hover, extrema markers, and unit-aware tooltips.
 */
import type { Store } from './state';
import { palette } from './theme';
import type { DiagramSeries, SolveResult } from '../beam/solve';
import { formatSI } from '../units';
import type { Quantity } from '../units';

const NS = 'http://www.w3.org/2000/svg';
const H = 180, W = 1000, PADL = 12, PADR = 12, PADT = 22, PADB = 20;

interface PlotSpec {
  title: string;
  color: string;
  series: DiagramSeries;
  quantity: Quantity;
  unitId: string;
  sign: number; // sign-convention multiplier
  fmtDigits?: number;
}

export class Diagrams {
  private charts: { spec: PlotSpec; svg: SVGSVGElement; toPx: (x: number) => number; plotH: (v: number) => number }[] = [];
  private crosshairX: number | null = null;

  constructor(private root: HTMLElement, private store: Store) {}

  render(result: SolveResult | null) {
    this.root.textContent = '';
    this.charts = [];
    if (!result) return;
    const P = palette();
    const st = this.store.get();
    const U = st.ui.units;
    const sgn = st.ui.signConvention === 'sagging-positive' ? 1 : -1;

    const specs: PlotSpec[] = [
      { title: 'Shear force V(x)', color: P.shear, series: result.shear, quantity: 'force', unitId: U.force, sign: sgn },
      { title: 'Bending moment M(x)', color: P.moment, series: result.moment, quantity: 'moment', unitId: U.moment, sign: sgn },
      { title: 'Slope θ(x)', color: P.slope, series: result.slope, quantity: 'length', unitId: 'm', sign: 1 }, // rad — custom fmt
      { title: 'Deflection δ(x)', color: P.deflection, series: result.deflection, quantity: 'length', unitId: U.length, sign: 1 },
    ];

    for (const spec of specs) {
      const card = document.createElement('div');
      card.className = 'card p-md';
      const head = document.createElement('div');
      head.className = 'flex items-baseline justify-between mb-xs';
      head.innerHTML = `<span class="eyebrow uppercase" style="color:${spec.color}">${spec.title}</span>
        <span class="font-mono text-caption text-mute" data-extremes></span>`;
      card.appendChild(head);
      const holder = document.createElement('div');
      card.appendChild(holder);
      this.root.appendChild(card);
      const svg = this.plot(holder, spec, result);
      head.querySelector('[data-extremes]')!.textContent =
        `max ${this.fmt(spec, spec.series.max.value * spec.sign)} at ${formatSI('length', spec.series.max.x, U.length)} · min ${this.fmt(spec, spec.series.min.value * spec.sign)} at ${formatSI('length', spec.series.min.x, U.length)}`;
      const toPx = (x: number) => 0; // placeholder replaced below
      this.charts.push({ spec, svg, toPx, plotH: () => 0 });
    }

    // shared crosshair: rebuild accessor map
    this.charts = this.charts.map((c) => {
      const L = st.model.length;
      const toPx = (x: number) => PADL + (x / L) * (W - PADL - PADR);
      return { ...c, toPx };
    });
  }

  private fmt(spec: PlotSpec, v: number): string {
    if (spec.title.startsWith('Slope')) {
      const parts = v.toExponential(3).split('e');
      if (parts.length === 2 && parseInt(parts[1], 10) !== 0) {
        const map: Record<string, string> = { '-': '⁻', '+': '⁺', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
        const exp = parts[1].split('').map(c => map[c] || c).join('');
        return `${parts[0]} × 10${exp} rad`;
      }
      return `${v.toExponential(3)} rad`;
    }
    return formatSI(spec.quantity, v, spec.unitId);
  }

  private plot(holder: HTMLElement, spec: PlotSpec, result: SolveResult): SVGSVGElement {
    const P = palette();
    const { series, color } = spec;
    const L = this.store.get().model.length;
    const svg = document.createElementNS(NS, 'svg') as SVGSVGElement;
    svg.setAttribute('width', '100%');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.style.touchAction = 'none';

    const toPx = (x: number) => PADL + (x / L) * (W - PADL - PADR);
    const maxAbs = Math.max(Math.abs(series.max.value), Math.abs(series.min.value), 1e-12);
    const y0 = PADT + (H - PADT - PADB) / 2;
    const toPy = (v: number) => y0 - (v * spec.sign / maxAbs) * ((H - PADT - PADB) / 2 - 4);

    // frame + zero axis
    const mk = (tag: string, attrs: Record<string, string | number>) => {
      const e = document.createElementNS(NS, tag);
      for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
      return e;
    };
    svg.appendChild(mk('rect', { x: 0, y: 0, width: W, height: H, fill: 'none' }));
    svg.appendChild(mk('line', { x1: PADL, x2: W - PADR, y1: y0, y2: y0, stroke: P.hairline }));

    // curve
    const pts = series.x.map((x, i) => `${toPx(x).toFixed(1)},${toPy(series.values[i]).toFixed(1)}`);
    svg.appendChild(mk('polyline', { points: pts.join(' '), fill: 'none', stroke: color, 'stroke-width': 1.75 }));

    // filled area
    svg.appendChild(mk('polygon', {
      points: `${toPx(series.x[0])},${y0} ${pts.join(' ')} ${toPx(series.x[series.x.length - 1])},${y0}`,
      fill: color, opacity: 0.07,
    }));

    // extrema markers
    for (const ex of [series.max, series.min]) {
      svg.appendChild(mk('circle', { cx: toPx(ex.x), cy: toPy(ex.value), r: 3, fill: color }));
      const t = mk('text', { x: toPx(ex.x), y: toPy(ex.value) - 8, 'text-anchor': 'middle', fill: color, 'font-size': 15, 'font-family': 'monospace' });
      t.textContent = this.fmt(spec, ex.value * spec.sign);
      svg.appendChild(t);
    }

    // crosshair
    const cross = mk('g', { visibility: 'hidden' }) as SVGGElement;
    const cline = mk('line', { x1: 0, x2: 0, y1: PADT, y2: H - PADB, stroke: P.hairlineStrong, 'stroke-dasharray': '3 2' });
    const tip = mk('text', { x: 0, y: PADT - 4, fill: P.ink, 'font-size': 15, 'font-family': 'monospace' });
    cross.append(cline, tip);
    svg.appendChild(cross);

    svg.addEventListener('pointermove', (ev) => {
      const r = svg.getBoundingClientRect();
      const px = ((ev.clientX - r.left) / r.width) * W;
      const x = ((px - PADL) / (W - PADL - PADR)) * L;
      if (x < 0 || x > L) { cross.setAttribute('visibility', 'hidden'); return; }
      // sample nearest
      let bi = 0, bd = Infinity;
      series.x.forEach((xx, i) => { const d = Math.abs(xx - x); if (d < bd) { bd = d; bi = i; } });
      const sx = series.x[bi];
      cline.setAttribute('x1', String(toPx(sx)));
      cline.setAttribute('x2', String(toPx(sx)));
      tip.setAttribute('x', String(Math.min(toPx(sx) + 4, W - 200)));
      tip.textContent = `x=${formatSI('length', sx, this.store.get().ui.units.length)}  ${spec.title.split(' ')[0]}=${this.fmt(spec, series.values[bi] * spec.sign)}`;
      cross.setAttribute('visibility', 'visible');
    });
    svg.addEventListener('pointerleave', () => cross.setAttribute('visibility', 'hidden'));

    holder.appendChild(svg);
    return svg;
  }
}
