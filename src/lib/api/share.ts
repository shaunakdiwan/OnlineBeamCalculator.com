/**
 * "Open in calculator" share-link builder for the public API.
 *
 * Reuses the calculator's own serializer (src/lib/ui/state.ts) so the URL
 * hash is byte-compatible with the UI's "Copy link" button: the calculator
 * page loads the beam from `#<base64(JSON)>` via `sanitizeAndDeserialize`.
 */

import { serialize } from '../ui/state';
import type { BeamModel } from '../beam/model';
import type { UnitSelection } from '../units';

export const SITE_URL = 'https://onlinebeamcalculator.com';
export const CALCULATOR_PATH = '/calculator/';

/** UTF-8-safe base64, equivalent to the browser's btoa(unescape(encodeURIComponent(s))). */
function utf8ToBase64(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

export function buildCalculatorUrl(
  model: BeamModel,
  unitSystem: 'metric' | 'imperial',
  units: UnitSelection,
): string {
  const ui = {
    unitSystem,
    units,
    signConvention: 'sagging-positive' as const,
    selection: { kind: null as null, id: null as string | null },
    showLabels: true,
  };
  const payload = serialize(model, ui);
  return `${SITE_URL}${CALCULATOR_PATH}#${utf8ToBase64(JSON.stringify(payload))}`;
}
