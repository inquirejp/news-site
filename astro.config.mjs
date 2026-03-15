// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://inquirejp.github.io',
  base: '/news-site',
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },
});
