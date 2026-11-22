import Image, { type StaticImageData } from 'next/image'
import { ButtonLink } from '@/components/ui/Button'
import { siteDefaults } from '@/config/site'
import s from './CtaBand.module.css'

type Props = { title: string; text: string; cta: string; image: StaticImageData }

/** Closing call to action over a photograph. */
export function CtaBand({ title, text, cta, image }: Props) {
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
            {siteDefaults.phones[0]}
          </span>
        </div>
      </div>
    </section>
  )
}
