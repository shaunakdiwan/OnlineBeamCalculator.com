/**
 * App bootstrap: wires store ↔ solver ↔ views, toolbar (presets, undo/redo,
 * share link, print, CSV), and toast notifications.
 */
import { Store } from './state';
import { solve, StabilityError, type SolveResult } from '../beam/solve';
import { BeamCanvas } from './canvas';
import { InputPanel } from './panel';
import { ResultsDashboard } from './dashboard';
import { Diagrams } from './diagrams';
import { PRESETS } from './presets';
import { formatSI, fromSI } from '../units';

export function initBeamApp(presetSlug?: string): Store | null {
  const panelEl = document.getElementById('input-panel');
  const canvasEl = document.getElementById('beam-canvas-wrap');
  const dashEl = document.getElementById('results-dashboard');
  const diagEl = document.getElementById('diagrams');
  if (!panelEl || !canvasEl || !dashEl || !diagEl) return null;

  const store = new Store();
  // Load priority: URL hash > preset > last saved > default
  const hashOk = location.hash.length > 2 && store.loadFromHash(location.hash);
  if (!hashOk) {
    if (presetSlug) {
      const p = PRESETS.find((x) => x.slug === presetSlug);
      if (p) store.update((s) => { s.model = p.build(); });
      else store.loadFromStorage();
    } else {
      store.loadFromStorage();
    }
  }

  const toast = makeToaster();
  const canvas = new BeamCanvas(canvasEl, store, toast);
  const panel = new InputPanel(panelEl, store, () => {});
  const dash = new ResultsDashboard(dashEl, store);
  const diagrams = new Diagrams(diagEl, store);

  const toolbar = document.createElement('div');
  toolbar.className = 'flex flex-wrap items-center gap-xs mb-md';
  canvasEl.prepend(toolbar);

  // Presets dropdown
  const presetSel = document.createElement('select');
  presetSel.className = 'input h-8 text-body-sm';
  presetSel.add(new Option('Load an example…', ''));
  for (const p of PRESETS) presetSel.add(new Option(p.name, p.slug));
  presetSel.addEventListener('change', () => {
    const p = PRESETS.find((x) => x.slug === presetSel.value);
    if (p) { store.update((s) => { s.model = p.build(); }); presetSel.value = ''; }
  });
  toolbar.appendChild(presetSel);

  const btn = (label: string, fn: () => void, title = ''): HTMLButtonElement => {
    const b = document.createElement('button');
    b.className = 'btn-secondary h-8 text-body-sm';
    b.textContent = label;
    b.title = title;
    b.addEventListener('click', fn);
    toolbar.appendChild(b);
    return b;
  };
  btn('↶ Undo', () => store.undo(), 'Ctrl+Z');
  btn('↷ Redo', () => store.redo(), 'Ctrl+Y');
  btn('🔗 Copy link', async () => {
    const url = store.shareUrl();
    history.replaceState(null, '', url);
    try { await navigator.clipboard.writeText(url); toast('Link copied to clipboard ✓'); }
    catch { toast('Link: ' + url, 5000); }
  });
  btn('⬇ CSV', () => exportCsv(store));
  btn('🖨 Print / PDF', () => window.print(), 'Prints a report; use "Save as PDF" in the print dialog');
  btn('✕ Clear', () => {
    if (confirm('Clear the whole model?')) store.update((s) => {
      s.model.supports = [];
      s.model.hinges = [];
      s.model.loads = [];
    });
  });

  let result: SolveResult | null = null;
  let error: string | null = null;

  const recompute = () => {
    try {
      result = solve(store.get().model);
      error = null;
    } catch (e) {
      result = null;
      error = e instanceof StabilityError ? e.message : (e instanceof Error ? e.message : String(e));
      toast(error, 4000, true);
    }
    store.result = result;
    store.error = error;
    dash.render(result, error);
    diagrams.render(result);
    canvas.render();
    panel.render();
  };

  store.subscribe(() => recompute());
  // Re-render on theme toggle so SVG colors update
  window.addEventListener('obc:theme', () => recompute());
  window.addEventListener('keydown', (ev) => {
    if ((ev.ctrlKey || ev.metaKey) && ev.key === 'z' && !ev.shiftKey) { ev.preventDefault(); store.undo(); }
    if ((ev.ctrlKey || ev.metaKey) && (ev.key === 'y' || (ev.key === 'z' && ev.shiftKey))) { ev.preventDefault(); store.redo(); }
  });

  recompute();
  return store;
}

function makeToaster(): (msg: string, ms?: number, isError?: boolean) => void {
  const holder = document.createElement('div');
  holder.className = 'fixed bottom-lg right-lg z-50 flex flex-col gap-xs max-w-[24rem]';
  document.body.appendChild(holder);
  return (msg, ms = 2500, isError = false) => {
    const t = document.createElement('div');
    t.className = `card p-sm text-body-sm shadow-[var(--shadow-popover)] ${isError ? 'border-[var(--color-error)] bg-[var(--color-error-soft)]' : ''}`;
    t.textContent = msg;
    holder.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; }, ms);
    setTimeout(() => t.remove(), ms + 400);
  };
}

function exportCsv(store: Store) {
  const res = store.result;
  if (!res) return;
  const st = store.get();
  const U = st.ui.units;
  const sgn = st.ui.signConvention === 'sagging-positive' ? 1 : -1;
  const rows: string[] = [];
  const LU = U.length, FU = U.force, MU = U.moment;
  const conv = (q: 'length' | 'force' | 'moment', v: number, u: string) => fromSI(q, v, u).toPrecision(8);
  rows.push(`# OnlineBeamCalculator.com results`);
  rows.push(`# Units: x[${LU}], V[${FU}], M[${MU}], theta[rad], delta[${LU}]`);
  rows.push(`x,V,M,theta,delta`);
  for (let i = 0; i < res.shear.x.length; i++) {
    rows.push([
      conv('length', res.shear.x[i], LU),
      conv('force', res.shear.values[i] * sgn, FU),
      conv('moment', res.moment.values[i] * sgn, MU),
      res.slope.values[i].toExponential(6),
      conv('length', res.deflection.values[i], LU),
    ].join(','));
  }
  rows.push('');
  rows.push('# Reactions');
  rows.push('x,R_vertical,M_fixing');
  for (const r of res.reactions) {
    rows.push([conv('length', r.x, LU), conv('force', -r.R, FU), Math.abs(r.M) > 1e-9 ? conv('moment', r.M, MU) : '0'].join(','));
  }
  const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'beam-results.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}

// allow fmt import consumers
export { formatSI };
