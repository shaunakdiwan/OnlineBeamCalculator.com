/**
 * Interactive SVG beam canvas: renders beam, supports, hinges, loads;
 * supports click-to-add, drag-to-move, click-to-select.
 */
import type { BeamModel, Load, Support } from '../beam/model';
import type { Store } from './state';
import { uid } from './state';
import { palette } from './theme';

const NS = 'http://www.w3.org/2000/svg';
const VBH = 220; // viewBox height
const PAD = 40;  // side padding (px units in viewBox space, beam scaled to fit)

export interface CanvasCallbacks {
  onSelect: (kind: UIState3 | null) => void;
}
type UIState3 = { kind: 'support' | 'load' | 'hinge'; id: string } | null;

function el(tag: string, attrs: Record<string, string | number>, ...children: SVGElement[]): SVGElement {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
  e.append(...children);
  return e;
}

export class BeamCanvas {
  svg: SVGSVGElement;
  private store: Store;
  private drag: { kind: 'support' | 'hinge' | 'load' | 'loadEnd'; id: string; end?: 1 | 2 } | null = null;
  private toasts: (msg: string) => void;

  constructor(container: HTMLElement, store: Store, toast: (msg: string) => void) {
    this.store = store;
    this.toasts = toast;
    this.svg = document.createElementNS(NS, 'svg') as SVGSVGElement;
    this.svg.setAttribute('width', '100%');
    this.svg.setAttribute('viewBox', `0 0 1000 ${VBH}`);
    this.svg.style.touchAction = 'none';
    this.svg.style.userSelect = 'none';
    container.appendChild(this.svg);

    this.svg.addEventListener('pointerdown', (ev) => this.pointerDown(ev));
    this.svg.addEventListener('pointermove', (ev) => this.pointerMove(ev));
    this.svg.addEventListener('pointerup', () => this.pointerUp());
  }

  private scale(model: BeamModel) {
    const w = 1000 - 2 * PAD;
    return { x0: PAD, x1: 1000 - PAD, toPx: (x: number) => PAD + (x / model.length) * w, toX: (px: number) => ((px - PAD) / w) * model.length };
  }

  private pxFromEvent(ev: PointerEvent): number {
    const r = this.svg.getBoundingClientRect();
    return ((ev.clientX - r.left) / r.width) * 1000;
  }

