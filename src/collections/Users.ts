import type { CollectionConfig } from 'payload'
import { adminFieldOnly, isAdmin } from '../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email', defaultColumns: ['email', 'name', 'role'] },
  auth: {
    tokenExpiration: 60 * 60 * 8, // 8 hours
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000, // 10 minutes
    cookies: { sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' },
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    // Users can read and update themselves; admins everyone
    read: ({ req }) => (req.user ? ((req.user as { role?: string }).role === 'admin' ? true : { id: { equals: req.user.id } }) : false),
    update: ({ req }) => (req.user ? ((req.user as { role?: string }).role === 'admin' ? true : { id: { equals: req.user.id } }) : false),
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      access: { create: adminFieldOnly, update: adminFieldOnly },
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor (content and products)', value: 'editor' },
        { label: 'Sales (quotation requests)', value: 'sales' },
      ],
    },
  ],
}
