import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { CtaBand } from '@/components/sections/CtaBand'
import { PageHero } from '@/components/sections/PageHero'
import { ProductCard } from '@/components/ui/ProductCard'
import { photoCredits } from '@/content/credits'
import { rangePage } from '@/content/pages'
import { productSlugs } from '@/content/products'
import { getContent, getPhotos, getProductPhotos } from '@/cms/get'
import type { Locale } from '@/i18n/routing'
import { pageMetadata } from '@/lib/metadata'
import s from '@/components/sections/Page.module.css'
import olivesGreen from '../../../../../seed/media/stock/olives-green.jpg'
import olivesPile from '../../../../../seed/media/stock/olives-pile.jpg'
import tin2l from '../../../../../seed/media/tin-2l-mockup-scene.png'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const c = await getContent('range', locale)
  return pageMetadata(locale, '/olive-oil', c.meta.title, c.meta.description, tin2l)
}

export default async function RangePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  const c = await getContent('range', locale)
  const products = await getContent('products', locale)
  const closing = (await getContent('home', locale)).closing
  const photo = await getPhotos('range')
  const productPic = await getProductPhotos()

  return (
    <>
      <SiteHeader overlay />
      <main id="main">
        <PageHero image={photo.get('hero', olivesGreen)} imageAlt={c.hero.imageAlt} label={c.hero.label} title={c.hero.title} lead={c.hero.lead} />
        <section className={s.section} aria-label={c.hero.title}>
          <div className="wrap">
            <div className={s.products} style={{ marginTop: 0 }}>
              {productSlugs.map((slug) => {
                const p = products[slug]
                return (
                  <ProductCard
                    key={slug}
                    href={`/olive-oil/${slug}`}
                    name={p.volume}
                    meta={p.material}
                    placeholderText={t('product.photoToCome')}
                    image={(() => {
                      const pic = productPic(slug)
                      return pic ? { src: pic.src, alt: p.imageAlt || p.name, width: pic.width, height: pic.height } : undefined
                    })()}
                  />
                )
              })}
            </div>
            <p className={s.note}>{c.note}</p>
          </div>
        </section>
        <CtaBand title={closing.title} text={closing.text} cta={t('cta.requestQuotation')} image={photo.get('closing', olivesPile)} />
      </main>
      <SiteFooter credits={photoCredits(locale, ['Rezeda Ishmet', 'John Cameron'])} />
    </>
  )
}
