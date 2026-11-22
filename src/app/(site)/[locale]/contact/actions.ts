'use server'

import { createHash } from 'node:crypto'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import { z } from 'zod'
import config from '@payload-config'
import { businessTypes, quantityUnits } from '@/collections/Inquiries'
import { productSlugs } from '@/content/products'
import { countryCodes } from '@/lib/countries'
import { routing } from '@/i18n/routing'

export type FieldName =
  | 'fullName'
  | 'company'
  | 'email'
  | 'country'
  | 'phone'
  | 'businessType'
  | 'formats'
  | 'quantity'
  | 'destination'
  | 'message'
  | 'consent'

export type QuoteState =
  | { status: 'idle' }
  | { status: 'invalid'; errors: Partial<Record<FieldName, 'required' | 'email' | 'number' | 'consent' | 'formats'>>; values: Record<string, string | string[]> }
  | { status: 'error' | 'rate'; values: Record<string, string | string[]> }
  | { status: 'ok'; email: string }

const text = (max: number) => z.string().trim().max(max)

const schema = z.object({
  fullName: text(120).min(1, 'required'),
  company: text(160).min(1, 'required'),
  email: z.string().trim().max(200).min(1, 'required').pipe(z.email('email')),
  country: z.enum(countryCodes as [string, ...string[]], 'required'),
  phone: text(40).optional(),
  businessType: z.enum(businessTypes, 'required'),
  formats: z.array(z.enum(productSlugs)).min(1, 'formats'),
  quantity: z
    .string()
    .trim()
    .optional()
    .transform((v, ctx) => {
      if (!v) return undefined
      const n = Number(v.replace(/[\s,]/g, ''))
      if (!Number.isFinite(n) || n <= 0 || n > 1e9) {
        ctx.addIssue({ code: 'custom', message: 'number' })
        return z.NEVER
      }
      return n
    }),
  quantityUnit: z.enum(quantityUnits).optional(),
  destination: text(160).optional(),
  message: text(4000).optional(),
  consent: z.literal('on', 'consent'),
  locale: z.enum(routing.locales),
})

// Simple per-IP limit: 5 requests per hour per server process. Phase 9 moves this to a shared store.
const WINDOW_MS = 60 * 60 * 1000
const LIMIT = 5
const hits = new Map<string, number[]>()
function rateLimited(key: string) {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= LIMIT) {
    hits.set(key, recent)
    return true
  }
  recent.push(now)
  hits.set(key, recent)
  return false
}

export async function submitQuote(_prev: QuoteState, form: FormData): Promise<QuoteState> {
  const values: Record<string, string | string[]> = {}
  for (const key of ['fullName', 'company', 'email', 'country', 'phone', 'businessType', 'quantity', 'quantityUnit', 'destination', 'message', 'consent']) {
    values[key] = String(form.get(key) ?? '')
  }
  values.formats = form.getAll('formats').map(String)

  // Honeypot: real visitors never see or fill this field.
  if (String(form.get('website') ?? '') !== '') return { status: 'ok', email: values.email as string }

  const parsed = schema.safeParse({
    ...values,
    phone: values.phone || undefined,
    quantity: values.quantity || undefined,
    quantityUnit: values.quantityUnit || undefined,
    destination: values.destination || undefined,
    message: values.message || undefined,
    consent: values.consent || undefined,
    locale: String(form.get('locale') ?? ''),
  })

  if (!parsed.success) {
    const errors: Extract<QuoteState, { status: 'invalid' }>['errors'] = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as FieldName | undefined
      if (!field || errors[field]) continue
      const m = issue.message
      errors[field] = m === 'email' || m === 'number' || m === 'consent' || m === 'formats' ? m : 'required'
    }
    return { status: 'invalid', errors, values }
  }

  const h = await headers()
  const ip = (h.get('x-forwarded-for')?.split(',')[0] ?? h.get('x-real-ip') ?? 'unknown').trim()
  const ipHash = createHash('sha256')
    .update(`${process.env.PAYLOAD_SECRET ?? ''}:${ip}`)
    .digest('hex')
    .slice(0, 32)
  if (rateLimited(ipHash)) return { status: 'rate', values }

  const d = parsed.data
  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'inquiries',
      overrideAccess: true,
      data: {
        status: 'new',
        fullName: d.fullName,
        company: d.company,
        email: d.email,
        phone: d.phone,
        country: d.country,
        businessType: d.businessType,
        formats: d.formats,
        quantity: d.quantity,
        quantityUnit: d.quantity ? (d.quantityUnit ?? 'units') : undefined,
        destination: d.destination,
        message: d.message,
        locale: d.locale,
        sourcePage: `/${d.locale}/contact`,
        consentAt: new Date().toISOString(),
        ipHash,
      },
    })
  } catch (err) {
    console.error('[quote] could not save inquiry', err)
    return { status: 'error', values }
  }
  return { status: 'ok', email: d.email }
}
