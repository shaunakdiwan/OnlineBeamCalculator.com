// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { canonicalUrl } from './src/i18n/url.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://onlinebeamcalculator.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          es: 'es',
        },
      },
      serialize(item) {
        return {
          ...item,
          url: canonicalUrl(item.url),
          links: item.links?.map((link) => ({
            ...link,
            url: canonicalUrl(link.url),
          })),
        };
      },
    }),
  ],
});
