import Image, { type StaticImageData } from 'next/image'
import s from './PageHero.module.css'

type Props = { image: StaticImageData; imageAlt: string; label: string; title: string; lead: string; position?: string }

/** Photo header for inner pages. Pair with <SiteHeader overlay />. */
export function PageHero({ image, imageAlt, label, title, lead, position }: Props) {
  return (
    <section className={s.hero} aria-labelledby="page-title">
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" placeholder="blur" className={s.img} style={position ? { objectPosition: position } : undefined} />
      <div className={`wrap ${s.inner}`}>
        <span className={`label ${s.label}`}>{label}</span>
        <h1 id="page-title">{title}</h1>
        <p className={s.lead}>{lead}</p>
      </div>
    </section>
  )
}
