# MAREVO — Design Specifications

## Visual Identity

**Aesthetic:** Cinematic luxury. The site should feel like a Netflix title card crossed with a high-end fragrance website — warm, dark, immersive.

**Mood words:** Soulful · Intimate · Cinematic · Warm · Elevated

---

## Color System

| Token | Hex | Usage |
|-------|-----|-------|
| `marevo-umber` | `#1A1110` | Page background, deepest dark |
| `marevo-dark` | `#2C1B18` | Card backgrounds, elevated surfaces |
| `marevo-gold` | `#FFAB40` | Primary accent, CTAs, headings |
| `marevo-cream` | `#FFF9F2` | Body text, secondary content |

**Opacity variants** (Tailwind shorthand):
- `text-marevo-cream/70` — body copy
- `text-marevo-cream/40` — secondary info (track numbers, timestamps)
- `text-marevo-cream/25` — footer, metadata
- `text-marevo-gold/60` — section labels, eyebrows
- `border-marevo-gold/10` — subtle gold borders

---

## Typography

| Role | Font | Weight | Class |
|------|------|--------|-------|
| Display / Hero title | Cormorant Garamond | 300–400 | `font-serif` |
| Album titles | Cormorant Garamond | 400–500 | `font-serif` |
| Section headings | Cormorant Garamond | 400 | `font-serif` |
| Body copy | Montserrat | 300–400 | `font-sans` |
| Eyebrows / labels | Montserrat | 300 | `font-sans uppercase tracking-widest` |
| Track numbers | Monospace | 400 | `font-mono` |

**Scale:**
- Hero title: `text-8xl md:text-[10rem] lg:text-[12rem]`
- Album title: `text-3xl md:text-4xl lg:text-5xl`
- Section heading: `text-4xl md:text-6xl`
- Eyebrow: `text-xs tracking-[0.35em] uppercase`
- Body: `text-sm md:text-base leading-relaxed`

---

## Glassmorphism Card

```css
.glass-card {
  background: rgba(20, 14, 13, 0.45);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 171, 64, 0.08);
}
```

**Tailwind utility equivalent** (for inline use without the class):
```
bg-white/5 backdrop-blur-xl border border-marevo-gold/10
```

---

## Layout Breakpoints

| Breakpoint | Width | Album layout | Tracklist |
|-----------|-------|-------------|-----------|
| Mobile | < 640px | Single column | 1 column |
| Tablet | 640px–1024px | Single column | 2 columns |
| Desktop | > 1024px | 5/12 + 7/12 grid | 2 columns |

---

## Hero Section

- **Background:** Fullscreen video (`hero.mp4`) with `object-fit: cover`, looping, muted, auto-play
- **Overlay:** `bg-black/50` darkening layer above video
- **Fallback:** CSS gradient when no video/image is present
- **Title:** `MAREVO` — `font-serif text-white tracking-wider`
- **Eyebrow:** `"Summer Music Collection"` — gold, small caps, letter-spaced
- **Scroll indicator:** Animated gradient line + "Scroll to explore" label

**Video specs for `hero.mp4`:**
- Resolution: 1920×1080 or higher
- Duration: 8–12 second loop
- Codec: H.264 (MP4) + WebM fallback
- Mood: Kizomba couple, slow-motion, golden hour / warm light

---

## Album Card Anatomy

```
┌─────────────────────────────────────────────────────────────┐
│  glass-card (rounded-3xl, p-8 md:p-12)                      │
│                                                             │
│  ┌──────────────────┐  ┌────────────────────────────────┐  │
│  │                  │  │  [ALBUM eyebrow]                │  │
│  │   Album Cover    │  │  Album Title (serif, gold)      │  │
│  │   280×280px      │  │  Description text (cream/70)   │  │
│  │                  │  │                                │  │
│  │                  │  │  [Listen Now] button            │  │
│  └──────────────────┘  │                                │  │
│                         │  ──── Tracklist ────           │  │
│                         │  01  Song Title    03:45  +    │  │
│                         │  02  Song Title    04:12  +    │  │
│                         │  ...                           │  │
│                         └────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Song Row States

| State | Track No | Title | Duration |
|-------|---------|-------|----------|
| Default | `01` (cream/40) | cream | cream/40 |
| Hover | ▶ (gold icon) | gold | cream/40 |

---

## Asset Requirements

| Asset | Size | Format | Path |
|-------|------|--------|------|
| Hero background | 1920×1080+ | JPG/WebP | `/public/hero-bg.jpg` |
| Hero video | 1920×1080 | MP4 + WebM | `/public/hero.mp4` |
| Album cover | 800×800 | JPG/WebP | Via Payload CMS media |
| Placeholder cover | 400×400 | SVG | `/public/placeholder-cover.svg` |
| Artist photo | 1200×1600 | JPG/WebP | Via Payload CMS media |

**Image generation prompt template:**
> "Cinematic, luxury photography, [subject], warm golden hour light, deep shadows, rich amber tones, high-end editorial style, 35mm film aesthetic"
