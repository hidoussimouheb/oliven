import Image from 'next/image'
import type { ComponentProps } from 'react'
import { Link } from '@/i18n/navigation'
import styles from './ProductCard.module.css'

type Props = {
  href: ComponentProps<typeof Link>['href']
  name: string
  meta: string
  image?: { src: string; alt: string; width: number; height: number }
  placeholderText: string
}

export function ProductCard({ href, name, meta, image, placeholderText }: Props) {
  return (
    <Link href={href} className={styles.card} data-reveal>
      <div className={styles.media}>
        {image ? (
          <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 768px) 50vw, 20vw" />
        ) : (
          <div className={styles.placeholder}>
            <Image src="/brand/olive-branch-illustration.png" alt="" width={860} height={347} aria-hidden />
            <span className="label">{placeholderText}</span>
          </div>
        )}
      </div>
      <div className={styles.body}>
        <span className={styles.name}>{name}</span>
        <span className={styles.meta}>{meta}</span>
        <span className={styles.go} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
