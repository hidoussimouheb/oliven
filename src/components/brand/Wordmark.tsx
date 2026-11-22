import { WORDMARK_PATH, WORDMARK_VIEWBOX } from './wordmarkPath'

type Props = {
  /** Width in CSS units; height follows the mark's proportions. */
  width?: string
  className?: string
  /** Accessible name. Pass null when a visible text label already names the link. */
  title?: string | null
}

/**
 * The official óliven wordmark. Colour comes from `currentColor`, so it can only take
 * the palette colours set by its parent (olive, cream, gold). Never stretch, outline or blur it.
 */
export function Wordmark({ width = '8rem', className, title = 'óliven' }: Props) {
  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      width={undefined}
      style={{ width, height: 'auto', aspectRatio: '660 / 232' }}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path fill="currentColor" fillRule="evenodd" d={WORDMARK_PATH} />
    </svg>
  )
}
