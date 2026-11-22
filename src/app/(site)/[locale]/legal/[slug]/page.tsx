import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { legalContent, legalSlugs, type LegalSlug } from '@/content/legal'
import { routing, type Locale } from '@/i18n/routing'
import { pageMetadata } from '@/lib/metadata'
import s from '@/components/sections/Page.module.css'

type Props = { params: Promise<{ locale: Locale; slug: string }> }
const isSlug = (v: string): v is LegalSlug => (legalSlugs as readonly string[]).includes(v)

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => legalSlugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isSlug(slug)) return {}
  const d = legalContent[locale][slug]
  return pageMetadata(locale, `/legal/${slug}`, d.title, d.description)
}

export default async function LegalPage({ params }: Props) {
  const { locale, slug } = await params
  if (!isSlug(slug)) notFound()
  setRequestLocale(locale)
  const d = legalContent[locale][slug]
  return (
    <>
      <SiteHeader />
      <main id="main" className={s.legal}>
        <div className={`wrap`}>
          <article className={s.legalInner}>
            <h1>{d.title}</h1>
            <p className={s.updated}>{d.updated}</p>
            {d.sections.map((sec) => (
              <section key={sec.title}>
                <h2>{sec.title}</h2>
                {sec.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </section>
            ))}
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
