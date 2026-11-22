'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { Link, usePathname } from '@/i18n/navigation'
import { locales, type Locale } from '@/i18n/routing'
import styles from './SiteHeader.module.css'

const short: Record<Locale, string> = { en: 'EN', fr: 'FR', ar: 'ع' }

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations('language')
  const current = useLocale() as Locale
  const pathname = usePathname()
  const params = useParams()

  return (
    <nav aria-label={t('label')} className={[styles.langs, className].filter(Boolean).join(' ')}>
      <ul>
        {locales.map((l) => (
          <li key={l}>
            <Link
              // Keep dynamic segments (e.g. product slug) when switching language
              href={{ pathname, params } as never}
              locale={l}
              hrefLang={l}
              lang={l}
              aria-current={l === current ? 'true' : undefined}
              className={l === current ? styles.langActive : undefined}
            >
              <span aria-hidden="true">{short[l]}</span>
              <span className="visually-hidden">{t(l)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
