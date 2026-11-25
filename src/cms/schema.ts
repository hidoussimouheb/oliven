import type { Field } from 'payload'

/**
 * Builds Payload fields from a sample of the content (the English copy in src/content).
 * The typed content files stay the single description of each page: the admin form, the
 * seed and the fallback all follow them, so a page can never ask for a field the admin lacks.
 *
 * Shapes:
 *   string            -> text, or textarea for long copy
 *   string[]          -> array of { value }
 *   [string, string][] -> array of { label, value }
 *   object[]          -> array of the object's fields
 *   object            -> group
 */

const LONG_KEYS = /^(text|lead|summary|description|statement|note|quoteLead|credits)$/

export function humanize(key: string): string {
  const words = key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[-_]/g, ' ')
  return words.charAt(0).toUpperCase() + words.slice(1).toLowerCase()
}

const isPlainObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)
const isPair = (v: unknown): v is [string, string] => Array.isArray(v) && v.length === 2 && v.every((x) => typeof x === 'string')

/** Merge the keys of every element so optional keys (present on some items only) still get a field. */
function mergedItem(items: Record<string, unknown>[]): Record<string, unknown> {
  return items.reduce<Record<string, unknown>>((acc, it) => {
    for (const [k, v] of Object.entries(it)) if (!(k in acc) || acc[k] === undefined) acc[k] = v
    return acc
  }, {})
}

export function fieldFor(name: string, sample: unknown): Field {
  const label = humanize(name)
  if (typeof sample === 'string') {
    if (name === 'slug') return { name, label: 'Page address (fixed)', type: 'text', admin: { readOnly: true } }
    return LONG_KEYS.test(name) || sample.length > 90 ? { name, label, type: 'textarea' } : { name, label, type: 'text' }
  }
  if (Array.isArray(sample)) {
    if (sample.every(isPair)) {
      return { name, label, type: 'array', fields: [{ type: 'row', fields: [{ name: 'label', type: 'text' }, { name: 'value', type: 'text' }] }] }
    }
    if (sample.every((x) => typeof x === 'string')) {
      return { name, label, type: 'array', labels: { singular: 'Item', plural: 'Items' }, fields: [{ name: 'value', label: 'Text', type: 'textarea' }] }
    }
    const item = mergedItem(sample.filter(isPlainObject))
    // Lists tied to fixed pages (items with a slug) keep their length: the slug drives a link.
    const fixed = 'slug' in item ? { minRows: sample.length, maxRows: sample.length } : {}
    return { name, label, type: 'array', ...fixed, fields: fieldsFor(item) }
  }
  if (isPlainObject(sample)) {
    return { name, label, type: 'group', fields: fieldsFor(sample) }
  }
  return { name, label, type: 'text' }
}

export function fieldsFor(sample: Record<string, unknown>): Field[] {
  return Object.entries(sample).map(([k, v]) => fieldFor(k, v))
}

/** Content object -> the shape Payload stores (string lists become rows). */
export function toCms(value: unknown): unknown {
  if (Array.isArray(value)) {
    if (value.length && value.every(isPair)) return value.map(([label, v]) => ({ label, value: v }))
    if (value.every((x) => typeof x === 'string')) return value.map((v) => ({ value: v }))
    return value.map(toCms)
  }
  if (isPlainObject(value)) return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, toCms(v)]))
  return value
}

const blank = (v: unknown) => v === undefined || v === null || (typeof v === 'string' && v.trim() === '')

/**
 * Payload document -> content object, using the default copy as the guide.
 * Anything missing or left empty in the admin falls back to the default copy, so a page never renders a hole.
 */
export function fromCms<T>(stored: unknown, fallback: T): T {
  if (typeof fallback === 'string') return (blank(stored) ? fallback : String(stored)) as T
  if (Array.isArray(fallback)) {
    if (!Array.isArray(stored) || stored.length === 0) return fallback
    const rows = stored as Record<string, unknown>[]
    if (fallback.length && fallback.every(isPair)) {
      return rows.map((r, i) => [fromCms(r?.label, (fallback[i] as [string, string] | undefined)?.[0] ?? ''), fromCms(r?.value, (fallback[i] as [string, string] | undefined)?.[1] ?? '')]) as T
    }
    if (fallback.every((x) => typeof x === 'string')) {
      return rows.map((r, i) => fromCms(r?.value, (fallback[i] as string | undefined) ?? '')) as T
    }
    const shape = mergedItem(fallback.filter(isPlainObject))
    return rows.map((r, i) => fromCms(r, (fallback[i] as Record<string, unknown> | undefined) ?? emptyLike(shape))) as T
  }
  if (isPlainObject(fallback)) {
    const src = isPlainObject(stored) ? stored : {}
    return Object.fromEntries(Object.entries(fallback).map(([k, v]) => [k, fromCms(src[k], v)])) as T
  }
  return (blank(stored) ? fallback : stored) as T
}

function emptyLike(shape: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(shape).map(([k, v]) => [k, typeof v === 'string' ? '' : Array.isArray(v) ? [] : isPlainObject(v) ? emptyLike(v) : v]))
}
