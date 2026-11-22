import type { CollectionConfig } from 'payload'
import { anyone, isEditorOrAdmin } from '../access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: anyone, create: isEditorOrAdmin, update: isEditorOrAdmin, delete: isEditorOrAdmin },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    imageSizes: [
      { name: 'thumb', width: 400 },
      { name: 'card', width: 900 },
      { name: 'wide', width: 1800 },
    ],
    adminThumbnail: 'thumb',
    focalPoint: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Describe the image for screen readers and search engines, in each language.' },
    },
  ],
}
