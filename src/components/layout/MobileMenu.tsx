'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { LanguageSwitcher } from './LanguageSwitcher'
import { navItems } from './navItems'
import styles from './SiteHeader.module.css'

export function MobileMenu() {
  const t = useTranslations('nav')
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const panelId = useId()
  const [mounted, setMounted] = useState(false)
  const openerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus()
    const opener = openerRef.current
    return () => {
      opener?.focus()
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        className={styles.menuButton}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.menuIcon} data-open={open || undefined} aria-hidden="true" />
        <span className="visually-hidden">{open ? t('closeMenu') : t('openMenu')}</span>
      </button>
      {mounted
        ? createPortal(
          <div id={panelId} className={styles.mobilePanel} hidden={!open} role="dialog" aria-modal="true" aria-label={t('menu')}>
            <button ref={closeRef} type="button" className={`${styles.menuButton} ${styles.closeButton}`} onClick={() => setOpen(false)}>
              <span className={styles.menuIcon} data-open aria-hidden="true" />
              <span className="visually-hidden">{t('closeMenu')}</span>
            </button>
            <ul className={styles.mobileList}>
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link href={item.href} onClick={() => setOpen(false)}>
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <LanguageSwitcher className={styles.mobileLangs} />
            <Link href="/contact" className={styles.mobileCta} onClick={() => setOpen(false)}>
              {t('requestQuote')}
            </Link>
          </div>,
            document.body,
          )
        : null}
    </>
  )
}
