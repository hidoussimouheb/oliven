import type { Locale } from '@/i18n/routing'
import { homeContent } from '@/content/home'
import { exportPage, qualityPage, rangePage, storyPage } from '@/content/pages'
import { legalContent } from '@/content/legal'
import { productContent, productSlugs } from '@/content/products'

/**
 * Every page whose copy and photos can be edited in the admin.
 * `content` is the default copy (also the fallback when a field is left empty);
 * `photos` lists the picture slots shown on the page, in page order.
 */
export const contentPages = {
  home: {
    slug: 'home-page',
    label: 'Homepage',
    content: homeContent,
    photos: [
      ['hero', 'Top of the page'],
      ['intro', 'Who we are'],
      ['journeyHarvest', 'From grove to tin: harvest'],
      ['journeyMill', 'From grove to tin: at the mill'],
      ['journeyPressing', 'From grove to tin: pressing'],
      ['journeyPacking', 'From grove to tin: packing'],
      ['origin1', 'Origin: round photo 1'],
      ['origin2', 'Origin: round photo 2'],
      ['origin3', 'Origin: round photo 3'],
      ['partners', 'Export and partnerships'],
      ['closing', 'Closing band'],
    ],
  },
  story: {
    slug: 'story-page',
    label: 'Our story',
    content: storyPage,
    photos: [
      ['hero', 'Top of the page'],
      ['tunisia', 'Why Tunisia'],
      ['model', 'How we work'],
      ['label', 'The óliven label'],
      ['closing', 'Closing band'],
    ],
  },
  range: {
    slug: 'range-page',
    label: 'Our olive oil (range and product pages)',
    content: rangePage,
    photos: [
      ['hero', 'Top of the page'],
      ['closing', 'Closing band'],
    ],
  },
  quality: {
    slug: 'quality-page',
    label: 'Quality and origin',
    content: qualityPage,
    photos: [
      ['hero', 'Top of the page'],
      ['originA', 'Origin: first photo'],
      ['originB', 'Origin: second photo'],
      ['documents', 'Documents'],
      ['closing', 'Closing band'],
    ],
  },
  export: {
    slug: 'export-page',
    label: 'Export and partnerships',
    content: exportPage,
    photos: [
      ['hero', 'Top of the page'],
      ['request', 'What to send us'],
      ['closing', 'Closing band'],
    ],
  },
  products: {
    slug: 'products',
    label: 'Products (the five formats)',
    content: productContent,
    photos: productSlugs.map((s) => [s, `Photo: ${s}`] as [string, string]),
  },
  legal: {
    slug: 'legal-pages',
    label: 'Legal notice and privacy',
    content: legalContent,
    photos: [],
  },
} satisfies Record<string, { slug: string; label: string; content: Record<Locale, unknown>; photos: readonly (readonly [string, string])[] }>

export type ContentKey = keyof typeof contentPages
export type ContentOf<K extends ContentKey> = (typeof contentPages)[K]['content'][Locale]
