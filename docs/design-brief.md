# Design Brief — Packaging & Print House (for Claude Design)

## 1. Brand name ideas
Names are suggestions only. Domain, DBD business-name and trademark availability have NOT been checked.

| Name | Thai read | Why it works |
|---|---|---|
| **Foldwork** (recommended) | โฟลด์เวิร์ค | "Fold" = box craft, "work" = workshop. Easy to say in Thai, modern, works as a logo wordmark. |
| **Crease & Co.** | ครีส แอนด์ โค | The crease line on a folded box; premium, boutique feel. |
| **Boxtory** | บ็อกซ์ทอรี | Box + factory/story; friendly, brandable. |
| **Pakkit** | แพ็คคิท | Pack + kit; short, playful, good for a logo/sticker. |
| **Glong Studio** | กล่อง สตูดิโอ | Thai word "กล่อง" in Latin letters; local identity with a modern studio tone. |
| **Lai Pub** | ลายพับ | "Fold pattern" in Thai; craft + design feeling. |

Tagline options: "Packaging that gets noticed." / "แพ็กเกจที่ใช่ พิมพ์ให้โดน" / "From dieline to doorstep."

## 2. Visual direction
- **Mood (updated): "blueprint"** — cool grey ground, steel-blue accent, square hairline frames, registration marks at corners, dashed fold lines. Taken from the owner's "Industry" reference artifact. Technical, calm, precise.
- **Palette:**
  - Ground `#f2f2f3`, surface `#e9e9ea`
  - Ink `#1d1f20`; hairline divider = ink at 16% opacity (`color-mix(in srgb, #1d1f20 16%, transparent)`)
  - Accent `#5980a6` (decorative: fold lines, marks); accent-700 `#416180` for text and solid buttons (AA contrast); accent-800 `#2c455d`
  - Neutral ramp `#f5f5f8 … #2b2b2d`; accent tint for placeholders `rgba(89,128,166,.12)` with dashed accent border
- **Shape language:** radius 0 everywhere, 1px hairline borders, `.blueprint` frames with 11px "+" registration marks at the 4 corners (primary buttons and feature cards), 1px-gap cell grids on a divider background.
- **Type:** headings *Barlow Condensed* 600/700 (Latin) with *Noto Sans Thai* 700 for Thai; body *Barlow* + *Noto Sans Thai*. Thai line-height ≥ 1.6, letter-spacing 0 on Thai. Kickers are numbered English labels (`02 / Service`), uppercase, letter-spaced.
- **Motifs:** dieline (solid cut line + dashed accent fold line), registration marks, numbered sections, dashed-border image placeholders.
- Implementation reference: `foldwork.css` in the Claude Design canvas holds the tokens and component classes (`.blueprint`, `.btn`, `.btn-primary`, `.tag`, `.chip`, `.seg`, `.card`, `.ph`, `.specs`, `.cells`).
- **Motion:** light — hover lift on cards, scroll fade-in, a box "unfolding" hero animation (respect `prefers-reduced-motion`).

## 3. Sitemap
```
/            Main        (TH default)      /en/            Main
/history     History                       /en/history
/service     Service                       /en/service
/product     Product                       /en/product
/contact     Contact                       /en/contact
```
Header: logo · Home · History · Service · Product · Contact · **TH | EN** switch · primary CTA "Get a quote / ขอใบเสนอราคา".

## 4. Page wireframes (mobile first, desktop in brackets)

### Main
```
[Header: logo ........ menu ... TH|EN ... CTA]   (mobile: logo + TH|EN + hamburger)
HERO      Big headline + sub + 2 CTAs (Get a quote / View products)
          Hero image/animation of a folded box            (desktop: 2 columns)
STRIP     Trust numbers: years in business · jobs done · min. order · lead time
SERVICES  3–4 cards: Boxes · Tags & Labels · Calendars · Custom/Design
FEATURED  Product carousel/grid (6 items) → "See all"
PROCESS   4 steps: Brief → Dieline & proof → Print → Deliver
WHY US    Materials, finishes (hot foil, emboss, spot UV), fast proof, small-batch OK
CLIENTS   Logo row / testimonials
CTA BAND  "Tell us what you're packing" + LINE / phone / form
[Footer: address, hours, LINE, phone, map link, language switch]
```

### History
```
Page hero (short)
Timeline: founding year → equipment milestones → key clients → today (vertical on mobile, alternating on desktop)
Values / craft statement
Team or workshop photo gallery
CTA band
```

### Service
```
Intro
Service blocks (alternating image/text): Packaging boxes · Tags & labels · Calendars · Design & dieline · Finishing (foil/emboss/UV/laminate)
Specs table: materials (kraft, SBS, corrugated, art card), sizes, min. quantity, lead time
Process (reuse component)
FAQ accordion
CTA band
```

### Product
```
Filter chips: All · Boxes · Tags · Calendars · Others   (sticky on mobile)
Product grid: 1 col (phone) / 2 (tablet) / 3–4 (desktop)
  Card: photo · name · short spec · "Ask for quote"
Product detail (modal or /product/slug): gallery · specs · finishes · MOQ · related items · CTA
```

### Contact
```
Contact cards: Phone (tap to call) · LINE · Email · Address/hours
Quote form (name, phone/LINE, product type, quantity, size, message, file upload link) + Turnstile
Google Map (lazy loaded)
FAQ / how to send artwork
```

## 4b. 3D interaction (signature feature)
- **Product cards:** a small "360°" badge on items that have a 3D model. Tap → full-screen sheet (phone) / large modal (desktop).
- **Viewer:** the box on a soft neutral stage with contact shadow; drag to rotate, pinch/scroll to zoom, auto-rotate slowly until first touch; buttons: ⟲ reset, open/closed lid (where the model supports it), "View in your space" (AR, phones), close.
- **Info panel beside/below viewer:** name, size, material, finishes, MOQ, "Ask for quote" CTA (pre-fills the contact form with the product).
- **Hero:** a CSS-3D box that unfolds from flat dieline to finished box on scroll or load.
- **Loading state:** poster image first (instant), progress ring while the model downloads, graceful fallback to image gallery if WebGL is unavailable.
- Design the viewer for both phone portrait (viewer on top, info sheet below) and desktop (viewer left, info right).

## 5. Responsive rules
- Breakpoints: 360 base · 640 · 768 · 1024 · 1280. Container max-width 1200px, side padding 16px (phone) / 24px+ (desktop).
- Phone portrait: single column, sticky bottom action bar (Call · LINE · Quote), hamburger menu as full-screen sheet, ≥ 44px tap targets.
- Desktop: 12-col grid, sticky header, hover states.
- Fluid type with `clamp()`; images use `aspect-ratio`; no horizontal scroll at any width.

## 6. Language switch
- Toggle `TH | EN` in header (and footer). Thai is default.
- Switching keeps the same page; remembers choice; both languages must be designed — Thai strings run shorter in words but taller in glyphs, so test both.
- Every text block in the design should have TH and EN copy side by side.

## 7. What to ask Claude Design for
1. Logo/wordmark exploration for 2–3 of the names above.
2. Home page, mobile + desktop, in TH and EN.
3. Component sheet: header, cards, buttons, timeline, filter chips, forms, footer, sticky mobile bar, **3D viewer sheet/modal**.
4. Tokens export (colors, type scale, spacing, radius) to feed Tailwind `@theme`.
