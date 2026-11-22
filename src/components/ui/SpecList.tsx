import styles from './SpecList.module.css'

export function SpecList({ items, className }: { items: { term: string; value: string }[]; className?: string }) {
  return (
    <dl className={[styles.list, className].filter(Boolean).join(' ')}>
      {items.map((i) => (
        <div key={i.term} style={{ display: 'contents' }}>
          <dt>{i.term}</dt>
          <dd>{i.value}</dd>
        </div>
      ))}
    </dl>
  )
}
