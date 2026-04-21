# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build
npm run lint     # ESLint via Next.js
npm run start    # Start production server
```

No test suite is configured. The `src/app/test` directory exists but is empty.

## Architecture

Single-page portfolio built with Next.js 15 (App Router), Tailwind CSS v4, and TypeScript.

**Page structure:** `src/app/page.tsx` composes full-page sections in order. `layout.tsx` wraps everything in `ReactLenis` (smooth scroll) with a fixed `Header` and `Footer`.

**Sections** (`src/components/sections/`):
- `Hero` — landing with profile image, scroll-fade arrow indicator
- `Work` — experience timeline (SVG-based with absolute-positioned text overlays) + tech stack grid
- `Projects` — not yet rendered on the page (imported but unused in `page.tsx`)

**UI primitives** (`src/components/ui/`):
- `GlitchText` — on-hover character-scramble animation; logic lives in `src/lib/glitchText.ts`. Fixed-width via `useLayoutEffect` to prevent layout shift during glitch.
- `Pill`, `SocialIcon`, `TechRow` — small presentational components

**Fonts:** Mix of Google Fonts (Geist, Geist Mono) and local fonts in `src/fonts/`. All exposed as CSS variables via `@theme inline` in `globals.css` and applied as Tailwind utilities (`font-modernist`, `font-poppins`, `font-poppins-light`, `font-instrument-light`).

**Data:** Static content (tech stacks, etc.) lives in `src/utils/data.ts` — add new portfolio data there.

**Lenis:** `src/utils/lenis.ts` re-exports `lenis/react` as a client component wrapper so it can be used inside the server-side `layout.tsx`.

**Styling:** Tailwind v4 with `@import "tailwindcss"` in `globals.css`. No `tailwind.config` file — configuration is done inline via `@theme`.
