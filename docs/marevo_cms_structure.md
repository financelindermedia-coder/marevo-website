# MAREVO — CMS Structure (Payload CMS 3)

## Why Payload CMS

Payload CMS 3 runs as a Next.js plugin — it shares the same server process and PostgreSQL database. No separate infra needed beyond the Hetzner server.

```
Next.js 16 (frontend) + Payload CMS 3 (admin) → same Node.js process
                ↓
          PostgreSQL 15 (same Hetzner server or managed DB)
```

---

## Installation

```bash
# Add Payload to existing Next.js project
npx create-payload-app@latest --template with-nextjs

# Or add to existing project
npm install payload @payloadcms/next @payloadcms/db-postgres
```

`payload.config.ts`:
```typescript
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { Albums } from './collections/Albums'
import { Songs } from './collections/Songs'
import { Media } from './collections/Media'

export default buildConfig({
  serverURL: process.env.PAYLOAD_URL,
  secret: process.env.PAYLOAD_SECRET,
  db: postgresAdapter({
    pool: { connectionString: process.env.POSTGRES_URI },
  }),
  collections: [Albums, Songs, Media],
  admin: {
    user: 'users',
  },
})
```

---

## Collections

### Albums Collection

```typescript
// collections/Albums.ts
import type { CollectionConfig } from 'payload'

export const Albums: CollectionConfig = {
  slug: 'albums',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'releaseDate', 'status'],
  },
  fields: [
    { name: 'title',       type: 'text',     required: true },
    { name: 'slug',        type: 'text',     required: true, unique: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'releaseDate', type: 'date' },
    {
      name: 'links',
      type: 'group',
      fields: [
        { name: 'spotify',    type: 'text', label: 'Spotify URL' },
        { name: 'appleMusic', type: 'text', label: 'Apple Music URL' },
        { name: 'youtube',    type: 'text', label: 'YouTube URL' },
      ],
    },
    {
      name: 'songs',
      type: 'array',
      minRows: 1,
      maxRows: 20,
      fields: [
        { name: 'trackNumber', type: 'number',  required: true },
        { name: 'title',       type: 'text',    required: true },
        { name: 'duration',    type: 'text',    required: true, admin: { placeholder: '03:45' } },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published'],
      defaultValue: 'draft',
      admin: { position: 'sidebar' },
    },
    { name: 'sortOrder', type: 'number', admin: { position: 'sidebar' } },
  ],
}
```

### Media Collection

```typescript
// collections/Media.ts
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'public/media',
    imageSizes: [
      { name: 'thumbnail', width: 400,  height: 400,  crop: 'center' },
      { name: 'card',      width: 800,  height: 800,  crop: 'center' },
      { name: 'full',      width: 1920, height: 1080, crop: 'center' },
    ],
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
  },
  fields: [{ name: 'alt', type: 'text' }],
}
```

---

## Connecting Frontend to CMS

Replace the mock import in `app/page.tsx`:

```typescript
// app/page.tsx
import type { Album } from '@/types'

async function getAlbums(): Promise<Album[]> {
  const res = await fetch(
    `${process.env.PAYLOAD_URL}/api/albums?where[status][equals]=published&sort=sortOrder&depth=1`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) return []
  const { docs } = await res.json()

  // Map Payload response to your Album interface
  return docs.map((doc: any) => ({
    id:               doc.id,
    title:            doc.title,
    description:      doc.description,
    coverImage:       doc.cover?.url ?? '/placeholder-cover.svg',
    backgroundImage:  doc.backgroundImage?.url ?? '',
    spotifyLink:      doc.links?.spotify ?? '#',
    appleMusicLink:   doc.links?.appleMusic ?? '#',
    youtubeLink:      doc.links?.youtube ?? '#',
    songs:            doc.songs.map((s: any) => ({
      id:          String(s.trackNumber),
      title:       s.title,
      duration:    s.duration,
      trackNumber: s.trackNumber,
    })),
  }))
}
```

---

## Admin Panel Access

After deployment: `https://marevo.com/admin`

First-time setup creates an admin user. Recommended workflow:
1. Log in at `/admin`
2. Create albums with cover art
3. Add songs with track numbers and durations
4. Set status to `published`
5. Set `sortOrder` to control display sequence

---

## Database Backup

```bash
# Manual backup (run on Hetzner server)
pg_dump -U postgres marevo > backup_$(date +%Y%m%d).sql

# Restore
psql -U postgres marevo < backup_20260529.sql
```

Coolify supports automated daily snapshots — enable in Coolify → Project → Settings → Backups.
