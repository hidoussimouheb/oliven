import type { ComponentProps, ReactNode } from 'react'
import { Link } from '@/i18n/navigation'
import styles from './Button.module.css'

type Variant = 'solid' | 'outline' | 'glass' | 'onDark'
type Common = { variant?: Variant; size?: 'md' | 'sm'; block?: boolean; children: ReactNode; className?: string }

const cls = ({ variant = 'solid', size = 'md', block, className }: Omit<Common, 'children'>) =>
  [styles.btn, styles[variant], size === 'sm' && styles.sm, block && styles.block, className].filter(Boolean).join(' ')

/** A link styled as a button. `href` is locale-aware. */
export function ButtonLink({ href, ...rest }: Common & { href: ComponentProps<typeof Link>['href'] }) {
  return (
    <Link href={href} className={cls(rest)}>
      {rest.children}
    </Link>
  )
}

export function Button({
  variant,
  size,
  block,
  className,
  children,
  type = 'button',
  ...rest
}: Common & Omit<ComponentProps<'button'>, 'className' | 'children'>) {
  return (
    <button type={type} className={cls({ variant, size, block, className })} {...rest}>
      {children}
    </button>
  )
}
