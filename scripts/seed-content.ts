/**
 * Copies the site's current text and photos into the admin, so editors start from what is online.
 *
 *   npm run seed:content            fills only what is still empty (safe to run again)
 *   npm run seed:content -- --force overwrites the admin text with the copy in src/content
 *
 * Photos already chosen in the admin are never replaced.
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload, type Payload } from 'payload'
import config from '../src/payload.config'
import { contentPages } from '../src/cms/registry'
import { toCms } from '../src/cms/schema'
import { siteDefaults } from '../src/config/site'
import { locales, type Locale } from '../src/i18n/routing'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const media = (f: string) => path.resolve(dirname, '../seed/media', f)
const force = process.argv.includes('--force')

type Alt = Record<Locale, string>
const FILES: Record<string, Alt> = {
  'stock/tunisia-aerial-grove.jpg': { en: 'Aerial view of olive plantations in Tunisia', fr: "Vue aérienne d'oliveraies en Tunisie", ar: 'منظر جوي لبساتين الزيتون في تونس' },
  'stock/tunisia-olive-tree.jpg': { en: 'Olive tree in Tunisia', fr: 'Olivier en Tunisie', ar: 'شجرة زيتون في تونس' },
  'stock/tunisia-olive-cluster.jpg': { en: 'Olive branch with ripening olives in Tunisia', fr: "Branche d'olivier aux olives mûrissantes en Tunisie", ar: 'غصن زيتون بثمار تنضج في تونس' },
  'stock/tunisia-olive-branch.jpg': { en: 'Olive branch in Tunisia', fr: "Branche d'olivier en Tunisie", ar: 'غصن زيتون في تونس' },
  'stock/tunisia-grove-path.jpg': { en: 'Dirt path between olive trees in Tunisia', fr: 'Chemin de terre entre des oliviers en Tunisie', ar: 'طريق ترابي بين أشجار الزيتون في تونس' },
  'stock/harvest-picking.jpg': { en: 'Olives being picked by hand from a tree', fr: "Cueillette d'olives à la main sur un arbre", ar: 'جني الزيتون باليد من الشجرة' },
  'stock/harvest-sorting.jpg': { en: 'Freshly harvested olives being sorted by hand', fr: "Tri à la main d'olives fraîchement récoltées", ar: 'فرز زيتون مقطوف حديثًا باليد' },
  'stock/harvest-hand-olives.jpg': { en: 'Hands holding freshly picked olives', fr: "Mains tenant des olives fraîchement cueillies", ar: 'يدان تحملان زيتونًا مقطوفًا حديثًا' },
  'stock/mill-oil-spout.jpg': { en: 'Olive oil running from a steel spout', fr: "Huile d'olive coulant d'un bec en acier", ar: 'زيت زيتون يسيل من صنبور معدني' },
  'stock/oil-pour-bowl.jpg': { en: 'Olive oil poured into a small bowl', fr: "Huile d'olive versée dans un petit bol", ar: 'زيت زيتون يُسكب في وعاء صغير' },
  'stock/olives-green.jpg': { en: 'Green olives', fr: 'Olives vertes', ar: 'زيتون أخضر' },
  'stock/olives-pile.jpg': { en: 'A pile of freshly harvested olives', fr: "Un tas d'olives fraîchement récoltées", ar: 'كومة من الزيتون المقطوف حديثًا' },
  'shipping-cartons-mockup.png': { en: 'óliven shipping cartons', fr: "Cartons d'expédition óliven", ar: 'كراتين شحن أوليفن' },
  'stationery-mockup.png': { en: 'óliven stationery', fr: 'Papeterie óliven', ar: 'قرطاسية أوليفن' },
  'tin-2l-mockup-scene.png': { en: 'óliven 2 litre tin on a wooden table beside olive branches', fr: "Bidon óliven de 2 litres sur une table en bois, à côté de branches d'olivier", ar: 'علبة أوليفن سعة 2 لتر على طاولة خشبية بجانب أغصان الزيتون' },
  'tin-2l-olives-scene.jpg': { en: 'óliven 2 litre tin lying on a bed of green olives and olive leaves', fr: "Bidon óliven de 2 litres posé sur des olives vertes et des feuilles d'olivier", ar: 'علبة أوليفن سعة 2 لتر موضوعة على زيتون أخضر وأوراق زيتون' },
}

/** The photos each page shows today, slot by slot (same order as src/cms/registry.ts). */
const PHOTOS: Partial<Record<keyof typeof contentPages, Record<string, string>>> = {
  home: {
    hero: 'stock/tunisia-aerial-grove.jpg',
    intro: 'stock/tunisia-olive-tree.jpg',
    journeyHarvest: 'stock/harvest-picking.jpg',
    journeyMill: 'stock/harvest-sorting.jpg',
    journeyPressing: 'stock/mill-oil-spout.jpg',
    journeyPacking: 'tin-2l-olives-scene.jpg',
    origin1: 'stock/tunisia-grove-path.jpg',
    origin2: 'stock/tunisia-olive-cluster.jpg',
    origin3: 'stock/tunisia-aerial-grove.jpg',
    partners: 'shipping-cartons-mockup.png',
    closing: 'stock/olives-pile.jpg',
  },
  story: { hero: 'stock/tunisia-grove-path.jpg', tunisia: 'stock/tunisia-olive-branch.jpg', model: 'stock/harvest-hand-olives.jpg', label: 'shipping-cartons-mockup.png', closing: 'stock/tunisia-olive-branch.jpg' },
  range: { hero: 'stock/olives-green.jpg', closing: 'stock/olives-pile.jpg' },
  quality: { hero: 'stock/mill-oil-spout.jpg', originA: 'stock/tunisia-aerial-grove.jpg', originB: 'stock/tunisia-olive-cluster.jpg', documents: 'stock/oil-pour-bowl.jpg', closing: 'stock/tunisia-olive-cluster.jpg' },
  export: { hero: 'shipping-cartons-mockup.png', request: 'stationery-mockup.png', closing: 'stock/olives-pile.jpg' },
  products: { 'tin-2l': 'tin-2l-mockup-scene.png' },
}

