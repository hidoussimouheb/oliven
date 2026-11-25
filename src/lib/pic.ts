import type { StaticImageData } from 'next/image'

/** A picture a page can render: a bundled photo (with a blur preview) or one uploaded in the admin. */
export type Pic = StaticImageData | { src: string; width: number; height: number; blurDataURL?: undefined }

/** next/image props for the blur preview, only when the picture has one. */
export const blurOf = (p: Pic) => (p.blurDataURL ? ({ placeholder: 'blur' } as const) : ({ placeholder: 'empty' } as const))
