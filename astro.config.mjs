// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com', // TODO: 本番ドメイン確定後に変更
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },
});
