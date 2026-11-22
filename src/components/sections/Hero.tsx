import Image, { type StaticImageData } from 'next/image'
import type { ReactNode } from 'react'
import { GlassPanel } from '@/components/ui/GlassPanel'
import styles from './Hero.module.css'

type Props = {
  image: StaticImageData | { src: string; width: number; height: number }
  imageAlt: string
  label: string
  title: string
  text: string
  facts?: string[]
  actions: ReactNode
  titleId?: string
  /** Large decorative word along the bottom of the photo (hidden from screen readers). */
  bigWord?: string
  /** Extra element pinned to the bottom corner, such as the rotating quotation badge. */
  badge?: ReactNode
}

/** Full-bleed product photograph with a teal glass panel. Pair with <SiteHeader overlay />. */
export function Hero({ image, imageAlt, label, title, text, facts, actions, titleId = 'hero-title', bigWord, badge }: Props) {
  return (
    <section className={styles.hero} aria-labelledby={titleId}>
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className={styles.img} placeholder={'blurDataURL' in image ? 'blur' : 'empty'} />
      {bigWord ? (
        <p className={styles.bigWord} aria-hidden="true">
          {bigWord}
        </p>
      ) : null}
      <div className={`wrap ${styles.wrap}`}>
        <GlassPanel tone="teal" className={styles.panel}>
          <span className="label">{label}</span>
          <h1 id={titleId} className={styles.title}>
            {title}
          </h1>
          <p className={styles.text}>{text}</p>
          <div className={styles.actions}>{actions}</div>
          {facts?.length ? (
            <ul className={styles.facts}>
              {facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          ) : null}
        </GlassPanel>
        {badge ? <div className={styles.badge}>{badge}</div> : null}
      </div>
    </section>
  )
}
