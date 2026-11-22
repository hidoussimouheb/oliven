import type { Metadata } from 'next'
import { routing, type Locale } from '@/i18n/routing'

/** Title, description, canonical URL and hreflang links for a page that exists in every locale. */
export function pageMetadata(locale: Locale, path: string, title: string, description: string, image?: { src: string; width: number; height: number }): Metadata {
  const suffix = path === '/' ? '' : path
  const languages = Object.fromEntries(routing.locales.map((l) => [l, `/${l}${suffix}`]))
  return {
    title: { absolute: `${title} · óliven` },
    description,
    alternates: { canonical: `/${locale}${suffix}`, languages: { ...languages, 'x-default': `/en${suffix}` } },
    openGraph: { title, description, locale, ...(image ? { images: [{ url: image.src, width: image.width, height: image.height }] } : {}) },
  }
}
