# Foldwork

Website for Foldwork, a packaging print house (boxes, tags and labels, calendars).
Static, bilingual (Thai default, English under `/en/`), no database. Built with Astro 5 and Tailwind CSS v4, deployed on Cloudflare Pages.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run preview    # serve dist/ locally
npm run check      # type-check .astro and .ts files
```

## Where things live

| What | Where |
|---|---|
| Page copy (TH / EN) | `src/i18n/th.json`, `src/i18n/en.json` |
| Products (names, summaries, specs, 3D model path) | `src/content/products.json` (schema in `src/content.config.ts`) |
| Phone / LINE / email links | `src/config.ts` (fill in once, every button is wired) |
| Colors, fonts, component classes | `src/styles/global.css` |
| Page layouts | `src/views/*View.astro` (one per page, used by both languages) |
| Routes | `src/pages/*.astro` (Thai) and `src/pages/en/*.astro` (English), each a one-line wrapper |
| 3D viewer | `src/components/ProductViewer.astro` |
| Contact form backend | `functions/api/contact.js` (Cloudflare Pages Function) |
| 3D models | `public/models/*.glb` |

Placeholders in `[square brackets]` (years, addresses, phone, specs) are waiting for real shop details.

## Adding a product

Add an object to `src/content/products.json`. Give it a `model` path (a `.glb` under `public/models/`) and it gets the 360° badge and opens in the 3D viewer. Without `model` the card links to the quote form.

## 3D models

`public/models/*.glb` are generated placeholder boxes (`npm run make:models`). Replace them with real models:

- each `.glb` under about 2 MB (Draco or Meshopt compression, textures 1024 px or smaller)
- the viewer library (about 300 KB gzipped) and the model load only when someone opens the viewer

## Deploy to Cloudflare Pages

1. Pages → Create project → connect this repository.
2. Build command `npm run build`, output directory `dist`.
3. Set `site` in `astro.config.mjs` to the real domain.
4. Contact form (optional until you want live submissions):
   - Turnstile: create a widget, set `PUBLIC_TURNSTILE_SITE_KEY` as a build variable and `TURNSTILE_SECRET` as an environment secret.
   - Email: `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` as environment secrets (a Resend account and a verified sender domain are needed).
   - Until these are set, `/api/contact` answers 503 and the form shows the failure message.

Design source of truth: `docs/design-brief.md` and the Claude Design canvas.
