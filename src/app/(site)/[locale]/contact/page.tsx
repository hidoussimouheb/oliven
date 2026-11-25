import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { productSlugs } from '@/content/products'
import { getContent, getSettings } from '@/cms/get'
import type { Locale } from '@/i18n/routing'
import { countryOptions } from '@/lib/countries'
import { pageMetadata } from '@/lib/metadata'
import { QuoteForm } from './QuoteForm'
import s from './contact.module.css'

type Props = { params: Promise<{ locale: Locale }>; searchParams: Promise<{ format?: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  return pageMetadata(locale, '/contact', t('title'), t('metaDescription'))
}

export default async function ContactPage({ params, searchParams }: Props) {
  const { locale } = await params
  const { format } = await searchParams
  setRequestLocale(locale)
  const t = await getTranslations('contact')
  const products = await getContent('products', locale)
  const settings = await getSettings(locale)
  const preselected = format && (productSlugs as readonly string[]).includes(format) ? format : undefined

  return (
    <>
      <SiteHeader />
      <main id="main" className={s.page}>
        <div className={`wrap ${s.grid}`}>
          <div className={s.intro}>
            <span className="label">{t('label')}</span>
            <h1>{t('title')}</h1>
            <p className="lead">{t('lead')}</p>
            <dl className={s.details}>
              <div>
                <dt>{t('email')}</dt>
                <dd dir="ltr">
                  <a href={`mailto:${settings.email}`}>{settings.email}</a>
                </dd>
              </div>
              <div>
                <dt>{t('phone')}</dt>
                {settings.phones.map((p) => (
                  <dd key={p} dir="ltr">
                    <a href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>
                  </dd>
                ))}
              </div>
              <div>
                <dt>{t('address')}</dt>
                <dd>
                  {settings.company}
                  <br />
                  {settings.city}
                </dd>
              </div>
            </dl>
          </div>
          <div className={s.panel}>
            <QuoteForm
              key={preselected ?? 'none'}
              locale={locale}
              countries={countryOptions(locale)}
              formats={productSlugs.map((slug) => ({ value: slug, label: `${products[slug].volume} · ${products[slug].material}` }))}
              preselected={preselected}
              contactEmail={settings.email}
            />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
