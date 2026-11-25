import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { Hero } from '@/components/sections/Hero'
import { ButtonLink } from '@/components/ui/Button'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { ProductCard } from '@/components/ui/ProductCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { homeContent } from '@/content/home'
import { routing, type Locale } from '@/i18n/routing'
import { siteDefaults } from '@/config/site'
import tinScene from '../../../../seed/media/tin-2l-mockup-scene.png'
import tinOlives from '../../../../seed/media/tin-2l-olives-scene.jpg'
import cartons from '../../../../seed/media/shipping-cartons-mockup.png'
import aerial from '../../../../seed/media/stock/tunisia-aerial-grove.jpg'
import oliveTree from '../../../../seed/media/stock/tunisia-olive-tree.jpg'
import oliveBranch from '../../../../seed/media/stock/tunisia-olive-cluster.jpg'
import grovePath from '../../../../seed/media/stock/tunisia-grove-path.jpg'
import picking from '../../../../seed/media/stock/harvest-picking.jpg'
import sorting from '../../../../seed/media/stock/harvest-sorting.jpg'
import spout from '../../../../seed/media/stock/mill-oil-spout.jpg'
import olivesPile from '../../../../seed/media/stock/olives-pile.jpg'
import { Journey } from '@/components/sections/Journey'
import { OriginMarquee } from '@/components/motion/OriginMarquee'
import { RotatingBadge } from '@/components/motion/RotatingBadge'
import s from './home.module.css'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const c = homeContent[locale]
  const languages = Object.fromEntries(routing.locales.map((l) => [l, `/${l}`]))
  return {
    title: { absolute: `óliven · ${c.meta.title}` },
    description: c.meta.description,
    alternates: { canonical: `/${locale}`, languages: { ...languages, 'x-default': '/en' } },
    openGraph: { title: c.meta.title, description: c.meta.description, images: [{ url: tinScene.src, width: tinScene.width, height: tinScene.height }] },
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  const c = homeContent[locale]
  const country = locale === 'ar' ? 'تونس' : locale === 'fr' ? 'Tunisie' : 'Tunisia'

  return (
    <>
      <SiteHeader overlay />
      <main id="main">
        <Hero
          image={aerial}
          imageAlt={c.origin.galleryAlts[0]}
          label={c.hero.label}
          title={c.hero.title}
          text={c.hero.text}
          facts={c.hero.facts}
          bigWord={country}
          badge={<RotatingBadge href="/contact" text={t('cta.requestQuotation')} />}
          actions={
            <>
              <ButtonLink href="/contact">{t('cta.requestQuotation')}</ButtonLink>
              <ButtonLink href={{ pathname: '/', hash: 'formats' }} variant="glass">
                {t('cta.seeFormats')}
              </ButtonLink>
            </>
          }
        />

        {/* Who we are */}
        <section className={s.section} aria-labelledby="intro-title">
          <div className={`wrap ${s.split}`}>
            <div className={s.splitText}>
              <SectionHeader id="intro-title" label={c.intro.label} title={c.intro.title} />
              <div className={s.prose}>
                {c.intro.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <ButtonLink href="/our-story" variant="outline">
                {t('nav.story')}
              </ButtonLink>
            </div>
            <figure className={s.photo} data-reveal="photo">
              <Image src={oliveTree} alt={c.origin.galleryAlts[1]} sizes="(max-width: 900px) 100vw, 50vw" placeholder="blur" className={s.tall} />
            </figure>
          </div>
        </section>

        {/* From grove to tin */}
        <Journey
          id="journey-title"
          label={c.journey.label}
          title={c.journey.title}
          lead={c.journey.lead}
          steps={c.journey.steps.map((step, i) => ({ ...step, image: [picking, sorting, spout, tinOlives][i] ?? tinOlives }))}
        />

        {/* How we work */}
        <section className={s.processBand} aria-labelledby="process-title">
          <Image src="/brand/olive-branch-illustration-wide.png" alt="" width={896} height={415} className={s.processBranch} aria-hidden />
          <div className={`wrap ${s.section}`}>
            <div className={s.onDark}>
              <SectionHeader id="process-title" label={c.process.label} title={c.process.title} lead={c.process.lead} />
            </div>
            <ol className={s.steps}>
              {c.process.steps.map((step, i) => (
                <li key={step.title} data-reveal>
                  <GlassPanel tone="cream" className={s.step}>
                    <span className={s.stepNumber} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </GlassPanel>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Formats */}
        <section id="formats" className={s.section} aria-labelledby="formats-title">
          <div className="wrap">
            <SectionHeader id="formats-title" label={c.formats.label} title={c.formats.title} lead={c.formats.lead} />
            <div className={s.products}>
              {c.formats.items.map((f) => (
                <ProductCard
                  key={f.slug}
                  href={`/olive-oil/${f.slug}`}
                  name={f.volume}
                  meta={f.material}
                  placeholderText={t('product.photoToCome')}
                  image={f.imageAlt ? { src: tinScene.src, alt: f.imageAlt, width: tinScene.width, height: tinScene.height } : undefined}
                />
              ))}
            </div>
            <div className={s.sectionAction}>
              <ButtonLink href="/contact">{t('cta.requestQuotation')}</ButtonLink>
            </div>
          </div>
        </section>

        {/* Origin: type moment */}
        <section className={s.originBand} aria-labelledby="origin-title">
          <div className={`wrap ${s.section} ${s.origin}`}>
            <span className="label">{c.origin.label}</span>
            <h2 id="origin-title" className={s.originTitle}>
              {c.origin.title}
            </h2>
            <p className="lead">{c.origin.text}</p>
            <ul className={s.points}>
              {c.origin.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <OriginMarquee
            words={[country, ...c.origin.points]}
            photos={[
              { src: grovePath, alt: c.origin.galleryAlts[2] },
              { src: oliveBranch, alt: c.origin.galleryAlts[1] },
              { src: aerial, alt: c.origin.galleryAlts[0] },
            ]}
          />
          <div className={s.originSpacer} />
        </section>

        {/* Export and partnerships */}
        <section className={s.section} aria-labelledby="partners-title">
          <div className={`wrap ${s.split} ${s.splitReverse}`}>
            <div className={s.splitText}>
              <SectionHeader id="partners-title" label={c.partners.label} title={c.partners.title} lead={c.partners.lead} />
              <ul className={s.buyers}>
                {c.partners.buyers.map((b) => (
                  <li key={b.title} data-reveal>
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </li>
                ))}
              </ul>
              <ButtonLink href="/export-partnerships" variant="outline">
                {t('nav.export')}
              </ButtonLink>
            </div>
            <figure className={s.photo} data-reveal="photo">
              <Image src={cartons} alt={c.partners.imageAlt} sizes="(max-width: 900px) 100vw, 50vw" placeholder="blur" />
            </figure>
          </div>
        </section>

        {/* Quality */}
        <section className={s.qualityBand} aria-labelledby="quality-title">
          <div className={`wrap ${s.quality}`} data-reveal>
            <div>
              <span className="label">{c.quality.label}</span>
              <h2 id="quality-title">{c.quality.title}</h2>
            </div>
            <p>{c.quality.text}</p>
            <ButtonLink href="/contact" variant="outline">
              {c.quality.cta}
            </ButtonLink>
          </div>
        </section>

        {/* Closing call */}
        <section className={s.closing} aria-labelledby="closing-title">
          <Image src={olivesPile} alt="" fill sizes="100vw" className={s.closingImg} />
          <div className={`wrap ${s.closingInner}`}>
            <h2 id="closing-title">{c.closing.title}</h2>
            <p>{c.closing.text}</p>
            <div className={s.closingActions}>
              <ButtonLink href="/contact" variant="onDark">
                {t('cta.requestQuotation')}
              </ButtonLink>
              <span className={s.closingPhone} dir="ltr">
                {siteDefaults.phones[0]}
              </span>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter credits={c.credits} />
    </>
  )
}