  render() {
    const P = palette();
    const { model, ui } = this.store.get();
    const s = this.scale(model);
    const beamY = 100;
    this.svg.textContent = '';

    const defs = el('defs', {});
    const marker = el('marker', { id: 'obc-arrow', viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' });
    marker.appendChild(el('path', { d: 'M0,0 L10,5 L0,10 z', fill: P.link }));
    const markerR = el('marker', { id: 'obc-arrowR', viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' });
    markerR.appendChild(el('path', { d: 'M0,0 L10,5 L0,10 z', fill: P.magenta }));
    defs.append(marker, markerR);
    this.svg.appendChild(defs);

    this.svg.appendChild(el('line', { x1: s.x0, x2: s.x1, y1: beamY + 56, y2: beamY + 56, stroke: P.hairline }));
    this.svg.appendChild(el('rect', { x: s.x0, y: beamY - 6, width: s.x1 - s.x0, height: 12, fill: P.ink, rx: 2 }));

    const lt = el('text', { x: 500, y: VBH - 8, 'text-anchor': 'middle', fill: P.mute, 'font-size': 16, 'font-family': 'monospace' }) as unknown as SVGTextElement;
    lt.textContent = `L = ${model.length} m · click on the beam to add, drag glyphs to move`;
    this.svg.appendChild(lt);

    for (const sup of model.supports) {
      const px = s.toPx(sup.x);
      const g = el('g', { 'data-kind': 'support', 'data-id': sup.id, cursor: 'grab' }) as SVGGElement;
      if (ui.selection.id === sup.id) g.appendChild(el('circle', { cx: px, cy: beamY + 26, r: 24, fill: 'none', stroke: P.link, 'stroke-dasharray': '3 2' }));
      if (sup.type === 'pin') {
        g.appendChild(el('path', { d: `M${px},${beamY + 6} L${px - 12},${beamY + 30} L${px + 12},${beamY + 30} Z`, fill: P.canvas, stroke: P.ink, 'stroke-width': 2 }));
      } else if (sup.type === 'roller') {
        g.appendChild(el('path', { d: `M${px},${beamY + 6} L${px - 12},${beamY + 26} L${px + 12},${beamY + 26} Z`, fill: P.canvas, stroke: P.ink, 'stroke-width': 2 }));
        g.appendChild(el('circle', { cx: px - 6, cy: beamY + 32, r: 4, fill: P.canvas, stroke: P.ink, 'stroke-width': 1.5 }));
        g.appendChild(el('circle', { cx: px + 6, cy: beamY + 32, r: 4, fill: P.canvas, stroke: P.ink, 'stroke-width': 1.5 }));
      } else if (sup.type === 'fixed') {
        g.appendChild(el('rect', { x: px - 2.5, y: beamY - 14, width: 5, height: 52, fill: P.ink }));
        for (let i = 0; i < 5; i++) g.appendChild(el('line', { x1: px - 2.5, y1: beamY - 12 + i * 10, x2: px - 13, y2: beamY - 4 + i * 10, stroke: P.ink, 'stroke-width': 1.5 }));
      } else if (sup.type === 'spring') {
        let d = `M${px},${beamY + 6}`;
        for (let i = 0; i < 6; i++) d += ` L${px + (i % 2 === 0 ? 7 : -7)},${beamY + 10 + i * 4}`;
        d += ` L${px},${beamY + 36}`;
        g.appendChild(el('path', { d, fill: 'none', stroke: P.ink, 'stroke-width': 2 }));
      }
      const t = el('text', { x: px, y: beamY + 54, 'text-anchor': 'middle', fill: P.body, 'font-size': 15, 'font-family': 'monospace' }) as unknown as SVGTextElement;
      let label = sup.type;
      if (sup.type === 'spring' && sup.k) label += ` k=${sup.k.toExponential(1)}`;
      if (sup.settlement) label += ` Δ=${sup.settlement}`;
      t.textContent = label;
      g.appendChild(t);
      this.svg.appendChild(g);
    }

    for (const h of model.hinges) {
      const px = s.toPx(h.x);
      const g = el('g', { 'data-kind': 'hinge', 'data-id': h.id, cursor: 'grab' }) as SVGGElement;
      if (ui.selection.id === h.id) g.appendChild(el('circle', { cx: px, cy: beamY, r: 12, fill: 'none', stroke: P.link, 'stroke-dasharray': '3 2' }));
      g.appendChild(el('circle', { cx: px, cy: beamY, r: 6, fill: P.canvas, stroke: P.ink, 'stroke-width': 2 }));
      this.svg.appendChild(g);
    }

    for (const l of model.loads) {
      const g = el('g', { 'data-kind': 'load', 'data-id': l.id, cursor: 'grab' }) as SVGGElement;
      if (ui.selection.id === l.id) {
        const hx = l.type === 'udl' || l.type === 'trapezoid' ? s.toPx((l.x1 + l.x2) / 2) : s.toPx(l.x);
        g.appendChild(el('circle', { cx: hx, cy: beamY - 46, r: 24, fill: 'none', stroke: P.link, 'stroke-dasharray': '3 2' }));
      }
      if (l.type === 'point') {
        const px = s.toPx(l.x);
        const down = l.P >= 0;
        const y0 = down ? beamY - 52 : beamY - 18;
        const y1 = down ? beamY - 10 : beamY - 60;
        g.appendChild(el('line', { x1: px, y1: y0, x2: px, y2: y1, stroke: P.link, 'stroke-width': 3, 'marker-end': 'url(#obc-arrow)' }));
        const t = el('text', { x: px, y: y0 - 8, 'text-anchor': 'middle', fill: P.link, 'font-size': 15, 'font-family': 'monospace' }) as unknown as SVGTextElement;
        t.textContent = `${compact(l.P)}N`;
        g.appendChild(t);
      } else if (l.type === 'moment') {
        const px = s.toPx(l.x);
        g.appendChild(el('path', { d: `M ${px - 14} ${beamY - 34} A 16 16 0 1 1 ${px + 14} ${beamY - 34}`, fill: 'none', stroke: P.magenta, 'stroke-width': 2.5, 'marker-end': 'url(#obc-arrowR)' }));
        const t = el('text', { x: px, y: beamY - 58, 'text-anchor': 'middle', fill: P.magenta, 'font-size': 15, 'font-family': 'monospace' }) as unknown as SVGTextElement;
        t.textContent = `${compact(l.M)}N·m`;
        g.appendChild(t);
      } else {
        const p1 = s.toPx(l.x1), p2 = s.toPx(l.x2);
        const w1 = l.type === 'trapezoid' ? l.w1 : l.w;
        const w2 = l.type === 'trapezoid' ? (l as { w2: number }).w2 : l.w;
        const hMax = 42;
        const ref = Math.max(Math.abs(w1), Math.abs(w2), 1);
        const h1 = Math.max(10, (Math.abs(w1) / ref) * hMax);
        const h2 = Math.max(10, (Math.abs(w2) / ref) * hMax);
        g.appendChild(el('polygon', { points: `${p1},${beamY - 8} ${p1},${beamY - 8 - h1} ${p2},${beamY - 8 - h2} ${p2},${beamY - 8}`, fill: `${P.link}14`, stroke: P.link, 'stroke-width': 1.5 }));
        const n = Math.max(2, Math.round((p2 - p1) / 26));
        for (let i = 0; i <= n; i++) {
          const px = p1 + ((p2 - p1) * i) / n;
          const hh = h1 + ((h2 - h1) * i) / n;
          g.appendChild(el('line', { x1: px, y1: beamY - 8 - hh, x2: px, y2: beamY - 10, stroke: P.link, 'stroke-width': 1.5, 'marker-end': 'url(#obc-arrow)' }));
        }
        const t = el('text', { x: (p1 + p2) / 2, y: beamY - 18 - Math.max(h1, h2), 'text-anchor': 'middle', fill: P.link, 'font-size': 15, 'font-family': 'monospace' }) as unknown as SVGTextElement;
        t.textContent = l.type === 'udl' ? `${compact(l.w)}N/m` : `${compact(w1)}→${compact(w2)}N/m`;
        g.appendChild(t);
        g.appendChild(el('circle', { cx: p1, cy: beamY - 8, r: 4, fill: P.link, 'data-kind': 'load', 'data-id': l.id, 'data-end': '1' }));
        g.appendChild(el('circle', { cx: p2, cy: beamY - 8, r: 4, fill: P.link, 'data-kind': 'load', 'data-id': l.id, 'data-end': '2' }));
      }
      this.svg.appendChild(g);
    }
  }

  private hit(ev: PointerEvent): { kind: 'support' | 'hinge' | 'load'; id: string; end?: 1 | 2 } | null {
    const target = (ev.target as Element).closest?.('[data-kind]') as Element | null;
    if (!target) return null;
    const kd = target.getAttribute('data-kind')!;
    const id = target.getAttribute('data-id')!;
    const end = target.getAttribute('data-end');
    return { kind: kd as 'support', id, end: end === '1' ? 1 : end === '2' ? 2 : undefined };
  }

  private pointerDown(ev: PointerEvent) {
    const hit = this.hit(ev);
    const model = this.store.get().model;
    if (hit) {
      this.store.update((st) => {
        st.ui.selection = hit.end ? { kind: null, id: null } : { kind: hit.kind === 'load' ? 'load' : hit.kind, id: hit.id };
      }, { transient: true });
      this.drag = { kind: hit.end ? 'loadEnd' : hit.kind, id: hit.id, end: hit.end };
      this.svg.setPointerCapture(ev.pointerId);
      ev.preventDefault();
    } else {
      // empty area: if clicked near beam line → contextual add support/hinge
      const x = this.scale(model).toX(this.pxFromEvent(ev));
      if (x >= -0.5 && x <= model.length + 0.5) {
        const r = this.svg.getBoundingClientRect();
        const vby = ((ev.clientY - r.top) / r.height) * VBH;
        if (vby > 70 && vby < 140) this.showAddMenu(ev.clientX, ev.clientY, Math.min(Math.max(x, 0), model.length));
        else this.store.update((st) => { st.ui.selection = { kind: null, id: null }; }, { transient: true });
      } else {
        this.store.update((st) => { st.ui.selection = { kind: null, id: null }; }, { transient: true });
      }
    }
  }

  private pointerMove(ev: PointerEvent) {
    if (!this.drag) return;
    const model = this.store.get().model;
    const x = Math.min(Math.max(this.scale(model).toX(this.pxFromEvent(ev)), 0), model.length);
    this.store.update((st) => {
      const m = st.model;
      if (this.drag!.kind === 'support') {
        const s = m.supports.find((v) => v.id === this.drag!.id); if (s) s.x = x;
      } else if (this.drag!.kind === 'hinge') {
        const h = m.hinges.find((v) => v.id === this.drag!.id); if (h) h.x = x;
      } else if (this.drag!.kind === 'load') {
        const l = m.loads.find((v) => v.id === this.drag!.id)!;
        if (l.type === 'point' || l.type === 'moment') l.x = x;
        else {
          const mid = (l.x1 + l.x2) / 2; const half = (l.x2 - l.x1) / 2;
          l.x1 = Math.min(Math.max(x - half, 0), m.length); l.x2 = Math.min(Math.max(x + half, 0), m.length);
        }
      } else if (this.drag!.kind === 'loadEnd') {
        const l = m.loads.find((v) => v.id === this.drag!.id)!;
        if (l.type === 'udl' || l.type === 'trapezoid') {
          if (this.drag!.end === 1) l.x1 = x; else l.x2 = x;
        }
      }
    }, { transient: true });
    ev.preventDefault();
  }

  private pointerUp() {
    if (this.drag) {
      this.drag = null;
      this.store.update(() => {}, {}); // commit history entry
      this.store.persist();
    }
  }

  private showAddMenu(cx: number, cy: number, x: number) {
    document.getElementById('obc-addmenu')?.remove();
    const menu = document.createElement('div');
    menu.id = 'obc-addmenu';
    menu.className = 'card shadow-popover p-xs fixed z-50 flex flex-col text-body-sm';
    menu.style.left = `${cx}px`;
    menu.style.top = `${cy}px`;
    const opts: [string, () => void][] = [
      ['＋ Pin support', () => this.addSupport(x, 'pin')],
      ['＋ Roller support', () => this.addSupport(x, 'roller')],
      ['＋ Fixed support', () => this.addSupport(x, 'fixed')],
      ['＋ Spring support', () => this.addSupport(x, 'spring')],
      ['＋ Internal hinge', () => this.store.update((st) => { st.model.hinges.push({ id: uid(), x }); })],
      ['＋ Point load', () => this.addLoad({ type: 'point' })],
      ['＋ Moment', () => this.addLoad({ type: 'moment' })],
      ['＋ UDL (whole beam)', () => this.addLoad({ type: 'udl' })],
      ['＋ Triangular load', () => this.addLoad({ type: 'trapezoid' })],
    ];
    for (const [label, fn] of opts) {
      const b = document.createElement('button');
      b.className = 'text-left px-sm py-xs rounded-sm hover:bg-canvas-soft';
      b.textContent = label;
      b.onclick = () => { fn(); menu.remove(); };
      menu.appendChild(b);
    }
    document.body.appendChild(menu);
    const close = (e: MouseEvent) => { if (!menu.contains(e.target as Node)) { menu.remove(); document.removeEventListener('pointerdown', close); } };
    setTimeout(() => document.addEventListener('pointerdown', close), 0);
  }

  private addSupport(x: number, type: Support['type']) {
    this.store.update((st) => {
      st.model.supports.push({ id: uid(), x, type, ...(type === 'spring' ? { k: 1e6 } : {}) });
    });
  }
  private addLoad(cfg: { type: Load['type'] }) {
    this.store.update((st) => {
      const L = st.model.length;
      if (cfg.type === 'point') st.model.loads.push({ id: uid(), type: 'point', x: L / 2, P: 10000 });
      else if (cfg.type === 'moment') st.model.loads.push({ id: uid(), type: 'moment', x: L / 2, M: 5000 });
      else if (cfg.type === 'udl') st.model.loads.push({ id: uid(), type: 'udl', x1: 0, x2: L, w: 5000 });
      else st.model.loads.push({ id: uid(), type: 'trapezoid', x1: 0, x2: L, w1: 0, w2: 5000 });
    });
  }
}

function compact(v: number): string {
  const a = Math.abs(v);
  if (a >= 1e6) return (v / 1e6).toPrecision(3) + 'M';
  if (a >= 1000) return (v / 1000).toPrecision(3) + 'k';
  return v.toPrecision(3);
}
