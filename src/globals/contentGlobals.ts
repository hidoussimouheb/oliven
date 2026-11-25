import type { Field, GlobalConfig, Tab } from 'payload'
import { anyone, isEditorOrAdmin } from '../access/roles'
import { contentPages } from '../cms/registry'
import { fieldsFor } from '../cms/schema'
import { revalidateSite } from '../cms/revalidate'

const TEXT_HELP =
  'Pick the language with the selector at the top of the page (English, Français, العربية) and edit the text for that language. A field left empty shows the original text.'
const PHOTO_HELP = 'Upload a photo or pick one from the media library. An empty slot keeps the current photo.'

function photoTabs(photos: readonly (readonly [string, string])[]): Tab[] {
  if (!photos.length) return []
  const uploads: Field[] = photos.map(([name, label]) => ({ name, label, type: 'upload', relationTo: 'media' }))
  return [{ label: 'Photos', description: PHOTO_HELP, fields: [{ name: 'photos', label: false, type: 'group', fields: uploads }] }]
}

function makeGlobal(def: (typeof contentPages)[keyof typeof contentPages]): GlobalConfig {
  const sample = def.content.en as Record<string, unknown>
  return {
    slug: def.slug,
    label: def.label,
    admin: { group: 'Site content' },
    access: { read: anyone, update: isEditorOrAdmin },
    hooks: { afterChange: [async () => void (await revalidateSite())] },
    fields: [
      {
        type: 'tabs',
        tabs: [
          {
            label: 'Text',
            description: TEXT_HELP,
            fields: [{ name: 'content', label: false, type: 'group', localized: true, fields: fieldsFor(sample) }],
          },
          ...photoTabs(def.photos),
        ],
      },
    ],
  }
}

export const contentGlobals: GlobalConfig[] = Object.values(contentPages).map(makeGlobal)
