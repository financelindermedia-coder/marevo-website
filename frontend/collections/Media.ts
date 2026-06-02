import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: '../public/uploads',
    imageSizes: [
      { name: 'cover', width: 800, height: 800, crop: 'center' },
      { name: 'background', width: 1920, height: 1080, crop: 'center' },
    ],
    adminThumbnail: 'cover',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
}
