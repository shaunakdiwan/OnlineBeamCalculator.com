/**
 * Left input panel: beam length, material, section, units, lists of
 * supports/loads/hinges with edit/delete.
 */
import type { Store } from './state';
import { uid } from './state';
import { MATERIALS, W_SHAPES, makeSection, wShapeSection } from '../catalog';
import { UNITS, fromSI, toSI, type Quantity } from '../units';
import type { Load, Support } from '../beam/model';

function h(tag: string, cls = '', html = ''): HTMLElement {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  return e;
}

function numInput(
  value: number,
  unit: string,
  onCommit: (v: number) => void,
  opts: { step?: string; min?: number } = {},
): HTMLInputElement {
  const i = document.createElement('input');
  i.type = 'number';
  i.className = 'input w-full font-mono';
  i.step = opts.step ?? 'any';
  if (opts.min !== undefined) i.min = String(opts.min);
  i.value = Number(value.toPrecision(6)).toString();
  i.title = unit;
  i.addEventListener('change', () => {
    const v = parseFloat(i.value);
    if (Number.isFinite(v)) onCommit(v);
  });
  return i;
}

function row(label: string, ...els: HTMLElement[]): HTMLElement {
  const r = h('div', 'flex flex-wrap items-center gap-xs');
  const l = h('label', 'w-full sm:w-28 shrink-0 text-body-sm text-body', label);
  r.append(l, ...els);
  return r;
}

function sectionHead(title: string, addBtn?: { label: string; fn: () => void }): HTMLElement {
  const d = h('div', 'flex items-center justify-between mt-md mb-xs');
  d.append(h('div', 'eyebrow uppercase', title));
  if (addBtn) {
    const b = h('button', 'btn-secondary h-6 px-xs text-caption', addBtn.label);
    b.addEventListener('click', addBtn.fn);
    d.append(b);
  }
  return d;
}

export class InputPanel {
  constructor(private root: HTMLElement, private store: Store, private recompute: () => void) {}

