/**
 * Results dashboard: stat cards, reactions table, deflection limit badges.
 */
import type { Store } from './state';
import { formatSI } from '../units';
import type { SolveResult } from '../beam/solve';

function card(label: string, value: string, sub: string, color: string): string {
  return `<div class="card p-md flex-1 min-w-[150px]">
    <div class="eyebrow uppercase" style="color:${color}">${label}</div>
    <div class="mt-xs font-mono text-[20px] leading-6 font-semibold">${value}</div>
    <div class="mt-xxs text-caption text-mute font-mono">${sub}</div>
  </div>`;
}

export class ResultsDashboard {
  constructor(private root: HTMLElement, private store: Store) {}

  render(result: SolveResult | null, error: string | null) {
    const st = this.store.get();
    const U = st.ui.units;
    const sign = st.ui.signConvention === 'sagging-positive' ? 1 : -1;

    if (error) {
      this.root.innerHTML = `<div class="card p-md border-[var(--color-error)] bg-[var(--color-error-soft)]">
        <div class="eyebrow uppercase" style="color:var(--color-error-deep)">Cannot solve</div>
        <div class="mt-xs text-body-sm">${escapeHtml(error)}</div></div>`;
      return;
    }
    if (!result) { this.root.innerHTML = ''; return; }

    const fV = (v: number) => formatSI('force', Math.abs(v), U.force);
    const fM = (v: number) => formatSI('moment', Math.abs(v), U.moment);
    const fL = (v: number) => formatSI('length', Math.abs(v), U.length);
    const fP = (v: number) => formatSI('pressure', Math.abs(v), U.pressure);

    const shear = result.shear;
    const moment = result.moment;
    const defl = result.deflection;
    const maxAbsV = Math.abs(shear.max.value) >= Math.abs(shear.min.value) ? shear.max : shear.min;
    const maxAbsM = Math.abs(moment.max.value) >= Math.abs(moment.min.value) ? moment.max : moment.min;
    const maxD = defl.min.value < 0 ? defl.min : defl.max;
    const sTop = Math.abs(result.stress.topMax.value);
    const sBot = Math.abs(result.stress.botMax.value);
    const maxStress = Math.max(sTop, sBot);
    const maxStressX = sTop >= sBot ? result.stress.topMax.x : result.stress.botMax.x;

    // deflection limits: L/d over span
    const L = st.model.length;
    const dMax = Math.abs(maxD.value);
    const ratio = dMax > 0 ? L / dMax : Infinity;
    const badge = (lim: number) => {
      const pass = ratio >= lim;
      return `<span class="font-mono text-caption px-xs py-[2px] rounded-full border ${pass ? 'border-[var(--color-link)] bg-[var(--color-link-bg-soft)] text-[var(--color-link-deep)]' : 'border-[var(--color-error)] bg-[var(--color-error-soft)] text-[var(--color-error-deep)]'}">L/${lim} ${pass ? '✓' : '✗'}</span>`;
    };

    this.root.innerHTML = `
      <div class="flex flex-wrap gap-md">
        ${card('Max Shear', fV(maxAbsV.value), `at x = ${formatSI('length', maxAbsV.x, U.length)}`, '#7928ca')}
        ${card('Max Moment', fM(maxAbsM.value), `at x = ${formatSI('length', maxAbsM.x, U.length)}`, '#0070f3')}
        ${card('Max Deflection', fL(maxD.value), `at x = ${formatSI('length', maxD.x, U.length)}`, '#ff0080')}
        ${card('Max Bend. Stress', fP(maxStress), `at x = ${formatSI('length', maxStressX, U.length)}`, '#f5a623')}
      </div>
      <div class="card p-md mt-md">
        <div class="flex items-center justify-between flex-wrap gap-xs">
          <div class="eyebrow uppercase">Reactions & serviceability</div>
          <div class="flex gap-xxs items-center flex-wrap">${badge(240)} ${badge(360)} ${badge(480)}
            <span class="text-caption text-mute ml-xs">${isFinite(ratio) ? `L/${Math.round(ratio)}` : 'rigid'}</span>
          </div>
        </div>
        <div class="mt-sm overflow-x-auto -mx-md px-md">
          <table class="w-full text-body-sm">
            <thead><tr class="text-left font-mono text-caption text-mute border-b border-hairline">
              <th class="py-xxs pr-md">Support</th><th class="py-xxs pr-md">x</th>
              <th class="py-xxs pr-md">Vertical R</th><th class="py-xxs pr-md">Moment M</th>
            </tr></thead>
            <tbody>
              ${result.reactions.map((r, i) => `<tr class="border-b border-hairline">
                <td class="py-xxs pr-md capitalize">${r.type} ${i + 1}</td>
                <td class="py-xxs pr-md font-mono">${formatSI('length', r.x, U.length)}</td>
                <td class="py-xxs pr-md font-mono">${formatSI('force', -r.R, U.force)} ↑</td>
                <td class="py-xxs pr-md font-mono">${Math.abs(r.M) > 1e-9 ? formatSI('moment', r.M, U.moment) : '·'}</td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div class="mt-sm flex flex-wrap items-center justify-between gap-sm text-caption text-mute">
          <div class="flex flex-wrap items-center gap-sm">
            <span>Sign convention:</span>
            <button id="signconv" class="btn-secondary h-6 px-xs text-caption">${st.ui.signConvention === 'sagging-positive' ? 'sagging +' : 'hogging +'}</button>
            <span class="font-mono">${sign > 0 ? 'V: +left face up' : 'V: +left face down'} · M: ${sign > 0 ? '+sagging' : '+hogging'}</span>
          </div>
          <button id="copy-summary" class="btn-primary h-6 px-xs text-caption flex items-center gap-xxs" aria-label="Copy summary to clipboard" title="Copy summary as markdown">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy summary
          </button>
        </div>
      </div>`;

    this.root.querySelector('#signconv')?.addEventListener('click', () => {
      this.store.update((s) => {
        s.ui.signConvention = s.ui.signConvention === 'sagging-positive' ? 'hogging-positive' : 'sagging-positive';
      });
    });

    this.root.querySelector('#copy-summary')?.addEventListener('click', (e) => {
      const btn = e.currentTarget as HTMLButtonElement;
      
      let md = `## Beam Analysis Summary\n\n`;
      md += `### Inputs\n`;
      md += `- **Beam Length:** ${formatSI('length', L, U.length)}\n`;
      
      if (st.model.loads.length > 0) {
        md += `- **Loads:**\n`;
        st.model.loads.forEach((ld) => {
          if (ld.type === 'point') md += `  - Point load: ${formatSI('force', ld.value, U.force)} at x = ${formatSI('length', ld.x, U.length)}\n`;
          else if (ld.type === 'moment') md += `  - Moment: ${formatSI('moment', ld.value, U.moment)} at x = ${formatSI('length', ld.x, U.length)}\n`;
          else if (ld.type === 'udl') md += `  - Uniform load: ${formatSI('force', ld.w, U.force)}/${U.length} from x = ${formatSI('length', ld.x0, U.length)} to ${formatSI('length', ld.x1, U.length)}\n`;
          else if (ld.type === 'trapezoid') md += `  - Trapezoidal load: ${formatSI('force', ld.w0, U.force)}/${U.length} to ${formatSI('force', ld.w1, U.force)}/${U.length} from x = ${formatSI('length', ld.x0, U.length)} to ${formatSI('length', ld.x1, U.length)}\n`;
        });
      }
      
      md += `\n### Results\n`;
      md += `- **Max Shear:** ${fV(maxAbsV.value)} at x = ${formatSI('length', maxAbsV.x, U.length)}\n`;
      md += `- **Max Moment:** ${fM(maxAbsM.value)} at x = ${formatSI('length', maxAbsM.x, U.length)}\n`;
      md += `- **Max Deflection:** ${fL(maxD.value)} at x = ${formatSI('length', maxD.x, U.length)} (L/${isFinite(ratio) ? Math.round(ratio) : 'rigid'})\n`;
      md += `- **Max Bending Stress:** ${fP(maxStress)} at x = ${formatSI('length', maxStressX, U.length)}\n\n`;
      
      md += `### Reactions\n`;
      result.reactions.forEach((r, i) => {
        md += `- **Support ${i + 1} (${r.type})** at x = ${formatSI('length', r.x, U.length)}: `;
        md += `V = ${formatSI('force', -r.R, U.force)} ↑, `;
        md += `M = ${Math.abs(r.M) > 1e-9 ? formatSI('moment', r.M, U.moment) : '0'}\n`;
      });
      
      navigator.clipboard.writeText(md).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = 'Copied!';
        setTimeout(() => btn.innerHTML = orig, 2000);
      });
    });
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
}
