import { setRequestLocale } from 'next-intl/server'
import { redirect } from '@/i18n/navigation'

// The homepage is built in Phase 6. Until then the locale root opens the design system.
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  redirect({ href: '/style-guide', locale })
}
