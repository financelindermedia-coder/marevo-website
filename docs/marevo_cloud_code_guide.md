# MAREVO — Claude Code Guide

## What This Guide Is

A reference for using Claude Code (the AI CLI) to efficiently develop, extend, and maintain the Marevo website. Use these prompts and workflows to get consistent, high-quality results.

---

## Project Context Prompt (Paste at Start of New Sessions)

```
I'm working on a luxury Kizomba music website called MAREVO.
Stack: Next.js 16 (App Router, no src/ dir), TypeScript, Tailwind CSS v4 (@theme in globals.css),
Framer Motion 11, lucide-react, next/font/google.
Colors: marevo-gold (#FFAB40), marevo-umber (#1A1110), marevo-dark (#2C1B18), marevo-cream (#FFF9F2).
Fonts: Cormorant Garamond (font-serif), Montserrat (font-sans).
Glass cards use: backdrop-filter blur(20px), rgba(20,14,13,.45) background, gold/8 border.
Deployment target: Hetzner CX23 + Coolify.
```

---

## Common Development Tasks

### Add a New Section to the Page

```
Add a [Section Name] section to the Marevo website between [Section A] and [Section B].
It should follow the existing glass-card aesthetic with marevo-* color tokens.
The section should animate in with Framer Motion whileInView (opacity 0→1, y 50→0, 0.8s).
```

### Add a New Component

```
Create a new React component [ComponentName].tsx in frontend/components/.
It should:
- Be a "use client" component
- Accept these props: [list props]
- Use Tailwind v4 utilities with marevo-* colors
- Match the luxury aesthetic (Cormorant Garamond for titles, Montserrat for body)
```

### Connect Payload CMS

```
Refactor app/page.tsx to fetch albums from Payload CMS instead of the mock data.
The Payload API endpoint is: process.env.PAYLOAD_URL + '/api/albums'
Filter by: status = published, sort by sortOrder.
Keep the same Album TypeScript interface from types/index.ts.
Use ISR with revalidate: 60.
```

### Add Video Hero Background

```
Update components/Hero.tsx to use a <video> element as the background
instead of a CSS background-image. The video is at /hero.mp4 in /public.
Add a <source> for WebM fallback. Keep the same overlay, title, and animations.
Use autoPlay muted loop playsInline.
```

### Make a Section Responsive

```
Update [ComponentName] so that on mobile (< 640px) the layout stacks vertically
instead of [current layout]. On desktop it should remain [current layout].
Use sm: breakpoint prefixes. Don't change any colors or animations.
```

---

## Debugging Prompts

### TypeScript Error

```
I'm getting this TypeScript error in [file]:
[paste error]
The types are defined in types/index.ts. Fix it without changing the interface.
```

### Tailwind Class Not Working

```
The Tailwind class [class] isn't applying in [component].
We're using Tailwind v4 — config is in app/globals.css inside @theme {}.
Custom colors use --color-marevo-* prefix. Check if the token is defined correctly.
```

### Build Error

```
The Next.js build is failing with: [paste error]
This is Next.js 16 with Turbopack. The project has no src/ directory.
Path alias @/ maps to the root of frontend/.
```

---

## Code Standards for This Project

1. **No `tailwind.config.ts`** — all theme config in `app/globals.css` → `@theme {}`
2. **Named exports** — `export const Hero`, `export const AlbumSection` (not default)
3. **`"use client"`** — only on components that need browser APIs (hooks, events)
4. **Server components by default** — `page.tsx` stays server-side for CMS fetches
5. **No inline styles** unless Tailwind can't express it (e.g., radial gradients)
6. **lucide-react** for all icons — consistent stroke width
7. **`next/image`** for all raster images — with `onError` fallback
8. **`next/font/google`** — fonts loaded in `layout.tsx` only
9. **No comments** unless the logic is genuinely non-obvious

---

## File Reference

| File | What to edit for |
|------|-----------------|
| `app/globals.css` | New color tokens, new CSS components |
| `app/layout.tsx` | New fonts, global metadata, body class |
| `app/page.tsx` | Page section order, CMS data fetch |
| `data/albums.ts` | Mock data changes |
| `types/index.ts` | Adding fields to Album or Song |
| `components/Hero.tsx` | Hero visual changes |
| `components/AlbumSection.tsx` | Album card layout |
| `components/SongRow.tsx` | Track row behavior |
| `components/StreamingModal.tsx` | Streaming platform links |
| `public/` | Static assets (images, video, SVGs) |

---

## Deployment Checklist

Before every push to production:

- [ ] `npm run build` passes with no errors
- [ ] All `console.log` removed
- [ ] Environment variables set in Coolify dashboard
- [ ] `PAYLOAD_URL`, `PAYLOAD_SECRET`, `POSTGRES_URI` configured
- [ ] Test on mobile viewport (375px width)
- [ ] Video hero loads and loops correctly
- [ ] StreamingModal opens and closes without errors
- [ ] All streaming links updated from `#` to real URLs
