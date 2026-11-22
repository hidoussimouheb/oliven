import type { CollectionConfig } from 'payload'
import { isAdmin, isSalesOrAdmin } from '../access/roles'
import { productSlugs } from '../content/products'

export const businessTypes = ['importer', 'distributor', 'retail', 'specialty', 'foodservice', 'other'] as const
export const quantityUnits = ['units', 'cartons', 'litres'] as const

/**
 * Quotation requests from the public Contact form.
 * Nobody creates them through the API: the form's server action writes them with the local API.
 * Sales and Admin read and update them; only Admin deletes.
 */
export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: { singular: 'Quotation request', plural: 'Quotation requests' },
  admin: {
    useAsTitle: 'company',
    defaultColumns: ['company', 'fullName', 'country', 'status', 'createdAt'],
    group: 'Sales',
  },
  access: {
    create: () => false,
    read: isSalesOrAdmin,
    update: isSalesOrAdmin,
    delete: isAdmin,
  },
  timestamps: true,
  fields: [
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      type: 'row',
      fields: [
        { name: 'fullName', type: 'text', required: true, admin: { readOnly: true } },
        { name: 'company', type: 'text', required: true, admin: { readOnly: true } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email', required: true, admin: { readOnly: true } },
        { name: 'phone', type: 'text', admin: { readOnly: true } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'country', type: 'text', required: true, admin: { readOnly: true, description: 'ISO country code' } },
        {
          name: 'businessType',
          type: 'select',
          required: true,
          options: businessTypes.map((v) => ({ label: v, value: v })),
          admin: { readOnly: true },
        },
      ],
    },
    {
      name: 'formats',
      type: 'select',
      hasMany: true,
      options: productSlugs.map((v) => ({ label: v, value: v })),
      admin: { readOnly: true },
    },
    {
      type: 'row',
      fields: [
        { name: 'quantity', type: 'number', min: 0, admin: { readOnly: true } },
        { name: 'quantityUnit', type: 'select', options: quantityUnits.map((v) => ({ label: v, value: v })), admin: { readOnly: true } },
      ],
    },
    { name: 'destination', type: 'text', admin: { readOnly: true } },
    { name: 'message', type: 'textarea', admin: { readOnly: true } },
    {
      name: 'notes',
      type: 'array',
      label: 'Internal notes',
      fields: [
        { name: 'note', type: 'textarea', required: true },
        { name: 'author', type: 'text', admin: { readOnly: true } },
        { name: 'date', type: 'date', admin: { readOnly: true } },
      ],
    },
    {
      type: 'collapsible',
      label: 'Technical details',
      admin: { initCollapsed: true },
      fields: [
        { name: 'locale', type: 'text', admin: { readOnly: true } },
        { name: 'sourcePage', type: 'text', admin: { readOnly: true } },
        { name: 'consentAt', type: 'date', admin: { readOnly: true } },
        { name: 'ipHash', type: 'text', admin: { readOnly: true, description: 'Salted hash, not the raw IP' } },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        // Stamp author and date on new notes.
        const user = req.user as { email?: string } | null
        if (Array.isArray(data?.notes)) {
          data.notes = data.notes.map((n: { author?: string; date?: string }) => ({
            ...n,
            author: n.author || user?.email || 'unknown',
            date: n.date || new Date().toISOString(),
          }))
        }
        return data
      },
    ],
  },
}
