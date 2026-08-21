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

export function buildMesh(model: BeamModel): Mesh {
  const L = model.length;
  const breaks = new Set<number>([0, L]);

  const clampInto = (x: number) => {
    const xc = Math.min(Math.max(x, 0), L);
    breaks.add(Math.round(xc * 1e9) / 1e9);
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

  const sortedBreaks = [...breaks].sort((a, b) => a - b);

  // Node numbering: each break gets one node, except hinge positions get two.
  const nodeX: number[] = [];
  const nodeAtX = new Map<number, number[]>();
  const hingeXs = new Set(model.hinges.map((h) => Math.round(h.x * 1e9) / 1e9));

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
