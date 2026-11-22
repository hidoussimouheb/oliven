import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Wordmark } from '@/components/brand/Wordmark'
import { siteDefaults } from '@/config/site'
import type { Locale } from '@/i18n/routing'
import { LanguageSwitcher } from './LanguageSwitcher'
import { navItems } from './navItems'
import styles from './SiteFooter.module.css'

export async function SiteFooter() {
  const t = await getTranslations()
  const locale = (await getLocale()) as Locale
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.brand}>
          <Wordmark width="8.5rem" />
          <p>{t('footer.about')}</p>
        </div>
        <nav aria-label={t('footer.explore')}>
          <h2 className={styles.heading}>{t('footer.explore')}</h2>
          <ul>
            {navItems.map((i) => (
              <li key={i.key}>
                <Link href={i.href}>{t(`nav.${i.key}`)}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className={styles.heading}>{t('footer.contact')}</h2>
          <address className={styles.address}>
            <span>{siteDefaults.company}</span>
            <span>{siteDefaults.city[locale]}</span>
            <a href={`mailto:${siteDefaults.email}`}>{siteDefaults.email}</a>
            {siteDefaults.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, '')}`} dir="ltr">
                {p}
              </a>
            ))}
          </address>
        </div>
        <div>
          <h2 className={styles.heading}>{t('footer.legal')}</h2>
          <ul>
            <li>
              <Link href="/legal/privacy">{t('footer.privacy')}</Link>
            </li>
            <li>
              <Link href="/legal/notice">{t('footer.terms')}</Link>
            </li>
          </ul>
          <LanguageSwitcher className={styles.langs} />
        </div>
      </div>
      <div className={`wrap ${styles.base}`}>
        <span>
          © {year} {siteDefaults.company}. {t('footer.rights')}
        </span>
      </div>
    </footer>
  )
}
