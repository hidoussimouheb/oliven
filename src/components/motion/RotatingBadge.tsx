import type { ComponentProps } from 'react'
import { Link } from '@/i18n/navigation'
import styles from './RotatingBadge.module.css'

type Props = {
  href: ComponentProps<typeof Link>['href']
  /** Visible words set around the circle, also used as the link's accessible name. */
  text: string
  className?: string
}

/** Round link with its words turning slowly around an arrow. The turn stops for reduced motion. */
export function RotatingBadge({ href, text, className }: Props) {
  // Arabic is cursive: stretching the spacing would break the joins, so it keeps its natural width.
  const cursive = /[\u0600-\u06FF]/.test(text)
  const ring = cursive ? `${text} · ${text} · ${text} · ` : `${text} · ${text} · `
  return (
    <Link href={href} className={[styles.badge, className].filter(Boolean).join(' ')} aria-label={text}>
      <svg className={styles.ring} viewBox="0 0 120 120" aria-hidden="true" focusable="false" direction="ltr">
        <defs>
          <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className={styles.text} direction="ltr">
          <textPath href="#badge-circle" {...(cursive ? {} : { textLength: 289, lengthAdjust: 'spacing' })}>
            {ring}
          </textPath>
        </text>
      </svg>
      <span className={styles.core} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" className={styles.arrow}>
          <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  )
}