  render() {
    const st = this.store.get();
    const m = st.model;
    const U = st.ui.units;
    this.root.textContent = '';

    // ── Header: units + actions ─────────────────────────────
    const top = h('div', 'flex items-center justify-between mb-md');
    top.append(h('div', 'eyebrow uppercase', 'Setup'));
    const tw = h('div', 'flex gap-xxs');
    for (const sys of ['metric', 'imperial'] as const) {
      const b = h('button', `px-sm py-[4px] rounded-full text-caption border ${st.ui.unitSystem === sys ? 'bg-ink text-on-primary border-ink' : 'bg-canvas text-body border-hairline'}`, sys === 'metric' ? 'Metric' : 'Imperial');
      b.addEventListener('click', () => this.store.update((s) => {
        s.ui.unitSystem = sys;
        for (const q of Object.keys(UNITS) as Quantity[]) {
          const opts = UNITS[q].filter((u) => u.system === sys);
          const cur = UNITS[q].find((u) => u.id === s.ui.units[q]);
          if (!cur || cur.system !== sys) s.ui.units[q] = opts[0].id;
        }
      }));
      tw.append(b);
    }
    top.append(tw);
    this.root.append(top);

    // ── Beam length ─────────────────────────────────────────
    this.root.append(sectionHead('Beam'));
    this.root.append(row('Length', numInput(fromSI('length', m.length, U.length), U.length, (v) =>
      this.store.update((s) => { s.model.length = toSI('length', Math.max(0.01, v), U.length); })), h('span', 'text-caption text-mute w-10', UNITS.length.find(u=>u.id===U.length)?.label ?? '')));

    const swRow = h('div', 'flex items-center gap-xs mt-xs');
    const sw = document.createElement('input');
    sw.type = 'checkbox'; sw.checked = m.selfWeight; sw.id = 'selfweight';
    sw.addEventListener('change', () => this.store.update((s) => { s.model.selfWeight = sw.checked; }));
    const swl = h('label', 'text-body-sm text-body', 'Include self-weight') as HTMLLabelElement;
    swl.htmlFor = 'selfweight';
    swRow.append(sw, swl);
    this.root.append(swRow);

    // ── Material ────────────────────────────────────────────
    this.root.append(sectionHead('Material'));
    const matSel = document.createElement('select');
    matSel.className = 'input w-full';
    for (const mt of MATERIALS) matSel.add(new Option(mt.name, mt.id));
    matSel.add(new Option('Custom…', 'custom'));
    matSel.value = MATERIALS.some((x) => x.id === m.material.id) ? m.material.id : 'custom';
    matSel.addEventListener('change', () => this.store.update((s) => {
      const found = MATERIALS.find((x) => x.id === matSel.value);
      if (found) s.model.material = { ...found };
      else s.model.material.id = 'custom';
    }));
    this.root.append(matSel);
    this.root.append(row('E', numInput(fromSI('pressure', m.material.E, U.pressure), U.pressure, (v) =>
      this.store.update((s) => { s.model.material.E = toSI('pressure', v, U.pressure); s.model.material.id = 'custom'; })), h('span', 'text-caption text-mute w-10', UNITS.pressure.find(u=>u.id===U.pressure)?.label ?? '')));
    this.root.append(row('Density', numInput(m.material.density, 'kg/m³', (v) =>
      this.store.update((s) => { s.model.material.density = v; s.model.material.id = 'custom'; })), h('span', 'text-caption text-mute w-10', 'kg/m³')));
    this.root.append(row('fy', numInput(fromSI('pressure', m.material.fy ?? 0, U.pressure), U.pressure, (v) =>
      this.store.update((s) => { s.model.material.fy = toSI('pressure', v, U.pressure); })), h('span', 'text-caption text-mute w-10', UNITS.pressure.find(u=>u.id===U.pressure)?.label ?? '')));

    // ── Section ─────────────────────────────────────────────
    this.root.append(sectionHead('Section'));
    const secSel = document.createElement('select');
    secSel.className = 'input w-full';
    secSel.add(new Option('Parametric', '', true, true));
    for (const p of [
      ['rect', 'Rectangle'], ['hollow-rect', 'Hollow rectangle'], ['circle', 'Circle'],
      ['hollow-circle', 'Hollow circle'], ['i-beam', 'I-beam'], ['channel', 'Channel'],
    ] as const) secSel.add(new Option(p[1], p[0]));
    secSel.add(new Option('AISC W-shapes', '', true, true));
    for (const w of W_SHAPES) secSel.add(new Option(w.designation, `W:${w.designation}`));
    secSel.add(new Option('Custom (A, I)…', 'custom'));
    // current value
    secSel.value = m.section.id.startsWith('W:') ? m.section.id : m.section.id;
    secSel.addEventListener('change', () => this.store.update((s) => {
      const v = secSel.value;
      if (v.startsWith('W:')) {
        const w = W_SHAPES.find((x) => `W:${x.designation}` === v);
        if (w) s.model.section = wShapeSection(w);
      } else if (v === 'custom') {
        s.model.section = { ...s.model.section, id: 'custom', name: 'Custom section' };
      } else if (v) {
        // sensible defaults by shape
        const d = v === 'circle' || v === 'hollow-circle' ? { d: 0.2 } : {};
        s.model.section = v === 'rect' ? makeSection({ kind: 'rect', b: 0.1, h: 0.2 })
          : v === 'hollow-rect' ? makeSection({ kind: 'hollow-rect', b: 0.1, h: 0.2, t: 0.01 })
          : v === 'circle' ? makeSection({ kind: 'circle', d: 0.2 })
          : v === 'hollow-circle' ? makeSection({ kind: 'hollow-circle', d: 0.2, t: 0.01 })
          : v === 'i-beam' ? makeSection({ kind: 'i-beam', h: 0.2, bf: 0.1, tf: 0.01, tw: 0.007 })
          : makeSection({ kind: 'channel', h: 0.2, bf: 0.08, tf: 0.01, tw: 0.006 });
        void d;
      }
    }));
    this.root.append(secSel);
    this.root.append(row('A', numInput(fromSI('area', m.section.A, U.area), U.area, (v) =>
      this.store.update((s) => { s.model.section.A = toSI('area', v, U.area); })), h('span', 'text-caption text-mute w-10', UNITS.area.find(u=>u.id===U.area)?.label ?? '')));
    this.root.append(row('I', numInput(fromSI('inertia', m.section.I, U.inertia), U.inertia, (v) =>
      this.store.update((s) => { s.model.section.I = toSI('inertia', v, U.inertia); })), h('span', 'text-caption text-mute w-10', UNITS.inertia.find(u=>u.id===U.inertia)?.label ?? '')));
    this.root.append(row('Depth', numInput(fromSI('length', m.section.depth, U.length), U.length, (v) =>
      this.store.update((s) => { s.model.section.depth = toSI('length', v, U.length); s.model.section.cTop = s.model.section.depth / 2; s.model.section.cBot = s.model.section.depth / 2; })), h('span', 'text-caption text-mute w-10', UNITS.length.find(u=>u.id===U.length)?.label ?? '')));

    // ── Supports list ───────────────────────────────────────
    this.root.append(sectionHead('Supports', {
      label: '+ Add',
      fn: () => this.store.update((s) => { s.model.supports.push({ id: uid(), x: s.model.length / 2, type: 'pin' }); }),
    }));
    for (const sup of m.supports) this.root.append(this.supportRow(sup));
    if (m.supports.length === 0) this.root.append(h('div', 'text-caption text-mute italic', 'No supports yet; click on the beam to add one.'));

    // ── Hinges list ─────────────────────────────────────────
    this.root.append(sectionHead('Internal hinges', {
      label: '+ Add',
      fn: () => this.store.update((s) => { s.model.hinges.push({ id: uid(), x: s.model.length / 2 }); }),
    }));
    for (const hg of m.hinges) {
      const r = h('div', 'flex items-center gap-xs mb-xxs');
      r.append(h('span', 'w-16 text-body-sm', 'hinge'));
      r.append(numInput(fromSI('length', hg.x, U.length), U.length, (v) => this.store.update((s) => {
        const x = s.model.hinges.find((z) => z.id === hg.id); if (x) x.x = toSI('length', v, U.length);
      })));
      const del = h('button', 'btn-secondary h-6 px-[6px] text-caption', '✕');
      del.addEventListener('click', () => this.store.update((s) => { s.model.hinges = s.model.hinges.filter((z) => z.id !== hg.id); }));
      r.append(del);
      this.root.append(r);
    }

    // ── Loads list ──────────────────────────────────────────
    this.root.append(sectionHead('Loads', {
      label: '+ Add',
      fn: () => this.store.update((s) => {
        const L = s.model.length;
        s.model.loads.push({ id: uid(), type: 'point', x: L / 2, P: 10000 });
      }),
    }));
    for (const l of m.loads) this.root.append(this.loadRow(l));

    // ── Granular units ──────────────────────────────────────
    this.root.append(sectionHead('Display units'));
    for (const q of ['length', 'force', 'moment', 'distributed', 'pressure'] as Quantity[]) {
      const sel = document.createElement('select');
      sel.className = 'input w-full h-7 text-caption';
      for (const u of UNITS[q]) sel.add(new Option(u.label, u.id));
      sel.value = st.ui.units[q];
      sel.addEventListener('change', () => this.store.update((s) => { s.ui.units[q] = sel.value; }));
      this.root.append(row(q, sel));
    }
  }