const uploaded = new Map<string, number | string>()

async function mediaFor(payload: Payload, file: string): Promise<number | string> {
  const known = uploaded.get(file)
  if (known) return known
  const filename = path.basename(file)
  const existing = await payload.find({ collection: 'media', where: { filename: { equals: filename } }, limit: 1, depth: 0 })
  const alt = FILES[file] ?? { en: filename, fr: filename, ar: filename }
  let id = existing.docs[0]?.id
  if (!id) {
    const doc = await payload.create({ collection: 'media', locale: 'en', data: { alt: alt.en }, filePath: media(file) })
    id = doc.id
    for (const l of ['fr', 'ar'] as const) await payload.update({ collection: 'media', id, locale: l, data: { alt: alt[l] } })
  }
  uploaded.set(file, id)
  return id
}

const hasText = (doc: unknown) => {
  const c = (doc as { content?: Record<string, unknown> } | null)?.content
  return Boolean(c && Object.values(c).some((v) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0)))
}

async function run() {
  const payload = await getPayload({ config })

  for (const [key, def] of Object.entries(contentPages) as [keyof typeof contentPages, (typeof contentPages)[keyof typeof contentPages]][]) {
    const slug = def.slug as never
    const current = await payload.findGlobal({ slug, locale: 'en', fallbackLocale: false, depth: 0 })
    if (force || !hasText(current)) {
      for (const l of locales) await payload.updateGlobal({ slug, locale: l, data: { content: toCms(def.content[l]) } as never })
      payload.logger.info(`Text copied: ${def.label}`)
    } else payload.logger.info(`Text kept (already edited): ${def.label}`)

    const slots = PHOTOS[key]
    if (slots) {
      const photos = { ...((current as { photos?: Record<string, unknown> }).photos ?? {}) }
      let changed = false
      for (const [slot, file] of Object.entries(slots)) {
        if (photos[slot]) continue
        photos[slot] = await mediaFor(payload, file)
        changed = true
      }
      if (changed) {
        await payload.updateGlobal({ slug, locale: 'en', data: { photos } as never })
        payload.logger.info(`Photos set: ${def.label}`)
      }
    }
  }

  const settings = await payload.findGlobal({ slug: 'site-settings', locale: 'en', fallbackLocale: false })
  if (force || !settings.email) {
    await payload.updateGlobal({
      slug: 'site-settings',
      locale: 'en',
      data: { company: siteDefaults.company, email: siteDefaults.email, phones: siteDefaults.phones.map((number) => ({ number })), city: siteDefaults.city.en },
    })
    for (const l of ['fr', 'ar'] as const) await payload.updateGlobal({ slug: 'site-settings', locale: l, data: { city: siteDefaults.city[l] } })
    payload.logger.info('Company details copied')
  }

  payload.logger.info('Done.')
  process.exit(0)
}

// `payload run` exits as soon as this module finishes loading, so the work is awaited here.
await run().catch((e) => {
  console.error(e)
  process.exit(1)
})
