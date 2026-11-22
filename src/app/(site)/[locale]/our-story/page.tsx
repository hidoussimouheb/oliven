import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { CtaBand } from '@/components/sections/CtaBand'
import { PageHero } from '@/components/sections/PageHero'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ButtonLink } from '@/components/ui/Button'
import { homeContent } from '@/content/home'
import { storyPage } from '@/content/pages'
import { photoCredits } from '@/content/credits'
import type { Locale } from '@/i18n/routing'
import { pageMetadata } from '@/lib/metadata'
import s from '@/components/sections/Page.module.css'
import grovePath from '../../../../../seed/media/stock/tunisia-grove-path.jpg'
import branch from '../../../../../seed/media/stock/tunisia-olive-branch.jpg'
import cartons from '../../../../../seed/media/shipping-cartons-mockup.png'
import handOlives from '../../../../../seed/media/stock/harvest-hand-olives.jpg'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const c = storyPage[locale]
  return pageMetadata(locale, '/our-story', c.meta.title, c.meta.description, grovePath)
}

export default async function StoryPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  const c = storyPage[locale]
  const closing = homeContent[locale].closing

  return (
    <>
      <SiteHeader overlay />
      <main id="main">
        <PageHero image={grovePath} imageAlt={c.hero.imageAlt} label={c.hero.label} title={c.hero.title} lead={c.hero.lead} />

        <section className={s.section} aria-labelledby="tunisia-title">
          <div className={`wrap ${s.split}`}>
            <div className={s.text}>
              <SectionHeader id="tunisia-title" label={c.tunisia.label} title={c.tunisia.title} />
              <div className={s.prose}>
                {c.tunisia.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </div>
            <figure className={s.photo}>
              <Image src={branch} alt={c.tunisia.imageAlt} sizes="(max-width: 900px) 100vw, 50vw" placeholder="blur" />
            </figure>
          </div>
        </section>

        <section className={`${s.section} ${s.alt}`} aria-labelledby="model-title">
          <div className={`wrap ${s.split} ${s.reverse}`}>
            <div className={s.text}>
              <SectionHeader id="model-title" label={c.model.label} title={c.model.title} />
              <div className={s.prose}>
                {c.model.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <ul className={s.points}>
                {c.model.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <figure className={s.photo}>
              <Image src={handOlives} alt="" sizes="(max-width: 900px) 100vw, 50vw" placeholder="blur" />
            </figure>
          </div>
        </section>

        <section className={s.section} aria-labelledby="label-title">
          <div className={`wrap ${s.split}`}>
            <div className={s.text}>
              <SectionHeader id="label-title" label={c.label.label} title={c.label.title} />
              <div className={s.prose}>
                {c.label.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <ButtonLink href="/olive-oil" variant="outline">
                {t('nav.oliveOil')}
              </ButtonLink>
            </div>
            <figure className={s.photo}>
              <Image src={cartons} alt={c.label.imageAlt} sizes="(max-width: 900px) 100vw, 50vw" placeholder="blur" />
            </figure>
          </div>
        </section>

        <CtaBand title={closing.title} text={closing.text} cta={t('cta.requestQuotation')} image={branch} />
      </main>
      <SiteFooter credits={photoCredits(locale, ['Mohamed Fsili', 'Sophie Laurent'])} />
    </>
  )
}
