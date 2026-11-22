import type { ReactNode } from 'react'
import styles from './SectionHeader.module.css'

type Props = {
  label?: string
  title: ReactNode
  lead?: ReactNode
  level?: 'h1' | 'h2'
  id?: string
  align?: 'start' | 'center'
}

export function SectionHeader({ label, title, lead, level = 'h2', id, align = 'start' }: Props) {
  const H = level
  return (
    <div className={[styles.head, align === 'center' && styles.center].filter(Boolean).join(' ')}>
      {label ? <span className="label">{label}</span> : null}
      <H id={id}>{title}</H>
      {lead ? <p className="lead">{lead}</p> : null}
    </div>
  )
}
