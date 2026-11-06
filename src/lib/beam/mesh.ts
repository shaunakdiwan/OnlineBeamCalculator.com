/**
 * Meshing: node placement and element connectivity.
 *
 * Nodes are placed at beam ends, supports, hinges, and every load boundary
 * (point load x, moment x, distributed load start/end). Between consecutive
 * breakpoints the span is subdivided so the longest element is short enough
 * to give smooth diagrams.
 *
 * Hinges: a hinge at x receives TWO nodes at the same coordinate. All
 * translational DOFs connect across; the rotational DOFs are independent —
 * that is the rotational release. Elements left of the hinge connect to the
 * hinge's "left" node, elements right connect to the "right" node.
 */

import type { BeamModel } from './model';

export interface Mesh {
  /** Node x-coordinates [m] */
  nodeX: number[];
  /** 2 DOFs per node: DOF index = 2*node (v), 2*node+1 (θ) */
  nDof: number;
  /** Element e connects nodes [elNodes[e][0], elNodes[e][1]] */
  elNodes: [number, number][];
  /** node index for each mesh position on the left/right of a hinge (if any) */
  nodeAtX: Map<number, number[]>; // x -> node indices at that coordinate
}

const MAX_ELEMENT_COUNT = 400; // ceiling for smooth curves
const EPS = 1e-9;

/** Snap a position onto the breakpoint grid (1e-9 m) used for node lookups. */
export const snapX = (x: number) => Math.round(x * 1e9) / 1e9;

export function buildMesh(model: BeamModel): Mesh {
  const L = model.length;
  // Every breakpoint is snapped to this grid so the rounded keys used for
  // nodeAtX lookups (supports, hinges, load boundaries) always hit a node.
  // The beam ends must be snapped as well: seeding the set with the raw L
  // left both L and snap(L) in the set whenever they differ (e.g.
  // length = 1.4·0.05 = 0.06999999999999999 vs snap = 0.07). The element
  // between those two breaks then has length ~1e-17, so its stiffness EI/L³
  // is astronomically large, its node decouples from the rest of the mesh,
  // and the assembled matrix comes out singular — a perfectly good beam
  // is then reported as "unstable".
  const snap = snapX;
  const breaks = new Set<number>([0, snap(L)]);

  const clampInto = (x: number) => {
    const xc = Math.min(Math.max(x, 0), L);
    breaks.add(snap(xc));
  };

  for (const s of model.supports) clampInto(s.x);
  for (const h of model.hinges) clampInto(h.x);
  for (const l of model.loads) {
    if (l.type === 'point' || l.type === 'moment') clampInto(l.x);
    else {
      clampInto(Math.min(l.x1, l.x2));
      clampInto(Math.max(l.x1, l.x2));
    }
  }

  // Merge breaks that sit closer together than a small fraction of the beam:
  // an element that short is degenerate for the same reason as above. A
  // merged key still resolves to the surviving node via `aliases`.
  const minSeg = Math.max(1e-9, L * 1e-7);
  const snapped = [...breaks].sort((a, b) => a - b);
  const end = snapped[snapped.length - 1];
  const kept: number[] = [];
  const aliases = new Map<number, number>();
  for (const x of snapped) {
    const last = kept[kept.length - 1];
    if (last !== undefined && x - last < minSeg) {
      if (x === end) {
        aliases.set(last, x); // the beam end wins
        kept[kept.length - 1] = x;
      } else {
        aliases.set(x, last);
      }
    } else {
      kept.push(x);
    }
  }
  const sortedBreaks = kept;

  // Node numbering: each break gets one node, except hinge positions get two.
  const nodeX: number[] = [];
  const nodeAtX = new Map<number, number[]>();
  const hingeXs = new Set(model.hinges.map((h) => snap(h.x)));

  for (const x of sortedBreaks) {
    const idx: number[] = [];
    nodeX.push(x);
    idx.push(nodeX.length - 1);
    if (x > EPS && x < L - EPS && hingeXs.has(x)) {
      nodeX.push(x); // second node at same x — rotational release
      idx.push(nodeX.length - 1);
    }
    nodeAtX.set(x, idx);
  }
  // A break folded into a neighbour still resolves to that neighbour's nodes.
  for (const [from, to] of aliases) {
    const target = nodeAtX.get(to);
    if (target) nodeAtX.set(from, target);
  }

  // Build elements between consecutive breaks.
  const elNodes: [number, number][] = [];
  for (let i = 0; i < sortedBreaks.length - 1; i++) {
    const x0 = sortedBreaks[i];
    const x1 = sortedBreaks[i + 1];
    const nL = nodeAtX.get(x0)!; // left break: use LAST node (right side of hinge)
    const nR = nodeAtX.get(x1)!; // right break: use FIRST node (left side of hinge)
    const leftNode = nL[nL.length - 1];
    const rightNode = nR[0];

    const segLen = x1 - x0;
    const nDiv = Math.max(
      1,
      Math.ceil(segLen / (L / Math.min(MAX_ELEMENT_COUNT, 100))),
    );
    let prev = leftNode;
    for (let d = 1; d <= nDiv; d++) {
      const xn = x0 + (segLen * d) / nDiv;
      let node: number;
      if (d === nDiv) {
        node = rightNode;
      } else {
        nodeX.push(xn);
        node = nodeX.length - 1;
      }
      elNodes.push([prev, node]);
      prev = node;
    }
  }

  const nDof = nodeX.length * 2;
  return { nodeX, elNodes, nDof, nodeAtX };
}
