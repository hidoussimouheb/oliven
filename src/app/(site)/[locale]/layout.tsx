import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { ReactNode } from 'react'
import { dirFor, routing, type Locale } from '@/i18n/routing'
import { fontVariables } from '@/styles/fonts'
import '@/styles/base.css'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  themeColor: '#2b401a',
  viewportFit: 'cover',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  return {
    metadataBase: new URL(base),
    title: { default: t('defaultTitle'), template: `%s · ${t('siteName')}` },
    description: t('defaultDescription'),
    icons: { icon: '/favicon.svg' },
    openGraph: { siteName: t('siteName'), locale, type: 'website' },
  }
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'nav' })

  return (
    <html lang={locale} dir={dirFor(locale as Locale)} className={fontVariables}>
      <body>
        <a className="skip-link" href="#main">
          {t('skip')}
        </a>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
