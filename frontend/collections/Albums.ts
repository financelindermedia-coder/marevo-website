import type { CollectionConfig } from 'payload'

export const Albums: CollectionConfig = {
  slug: 'albums',
  admin: {
    useAsTitle: 'titleLine1',
    defaultColumns: ['titleLine1', 'titleLine2', 'label', 'order'],
  },
  fields: [
    {
      name: 'titleLine1',
      type: 'text',
      required: true,
    },
    {
      name: 'titleLine2',
      type: 'text',
    },
    {
      name: 'label',
      type: 'text',
      admin: { description: 'Eyebrow label, e.g. "New Album" or "EP 2025"' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'spotifyLink',
      type: 'text',
      admin: { description: 'Full Spotify URL' },
    },
    {
      name: 'appleMusicLink',
      type: 'text',
    },
    {
      name: 'youtubeLink',
      type: 'text',
    },
    {
      name: 'deezerLink',
      type: 'text',
    },
    {
      name: 'songs',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'duration',
          type: 'text',
          admin: { description: 'Format: MM:SS, e.g. 04:12' },
        },
        {
          name: 'trackNumber',
          type: 'number',
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Display order on the homepage (lower = first)',
        position: 'sidebar',
      },
    },
  ],
}
