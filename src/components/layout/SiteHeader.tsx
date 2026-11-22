import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Wordmark } from '@/components/brand/Wordmark'
import { ButtonLink } from '@/components/ui/Button'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileMenu } from './MobileMenu'
import { navItems } from './navItems'
import styles from './SiteHeader.module.css'

/**
 * `overlay` is for pages whose first section is a full-bleed photograph:
 * the header becomes a frosted pill over the photo. Elsewhere it is solid cream.
 */
export async function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const t = await getTranslations('nav')
  return (
    <header className={[styles.header, overlay ? styles.overlay : styles.solid].join(' ')}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label={`óliven, ${t('home')}`}>
          <Wordmark width="6.25rem" title={null} />
        </Link>
        <nav aria-label={t('primary')} className={styles.desktopNav}>
          <ul>
            {navItems.map((item) => (
              <li key={item.key}>
                <Link href={item.href}>{t(item.key)}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.end}>
          <LanguageSwitcher className={styles.desktopOnly} />
          <ButtonLink href="/contact" size="sm" className={styles.desktopOnly}>
            {t('requestQuote')}
          </ButtonLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
