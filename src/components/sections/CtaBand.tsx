import Image from 'next/image'
import type { Pic } from '@/lib/pic'
import { ButtonLink } from '@/components/ui/Button'
import { getLocale } from 'next-intl/server'
import { getSettings } from '@/cms/get'
import type { Locale } from '@/i18n/routing'
import s from './CtaBand.module.css'

type Props = { title: string; text: string; cta: string; image: Pic }

/** Closing call to action over a photograph. */
export async function CtaBand({ title, text, cta, image }: Props) {
  const settings = await getSettings((await getLocale()) as Locale)
  return (
    <section className={s.band} aria-labelledby="cta-title">
      <Image src={image} alt="" fill sizes="100vw" className={s.img} />
      <div className={`wrap ${s.inner}`}>
        <h2 id="cta-title">{title}</h2>
        <p>{text}</p>
        <div className={s.actions}>
          <ButtonLink href="/contact" variant="onDark">
            {cta}
          </ButtonLink>
          <span className={s.phone} dir="ltr">
            {settings.phones[0]}
          </span>
        </div>
      </div>
    </section>
  )
}