  private supportRow(sup: Support): HTMLElement {
    const st = this.store.get();
    const U = st.ui.units;
    const r = h('div', `flex items-center gap-xs mb-xxs rounded-sm p-xxs ${st.ui.selection.id === sup.id ? 'bg-link-bg-soft' : ''}`);
    const typeSel = document.createElement('select');
    typeSel.className = 'input h-7 w-24 text-caption px-[6px]';
    for (const t of ['pin', 'roller', 'fixed', 'spring'] as const) typeSel.add(new Option(t, t));
    typeSel.value = sup.type;
    typeSel.addEventListener('change', () => this.store.update((s) => {
      const z = s.model.supports.find((v) => v.id === sup.id)!;
      z.type = typeSel.value as Support['type'];
      if (z.type === 'spring' && !z.k) z.k = 1e6;
    }));
    r.append(typeSel);
    r.append(numInput(fromSI('length', sup.x, U.length), U.length, (v) => this.store.update((s) => {
      const z = s.model.supports.find((x) => x.id === sup.id); if (z) z.x = Math.min(Math.max(toSI('length', v, U.length), 0), s.model.length);
    })));
    if (sup.type === 'spring') {
      const kIn = numInput(fromSI('stiffness', sup.k ?? 1e6, U.stiffness), U.stiffness, (v) => this.store.update((s) => {
        const z = s.model.supports.find((x) => x.id === sup.id); if (z) z.k = toSI('stiffness', v, U.stiffness);
      }));
      kIn.className += ' h-7 w-24';
      kIn.title = 'spring stiffness';
      r.append(kIn);
    }
    const setIn = numInput(fromSI('length', (sup.settlement ?? 0) * 1000, 'mm') / 1000 * (fromSI('length', 1, U.length) || 1), U.length, (v) => this.store.update((s) => {
      const z = s.model.supports.find((x) => x.id === sup.id); if (z) z.settlement = toSI('length', v, U.length);
    }));
    setIn.className += ' h-7 w-20';
    setIn.title = 'settlement (downward +)';
    setIn.placeholder = 'Δ=0';
    r.append(setIn);
    const del = h('button', 'btn-secondary h-6 px-[6px] text-caption', '✕');
    del.addEventListener('click', () => this.store.update((s) => { s.model.supports = s.model.supports.filter((z) => z.id !== sup.id); }));
    r.append(del);
    return r;
  }

