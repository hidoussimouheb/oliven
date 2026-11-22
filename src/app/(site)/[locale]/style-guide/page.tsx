import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Wordmark } from '@/components/brand/Wordmark'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { Button, ButtonLink } from '@/components/ui/Button'
import { SelectField, TextArea, TextField } from '@/components/ui/Field'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { ProductCard } from '@/components/ui/ProductCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SpecList } from '@/components/ui/SpecList'
import type { Locale } from '@/i18n/routing'
import tinScene from '../../../../../seed/media/tin-5l-mockup-scene.png'
import s from './styleGuide.module.css'

export const metadata: Metadata = { robots: { index: false, follow: false } }

/* Sample copy for this internal page only. Real page copy lives in the CMS from Phase 8. */
const sample = {
  en: {
    heroLabel: 'Product of Tunisia',
    heroTitle: 'Tunisian olive oil, packed for importers and distributors',
    heroText: 'Five formats, from 500 ml glass to 5 L tins. Tell us your market and the volumes you need, and our export team replies with a quotation.',
    facts: ['500 ml to 5 L', 'Glass and tin', 'English · Français · العربية'],
    sections: { palette: 'Colour', type: 'Type', buttons: 'Buttons', glass: 'Glass', products: 'Products', forms: 'Forms' },
    typeSample: 'Rooted in origin. Refined for the world.',
    body: 'óliven is olive oil from Tunisia, bottled to carry the character of its groves to tables around the world.',
    glassRule: 'Frosted panels sit only over photographs or the branch illustration, never over flat cream and never on other glass.',
    formats: [
      ['5 L', 'Metal tin with handle'],
      ['2 L', 'Metal tin'],
      ['500 ml', 'Round metal tin'],
      ['500 ml', 'Dark glass bottle'],
      ['700 ml', 'Glass jar'],
    ],
    tin: '5 L metal tin',
    material: 'Metal tin with handle',
    labelLangs: 'English, French, Arabic',
    tunisia: 'Tunisia',
    altTin: 'óliven 5 litre tin on a wooden table beside olive branches',
    business: [
      ['importer', 'Importer'],
      ['distributor', 'Distributor or wholesaler'],
      ['retail', 'Retail chain or supermarket'],
      ['specialty', 'Specialty food retailer'],
      ['other', 'Other'],
    ],
    hintEmail: 'We reply from our export address within two working days.',
  },
  fr: {
    heroLabel: 'Produit de Tunisie',
    heroTitle: "Huile d'olive tunisienne, conditionnée pour les importateurs et distributeurs",
    heroText: 'Cinq formats, du verre de 500 ml au bidon de 5 L. Indiquez-nous votre marché et les volumes souhaités, notre service export vous répond avec un devis.',
    facts: ['500 ml à 5 L', 'Verre et métal', 'English · Français · العربية'],
    sections: { palette: 'Couleurs', type: 'Typographie', buttons: 'Boutons', glass: 'Verre dépoli', products: 'Produits', forms: 'Formulaires' },
    typeSample: 'Ancrée dans son origine. Pensée pour le monde.',
    body: "óliven est une huile d'olive de Tunisie, mise en bouteille pour porter le caractère de ses oliveraies jusqu'aux tables du monde entier.",
    glassRule: "Les panneaux dépolis se posent uniquement sur une photo ou sur l'illustration de branche, jamais sur un fond crème uni ni sur un autre panneau.",
    formats: [
      ['5 L', 'Bidon métallique avec poignée'],
      ['2 L', 'Bidon métallique'],
      ['500 ml', 'Boîte métallique ronde'],
      ['500 ml', 'Bouteille en verre teinté'],
      ['700 ml', 'Bocal en verre'],
    ],
    tin: 'Bidon métallique de 5 L',
    material: 'Bidon métallique avec poignée',
    labelLangs: 'Anglais, français, arabe',
    tunisia: 'Tunisie',
    altTin: "Bidon óliven de 5 litres sur une table en bois, à côté de branches d'olivier",
    business: [
      ['importer', 'Importateur'],
      ['distributor', 'Distributeur ou grossiste'],
      ['retail', 'Enseigne ou supermarché'],
      ['specialty', 'Épicerie fine'],
      ['other', 'Autre'],
    ],
    hintEmail: 'Nous répondons depuis notre adresse export sous deux jours ouvrés.',
  },
  ar: {
    heroLabel: 'منتج تونسي',
    heroTitle: 'زيت زيتون تونسي، معبأ للمستوردين والموزعين',
    heroText: 'خمسة أحجام، من عبوة زجاجية سعة 500 مل إلى علبة معدنية سعة 5 لترات. أخبرونا بسوقكم والكميات المطلوبة، وسيرسل لكم فريق التصدير عرض سعر.',
    facts: ['من 500 مل إلى 5 لترات', 'زجاج ومعدن', 'English · Français · العربية'],
    sections: { palette: 'الألوان', type: 'الخطوط', buttons: 'الأزرار', glass: 'الزجاج المصنفر', products: 'المنتجات', forms: 'النماذج' },
    typeSample: 'متجذّر في أصله، مصقول للعالم.',
    body: 'أوليفن زيت زيتون من تونس، يُعبّأ ليحمل طابع بساتينه إلى موائد العالم.',
    glassRule: 'توضع اللوحات المصنفرة فوق الصور أو رسم غصن الزيتون فقط، ولا توضع أبدًا على خلفية كريمية مسطحة أو فوق لوحة زجاجية أخرى.',
    formats: [
      ['5 لترات', 'علبة معدنية بمقبض'],
      ['2 لتر', 'علبة معدنية'],
      ['500 مل', 'علبة معدنية أسطوانية'],
      ['500 مل', 'قارورة زجاجية داكنة'],
      ['700 مل', 'برطمان زجاجي'],
    ],
    tin: 'علبة معدنية سعة 5 لترات',
    material: 'علبة معدنية بمقبض',
    labelLangs: 'الإنجليزية والفرنسية والعربية',
    tunisia: 'تونس',
    altTin: 'علبة أوليفن سعة 5 لترات على طاولة خشبية بجانب أغصان الزيتون',
    business: [
      ['importer', 'مستورد'],
      ['distributor', 'موزع أو تاجر جملة'],
      ['retail', 'سلسلة متاجر أو سوبرماركت'],
      ['specialty', 'متجر أغذية فاخرة'],
      ['other', 'أخرى'],
    ],
    hintEmail: 'نردّ من عنوان التصدير خلال يومَي عمل.',
  },
} as const

