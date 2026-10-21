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
- **Mood:** modern craft — clean layouts, big product photography, visible paper/texture details. Confident, not corporate.
- **Palette (starting point):**
  - Kraft `#C8A27A` — warm cardboard accent
  - Ink `#14161A` — near-black text / dark sections
  - Paper `#FAF7F2` — page background
  - Signal `#FF5A36` — CTA / highlights (print "spot colour" feel)
  - Optional CMYK strip (cyan/magenta/yellow/black) as a small decorative motif to say "we are a print house".
- **Type:** Headings — a geometric/grotesque display face with a Thai companion (e.g. *Sora* or *Space Grotesk* + *Noto Sans Thai* / *IBM Plex Sans Thai*). Body — *Noto Sans Thai* / *Inter*. Thai line-height ≥ 1.6.
- **Motifs:** dieline (dashed fold lines) as dividers, registration marks / crop marks in corners, subtle paper grain.
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
3. Component sheet: header, cards, buttons, timeline, filter chips, forms, footer, sticky mobile bar.
4. Tokens export (colors, type scale, spacing, radius) to feed Tailwind `@theme`.
