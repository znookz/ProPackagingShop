# CLAUDE.md — Packaging & Print House Website

You are acting as a senior front-end / web expert on this repo. Keep the site fast, static, bilingual (TH/EN) and easy for a non-developer shop owner to edit.

## Project
Marketing website for a packaging printing house (โรงพิมพ์แพ็กเกจจิ้ง): boxes, tags/labels (ป้าย), calendars (ปฏิทิน) and related print work.
Brand name: **Foldwork** (chosen by the owner). Still confirm domain and trademark availability before launch.

## Hard constraints
- **No database, no backend of our own.** All content lives in the repo (Markdown / JSON / TS data files).
- Deploy target: **Cloudflare Pages** (static output; optional Pages Functions only for the contact form).
- **Bilingual: Thai (default) + English**, switchable from the header. Separate URLs per language (`/` = TH, `/en/` = EN) for SEO.
- **Responsive**: desktop and phone portrait are first-class. Design mobile-first (360px up), then 768 / 1024 / 1280.
- Pages: Main (home), History, Service, Product, Contact.

## Stack (decided)
- **Astro 5** (static output, built-in i18n routing, ships ~0 JS by default). Not Angular/React — the site is content, not an app. Use a React/Preact island only if a real interactive widget is needed (e.g. product filter).
- **Tailwind CSS v4** with design tokens in `@theme` (colors, fonts, spacing). Plain CSS (custom properties, `clamp()`, container queries, CSS grid) for anything Tailwind makes awkward.
- Content: Astro content collection `products` loaded from `src/content/products.json` (`th` and `en` fields side by side, schema in `src/content.config.ts`). Services, history, FAQ and other page copy live in the i18n JSON.
- UI strings: `src/i18n/th.json`, `src/i18n/en.json`, read with `getDict(lang)` from `src/i18n/utils.ts`. Keep both files in the same shape.
- Images: Astro `<Image>` → AVIF/WebP, `srcset`, explicit width/height (no layout shift). Source images in `src/assets/`.
- **3D product viewer:** tap a product → opens a viewer where the box rotates 360° (drag/pinch/auto-rotate).
  - Phase 1: Google `<model-viewer>` web component loading `.glb` files from `public/models/`. Script and model load **only when the user opens the viewer** (never on page load). Gives orbit controls, a poster image, and AR "view in your space" on phones for free.
  - Hero/decorative: pure CSS 3D transforms (6-face box that unfolds) — no library.
  - Phase 2 (optional): Three.js parametric box (width × length × height) with the customer's artwork as a texture, for a "preview your design" configurator.
  - Rules: each `.glb` < 2MB (Draco/Meshopt compressed, textures ≤ 1024px WebP/KTX2); always provide a static poster image and a no-WebGL fallback; keyboard-operable controls and `alt`; honour `prefers-reduced-motion` (no auto-rotate); keep the model files out of the critical path so Lighthouse mobile stays green.
- Contact: click-to-call, LINE OA link, email, Google Maps embed (lazy). Optional form → Cloudflare Pages Function + Turnstile (no DB; forwards to email).

## Structure (built)
```
src/
  pages/            index, history, service, product, contact  (Thai) + en/ mirror; each is a one-line wrapper
  views/            HomeView, HistoryView, ServiceView, ProductView, ContactView (shared by both languages)
  layouts/          Base.astro (head, canonical, hreflang, header, footer, mobile quick bar)
  components/       Header, Footer, QuickBar, CtaBand, Corners, Dieline, Logo, ProductCard, ProductViewer
  content/          products.json
  i18n/             th.json, en.json, utils.ts
  styles/           global.css (Tailwind @theme tokens + component classes)
  config.ts         phone / LINE / email (empty until the shop supplies them)
functions/api/      contact.js (Cloudflare Pages Function: Turnstile + Resend)
scripts/            make-box-glb.mjs (placeholder 3D boxes)
public/             favicon, robots.txt, _headers, models/*.glb
```
Adding a page: add the key to `PageKey` and `slugs` in `src/i18n/utils.ts`, copy in both i18n files (`nav`, `meta`, page block), a `*View.astro`, and two route wrappers.

## Conventions
- Thai text: set `lang="th"` / `lang="en"` on `<html>`; use `line-height` ≥ 1.6 for Thai (tone marks clip at tight values); never use `letter-spacing` on Thai.
- Visual language: "blueprint" — see `docs/design-brief.md` (grey ground `#f2f2f3`, accent `#5980a6` / text-accent `#416180`, radius 0, 1px hairline borders, corner registration marks).
- Fonts: **Barlow Condensed** (headings, Latin) + **Barlow** (body) with **Noto Sans Thai** as the Thai face; self-host, `font-display: swap`, subset to Thai + Latin.
- Language switch is a plain link to the equivalent page (`/product/` ↔ `/en/product/`). No auto-redirects, so crawlers and shared links always land where expected.
- Every page: unique `<title>`, meta description, `hreflang` alternates, OpenGraph image, `LocalBusiness` JSON-LD on Contact.
- Accessibility: AA contrast, visible focus, 44×44px touch targets, `alt` text in both languages, `prefers-reduced-motion` respected.
- Performance budget: LCP < 2.5s on mid-range phone over 4G; < 100KB JS; hero image < 150KB.
- Keep dependencies minimal. No CSS-in-JS, no UI kit.

## Commands
```
npm install
npm run dev                  # local dev, http://localhost:4321
npm run build                # static output in dist/
npm run check                # astro check (types)
npm run make:models          # regenerate placeholder .glb boxes
npx wrangler pages deploy dist   # or connect repo in Cloudflare Pages: build `npm run build`, output `dist`
```
Before pushing UI changes: `npm run check && npm run build`, then look at TH and EN pages at 390px and 1280px wide.

## Workflow
1. Design in Claude Design using `docs/design-brief.md`.
2. Export tokens/layout → implement components in Astro.
3. Fill real content (photos of real work matter more than anything else for a print shop).
4. Deploy to Cloudflare Pages, attach domain, check Lighthouse (mobile) and both languages.

## Skills / tooling to use
- `artifact-design`, `theme-factory` — fast visual drafts and theme exploration.
- `design:design-critique`, `design:accessibility-review`, `design:design-handoff`, `design:ux-copy` — review and handoff of Claude Design output; TH/EN microcopy.
- `anthropic-skills:web-artifacts-builder` — only for throwaway interactive prototypes, not the production site.
- No user-installed web-design skills were found in the claude.ai skill catalog; add one here if you adopt it.
