/**
 * Central i18n configuration and helpers.
 * Single source of truth for locales, URL construction, and hreflang alternates.
 */

export type Locale = 'en' | 'es' | 'fr' | 'de' | 'ru';

export const LOCALES: Locale[] = ['en', 'es', 'fr', 'de', 'ru'];

export const DEFAULT_LOCALE: Locale = 'en';

/** Published locales (phased rollout). Update when adding a language. */
export const PUBLISHED_LOCALES: Locale[] = ['en', 'es', 'fr', 'de', 'ru'];

/** Map locale code → hreflang value (generic targets all markets). */
export const HREFLANG_MAP: Record<Locale, string> = {
  en: 'en',
  es: 'es',
  fr: 'fr',
  de: 'de',
  ru: 'ru',
};

/** Map locale code → og:locale value (specific region for OG). */
export const OG_LOCALE_MAP: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  de: 'de_DE',
  ru: 'ru_RU',
};

/** Site URL constant. */
export const SITE = 'https://onlinebeamcalculator.com';

/**
 * Strip trailing slashes (root keeps one slash).
 * Mirrors src/i18n/url.mjs canonicalPath for TS consumers.
 */
export function stripLocalePath(pathname: string): string {
  return pathname.replace(/\/+$/, '') || '/';
}

/**
 * Build a locale-prefixed path from a root path.
 * e.g. localePath('/calculator/foo', 'es') → '/es/calculator/foo'
 *      localePath('/', 'es') → '/es'
 */
export function localePath(pathname: string, locale: Locale): string {
  const stripped = stripLocalePath(pathname);
  if (locale === DEFAULT_LOCALE) {
    return stripped;
  }
  return `/${locale}${stripped === '/' ? '' : stripped}`;
}

/**
 * Extract locale and locale-less path from a full pathname.
 * e.g. parseLocalePath('/es/calculator/foo') → { locale: 'es', path: '/calculator/foo' }
 *      parseLocalePath('/calculator/foo') → { locale: 'en', path: '/calculator/foo' }
 */
export function parseLocalePath(pathname: string): { locale: Locale; path: string } {
  const stripped = stripLocalePath(pathname);
  if (stripped === '/') {
    return { locale: DEFAULT_LOCALE, path: '/' };
  }
  const segments = stripped.split('/').filter(Boolean);
  const first = segments[0] as Locale | undefined;
  if (first && LOCALES.includes(first)) {
    return { locale: first, path: `/${segments.slice(1).join('/')}` || '/' };
  }
  return { locale: DEFAULT_LOCALE, path: stripped };
}

/**
 * Build the canonical URL for a given pathname and locale.
 * Strips trailing slash (root keeps it).
 */
export function canonicalUrlFor(pathname: string, locale: Locale = DEFAULT_LOCALE): string {
  const path = localePath(pathname, locale);
  return new URL(stripLocalePath(path), SITE).href;
}

/**
 * Get all locale alternates for a given path (including self + x-default).
 * Returns array of { locale, hreflang, url } for <link rel="alternate"> and sitemap.
 */
export function getAlternates(pathname: string): Array<{
  locale: Locale;
  hreflang: string;
  url: string;
}> {
  const { path } = parseLocalePath(pathname);
  const alternates: Array<{ locale: Locale; hreflang: string; url: string }> = [];

  for (const locale of PUBLISHED_LOCALES) {
    alternates.push({
      locale,
      hreflang: HREFLANG_MAP[locale],
      url: canonicalUrlFor(path, locale),
    });
  }

  // x-default → English
  alternates.push({
    locale: DEFAULT_LOCALE,
    hreflang: 'x-default',
    url: canonicalUrlFor(path, DEFAULT_LOCALE),
  });

  return alternates;
}

/**
 * Get the locale from an Astro request (Astro.url.pathname).
 */
export function getLocaleFromPath(pathname: string): Locale {
  return parseLocalePath(pathname).locale;
}

/**
 * Check if a locale is published (has live pages).
 */
export function isPublished(locale: Locale): boolean {
  return PUBLISHED_LOCALES.includes(locale);
}