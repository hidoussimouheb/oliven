'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/Button'
import { SelectField, TextArea, TextField } from '@/components/ui/Field'
import { businessTypes, quantityUnits } from '@/collections/Inquiries'
import { submitQuote, type FieldName, type QuoteState } from './actions'
import s from './contact.module.css'

type Props = {
  locale: string
  countries: { value: string; label: string }[]
  formats: { value: string; label: string }[]
  preselected?: string
  contactEmail: string
}

export function QuoteForm({ locale, countries, formats, preselected, contactEmail }: Props) {
  const t = useTranslations('form')
  const [state, action, pending] = useActionState<QuoteState, FormData>(submitQuote, { status: 'idle' })
  const summaryRef = useRef<HTMLDivElement>(null)
  const doneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state.status === 'invalid' || state.status === 'error' || state.status === 'rate') summaryRef.current?.focus()
    if (state.status === 'ok') doneRef.current?.focus()
  }, [state])

  if (state.status === 'ok') {
    return (
      <div ref={doneRef} tabIndex={-1} className={s.done} role="status">
        <h2>{t('successTitle')}</h2>
        <p>{t('successText', { email: state.email })}</p>
      </div>
    )
  }

  const v = state.status === 'idle' ? {} : state.values
  const val = (k: string) => (typeof v[k] === 'string' ? (v[k] as string) : '')
  const chosen = Array.isArray(v.formats) ? (v.formats as string[]) : preselected ? [preselected] : []
  const errors = state.status === 'invalid' ? state.errors : {}
  const err = (f: FieldName) => {
    const e = errors[f]
    if (!e) return undefined
    return {
      required: t('errorRequired'),
      email: t('errorEmail'),
      number: t('errorNumber'),
      consent: t('errorConsent'),
      formats: t('errorFormats'),
    }[e]
  }

  return (
    <form action={action} className={s.form} noValidate>
      <div ref={summaryRef} tabIndex={-1} className={s.summary} aria-live="polite">
        {state.status === 'invalid' ? <p>{t('errorSummary')}</p> : null}
        {state.status === 'error' ? <p>{t('errorGeneric', { email: contactEmail })}</p> : null}
        {state.status === 'rate' ? <p>{t('errorRate', { email: contactEmail })}</p> : null}
      </div>

      <input type="hidden" name="locale" value={locale} />
      <div className={s.trap} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={s.row}>
        <TextField id="fullName" label={t('fullName')} autoComplete="name" required defaultValue={val('fullName')} error={err('fullName')} />
        <TextField id="company" label={t('company')} autoComplete="organization" required defaultValue={val('company')} error={err('company')} />
      </div>
      <div className={s.row}>
        <TextField id="email" type="email" label={t('email')} autoComplete="email" required defaultValue={val('email')} error={err('email')} />
        <TextField
          id="phone"
          type="tel"
          label={t('phone')}
          optionalLabel={t('optional')}
          autoComplete="tel"
          dir="ltr"
          defaultValue={val('phone')}
          error={err('phone')}
        />
      </div>
      <div className={s.row}>
        <SelectField
          id="country"
          label={t('country')}
          placeholder={t('countryPlaceholder')}
          options={countries}
          required
          autoComplete="country"
          defaultValue={val('country')}
          error={err('country')}
        />
        <SelectField
          id="businessType"
          label={t('businessType')}
          placeholder={t('chooseOne')}
          options={businessTypes.map((b) => ({ value: b, label: t(`businessTypes.${b}`) }))}
          required
          defaultValue={val('businessType')}
          error={err('businessType')}
        />
      </div>

      <fieldset className={s.formats} aria-describedby={err('formats') ? 'formats-error' : undefined}>
        <legend>{t('formats')}</legend>
        <div className={s.checks}>
          {formats.map((f) => (
            <label key={f.value} className={s.check}>
              <input type="checkbox" name="formats" value={f.value} defaultChecked={chosen.includes(f.value)} />
              <span>{f.label}</span>
            </label>
          ))}
        </div>
        {err('formats') ? (
          <p id="formats-error" className={s.error} role="alert">
            {err('formats')}
          </p>
        ) : null}
      </fieldset>

      <div className={s.row}>
        <div className={s.qty}>
          <TextField
            id="quantity"
            inputMode="numeric"
            label={t('quantity')}
            optionalLabel={t('optional')}
            defaultValue={val('quantity')}
            error={err('quantity')}
          />
          <SelectField
            id="quantityUnit"
            label={t('unit')}
            options={quantityUnits.map((u) => ({ value: u, label: t(`units.${u}`) }))}
            defaultValue={val('quantityUnit') || 'units'}
          />
        </div>
        <TextField id="destination" label={t('destination')} optionalLabel={t('optional')} defaultValue={val('destination')} error={err('destination')} />
      </div>

      <TextArea id="message" label={t('message')} optionalLabel={t('optional')} rows={5} defaultValue={val('message')} error={err('message')} />

      <div className={s.consent}>
        <label className={s.check}>
          <input type="checkbox" name="consent" defaultChecked={val('consent') === 'on'} aria-describedby={err('consent') ? 'consent-error' : undefined} aria-invalid={err('consent') ? true : undefined} />
          <span>
            {t('consent')} <Link href="/legal/privacy">{t('privacyLink')}</Link>
          </span>
        </label>
        {err('consent') ? (
          <p id="consent-error" className={s.error} role="alert">
            {err('consent')}
          </p>
        ) : null}
      </div>

      <div>
        <Button type="submit" disabled={pending} aria-disabled={pending}>
          {pending ? t('sending') : t('send')}
        </Button>
      </div>
    </form>
  )
}
