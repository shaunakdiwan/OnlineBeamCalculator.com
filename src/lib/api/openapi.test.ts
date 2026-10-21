/**
 * Structural validation of public/openapi.json:
 *  - valid OpenAPI 3.1 skeleton and resolvable $refs
 *  - documented limits match the handler's enforced LIMITS
 *  - documented error codes match what the handler can emit
 *  - the spec's request examples actually pass request validation, and the
 *    documented example response matches a real solve of the example request.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { validateRequest, LIMITS, handleRequest } from './handler';

const specPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../public/openapi.json');
const spec = JSON.parse(readFileSync(specPath, 'utf8'));

/** Collect every local $ref in a value and verify it resolves inside the spec. */
function checkRefs(node: unknown, seen: Set<string>): void {
  if (Array.isArray(node)) {
    for (const item of node) checkRefs(item, seen);
    return;
  }
  if (node && typeof node === 'object') {
    const obj = node as Record<string, unknown>;
    const ref = obj.$ref;
    if (typeof ref === 'string') {
      expect(ref.startsWith('#/')).toBe(true);
      const resolved = ref.slice(2).split('/').reduce<unknown>((acc, seg) => {
        if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[seg.replace(/~1/g, '/').replace(/~0/g, '~')];
        return undefined;
      }, spec);
      expect(resolved).toBeDefined();
      seen.add(ref);
    }
    for (const value of Object.values(obj)) checkRefs(value, seen);
  }
}

describe('OpenAPI spec (public/openapi.json)', () => {
  it('is a valid OpenAPI 3.1 document with the calculate endpoint', () => {
    expect(spec.openapi).toBe('3.1.0');
    expect(spec.info.title).toMatch(/beam calculator/i);
    expect(spec.servers[0].url).toBe('https://onlinebeamcalculator.com');
    const post = spec.paths['/api/calculate'].post;
    expect(post.operationId).toBe('calculate');
    expect(post.requestBody.content['application/json'].schema).toBeDefined();
    for (const code of ['200', '400', '405', '413', '422', '429', '500']) {
      expect(post.responses[code]).toBeDefined();
    }
  });

  it('has only resolvable local $refs', () => {
    const seen = new Set<string>();
    checkRefs(spec, seen);
    expect(seen.size).toBeGreaterThan(10);
  });

  it('documents exactly the limits the handler enforces', () => {
    const req = spec.components.schemas.CalculateRequest;
    expect(req.properties.supports.maxItems).toBe(LIMITS.MAX_SUPPORTS);
    expect(req.properties.hinges.maxItems).toBe(LIMITS.MAX_HINGES);
    expect(req.properties.loads.maxItems).toBe(LIMITS.MAX_LOADS);
    expect(req.properties.length.maximum).toBe(LIMITS.MAX_LENGTH_SI);
    expect(LIMITS.MAX_BODY_BYTES).toBe(65536);
    expect(spec.info.description).toContain('65,536 byte');
  });

  it('documents exactly the error codes the handler can emit', () => {
    const documented = spec.components.schemas.Error.properties.code.enum;
    const emitted: string[] = [
      'invalid_json',
      'invalid_input',
      'request_too_large',
      'unstable',
      'method_not_allowed',
      'rate_limited',
      'internal_error',
    ];
    expect([...documented].sort()).toEqual([...new Set(emitted)].sort());
  });

  it('request examples pass the real validator', () => {
    const examples = spec.paths['/api/calculate'].post.requestBody.content['application/json'].examples;
    for (const ex of Object.values<any>(examples)) {
      const res = validateRequest(JSON.parse(JSON.stringify(ex.value)));
      expect(res.ok, JSON.stringify(res)).toBe(true);
    }
  });

  it('documented example response matches a real solve of the example request', () => {
    const example = spec.paths['/api/calculate'].post.requestBody.content['application/json'].examples.simplySupportedPointLoad.value;
    const { status, json } = handleRequest(JSON.stringify(example));
    expect(status).toBe(200);
    const documented = spec.paths['/api/calculate'].post.responses['200'].content['application/json'].examples.simplySupportedPointLoad.value;
    expect(documented.results.reactions[0].R).toBeCloseTo((json as any).results.reactions[0].R, 1);
    expect(documented.results.reactions[1].R).toBeCloseTo((json as any).results.reactions[1].R, 1);
    expect(documented.results.maxShear.value).toBeCloseTo((json as any).results.maxShear.value, 1);
    expect(documented.results.maxMoment.value).toBeCloseTo((json as any).results.maxMoment.value, 0);
    expect(documented.results.maxMoment.x).toBeCloseTo((json as any).results.maxMoment.x, 0);
    expect(documented.calculatorUrl.startsWith('https://onlinebeamcalculator.com/calculator/#')).toBe(true);
  });
});
