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
    <Link href={href} className={styles.card}>
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
      </div>
    </Link>
  )
}
