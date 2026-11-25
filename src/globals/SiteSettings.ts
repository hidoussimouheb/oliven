import type { GlobalConfig } from 'payload'
import { anyone, isEditorOrAdmin } from '../access/roles'
import { revalidateSite } from '../cms/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Company details',
  admin: { group: 'Site content', description: 'Shown in the footer, on the contact page and in the closing bands.' },
  access: { read: anyone, update: isEditorOrAdmin },
  hooks: { afterChange: [async () => void (await revalidateSite())] },
  fields: [
    { name: 'company', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'phones', type: 'array', labels: { singular: 'Phone', plural: 'Phones' }, fields: [{ name: 'number', type: 'text' }] },
    { name: 'city', label: 'City and country', type: 'text', localized: true },
  ],
}
