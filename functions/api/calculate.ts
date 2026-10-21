/**
 * Cloudflare Pages Function: POST /api/calculate
 *
 * Public JSON API over the same beam solver the calculator UI uses (imported
 * from src/lib/beam — no solver code is duplicated). This file is the thin
 * HTTP wrapper: CORS, rate limiting and body-size guards. All request
 * validation and response assembly lives in src/lib/api/handler.ts.
 *
 * Docs for machines:
 *   - OpenAPI spec: https://onlinebeamcalculator.com/openapi.json
 *   - Overview:      https://onlinebeamcalculator.com/llms.txt
 */

import { handleRequest, LIMITS } from '../../src/lib/api/handler';

// Pages Function context (minimal local shape; avoids a types-only dependency).
interface PagesFunctionContext {
  request: Request;
}

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

function jsonResponse(status: number, json: unknown, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(json), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS, ...extra },
  });
}

// ---- rate limiting (best effort, per isolate) ----
// Workers isolates are ephemeral and distributed, so this is a cheap
// abuse brake, not a guarantee. Durable per-account limits would need
// Cloudflare WAF rules or a KV/DO counter (out of scope for phase 1).
const RATE_LIMIT = 30; // requests...
const RATE_WINDOW_MS = 10_000; // ...per 10 s window, per client IP
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): number | null {
  const now = Date.now();
  if (rateBuckets.size > 10_000) {
    for (const [key, bucket] of rateBuckets) {
      if (bucket.resetAt <= now) rateBuckets.delete(key);
    }
  }
  const bucket = rateBuckets.get(ip);
  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return null;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT ? Math.ceil((bucket.resetAt - now) / 1000) : null;
}

async function handle(request: Request): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { ...CORS_HEADERS, Allow: 'POST, OPTIONS' } });
  }
  if (request.method !== 'POST') {
    return jsonResponse(
      405,
      {
        ok: false,
        error: {
          code: 'method_not_allowed',
          message: `Method ${request.method} is not allowed. Use POST with a JSON body. See https://onlinebeamcalculator.com/openapi.json`,
        },
      },
      { Allow: 'POST, OPTIONS' },
    );
  }

  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (Number.isFinite(contentLength) && contentLength > LIMITS.MAX_BODY_BYTES) {
    return jsonResponse(413, {
      ok: false,
      error: {
        code: 'request_too_large',
        message: `Request body exceeds the ${LIMITS.MAX_BODY_BYTES} byte limit.`,
      },
    });
  }

  const retryAfter = rateLimit(request.headers.get('CF-Connecting-IP') ?? 'unknown');
  if (retryAfter !== null) {
    return jsonResponse(
      429,
      {
        ok: false,
        error: {
          code: 'rate_limited',
          message: 'Too many requests. Slow down and retry shortly.',
          retryAfterSeconds: retryAfter,
        },
      },
      { 'Retry-After': String(retryAfter) },
    );
  }

  const raw = await request.text();
  try {
    const { status, json } = handleRequest(raw);
    return jsonResponse(status, json);
  } catch {
    return jsonResponse(500, {
      ok: false,
      error: { code: 'internal_error', message: 'Unexpected server error.' },
    });
  }
}

export const onRequest = (context: PagesFunctionContext): Promise<Response> => handle(context.request);
