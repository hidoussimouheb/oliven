import type { Locale } from '@/i18n/routing'

/**
 * The five óliven formats. Shaped like the future Products collection (Phase 8).
 * Only facts confirmed by the client or printed on the labels go here.
 * Closures, dimensions and carton counts are left out until the client supplies them.
 */
export const productSlugs = ['tin-5l', 'tin-2l', 'tin-500ml', 'bottle-500ml', 'jar-700ml'] as const
export type ProductSlug = (typeof productSlugs)[number]

export type ProductText = {
  volume: string
  material: string
  name: string
  summary: string
  imageAlt?: string
}

/** Which formats have a real photograph yet (the others show the placeholder). */
export const productPhoto: Partial<Record<ProductSlug, 'tin2l'>> = { 'tin-2l': 'tin2l' }

export const productContent: Record<Locale, Record<ProductSlug, ProductText>> = {
  en: {
    'tin-5l': {
      volume: '5 L',
      material: 'Metal tin with handle',
      name: 'óliven olive oil, 5 L tin',
      summary: 'Our largest tin, with a handle for pouring. It suits restaurants, caterers and buyers who use olive oil in volume.',
    },
    'tin-2l': {
      volume: '2 L',
      material: 'Metal tin',
      name: 'óliven olive oil, 2 L tin',
      summary: 'A mid-size tin for food service and for homes that cook with olive oil every day.',
      imageAlt: 'óliven 2 litre metal tin on a wooden table beside olive branches',
    },
    'tin-500ml': {
      volume: '500 ml',
      material: 'Round metal tin',
      name: 'óliven olive oil, 500 ml tin',
      summary: 'A small round tin for retail. Metal keeps light away from the oil and stands up well to shipping.',
    },
    'bottle-500ml': {
      volume: '500 ml',
      material: 'Dark glass bottle',
      name: 'óliven olive oil, 500 ml bottle',
      summary: 'A dark glass bottle for retail shelves. The tinted glass reduces the light that reaches the oil.',
    },
    'jar-700ml': {
      volume: '700 ml',
      material: 'Glass jar',
      name: 'óliven olive oil, 700 ml jar',
      summary: 'A glass jar for retail shelves.',
    },
  },
  fr: {
    'tin-5l': {
      volume: '5 L',
      material: 'Bidon métallique avec poignée',
      name: "Huile d'olive óliven, bidon de 5 L",
      summary: "Notre plus grand bidon, avec une poignée pour verser. Il convient aux restaurants, aux traiteurs et aux acheteurs qui utilisent l'huile d'olive en grande quantité.",
    },
    'tin-2l': {
      volume: '2 L',
      material: 'Bidon métallique',
      name: "Huile d'olive óliven, bidon de 2 L",
      summary: "Un bidon de taille moyenne pour la restauration et pour les foyers qui cuisinent à l'huile d'olive tous les jours.",
      imageAlt: "Bidon métallique óliven de 2 litres sur une table en bois, à côté de branches d'olivier",
    },
    'tin-500ml': {
      volume: '500 ml',
      material: 'Bidon métallique rond',
      name: "Huile d'olive óliven, bidon de 500 ml",
      summary: "Un petit bidon rond pour la vente au détail. Le métal protège l'huile de la lumière et supporte bien le transport.",
    },
    'bottle-500ml': {
      volume: '500 ml',
      material: 'Bouteille en verre foncé',
      name: "Huile d'olive óliven, bouteille de 500 ml",
      summary: "Une bouteille en verre foncé pour le rayon. Le verre teinté limite la lumière qui atteint l'huile.",
    },
    'jar-700ml': {
      volume: '700 ml',
      material: 'Bocal en verre',
      name: "Huile d'olive óliven, bocal de 700 ml",
      summary: 'Un bocal en verre pour le rayon.',
    },
  },
  ar: {
    'tin-5l': {
      volume: '5 لترات',
      material: 'علبة معدنية بمقبض',
      name: 'زيت زيتون أوليفن، علبة 5 لترات',
      summary: 'أكبر علبة لدينا، بمقبض يسهّل الصب. تناسب المطاعم ومموّني الحفلات والمشترين الذين يستعملون زيت الزيتون بكميات كبيرة.',
    },
    'tin-2l': {
      volume: '2 لتر',
      material: 'علبة معدنية',
      name: 'زيت زيتون أوليفن، علبة 2 لتر',
      summary: 'علبة متوسطة الحجم للمطاعم وللبيوت التي تطبخ بزيت الزيتون كل يوم.',
      imageAlt: 'علبة أوليفن معدنية سعة 2 لتر على طاولة خشبية بجانب أغصان الزيتون',
    },
    'tin-500ml': {
      volume: '500 مل',
      material: 'علبة معدنية مستديرة',
      name: 'زيت زيتون أوليفن، علبة 500 مل',
      summary: 'علبة صغيرة مستديرة للبيع بالتجزئة. يحمي المعدن الزيت من الضوء ويتحمّل الشحن جيدًا.',
    },
    'bottle-500ml': {
      volume: '500 مل',
      material: 'قارورة زجاج داكن',
      name: 'زيت زيتون أوليفن، قارورة 500 مل',
      summary: 'قارورة من الزجاج الداكن لرفوف المتاجر. يقلّل الزجاج الملوّن الضوء الذي يصل إلى الزيت.',
    },
    'jar-700ml': {
      volume: '700 مل',
      material: 'برطمان زجاجي',
      name: 'زيت زيتون أوليفن، برطمان 700 مل',
      summary: 'برطمان زجاجي لرفوف المتاجر.',
    },
  },
}