const palette = [
  { name: 'Olive', hex: '#2B401A', role: 'Logo, headings, main buttons', fg: 'var(--c-cream)' },
  { name: 'Teal', hex: '#28433A', role: 'Dark grounds, glass tint', fg: 'var(--c-cream)' },
  { name: 'Gold', hex: '#A8884A', role: 'Rules, focus, large display only', fg: 'var(--c-olive)' },
  { name: 'Cream', hex: '#F5ECCD', role: 'Page ground, text on dark', fg: 'var(--c-olive)' },
  { name: 'Aubergine', hex: '#4A2F35', role: 'One band: the quotation call', fg: 'var(--c-cream)' },
]

export default async function StyleGuide({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  const c = sample[locale]

  return (
    <>
      <SiteHeader overlay />
      <main id="main">
        {/* Hero sample: photograph + teal glass panel */}
        <section className={s.hero} aria-labelledby="hero-title">
          <Image src={tinScene} alt={c.altTin} fill priority sizes="100vw" className={s.heroImg} placeholder="blur" />
          <div className={`wrap ${s.heroWrap}`}>
            <GlassPanel tone="teal" className={s.heroPanel}>
              <span className="label">{c.heroLabel}</span>
              <h1 id="hero-title" className={s.heroTitle}>
                {c.heroTitle}
              </h1>
              <p className={s.heroText}>{c.heroText}</p>
              <div className={s.actions}>
                <ButtonLink href="/contact">{t('cta.requestQuotation')}</ButtonLink>
                <ButtonLink href="/olive-oil" variant="glass">
                  {t('cta.seeFormats')}
                </ButtonLink>
              </div>
              <ul className={s.facts}>
                {c.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </GlassPanel>
          </div>
        </section>

        <section className={`wrap ${s.section}`} aria-labelledby="sg-intro">
          <SectionHeader level="h2" id="sg-intro" label={t('styleGuide.title')} title={t('styleGuide.title')} lead={t('styleGuide.intro')} />
          <div className={s.logos}>
            <div className={s.logoTile} style={{ background: 'var(--c-cream-light)', color: 'var(--c-olive)' }}>
              <Wordmark width="70%" />
            </div>
            <div className={s.logoTile} style={{ background: 'var(--c-olive)', color: 'var(--c-cream)' }}>
              <Wordmark width="70%" />
            </div>
            <div className={s.logoTile} style={{ background: 'var(--c-plum)', color: 'var(--c-cream)' }}>
              <Wordmark width="70%" />
            </div>
            <div className={s.logoTile} style={{ background: 'var(--c-gold)', color: 'var(--c-cream)' }}>
              <Wordmark width="70%" />
            </div>
          </div>
        </section>

        <section className={`wrap ${s.section}`} aria-labelledby="sg-palette">
          <SectionHeader id="sg-palette" label={c.sections.palette} title={c.sections.palette} />
          <ul className={s.swatches}>
            {palette.map((p) => (
              <li key={p.hex} className={s.swatch}>
                <span className={s.chip} style={{ background: p.hex, color: p.fg }} dir="ltr">
                  {p.hex}
                </span>
                <span className={s.swMeta}>
                  <b>{p.name}</b>
                  <span>{p.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className={`wrap ${s.section}`} aria-labelledby="sg-type">
          <SectionHeader id="sg-type" label={c.sections.type} title={c.sections.type} />
          <div className={s.typeStack}>
            <p className={s.display}>{c.typeSample}</p>
            <p className={s.h1}>{c.heroTitle}</p>
            <p className={s.h2}>{t('nav.export')}</p>
            <p className={s.h3}>{c.tin}</p>
            <p className="lead">{c.body}</p>
            <p>{c.heroText}</p>
            <span className="label">{c.heroLabel}</span>
          </div>
        </section>

        <section className={s.darkBand} aria-labelledby="sg-buttons">
          <div className={`wrap ${s.section}`}>
            <SectionHeader id="sg-buttons" label={c.sections.buttons} title={c.sections.buttons} />
            <div className={s.buttonRows}>
              <div className={s.buttonRowLight}>
                <Button>{t('cta.requestQuotation')}</Button>
                <Button variant="outline">{t('cta.downloadSheet')}</Button>
                <Button size="sm">{t('nav.requestQuote')}</Button>
              </div>
              <div className={s.buttonRowDark}>
                <Button variant="onDark">{t('cta.requestQuotation')}</Button>
                <Button variant="glass">{t('cta.contactExport')}</Button>
              </div>
            </div>
          </div>
        </section>

        <section className={`wrap ${s.section}`} aria-labelledby="sg-glass">
          <SectionHeader id="sg-glass" label={c.sections.glass} title={c.sections.glass} lead={c.glassRule} />
          <div className={s.glassGrid}>
            <div className={s.illustrationGround}>
              <Image src="/brand/olive-branch-illustration.png" alt="" width={860} height={347} className={s.branch} aria-hidden />
              <GlassPanel tone="cream" className={s.specCard}>
                <span className="label">{c.sections.products}</span>
                <h3>{c.tin}</h3>
                <SpecList
                  items={[
                    { term: t('product.volume'), value: '5000 ml' },
                    { term: t('product.material'), value: c.material },
                    { term: t('product.labelLanguages'), value: c.labelLangs },
                    { term: t('product.origin'), value: c.tunisia },
                  ]}
                />
                <ButtonLink href="/contact" size="sm">
                  {t('cta.quoteFormat')}
                </ButtonLink>
              </GlassPanel>
            </div>
            <div className={s.photoGround}>
              <Image src={tinScene} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" className={s.photoGroundImg} />
              <GlassPanel tone="teal" className={s.specCard}>
                <span className="label">{c.heroLabel}</span>
                <p className={s.glassQuote}>{c.typeSample}</p>
              </GlassPanel>
            </div>
          </div>
        </section>

        <section className={`wrap ${s.section}`} aria-labelledby="sg-products">
          <SectionHeader id="sg-products" label={c.sections.products} title={c.sections.products} />
          <div className={s.products}>
            {c.formats.map(([vol, mat], i) => (
              <ProductCard
                key={`${vol}-${i}`}
                href="/olive-oil"
                name={vol}
                meta={mat}
                placeholderText={t('product.photoToCome')}
                image={i === 0 ? { src: tinScene.src, alt: c.altTin, width: tinScene.width, height: tinScene.height } : undefined}
              />
            ))}
          </div>
        </section>

        <section className={`wrap ${s.section}`} aria-labelledby="sg-forms">
          <SectionHeader id="sg-forms" label={c.sections.forms} title={c.sections.forms} />
          <form className={s.form} noValidate action="#">
            <TextField id="sg-name" label={t('form.fullName')} autoComplete="name" />
            <TextField id="sg-company" label={t('form.company')} autoComplete="organization" />
            <TextField id="sg-email" type="email" label={t('form.email')} autoComplete="email" hint={c.hintEmail} dir="ltr" />
            <TextField id="sg-email-error" type="email" label={t('form.email')} defaultValue="buyer@" error={t('form.errorEmail')} dir="ltr" />
            <SelectField
              id="sg-business"
              label={t('form.businessType')}
              placeholder={t('form.chooseOne')}
              options={c.business.map(([value, label]) => ({ value, label }))}
            />
            <TextField id="sg-phone" type="tel" label={t('form.phone')} optionalLabel={t('form.optional')} autoComplete="tel" dir="ltr" />
            <TextArea id="sg-message" label={t('form.message')} optionalLabel={t('form.optional')} className={s.full} />
            <div className={s.full}>
              <Button type="button">{t('form.send')}</Button>
            </div>
          </form>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
