/**
 * Central app store: model + UI state, pub/sub, undo/redo, URL hash
 * serialization, localStorage autosave.
 */

import type { BeamModel } from '../beam/model';
import type { UnitSelection } from '../units';
import { defaultUnits } from '../units';
import type { SolveResult } from '../beam/solve';

export interface UIState {
  unitSystem: 'metric' | 'imperial';
  units: UnitSelection;
  signConvention: 'sagging-positive' | 'hogging-positive';
  selection: { kind: 'support' | 'load' | 'hinge' | null; id: string | null };
  showLabels: boolean;
}

export interface AppState {
  model: BeamModel;
  ui: UIState;
}

type Listener = (state: AppState) => void;

const LS_KEY = 'obc:last-model';

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

export function defaultModel(): BeamModel {
  return {
    length: 10,
    supports: [
      { id: uid(), x: 0, type: 'pin' },
      { id: uid(), x: 10, type: 'roller' },
    ],
    hinges: [],
    loads: [{ id: uid(), type: 'point', x: 5, P: 10000 }],
    material: { id: 'steel', name: 'Structural Steel (A36)', E: 200e9, density: 7850, fy: 250e6, nu: 0.3 },
    section: { id: 'r', name: 'Rect 200×100 mm', A: 0.02, I: 6.667e-5, depth: 0.2, cTop: 0.1, cBot: 0.1 },
    selfWeight: false,
  };
}

function defaultUI(): UIState {
  return {
    unitSystem: 'metric',
    units: defaultUnits('metric'),
    signConvention: 'sagging-positive',
    selection: { kind: null, id: null },
    showLabels: true,
  };
}

export class Store {
  private state: AppState;
  private listeners = new Set<Listener>();
  private undoStack: AppState[] = [];
  private redoStack: AppState[] = [];
  /** Latest solve result set externally by the app loop */
  result: SolveResult | null = null;
  error: string | null = null;

  constructor() {
    this.state = { model: defaultModel(), ui: defaultUI() };
  }

  get(): AppState {
    return this.state;
  }

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit() {
    for (const fn of this.listeners) fn(this.state);
  }

  private snapshot(): AppState {
    return structuredClone(this.state);
  }

  /** Apply a model mutation with undo history + persistence. */
  update(mut: (s: AppState) => void, opts: { transient?: boolean } = {}) {
    if (!opts.transient) {
      this.undoStack.push(this.snapshot());
      if (this.undoStack.length > 200) this.undoStack.shift();
      this.redoStack = [];
    }
    mut(this.state);
    this.emit();
    if (!opts.transient) this.persist();
  }

  undo() {
    const prev = this.undoStack.pop();
    if (!prev) return;
    this.redoStack.push(this.snapshot());
    this.state = prev;
    this.emit();
    this.persist();
  }

  redo() {
    const next = this.redoStack.pop();
    if (!next) return;
    this.undoStack.push(this.snapshot());
    this.state = next;
    this.emit();
    this.persist();
  }

  canUndo() { return this.undoStack.length > 0; }
  canRedo() { return this.redoStack.length > 0; }

  persist() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(serialize(this.state.model, this.state.ui)));
    } catch { /* storage may be unavailable */ }
  }

  loadFromHash(hash: string): boolean {
    try {
      const raw = hash.replace(/^#/, '');
      if (!raw) return false;
      const json = decodeURIComponent(escape(atob(raw)));
      const data = JSON.parse(json);
      const state = sanitizeAndDeserialize(data);
      if (!state) return false;
      this.state = state;
      this.emit();
      this.persist();
      return true;
    } catch {
      return false;
    }
  }

  loadFromStorage(): boolean {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return false;
      const state = sanitizeAndDeserialize(JSON.parse(raw));
      if (!state) return false;
      this.state = state;
      this.emit();
      return true;
    } catch { return false; }
  }

  shareUrl(): string {
    const data = serialize(this.state.model, this.state.ui);
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    return `${location.origin}${location.pathname}#${b64}`;
  }
}

// ---------- serialization ----------

interface Serialized {
  v: 1;
  model: BeamModel;
  ui: Pick<UIState, 'unitSystem' | 'units'>;
}

export function serialize(model: BeamModel, ui: UIState): Serialized {
  return { v: 1, model, ui: { unitSystem: ui.unitSystem, units: ui.units } };
}

export function deserialize(data: Serialized): AppState {
  return {
    model: data.model,
    ui: { ...defaultUI(), ...data.ui, selection: { kind: null, id: null } },
  };
}

/**
 * Validate and sanitize persisted/URL-loaded data. Returns null if input is
 * structurally invalid (so we fall back to the default model rather than
 * crash the solver on NaN / negative E / zero length / etc).
 */
export function sanitizeAndDeserialize(data: unknown): AppState | null {
  if (typeof data !== 'object' || data === null) return null;
  const d = data as Partial<Serialized>;
  if (d.v !== 1) return null;
  const m = d.model;
  if (!m || typeof m !== 'object') return null;
  const B = m as Partial<BeamModel>;
  const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
  if (!isNum(B.length) || B.length <= 0 || B.length > 1e3) return null;
  if (!Array.isArray(B.supports) || !Array.isArray(B.loads) || !Array.isArray(B.hinges)) return null;
  const validSupport = (s: unknown): boolean => {
    if (typeof s !== 'object' || s === null) return false;
    const S = s as Record<string, unknown>;
    return isNum(S.x) && S.x >= 0 && S.x <= B.length! &&
           (S.type === 'pin' || S.type === 'roller' || S.type === 'fixed' || S.type === 'spring');
  };
  const validHinge = (h: unknown): boolean => {
    if (typeof h !== 'object' || h === null) return false;
    const H = h as Record<string, unknown>;
    return isNum(H.x) && H.x >= 0 && H.x <= B.length!;
  };
  const validLoad = (l: unknown): boolean => {
    if (typeof l !== 'object' || l === null) return false;
    const L = l as Record<string, unknown>;
    if (!L.type) return false;
    if (L.type === 'point' || L.type === 'moment') {
      const vKey = L.type === 'point' ? 'P' : 'M';
      return isNum(L.x) && isNum(L[vKey]);
    }
    if (L.type === 'udl') return isNum(L.x1) && isNum(L.x2) && isNum(L.w);
    if (L.type === 'trapezoid') return isNum(L.x1) && isNum(L.x2) && isNum(L.w1) && isNum(L.w2);
    return false;
  };
  const mat = B.material, sec = B.section;
  if (!mat || !sec) return null;
  const M2 = mat as unknown as Record<string, unknown>, S2 = sec as unknown as Record<string, unknown>;
  if (!isNum(M2.E) || M2.E <= 0 || !isNum(M2.density) || M2.density < 0) return null;
  if (!isNum(S2.A) || S2.A <= 0 || !isNum(S2.I) || S2.I <= 0 || !isNum(S2.depth) || S2.depth <= 0) return null;

  if (!B.supports!.every(validSupport)) return null;
  if (!B.hinges!.every(validHinge)) return null;
  if (!B.loads!.every(validLoad)) return null;

  return deserialize(d as Serialized);
}

export { uid };
