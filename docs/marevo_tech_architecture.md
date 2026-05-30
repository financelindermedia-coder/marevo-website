# MAREVO — Technical Architecture

## Stack Overview

| Layer | Technology | Version | Role |
|-------|-----------|---------|------|
| Framework | Next.js | 16.x | Full-stack React, App Router, SSG/SSR |
| Language | TypeScript | 5.x | Type safety across all files |
| Styling | Tailwind CSS | 4.x | Utility-first, `@theme` config in CSS |
| Animation | Framer Motion | 11.x | Scroll animations, page transitions |
| Icons | lucide-react | latest | Consistent icon set |
| Fonts | next/font/google | built-in | Cormorant Garamond + Montserrat |
| CMS | Payload CMS | 3.x | Headless, self-hosted on same server |
| Database | PostgreSQL | 15+ | Payload CMS backing store |
| Hosting | Hetzner CX23 | — | Ubuntu 22.04, 2 vCPU, 4 GB RAM |
| Deployment | Coolify | latest | Git-triggered deploys, SSL auto |
| Reverse Proxy | Caddy (via Coolify) | — | HTTPS, domain routing |

---

## Directory Structure

```
frontend/
├── app/
│   ├── globals.css        # Tailwind v4 @theme tokens + glass-card
│   ├── layout.tsx         # Root layout: fonts, metadata
│   └── page.tsx           # One-page composition
├── components/
│   ├── Hero.tsx            # Fullscreen video/image hero
│   ├── AlbumSection.tsx    # Glass-card album showcase
│   ├── SongRow.tsx         # Individual track row
│   └── StreamingModal.tsx  # Platform selector modal
├── data/
│   └── albums.ts           # Mock data (replace with CMS fetch)
├── types/
│   └── index.ts            # Album, Song TypeScript interfaces
├── public/
│   ├── hero-bg.jpg         # Hero background (or hero.mp4)
│   └── placeholder-cover.svg
├── next.config.ts
├── postcss.config.mjs      # @tailwindcss/postcss plugin
└── package.json
```

---

## Tailwind v4 Configuration

Unlike v3, there is **no `tailwind.config.ts`**. All theme config lives in `app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-marevo-gold:  #FFAB40;
  --color-marevo-umber: #1A1110;
  --color-marevo-dark:  #2C1B18;
  --color-marevo-cream: #FFF9F2;

  --font-serif: var(--font-cormorant), Georgia, serif;
  --font-sans:  var(--font-montserrat), system-ui, sans-serif;
}
```

This generates utilities: `bg-marevo-gold`, `text-marevo-cream`, `font-serif`, etc.

---

## Data Flow: Mock → CMS

**Current (mock):**
```
data/albums.ts → page.tsx → AlbumSection
```

**Future (Payload CMS):**
```
Payload CMS (PostgreSQL) → REST/GraphQL API
  → Next.js fetch() in page.tsx (server component)
    → AlbumSection (receives typed Album prop)
```

Example server-side fetch:
```typescript
// app/page.tsx
async function getAlbums(): Promise<Album[]> {
  const res = await fetch(`${process.env.PAYLOAD_URL}/api/albums?depth=1`, {
    next: { revalidate: 60 }, // ISR: revalidate every 60s
  });
  const data = await res.json();
  return data.docs;
}
```

---

## Scrollytelling Pattern

The album sections use `whileInView` from Framer Motion — a lightweight approach that works without `useScroll`:

```typescript
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ once: false, amount: 0.2 }}
>
```

For more advanced sticky-scroll parallax (multiple albums), upgrade to:
```typescript
const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
const y      = useTransform(scrollYProgress, [0, 0.2], [60, 0]);
```

---

## Environment Variables

```bash
# .env.local
PAYLOAD_URL=http://localhost:3001       # local dev
PAYLOAD_SECRET=your-secret-here        # Payload auth
POSTGRES_URI=postgresql://user:pass@localhost:5432/marevo

# Production (set in Coolify dashboard)
PAYLOAD_URL=https://cms.marevo.com
NEXT_PUBLIC_SITE_URL=https://marevo.com
```

---

## Performance Notes

- **Images:** Use `next/image` with `sizes` prop for responsive delivery
- **Video hero:** Use `preload="none"` on `<video>` for fast initial load; lazy-load after hero is visible
- **Fonts:** `display: "swap"` prevents layout shift
- **ISR:** Set `revalidate: 60` on CMS fetches — no full rebuild needed when content changes