  private loadRow(l: Load): HTMLElement {
    const st = this.store.get();
    const U = st.ui.units;
    const FL = UNITS.force.find((u) => u.id === U.force)!.label;
    const DL = UNITS.distributed.find((u) => u.id === U.distributed)!.label;
    const ML = UNITS.moment.find((u) => u.id === U.moment)!.label;
    const wrap = h('div', `mb-xs p-xs rounded-sm border border-hairline ${st.ui.selection.id === l.id ? 'bg-link-bg-soft' : 'bg-canvas-soft'}`);

    const head = h('div', 'flex items-center justify-between mb-xxs');
    const typeSel = document.createElement('select');
    typeSel.className = 'input h-6 text-caption px-[4px]';
    for (const [v, lbl] of [['point', 'Point'], ['moment', 'Moment'], ['udl', 'UDL'], ['trapezoid', 'Trapezoid']] as const) typeSel.add(new Option(lbl, v));
    typeSel.value = l.type;
    typeSel.addEventListener('change', () => this.store.update((s) => {
      const i = s.model.loads.findIndex((z) => z.id === l.id);
      const L = s.model.length;
      const t = typeSel.value as Load['type'];
      s.model.loads[i] = t === 'point' ? { id: l.id, type: 'point', x: L / 2, P: 10000 }
        : t === 'moment' ? { id: l.id, type: 'moment', x: L / 2, M: 5000 }
        : t === 'udl' ? { id: l.id, type: 'udl', x1: 0, x2: L, w: 5000 }
        : { id: l.id, type: 'trapezoid', x1: 0, x2: L, w1: 0, w2: 5000 };
    }));
    const del = h('button', 'btn-secondary h-6 px-[6px] text-caption', '✕');
    del.addEventListener('click', () => this.store.update((s) => { s.model.loads = s.model.loads.filter((z) => z.id !== l.id); }));
    head.append(typeSel, del);
    wrap.append(head);

    const g = h('div', 'grid grid-cols-2 gap-xxs');
    const addNum = (label: string, val: number, unit: string, fn: (v: number) => void) => {
      const c = h('div', 'flex flex-col gap-[2px]');
      c.append(h('span', 'text-caption text-mute', `${label} (${unit})`));
      const i = numInput(val, unit, fn);
      i.className += ' h-7';
      c.append(i);
      g.append(c);
    };

    if (l.type === 'point') {
      addNum(`x`, fromSI('length', l.x, U.length), UNITS.length.find((u) => u.id === U.length)!.label, (v) => this.store.update((s) => { const z = s.model.loads.find((q) => q.id === l.id); if (z?.type === 'point') z.x = toSI('length', v, U.length); }));
      addNum('P (down +)', fromSI('force', l.P, U.force), FL, (v) => this.store.update((s) => { const z = s.model.loads.find((q) => q.id === l.id); if (z?.type === 'point') z.P = toSI('force', v, U.force); }));
    } else if (l.type === 'moment') {
      addNum('x', fromSI('length', l.x, U.length), UNITS.length.find((u) => u.id === U.length)!.label, (v) => this.store.update((s) => { const z = s.model.loads.find((q) => q.id === l.id); if (z?.type === 'moment') z.x = toSI('length', v, U.length); }));
      addNum('M (CW +)', fromSI('moment', l.M, U.moment), ML, (v) => this.store.update((s) => { const z = s.model.loads.find((q) => q.id === l.id); if (z?.type === 'moment') z.M = toSI('moment', v, U.moment); }));
    } else {
      addNum('x1', fromSI('length', l.x1, U.length), UNITS.length.find((u) => u.id === U.length)!.label, (v) => this.store.update((s) => { const z = s.model.loads.find((q) => q.id === l.id); if (z && (z.type === 'udl' || z.type === 'trapezoid')) z.x1 = toSI('length', v, U.length); }));
      addNum('x2', fromSI('length', l.x2, U.length), UNITS.length.find((u) => u.id === U.length)!.label, (v) => this.store.update((s) => { const z = s.model.loads.find((q) => q.id === l.id); if (z && (z.type === 'udl' || z.type === 'trapezoid')) z.x2 = toSI('length', v, U.length); }));
      if (l.type === 'udl') {
        addNum('w (down +)', fromSI('distributed', l.w, U.distributed), DL, (v) => this.store.update((s) => { const z = s.model.loads.find((q) => q.id === l.id); if (z?.type === 'udl') z.w = toSI('distributed', v, U.distributed); }));
      } else {
        addNum('w1', fromSI('distributed', l.w1, U.distributed), DL, (v) => this.store.update((s) => { const z = s.model.loads.find((q) => q.id === l.id); if (z?.type === 'trapezoid') z.w1 = toSI('distributed', v, U.distributed); }));
        addNum('w2', fromSI('distributed', l.w2, U.distributed), DL, (v) => this.store.update((s) => { const z = s.model.loads.find((q) => q.id === l.id); if (z?.type === 'trapezoid') z.w2 = toSI('distributed', v, U.distributed); }));
      }
    }
    wrap.append(g);
    return wrap;
  }
}
