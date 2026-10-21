import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Replace with the real domain before launch (used for canonical + hreflang URLs).
  site: 'https://foldwork.example',
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'th',
    locales: ['th', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
