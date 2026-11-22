import type { Locale } from '@/i18n/routing'

/**
 * Homepage copy, one block per language.
 * Shaped like the future "Homepage" global so Phase 8 can move it into the CMS without changing the page.
 * Rule: no quality claims ("extra virgin", awards, certifications) until the client's documents are uploaded.
 */
export type HomeContent = {
  meta: { title: string; description: string }
  hero: { label: string; title: string; text: string; facts: string[]; imageAlt: string }
  intro: { label: string; title: string; paragraphs: string[] }
  process: { label: string; title: string; lead: string; steps: { title: string; text: string }[] }
  formats: {
    label: string
    title: string
    lead: string
    items: { slug: string; volume: string; material: string; imageAlt?: string }[]
  }
  origin: { label: string; title: string; text: string; points: string[] }
  quality: { label: string; title: string; text: string; cta: string }
  partners: { label: string; title: string; lead: string; buyers: { title: string; text: string }[]; imageAlt: string }
  closing: { title: string; text: string }
}

const formatSlugs = ['tin-5l', 'tin-2l', 'tin-500ml', 'bottle-500ml', 'jar-700ml'] as const

export const homeContent: Record<Locale, HomeContent> = {
  en: {
    meta: {
      title: 'Olive oil from Tunisia for importers and distributors',
      description:
        'óliven supplies Tunisian olive oil in five formats, from 500 ml glass to 5 L tins, to importers, distributors and retail buyers. Request a quotation.',
    },
    hero: {
      label: 'Product of Tunisia',
      title: 'Tunisian olive oil, packed for importers and distributors',
      text: 'Five formats, from 500 ml glass to 5 L tins. Tell us your market and the volumes you need, and our export team replies with a quotation.',
      facts: ['500 ml to 5 L', 'Glass and tin', 'English · Français · العربية'],
      imageAlt: 'óliven 2 litre tin on a wooden table beside olive branches',
    },
    intro: {
      label: 'Who we are',
      title: 'A Tunisian olive oil brand made for buyers abroad',
      paragraphs: [
        'óliven is the olive oil brand of QARTENO TRADING, based in Tunis. We work with olive mills in Tunisia, pack their oil under our own label, and supply it to companies outside the country.',
        'Every label is printed in English, French and Arabic, so the same tin or bottle can go on a shelf in Europe, the Gulf or North Africa.',
      ],
    },
    process: {
      label: 'How we work',
      title: 'From your first message to a confirmed order',
      lead: 'Buying from us takes three steps.',
      steps: [
        { title: 'Tell us what you need', text: 'Your market, the formats you are interested in and an estimate of the quantities.' },
        { title: 'Receive a quotation', text: 'We reply with prices for the formats and volumes you asked about, and send product documents on request.' },
        { title: 'Confirm and ship', text: 'Once you confirm, we prepare the order in Tunisia under the óliven label and agree the shipping details with you.' },
      ],
    },
    formats: {
      label: 'Our olive oil',
      title: 'Five formats under one label',
      lead: 'Two sizes of tin for kitchens and wholesale, three smaller formats for retail shelves.',
      items: [
        { slug: formatSlugs[0], volume: '5 L', material: 'Metal tin with handle' },
        { slug: formatSlugs[1], volume: '2 L', material: 'Metal tin', imageAlt: 'óliven 2 litre metal tin' },
        { slug: formatSlugs[2], volume: '500 ml', material: 'Round metal tin' },
        { slug: formatSlugs[3], volume: '500 ml', material: 'Dark glass bottle' },
        { slug: formatSlugs[4], volume: '700 ml', material: 'Glass jar' },
      ],
    },
    origin: {
      label: 'Origin',
      title: 'Grown and pressed in Tunisia',
      text: 'Tunisia is one of the largest olive oil exporters in the world, and olive growing there goes back to Carthage. óliven brings that oil to you in a finished, labelled pack.',
      points: ['Product of Tunisia', 'Packed in Tunisia', 'Labels in three languages'],
    },
    quality: {
      label: 'Quality',
      title: 'Documents before you buy',
      text: 'A laboratory analysis of our olive oil is available to buyers on request. Ask for it with your quotation and we send it with our reply.',
      cta: 'Ask for the analysis',
    },
    partners: {
      label: 'Export and partnerships',
      title: 'Who we supply',
      lead: 'We sell óliven-branded products only, to companies that buy for resale or professional use.',
      buyers: [
        { title: 'Importers', text: 'Larger orders of one or several formats for your own distribution.' },
        { title: 'Distributors and wholesalers', text: 'Tins for food service and bottles for the shops you deliver to.' },
        { title: 'Retail chains', text: 'Shelf-ready 500 ml and 700 ml formats with trilingual labels.' },
        { title: 'Specialty food shops', text: 'Smaller mixed orders of the glass and tin formats.' },
      ],
      imageAlt: 'Kraft shipping cartons printed with the óliven logo',
    },
    closing: {
      title: 'Tell us your market and volumes',
      text: 'The quotation form takes about two minutes. Our export team replies by email.',
    },
  },

  fr: {
    meta: {
      title: "Huile d'olive de Tunisie pour importateurs et distributeurs",
      description:
        "óliven fournit de l'huile d'olive tunisienne en cinq formats, du verre de 500 ml au bidon de 5 L, aux importateurs, distributeurs et acheteurs de la grande distribution. Demandez un devis.",
    },
    hero: {
      label: 'Produit de Tunisie',
      title: "Huile d'olive tunisienne, conditionnée pour les importateurs et distributeurs",
      text: 'Cinq formats, du verre de 500 ml au bidon de 5 L. Indiquez-nous votre marché et les volumes souhaités, notre service export vous répond avec un devis.',
      facts: ['500 ml à 5 L', 'Verre et métal', 'English · Français · العربية'],
      imageAlt: "Bidon óliven de 2 litres sur une table en bois, à côté de branches d'olivier",
    },
    intro: {
      label: 'Qui sommes-nous',
      title: "Une marque d'huile d'olive tunisienne pensée pour l'export",
      paragraphs: [
        "óliven est la marque d'huile d'olive de QARTENO TRADING, installée à Tunis. Nous travaillons avec des moulins en Tunisie, conditionnons leur huile sous notre propre marque et la fournissons à des entreprises à l'étranger.",
        "Chaque étiquette est imprimée en anglais, en français et en arabe : le même bidon ou la même bouteille peut aller en rayon en Europe, dans le Golfe ou en Afrique du Nord.",
      ],
    },
    process: {
      label: 'Notre fonctionnement',
      title: 'Du premier message à la commande confirmée',
      lead: 'Acheter chez nous se fait en trois étapes.',
      steps: [
        { title: 'Dites-nous ce dont vous avez besoin', text: 'Votre marché, les formats qui vous intéressent et une estimation des quantités.' },
        { title: 'Recevez un devis', text: 'Nous répondons avec les prix des formats et volumes demandés, et envoyons les documents produit sur demande.' },
        { title: 'Confirmez, nous expédions', text: "Après votre accord, nous préparons la commande en Tunisie sous la marque óliven et convenons avec vous des détails d'expédition." },
      ],
    },
    formats: {
      label: "Notre huile d'olive",
      title: 'Cinq formats, une seule marque',
      lead: 'Deux tailles de bidon pour la restauration et le gros, trois formats plus petits pour les rayons.',
      items: [
        { slug: formatSlugs[0], volume: '5 L', material: 'Bidon métallique avec poignée' },
        { slug: formatSlugs[1], volume: '2 L', material: 'Bidon métallique', imageAlt: 'Bidon métallique óliven de 2 litres' },
        { slug: formatSlugs[2], volume: '500 ml', material: 'Boîte métallique ronde' },
        { slug: formatSlugs[3], volume: '500 ml', material: 'Bouteille en verre teinté' },
        { slug: formatSlugs[4], volume: '700 ml', material: 'Bocal en verre' },
      ],
    },
    origin: {
      label: 'Origine',
      title: 'Cultivée et pressée en Tunisie',
      text: "La Tunisie est l'un des plus grands exportateurs d'huile d'olive au monde, et l'oléiculture y remonte à Carthage. óliven vous apporte cette huile dans un conditionnement fini et étiqueté.",
      points: ['Produit de Tunisie', 'Conditionné en Tunisie', 'Étiquettes en trois langues'],
    },
    quality: {
      label: 'Qualité',
      title: 'Les documents avant l’achat',
      text: "Une analyse de laboratoire de notre huile d'olive est disponible pour les acheteurs sur demande. Demandez-la avec votre devis, nous l'envoyons avec notre réponse.",
      cta: "Demander l'analyse",
    },
    partners: {
      label: 'Export et partenariats',
      title: 'À qui nous vendons',
      lead: 'Nous vendons uniquement des produits de marque óliven, à des entreprises qui achètent pour la revente ou un usage professionnel.',
      buyers: [
        { title: 'Importateurs', text: "Des commandes importantes d'un ou plusieurs formats pour votre propre distribution." },
        { title: 'Distributeurs et grossistes', text: 'Des bidons pour la restauration et des bouteilles pour les magasins que vous livrez.' },
        { title: 'Enseignes de distribution', text: 'Formats de 500 ml et 700 ml prêts pour le rayon, avec étiquettes trilingues.' },
        { title: 'Épiceries fines', text: 'Petites commandes mixtes des formats en verre et en métal.' },
      ],
      imageAlt: 'Cartons d’expédition en kraft imprimés du logo óliven',
    },
    closing: {
      title: 'Indiquez-nous votre marché et vos volumes',
      text: 'Le formulaire de devis prend environ deux minutes. Notre service export vous répond par e-mail.',
    },
  },

  ar: {
    meta: {
      title: 'زيت زيتون تونسي للمستوردين والموزعين',
      description:
        'توفّر أوليفن زيت الزيتون التونسي في خمسة أحجام، من عبوة زجاجية سعة 500 مل إلى علبة معدنية سعة 5 لترات، للمستوردين والموزعين ومشتري سلاسل التجزئة. اطلبوا عرض سعر.',
    },
    hero: {
      label: 'منتج تونسي',
      title: 'زيت زيتون تونسي، معبأ للمستوردين والموزعين',
      text: 'خمسة أحجام، من عبوة زجاجية سعة 500 مل إلى علبة معدنية سعة 5 لترات. أخبرونا بسوقكم والكميات المطلوبة، وسيرسل لكم فريق التصدير عرض سعر.',
      facts: ['من 500 مل إلى 5 لترات', 'زجاج ومعدن', 'English · Français · العربية'],
      imageAlt: 'علبة أوليفن سعة 2 لتر على طاولة خشبية بجانب أغصان الزيتون',
    },
    intro: {
      label: 'من نحن',
      title: 'علامة زيت زيتون تونسية موجّهة للمشترين في الخارج',
      paragraphs: [
        'أوليفن هي علامة زيت الزيتون التابعة لشركة QARTENO TRADING ومقرّها تونس العاصمة. نتعامل مع معاصر زيتون في تونس، ونعبّئ زيتها تحت علامتنا الخاصة، ونورّده إلى شركات خارج البلاد.',
        'كل ملصق مطبوع بالإنجليزية والفرنسية والعربية، فيمكن للعلبة أو القارورة نفسها أن تُعرض على الرفوف في أوروبا أو الخليج أو شمال إفريقيا.',
      ],
    },
    process: {
      label: 'طريقة عملنا',
      title: 'من رسالتكم الأولى إلى الطلب المؤكَّد',
      lead: 'الشراء منّا يتمّ في ثلاث خطوات.',
      steps: [
        { title: 'أخبرونا باحتياجاتكم', text: 'سوقكم، والأحجام التي تهمّكم، وتقدير للكميات.' },
        { title: 'استلموا عرض السعر', text: 'نردّ بأسعار الأحجام والكميات المطلوبة، ونرسل وثائق المنتج عند الطلب.' },
        { title: 'أكّدوا ونحن نشحن', text: 'بعد تأكيدكم، نجهّز الطلب في تونس تحت علامة أوليفن ونتّفق معكم على تفاصيل الشحن.' },
      ],
    },
    formats: {
      label: 'زيت الزيتون',
      title: 'خمسة أحجام تحت علامة واحدة',
      lead: 'حجمان من العلب المعدنية للمطابخ والبيع بالجملة، وثلاثة أحجام أصغر لرفوف المتاجر.',
      items: [
        { slug: formatSlugs[0], volume: '5 لترات', material: 'علبة معدنية بمقبض' },
        { slug: formatSlugs[1], volume: '2 لتر', material: 'علبة معدنية', imageAlt: 'علبة أوليفن معدنية سعة 2 لتر' },
        { slug: formatSlugs[2], volume: '500 مل', material: 'علبة معدنية أسطوانية' },
        { slug: formatSlugs[3], volume: '500 مل', material: 'قارورة زجاجية داكنة' },
        { slug: formatSlugs[4], volume: '700 مل', material: 'برطمان زجاجي' },
      ],
    },
    origin: {
      label: 'المنشأ',
      title: 'مزروع ومعصور في تونس',
      text: 'تونس من أكبر مصدّري زيت الزيتون في العالم، وتعود زراعة الزيتون فيها إلى عهد قرطاج. تقدّم لكم أوليفن هذا الزيت في عبوة جاهزة وموسومة.',
      points: ['منتج تونسي', 'معبّأ في تونس', 'ملصقات بثلاث لغات'],
    },
    quality: {
      label: 'الجودة',
      title: 'الوثائق قبل الشراء',
      text: 'تحليل مخبري لزيت الزيتون لدينا متاح للمشترين عند الطلب. اطلبوه مع عرض السعر، ونرسله مع ردّنا.',
      cta: 'اطلب التحليل',
    },
    partners: {
      label: 'التصدير والشراكات',
      title: 'لمن نورّد',
      lead: 'نبيع منتجات تحمل علامة أوليفن فقط، للشركات التي تشتري لإعادة البيع أو للاستخدام المهني.',
      buyers: [
        { title: 'المستوردون', text: 'طلبات كبيرة من حجم واحد أو عدة أحجام لشبكة توزيعكم.' },
        { title: 'الموزعون وتجار الجملة', text: 'علب معدنية لقطاع المطاعم وقوارير للمتاجر التي تزوّدونها.' },
        { title: 'سلاسل التجزئة', text: 'أحجام 500 مل و700 مل جاهزة للرفوف بملصقات ثلاثية اللغة.' },
        { title: 'متاجر الأغذية الفاخرة', text: 'طلبات مختلطة أصغر من العبوات الزجاجية والمعدنية.' },
      ],
      imageAlt: 'صناديق شحن من الكرتون مطبوع عليها شعار أوليفن',
    },
    closing: {
      title: 'أخبرونا بسوقكم والكميات المطلوبة',
      text: 'يستغرق ملء نموذج عرض السعر نحو دقيقتين، ويردّ فريق التصدير عبر البريد الإلكتروني.',
    },
  },
}
