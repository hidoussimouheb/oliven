import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { ButtonLink } from '@/components/ui/Button'
import { ProductCard } from '@/components/ui/ProductCard'
import { SpecList } from '@/components/ui/SpecList'
import { Link } from '@/i18n/navigation'
import { rangePage } from '@/content/pages'
import { productContent, productPhoto, productSlugs, type ProductSlug } from '@/content/products'
import { routing, type Locale } from '@/i18n/routing'
import { pageMetadata } from '@/lib/metadata'
import s from '@/components/sections/Page.module.css'
import tin2l from '../../../../../../seed/media/tin-2l-mockup-scene.png'

type Props = { params: Promise<{ locale: Locale; slug: string }> }

const isSlug = (v: string): v is ProductSlug => (productSlugs as readonly string[]).includes(v)

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => productSlugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isSlug(slug)) return {}
  const p = productContent[locale][slug]
  return pageMetadata(locale, `/olive-oil/${slug}`, p.name, p.summary, productPhoto[slug] ? tin2l : undefined)
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params
  if (!isSlug(slug)) notFound()
  setRequestLocale(locale)
  const t = await getTranslations()
  const c = rangePage[locale]
  const products = productContent[locale]
  const p = products[slug]

  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className={s.productTop} aria-labelledby="page-title">
          <div className="wrap">
            <Link href="/olive-oil" className={s.crumb}>
              ← {c.product.back}
            </Link>
            <div className={s.split} style={{ marginTop: 'var(--s-4)' }}>
              <figure className={s.productMedia}>
                {productPhoto[slug] && p.imageAlt ? (
                  <Image src={tin2l} alt={p.imageAlt} sizes="(max-width: 900px) 100vw, 50vw" placeholder="blur" priority />
                ) : (
                  <div className={s.placeholder}>
                    <Image src="/brand/olive-branch-illustration.png" alt="" width={320} height={240} className={s.placeholderImg} />
                    <span>{t('product.photoToCome')}</span>
                  </div>
                )}
              </figure>
              <div className={s.text}>
                <span className="label">{p.volume}</span>
                <h1 id="page-title">{p.name}</h1>
                <p className="lead">{p.summary}</p>
                <SpecList
                  items={[
                    { term: c.specs.volume, value: p.volume },
                    { term: c.specs.packaging, value: p.material },
                    { term: c.specs.origin, value: c.specs.originValue },
                    { term: c.specs.extraction, value: c.specs.extractionValue },
                  ]}
                />
                <p className={s.prose}>{c.product.quoteLead}</p>
                <div className={s.actions}>
                  <ButtonLink href={{ pathname: '/contact', query: { format: slug } }}>{t('cta.quoteFormat')}</ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${s.section} ${s.alt}`} aria-labelledby="others-title">
          <div className="wrap">
            <h2 id="others-title">{c.product.others}</h2>
            <div className={`${s.products} ${s.four}`}>
              {productSlugs
                .filter((o) => o !== slug)
                .map((o) => {
                  const q = products[o]
                  return (
                    <ProductCard
                      key={o}
                      href={`/olive-oil/${o}`}
                      name={q.volume}
                      meta={q.material}
                      placeholderText={t('product.photoToCome')}
                      image={productPhoto[o] && q.imageAlt ? { src: tin2l.src, alt: q.imageAlt, width: tin2l.width, height: tin2l.height } : undefined}
                    />
                  )
                })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
