import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { CtaBand } from '@/components/sections/CtaBand'
import { PageHero } from '@/components/sections/PageHero'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { photoCredits } from '@/content/credits'
import { exportPage } from '@/content/pages'
import { getContent, getPhotos } from '@/cms/get'
import { blurOf } from '@/lib/pic'
import type { Locale } from '@/i18n/routing'
import { pageMetadata } from '@/lib/metadata'
import s from '@/components/sections/Page.module.css'
import cartons from '../../../../../seed/media/shipping-cartons-mockup.png'
import stationery from '../../../../../seed/media/stationery-mockup.png'
import olivesPile from '../../../../../seed/media/stock/olives-pile.jpg'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const c = await getContent('export', locale)
  return pageMetadata(locale, '/export-partnerships', c.meta.title, c.meta.description, cartons)
}

export default async function ExportPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  const c = await getContent('export', locale)
  const home = await getContent('home', locale)
  const photo = await getPhotos('export')

  return (
    <>
      <SiteHeader overlay />
      <main id="main">
        <PageHero image={photo.get('hero', cartons)} imageAlt={c.hero.imageAlt} label={c.hero.label} title={c.hero.title} lead={c.hero.lead} />

        <section className={s.section} aria-labelledby="buyers-title">
          <div className="wrap">
            <SectionHeader id="buyers-title" label={c.buyers.label} title={c.buyers.title} lead={c.buyers.lead} />
            <ul className={s.buyers}>
              {home.partners.buyers.map((b) => (
                <li key={b.title}>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${s.section} ${s.alt}`} aria-labelledby="steps-title">
          <div className="wrap">
            <SectionHeader id="steps-title" label={c.steps.label} title={c.steps.title} />
            <ol className={s.steps}>
              {home.process.steps.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={s.section} aria-labelledby="request-title">
          <div className={`wrap ${s.split}`}>
            <div className={s.text}>
              <SectionHeader id="request-title" label={c.request.label} title={c.request.title} />
              <div className={s.prose}>
                {c.request.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <ul className={s.bullets}>
                {c.request.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <SectionHeader id="terms-title" label={c.terms.label} title={c.terms.title} />
              <div className={s.prose}>
                {c.terms.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </div>
            <figure className={s.photo} data-reveal="photo">
              <Image src={photo.get('request', stationery)} alt="" sizes="(max-width: 900px) 100vw, 50vw" {...blurOf(photo.get('request', stationery))} />
            </figure>
          </div>
        </section>

        <CtaBand title={home.closing.title} text={home.closing.text} cta={t('cta.requestQuotation')} image={photo.get('closing', olivesPile)} />
      </main>
      <SiteFooter credits={photoCredits(locale, ['John Cameron'])} />
    </>
  )
}
