# Project Card Generator — Plan

## What it is

A static site where users fill in project info and download a styled PNG card
suitable for embedding in GitHub README files.

---

## Stack

Same as `iem-visualizer`: **React + Vite + TailwindCSS + TypeScript**.

- `html-to-image` for PNG export (renders the live DOM card preview, no separate canvas)
- `shadcn/ui` for form controls (already familiar, consistent with iem-visualizer)
- GitHub Pages + CNAME for subdomain hosting

---

## Card fields

Everything optional. Blank form = blank card (no errors, no required validation).

| Field | Input type | Notes |
|---|---|---|
| Project name | text | Large heading on card |
| Tagline | text | Single-line subtitle |
| Description | textarea | Small body text, max ~2 lines shown |
| Tech stack tags | text (comma-separated) | Renders as pill badges |
| Status | select | Active / WIP / Archived / Deprecated |
| GitHub URL | text | Displayed as short link on card |
| Author | text | Small footer attribution |

---

## Visual customization

| Control | Type | Default |
|---|---|---|
| Orientation | toggle (Landscape / Portrait) | Landscape |
| Background color | color picker | `#0d1117` |
| Text color | color picker | `#e6edf3` |
| Accent color | color picker | `#58a6ff` |
| Font | select (5 options) | Inter |
| Border width | slider 0–8px | 2px |
| Border radius | slider 0–24px | 8px |

Font options: **Inter, JetBrains Mono, Space Grotesk, Fira Code, Geist** — loaded
from Google Fonts at runtime (no bundling needed for a static site).

Border color is always the accent color (not configurable).

---

## Card dimensions

Two fixed sizes — `CardConfig.orientation` switches between them:

| Orientation | Dimensions | Use case |
|---|---|---|
| Landscape | 1200×630px | GitHub README banners, OG images |
| Portrait | 630×1200px | Mobile profiles, vertical banners |

The preview scales to fit the panel with `transform: scale()` regardless of orientation,
so layout stays pixel-accurate to the export in both modes.

---

## Layout

Single page, two columns on desktop, stacked on mobile:

```
┌─────────────────┬─────────────────────────┐
│   Form          │   Live Card Preview     │
│   (scrollable)  │   (sticky, centered)    │
│                 │                         │
│                 │   [ Download PNG ]      │
└─────────────────┴─────────────────────────┘
```

No routing needed — single `App.tsx` with local `useState` for all form values.
Preview updates on every keystroke (no debounce needed, it's just DOM).

---

## PNG export

`html-to-image` captures the card div at its native 1200×630 resolution
(the preview div is scaled visually but the export target is the full-size
hidden element rendered off-screen).

```
hidden div (1200×630, full size)
  ↑ mirrors form state
  ↑ html-to-image.toPng() on click
  → triggers browser download
```

No server, no canvas drawing — the styled div IS the card.

---

## File structure

```
src/
  App.tsx              # form state + two-column layout
  components/
    CardPreview.tsx    # the card UI (used for both preview and export)
    FormPanel.tsx      # all inputs
    ColorPicker.tsx    # thin wrapper around <input type="color">
  lib/
    export.ts          # html-to-image download helper (~10 lines)
    fonts.ts           # font list + Google Fonts loader
  types.ts             # CardConfig interface
```

---

## Deployment

- Vite builds to `dist/`
- GitHub Actions workflow: push to `main` → `vite build` → deploy `dist/` to `gh-pages` branch
- CNAME file in `public/` with the subdomain (e.g. `cards.yourdomain.com`)
- DNS: CNAME record pointing subdomain → `<username>.github.io`

---

## Build order

1. Scaffold with `pnpm create vite` (React + TS template)
2. Add Tailwind + shadcn
3. Define `CardConfig` type and wire `useState` in `App.tsx`
4. Build `CardPreview.tsx` with hardcoded mock data first
5. Connect form → preview (live state)
6. Add `html-to-image` export
7. Add color pickers, font select, border sliders
8. GH Actions deploy workflow + CNAME

---

## What's explicitly skipped (YAGNI)

- **Backend / API** — no server, no persistence, all state is ephemeral
- **User accounts / save history** — not needed for a card generator
- **Multiple card templates** — one good-looking template first
- **SVG export** — PNG is what README embeds need
- **i18n** — single-language UI
- **Dark/light mode toggle for the site UI** — card has its own color pickers
