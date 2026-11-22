import type { Locale } from '@/i18n/routing'

/** One footer line crediting the Unsplash photographers shown on a page. */
export function photoCredits(locale: Locale, names: string[]) {
  const list = new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' }).format([...new Set(names)])
  return { en: `Photographs: ${list} on Unsplash.`, fr: `Photographies : ${list} sur Unsplash.`, ar: `الصور: ${list} على Unsplash.` }[locale]
}
