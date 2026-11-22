/**
 * Fallback company details used until the SiteSettings global exists (Phase 8).
 * After Phase 8 these values are seeded into the database and edited from the admin.
 */
export const siteDefaults = {
  brand: 'óliven',
  company: 'QARTENO TRADING',
  city: { en: 'Tunis, Tunisia', fr: 'Tunis, Tunisie', ar: 'تونس، تونس' },
  // Confirmed by the client on 2026-11-22: "cantact@" spelling and the oliven.tn domain.
  email: 'cantact@oliven.tn',
  phones: ['+216 99 340 530', '+216 92 009 109'],
} as const
