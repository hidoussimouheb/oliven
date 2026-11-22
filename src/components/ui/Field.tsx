import type { ComponentProps, ReactNode } from 'react'
import styles from './Field.module.css'

type Base = {
  id: string
  label: string
  hint?: ReactNode
  error?: string
  optionalLabel?: string
  className?: string
}

function Shell({ id, label, hint, error, optionalLabel, className, children }: Base & { children: ReactNode }) {
  return (
    <div className={[styles.field, error && styles.invalid, className].filter(Boolean).join(' ')}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {optionalLabel ? <span className={styles.optional}> ({optionalLabel})</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

const describedBy = (id: string, hint?: ReactNode, error?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined

export function TextField({ id, label, hint, error, optionalLabel, className, ...input }: Base & Omit<ComponentProps<'input'>, 'id'>) {
  return (
    <Shell {...{ id, label, hint, error, optionalLabel, className }}>
      <input
        id={id}
        name={input.name ?? id}
        className={styles.control}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        {...input}
      />
    </Shell>
  )
}

export function TextArea({ id, label, hint, error, optionalLabel, className, ...input }: Base & Omit<ComponentProps<'textarea'>, 'id'>) {
  return (
    <Shell {...{ id, label, hint, error, optionalLabel, className }}>
      <textarea
        id={id}
        name={input.name ?? id}
        className={styles.control}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        {...input}
      />
    </Shell>
  )
}

export function SelectField({
  id,
  label,
  hint,
  error,
  optionalLabel,
  className,
  options,
  placeholder,
  ...input
}: Base & Omit<ComponentProps<'select'>, 'id'> & { options: { value: string; label: string }[]; placeholder?: string }) {
  return (
    <Shell {...{ id, label, hint, error, optionalLabel, className }}>
      <select
        id={id}
        name={input.name ?? id}
        className={styles.control}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        defaultValue=""
        {...input}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Shell>
  )
}
