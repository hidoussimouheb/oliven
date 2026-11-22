import Image, { type StaticImageData } from 'next/image'
import styles from './OriginMarquee.module.css'

type Props = {
  words: string[]
  photos: { src: StaticImageData; alt: string }[]
}

/**
 * Words running sideways behind a round window of photographs that fade into one another.
 * The words are decoration (the same facts are listed as text nearby), so they are hidden from screen readers.
 */
export function OriginMarquee({ words, photos }: Props) {
  const run = (
    <>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className={styles.item}>
          <span dir="auto">{w}</span>
          <svg viewBox="0 0 20 20" className={styles.leaf} aria-hidden="true" focusable="false">
            <path d="M3 17C3 9 8 3 17 3c0 9-6 14-14 14Zm0 0 8-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      ))}
    </>
  )
  return (
    <div className={styles.stage}>
      <div className={styles.band} aria-hidden="true">
        <div className={styles.track} dir="ltr">
          <div className={styles.run}>{run}</div>
          <div className={styles.run}>{run}</div>
        </div>
      </div>
      <figure className={styles.window} data-reveal>
        {photos.map((p, i) => (
          <Image
            key={p.alt}
            src={p.src}
            alt={i === 0 ? p.alt : ''}
            aria-hidden={i === 0 ? undefined : true}
            sizes="(max-width: 768px) 70vw, 24rem"
            placeholder="blur"
            className={styles.photo}
            style={{ animationDelay: `${i * 5}s` }}
          />
        ))}
      </figure>
    </div>
  )
}
