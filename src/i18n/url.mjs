/**
 * Canonical URL form shared by the sitemap serializer in astro.config.mjs and
 * (duplicated in src/i18n/config.ts, kept in sync by unit tests) the head
 * canonical + hreflang emitted by Layout: trailing slashes stripped, the site
 * root keeps its single slash.
 *
 * Plain .mjs so astro.config.mjs can import it without any TS tooling.
 */
export function canonicalPath(pathname) {
  return pathname.replace(/\/+$/, '') || '/';
}

export function canonicalUrl(url) {
  const u = new URL(url);
  u.pathname = canonicalPath(u.pathname);
  return u.href;
}
