'use client'

import Image, { type StaticImageData } from 'next/image'
import { useEffect, useRef, useState } from 'react'
import s from './Journey.module.css'

type Step = { label: string; title: string; text: string; imageAlt: string; image: StaticImageData }
type Props = { id: string; label: string; title: string; lead: string; steps: Step[] }

/**
 * "From grove to tin": a photo-led chapter section.
 * Wide screens: the photo column stays in view and changes as each stage scrolls past.
 * Narrow screens and no-JS: every stage shows its own photo above its text.
 */
export function Journey({ id, label, title, lead, steps }: Props) {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className={s.section} aria-labelledby={id}>
      <div className={`wrap ${s.grid}`}>
        <div className={s.stage} aria-hidden="true">
          <div className={s.frame}>
            {steps.map((step, i) => (
              <Image
                key={step.label}
                src={step.image}
                alt=""
                fill
                sizes="(max-width: 900px) 0px, 45vw"
                className={s.stageImg}
                data-on={i === active || undefined}
                placeholder="blur"
              />
            ))}
            <span className={s.counter}>
              {String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
            </span>
          </div>
        </div>
        <div className={s.text}>
          <div className={s.head}>
            <span className="label">{label}</span>
            <h2 id={id}>{title}</h2>
            <p className="lead">{lead}</p>
          </div>
          <ol className={s.steps}>
            {steps.map((step, i) => (
              <li
                key={step.label}
                ref={(el) => {
                  refs.current[i] = el
                }}
                data-index={i}
                className={s.step}
                data-on={i === active || undefined}
              >
                <figure className={s.inlinePhoto}>
                  <Image src={step.image} alt={step.imageAlt} sizes="(max-width: 900px) 100vw, 1px" placeholder="blur" />
                </figure>
                <span className={s.stepLabel}>{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
