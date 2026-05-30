# MAREVO — Frontend Logic

## Component Map

```
app/page.tsx (Server Component)
│
├── <Hero />                    (Client — Framer Motion)
│
├── {albums.map(album =>
│     <AlbumSection album={album} />  (Client — useState, Image)
│       ├── <StreamingModal />        (Client — AnimatePresence)
│       └── {songs.map(song =>
│             <SongRow song={song} /> (Client — hover state via CSS group)
│           )}
│   )}
│
├── <section> Story/About </section>  (Static HTML)
│
└── <footer> </footer>                (Static HTML)
```

---

## Hero Animation Sequence

```
t=0.0s  — page loads
t=0.0s  — eyebrow text begins fade-in (opacity 0→1, y 30→0, 1.2s)
t=0.4s  — MAREVO title begins fade-in (same animation, slight delay)
t=1.0s  — divider line appears
t=1.4s  — scroll indicator appears + begins loop animation
```

**Scroll indicator loop:**
- Gold gradient line, `scaleY: 0 → 1 → 0` with `origin-top`
- Repeats every 1.6s with `easeInOut`

To replace the static background with a video:
```tsx
// In Hero.tsx — swap the div with:
<video
  autoPlay
  muted
  loop
  playsInline
  className="w-full h-full object-cover"
>
  <source src="/hero.mp4" type="video/mp4" />
  <source src="/hero.webm" type="video/webm" />
</video>
```

---

## AlbumSection Animation

Uses `whileInView` — triggers when 20% of the card enters the viewport:

```typescript
initial={{ opacity: 0, y: 50 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: "easeOut" }}
viewport={{ once: false, amount: 0.2 }}
```

- `once: false` means the animation re-triggers when scrolling back up
- Change to `once: true` if you want each album to animate in only on first view

**Adding stagger to song rows:**
```typescript
// Wrap each SongRow with:
<motion.div
  initial={{ opacity: 0, x: -10 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ delay: song.trackNumber * 0.05, duration: 0.4 }}
  viewport={{ once: true }}
>
  <SongRow song={song} />
</motion.div>
```

---

## StreamingModal Logic

State lives in `AlbumSection` (the parent):
```typescript
const [modalOpen, setModalOpen] = useState(false);

// Open: onClick of "Listen Now" button
// Close: backdrop click OR X button
```

The modal uses `AnimatePresence` to enable exit animations. The backdrop and modal panel animate independently for a layered feel.

**Adding audio preview:**
```typescript
// In SongRow.tsx, add a play handler:
const handlePreview = () => {
  const audio = new Audio(`/previews/${song.id}.mp3`);
  audio.play();
};
```

---

## Responsive Behavior

| Element | Mobile (< 640px) | Tablet (640–1024px) | Desktop (> 1024px) |
|---------|-----------------|--------------------|--------------------|
| Album card layout | Stacked | Stacked | 5/12 + 7/12 side-by-side |
| Album cover size | 256×256 | 320×320 | 320×320 |
| Tracklist | 1 column | 2 columns | 2 columns |
| Hero title | `text-8xl` | `text-[10rem]` | `text-[12rem]` |
| Padding | `px-4` | `px-10` | `px-10` |

---

## Adding a New Section

To add the **Discography Grid** (all albums in a grid):

```tsx
// components/Discography.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Album } from "@/types";

export const Discography = ({ albums }: { albums: Album[] }) => (
  <section className="py-24 px-6 max-w-6xl mx-auto">
    <p className="text-marevo-gold/60 text-xs uppercase tracking-[0.35em] font-sans mb-2 text-center">
      Discography
    </p>
    <h2 className="font-serif text-marevo-cream text-4xl md:text-5xl text-center mb-16">
      All Releases
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {albums.map((album, i) => (
        <motion.div
          key={album.id}
          className="group cursor-pointer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
            <Image src={album.coverImage} alt={album.title} fill
              className="object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <p className="font-serif text-marevo-cream text-lg">{album.title}</p>
          <p className="font-sans text-marevo-cream/40 text-xs">{album.songs.length} tracks</p>
        </motion.div>
      ))}
    </div>
  </section>
);
```

---

## Error States & Loading

The album cover uses an `onError` fallback to a CSS gradient (no broken image icon):

```typescript
const [imgError, setImgError] = useState(false);
// ...
onError={() => setImgError(true)}
// If imgError: show <div> gradient instead of <Image>
```

For CMS fetch errors, `getAlbums()` returns `[]` — the page renders without album sections (no crash). Add a proper error boundary for production.
