import type { ComponentProps, ElementType, ReactNode } from 'react'
import styles from './GlassPanel.module.css'

type Props<T extends ElementType> = {
  as?: T
  /** cream: on dark or busy grounds. teal: over photographs. */
  tone?: 'cream' | 'teal'
  className?: string
  children: ReactNode
} & Omit<ComponentProps<T>, 'className' | 'children'>

/**
 * Frosted panel. Rule: place it only over a photograph or the branch illustration,
 * never over flat cream and never inside another GlassPanel.
 */
export function GlassPanel<T extends ElementType = 'div'>({ as, tone = 'cream', className, children, ...rest }: Props<T>) {
  const Tag = (as ?? 'div') as ElementType
  return (
    <Tag className={[styles.panel, styles[tone], className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Tag>
  )
}
