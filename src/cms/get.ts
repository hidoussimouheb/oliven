import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Locale } from '@/i18n/routing'
import { siteDefaults } from '@/config/site'
import { contentPages, type ContentKey, type ContentOf } from './registry'
import { fromCms } from './schema'

import type { Pic } from '@/lib/pic'

type MediaDoc = { url?: string | null; width?: number | null; height?: number | null; sizes?: Record<string, { url?: string | null; width?: number | null; height?: number | null }> }

const loadGlobal = cache(async (slug: string, locale: Locale): Promise<Record<string, unknown> | null> => {
  try {
    const payload = await getPayload({ config })
    // The cast keeps this generic across globals; each page reads its fields through the typed registry.
    const doc = await payload.findGlobal({ slug: slug as never, locale, fallbackLocale: false, depth: 1 })
    return doc as unknown as Record<string, unknown>
  } catch {
    // No database (for example a build machine without one): show the default copy.
    return null
  }
})

/** The page copy for one language, with the default copy filling any empty field. */
export async function getContent<K extends ContentKey>(key: K, locale: Locale): Promise<ContentOf<K>> {
  const def = contentPages[key]
  const fallback = def.content[locale] as ContentOf<K>
  const doc = await loadGlobal(def.slug, locale)
  return fromCms(doc?.content, fallback)
}

/** The photos chosen in the admin for a page. Slots left empty use the given bundled photo. */
export async function getPhotos(key: ContentKey) {
  const doc = await loadGlobal(contentPages[key].slug, 'en')
  const chosen = (doc?.photos ?? {}) as Record<string, MediaDoc | string | null | undefined>
  const find = (slot: string): Pic | null => {
    const m = chosen[slot]
    if (!m || typeof m === 'string' || !m.url || !m.width || !m.height) return null
    // Payload returns an absolute URL on this server; a site-relative path lets next/image treat it as a local file.
    const u = new URL(m.url, 'http://local')
    return { src: u.pathname + u.search, width: m.width, height: m.height }
  }
  return {
    /** The uploaded photo, or the bundled one. */
    get: (slot: string, fallback: Pic): Pic => find(slot) ?? fallback,
    /** The uploaded photo, or nothing. */
    find,
  }
}

export type Settings = { company: string; email: string; phones: string[]; city: string }

export const getSettings = cache(async (locale: Locale): Promise<Settings> => {
  const doc = (await loadGlobal('site-settings', locale)) as { company?: string; email?: string; phones?: { number?: string }[]; city?: string } | null
  const phones = (doc?.phones ?? []).map((p) => p.number?.trim()).filter((p): p is string => Boolean(p))
  return {
    company: doc?.company?.trim() || siteDefaults.company,
    email: doc?.email?.trim() || siteDefaults.email,
    phones: phones.length ? phones : [...siteDefaults.phones],
    city: doc?.city?.trim() || siteDefaults.city[locale],
  }
})

/** The photo of each format: the one uploaded in the admin, else the bundled 2 L photo, else none (placeholder). */
export async function getProductPhotos() {
  const p = await getPhotos('products')
  const { default: tin2l } = await import('../../seed/media/tin-2l-mockup-scene.png')
  return (slug: string): Pic | null => p.find(slug) ?? (slug === 'tin-2l' ? tin2l : null)
}
