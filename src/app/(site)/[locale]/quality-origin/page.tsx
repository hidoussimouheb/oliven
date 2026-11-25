import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { CtaBand } from '@/components/sections/CtaBand'
import { PageHero } from '@/components/sections/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { photoCredits } from '@/content/credits'
import { qualityPage } from '@/content/pages'
import { getContent, getPhotos } from '@/cms/get'
import { blurOf } from '@/lib/pic'
import type { Locale } from '@/i18n/routing'
import { pageMetadata } from '@/lib/metadata'
import s from '@/components/sections/Page.module.css'
import spout from '../../../../../seed/media/stock/mill-oil-spout.jpg'
import cluster from '../../../../../seed/media/stock/tunisia-olive-cluster.jpg'
import aerial from '../../../../../seed/media/stock/tunisia-aerial-grove.jpg'
import pourBowl from '../../../../../seed/media/stock/oil-pour-bowl.jpg'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const c = await getContent('quality', locale)
  return pageMetadata(locale, '/quality-origin', c.meta.title, c.meta.description, spout)
}

export default async function QualityPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  const c = await getContent('quality', locale)
  const closing = (await getContent('home', locale)).closing
  const photo = await getPhotos('quality')
  const f = c.labelFacts

  return (
    <>
      <SiteHeader overlay />
      <main id="main">
        <PageHero image={photo.get('hero', spout)} imageAlt={c.hero.imageAlt} label={c.hero.label} title={c.hero.title} lead={c.hero.lead} />

        <section className={s.section} aria-labelledby="origin-title">
          <div className={`wrap ${s.stack}`}>
            <SectionHeader id="origin-title" label={c.origin.label} title={c.origin.title} />
            <div className={s.prose}>
              {c.origin.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <ul className={s.points}>
              {c.origin.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className={`wrap ${s.pair}`} style={{ marginTop: 'var(--s-7)' }}>
            <figure data-reveal="photo">
              <Image src={photo.get('originA', aerial)} alt={c.galleryAlts[1] ?? ''} sizes="(max-width: 768px) 100vw, 50vw" {...blurOf(photo.get('originA', aerial))} />
            </figure>
            <figure data-reveal="photo">
              <Image src={photo.get('originB', cluster)} alt={c.galleryAlts[0] ?? ''} sizes="(max-width: 768px) 100vw, 50vw" {...blurOf(photo.get('originB', cluster))} />
            </figure>
          </div>
        </section>

        <section className={`${s.section} ${s.alt}`} aria-labelledby="label-title">
          <div className={`wrap ${s.split}`} style={{ alignItems: 'start' }}>
            <div className={s.text}>
              <SectionHeader id="label-title" label={f.label} title={f.title} lead={f.lead} />
              <blockquote className={s.statement}>{f.statement}</blockquote>
            </div>
            <table className={s.nutrition}>
              <caption>{f.nutritionTitle}</caption>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="visually-hidden">{f.nutritionTitle}</span>
                  </th>
                  <th scope="col" style={{ textAlign: 'end' }}>
                    {f.per}
                  </th>
                </tr>
              </thead>
              <tbody>
                {f.rows.map(([k, v], i) => (
                  <tr key={k}>
                    <th scope="row" className={[2, 3, 4, 6].includes(i) ? s.sub : undefined}>
                      {k}
                    </th>
                    <td dir="ltr">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={s.section} aria-labelledby="docs-title">
          <div className={`wrap ${s.split} ${s.reverse}`}>
            <div className={s.text}>
              <SectionHeader id="docs-title" label={c.documents.label} title={c.documents.title} />
              <div className={s.prose}>
                {c.documents.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <ButtonLink href="/contact" variant="outline">
                {c.documents.cta}
              </ButtonLink>
            </div>
            <figure className={s.photo} data-reveal="photo">
              <Image src={photo.get('documents', pourBowl)} alt="" sizes="(max-width: 900px) 100vw, 50vw" {...blurOf(photo.get('documents', pourBowl))} />
            </figure>
          </div>
        </section>

        <CtaBand title={closing.title} text={closing.text} cta={t('cta.requestQuotation')} image={photo.get('closing', cluster)} />
      </main>
      <SiteFooter credits={photoCredits(locale, ['Xavier von Erlach', 'Strigoo Studios', 'Mohamed Fsili', 'Asli Dokuzeylul'])} />
    </>
  )
}
