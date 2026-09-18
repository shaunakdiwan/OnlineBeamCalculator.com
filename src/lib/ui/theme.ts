/** Theme-aware colors for SVG (reads CSS custom properties). */
export interface Palette {
  ink: string;
  body: string;
  mute: string;
  hairline: string;
  hairlineStrong: string;
  canvas: string;
  canvasSoft: string;
  link: string;
  shear: string;
  moment: string;
  slope: string;
  deflection: string;
  magenta: string;
  error: string;
}

export function palette(): Palette {
  const cs = getComputedStyle(document.documentElement);
  const g = (name: string, fallback: string) => cs.getPropertyValue(name).trim() || fallback;
  return {
    ink: g('--color-ink', '#171717'),
    body: g('--color-body', '#4d4d4d'),
    mute: g('--color-mute', '#888888'),
    hairline: g('--color-hairline', '#ebebeb'),
    hairlineStrong: g('--color-hairline-strong', '#a1a1a1'),
    canvas: g('--color-canvas', '#ffffff'),
    canvasSoft: g('--color-canvas-soft', '#fafafa'),
    link: g('--color-link', '#0070f3'),
    shear: g('--color-diagram-shear', '#7928ca'),
    moment: g('--color-diagram-moment', '#0070f3'),
    slope: g('--color-diagram-slope', '#f5a623'),
    deflection: g('--color-diagram-deflection', '#ff0080'),
    magenta: g('--color-highlight-magenta', '#eb367f'),
    error: g('--color-error', '#ee0000'),
  };
}

/** Re-render callback hook for theme toggles. */
export function onThemeChange(fn: () => void): void {
  window.addEventListener('obc:theme', fn);
}
