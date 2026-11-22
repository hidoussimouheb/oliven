import type { Locale } from '@/i18n/routing'

/**
 * Copy for the inner pages, one block per language.
 * Shaped like the future "Pages" collection (Phase 8).
 * Same rules as the homepage: "extra virgin" is confirmed by the client's lab check (Nov 2026); no organic, certification or award claims without a certificate;
 * no claim that óliven owns groves or mills; no promised quantities, lead times or destinations.
 */

type Hero = { label: string; title: string; lead: string; imageAlt: string }
type Block = { title: string; paragraphs: string[] }

export type StoryPage = {
  meta: { title: string; description: string }
  hero: Hero
  tunisia: Block & { label: string; imageAlt: string }
  model: Block & { label: string; points: string[] }
  label: Block & { label: string; imageAlt: string }
}

export type RangePage = {
  meta: { title: string; description: string }
  hero: Hero
  note: string
  specs: { volume: string; packaging: string; origin: string; originValue: string; grade: string; gradeValue: string; extraction: string; extractionValue: string }
  product: { back: string; others: string; quoteLead: string }
}

export type QualityPage = {
  meta: { title: string; description: string }
  hero: Hero
  origin: Block & { label: string; points: string[] }
  labelFacts: {
    label: string
    title: string
    lead: string
    statement: string
    nutritionTitle: string
    per: string
    rows: [string, string][]
  }
  documents: Block & { label: string; cta: string }
  galleryAlts: [string, string]
}

export type ExportPage = {
  meta: { title: string; description: string }
  hero: Hero
  buyers: { label: string; title: string; lead: string }
  steps: { label: string; title: string }
  request: Block & { label: string; items: string[] }
  terms: Block & { label: string }
}

const nutritionValues = ['3404 kJ / 828 kcal', '92 g', '13 g', '67 g', '9 g', '0 g', '0 g', '0 g', '0 g']

export const storyPage: Record<Locale, StoryPage> = {
  en: {
    meta: {
      title: 'Our story',
      description: 'óliven is the olive oil brand of QARTENO TRADING, a trading company in Tunis that sells Tunisian olive oil abroad.',
    },
    hero: {
      label: 'Our story',
      title: 'An olive oil brand from Tunis',
      lead: 'óliven belongs to QARTENO TRADING, a trading company in Tunis. We sell Tunisian olive oil to buyers abroad under our own label.',
      imageAlt: 'Dirt path between olive trees in Tunisia',
    },
    tunisia: {
      label: 'Why Tunisia',
      title: 'A country that has pressed olives for a very long time',
      paragraphs: [
        'Olive trees were already grown here in Carthaginian times, and olive oil is still one of the country’s main exports.',
        'Groves cover much of the centre and the south, around Sfax, Sousse and Kairouan. Most of the trees there are rain-fed and planted far apart.',
      ],
      imageAlt: 'Olive branch with ripening olives in Tunisia',
    },
    model: {
      label: 'What we do',
      title: 'We buy, fill, label and ship',
      paragraphs: [
        'We do not own groves or mills. We buy oil from partner mills in Tunisia, fill it into óliven tins and bottles, and sell it to companies in other countries.',
        'Working this way lets us offer five formats under one name, so a buyer can order tins for a kitchen and bottles for a shop from the same supplier.',
      ],
      points: ['Partner mills in Tunisia', 'Filled and packed in Tunisia', 'Sold under the óliven brand only'],
    },
    label: {
      label: 'The label',
      title: 'One design across every format',
      paragraphs: [
        'The óliven label shows an olive branch drawn in the brand’s colours: olive green, teal, gold and cream. The same design runs across the tins, the bottles and the shipping cartons.',
      ],
      imageAlt: 'Kraft shipping cartons printed with the óliven logo',
    },
  },
  fr: {
    meta: {
      title: 'Notre histoire',
      description: "óliven est la marque d'huile d'olive de QARTENO TRADING, société de négoce basée à Tunis qui vend de l'huile d'olive tunisienne à l'étranger.",
    },
    hero: {
      label: 'Notre histoire',
      title: "Une marque d'huile d'olive née à Tunis",
      lead: "óliven appartient à QARTENO TRADING, société de négoce basée à Tunis. Nous vendons de l'huile d'olive tunisienne à des acheteurs étrangers, sous notre propre marque.",
      imageAlt: 'Chemin de terre entre des oliviers en Tunisie',
    },
    tunisia: {
      label: 'Pourquoi la Tunisie',
      title: 'Un pays qui presse des olives depuis très longtemps',
      paragraphs: [
        "On cultivait déjà l'olivier ici à l'époque carthaginoise, et l'huile d'olive reste l'une des principales exportations du pays.",
        "Les oliveraies couvrent une grande partie du centre et du sud, autour de Sfax, Sousse et Kairouan. La plupart des arbres y poussent sans irrigation et sont plantés très espacés.",
      ],
      imageAlt: "Branche d'olivier aux olives mûrissantes en Tunisie",
    },
    model: {
      label: 'Notre métier',
      title: 'Nous achetons, conditionnons, étiquetons et expédions',
      paragraphs: [
        "Nous ne possédons ni oliveraies ni moulins. Nous achetons l'huile à des moulins partenaires en Tunisie, la mettons en bidons et en bouteilles óliven, puis la vendons à des entreprises dans d'autres pays.",
        'Ce fonctionnement nous permet de proposer cinq formats sous un même nom : un acheteur peut commander des bidons pour une cuisine et des bouteilles pour un magasin auprès du même fournisseur.',
      ],
      points: ['Moulins partenaires en Tunisie', 'Conditionné en Tunisie', 'Vendu uniquement sous la marque óliven'],
    },
    label: {
      label: "L'étiquette",
      title: 'Un même dessin sur tous les formats',
      paragraphs: [
        "L'étiquette óliven montre une branche d'olivier dessinée aux couleurs de la marque : vert olive, bleu canard, or et crème. Le même dessin se retrouve sur les bidons, les bouteilles et les cartons d'expédition.",
      ],
      imageAlt: "Cartons d'expédition en kraft imprimés du logo óliven",
    },
  },
  ar: {
    meta: {
      title: 'قصتنا',
      description: 'أوليفن هي علامة زيت الزيتون التابعة لشركة QARTENO TRADING، شركة تجارية في تونس العاصمة تبيع زيت الزيتون التونسي في الخارج.',
    },
    hero: {
      label: 'قصتنا',
      title: 'علامة زيت زيتون من تونس العاصمة',
      lead: 'أوليفن تابعة لشركة QARTENO TRADING، وهي شركة تجارية في تونس العاصمة. نبيع زيت الزيتون التونسي لمشترين في الخارج تحت علامتنا الخاصة.',
      imageAlt: 'طريق ترابي بين أشجار الزيتون في تونس',
    },
    tunisia: {
      label: 'لماذا تونس',
      title: 'بلد يعصر الزيتون منذ زمن بعيد',
      paragraphs: [
        'كانت أشجار الزيتون تُزرع هنا منذ العهد القرطاجي، وما زال زيت الزيتون من أهم صادرات البلاد.',
        'تغطي البساتين جزءًا كبيرًا من الوسط والجنوب، حول صفاقس وسوسة والقيروان. ومعظم الأشجار هناك بعلية ومغروسة على مسافات واسعة.',
      ],
      imageAlt: 'غصن زيتون بثمار تنضج في تونس',
    },
    model: {
      label: 'ما نقوم به',
      title: 'نشتري ونعبّئ ونضع الملصق ونشحن',
      paragraphs: [
        'لا نملك بساتين ولا معاصر. نشتري الزيت من معاصر شريكة في تونس، ونعبّئه في علب وقوارير أوليفن، ثم نبيعه لشركات في بلدان أخرى.',
        'بهذه الطريقة نقدّم خمسة أحجام تحت اسم واحد، فيستطيع المشتري أن يطلب علبًا لمطبخه وقوارير لمتجره من المورّد نفسه.',
      ],
      points: ['معاصر شريكة في تونس', 'معبّأ ومغلّف في تونس', 'يُباع تحت علامة أوليفن فقط'],
    },
    label: {
      label: 'الملصق',
      title: 'تصميم واحد على كل العبوات',
      paragraphs: [
        'يحمل ملصق أوليفن غصن زيتون مرسومًا بألوان العلامة: الأخضر الزيتوني والأزرق المخضرّ والذهبي والكريمي. ويتكرر التصميم نفسه على العلب والقوارير وكراتين الشحن.',
      ],
      imageAlt: 'صناديق شحن من الكرتون مطبوع عليها شعار أوليفن',
    },
  },
}

export const rangePage: Record<Locale, RangePage> = {
  en: {
    meta: {
      title: 'Our olive oil',
      description: 'óliven olive oil from Tunisia in five formats: 5 L and 2 L tins, a 500 ml tin, a 500 ml dark glass bottle and a 700 ml glass jar.',
    },
    hero: {
      label: 'Our olive oil',
      title: 'Five formats, one oil',
      lead: 'Two tins for kitchens and wholesale, three smaller formats for retail. Every format holds olive oil from Tunisia, obtained from olives by mechanical means only.',
      imageAlt: 'Fresh green olives',
    },
    note: 'Looking for a format or a quantity that is not listed? Say so in your quotation request and we will tell you what we can do.',
    specs: {
      volume: 'Volume',
      packaging: 'Packaging',
      origin: 'Origin',
      originValue: 'Product of Tunisia',
      grade: 'Grade',
      gradeValue: 'Extra virgin olive oil',
      extraction: 'Extraction',
      extractionValue: 'From olives, by mechanical means only (as stated on the label)',
    },
    product: { back: 'All formats', others: 'Other formats', quoteLead: 'Prices and quantities depend on your order. Ask for a quotation and we reply by email.' },
  },
  fr: {
    meta: {
      title: "Notre huile d'olive",
      description: "L'huile d'olive tunisienne óliven en cinq formats : bidons de 5 L et 2 L, bidon de 500 ml, bouteille en verre foncé de 500 ml et bocal en verre de 700 ml.",
    },
    hero: {
      label: "Notre huile d'olive",
      title: 'Cinq formats, une seule huile',
      lead: "Deux bidons pour la restauration et le gros, trois petits formats pour le détail. Chaque format contient de l'huile d'olive de Tunisie, obtenue à partir d'olives par des procédés uniquement mécaniques.",
      imageAlt: 'Olives vertes fraîches',
    },
    note: "Vous cherchez un format ou une quantité qui ne figure pas ici ? Indiquez-le dans votre demande de devis et nous vous dirons ce que nous pouvons faire.",
    specs: {
      volume: 'Contenance',
      packaging: 'Conditionnement',
      origin: 'Origine',
      originValue: 'Produit de Tunisie',
      grade: 'Catégorie',
      gradeValue: "Huile d'olive vierge extra",
      extraction: 'Extraction',
      extractionValue: "À partir d'olives, par des procédés uniquement mécaniques (mention de l'étiquette)",
    },
    product: { back: 'Tous les formats', others: 'Autres formats', quoteLead: 'Les prix et les quantités dépendent de votre commande. Demandez un devis et nous vous répondons par e-mail.' },
  },
  ar: {
    meta: {
      title: 'زيت الزيتون',
      description: 'زيت زيتون أوليفن التونسي في خمسة أحجام: علبتان 5 لترات و2 لتر، علبة 500 مل، قارورة زجاج داكن 500 مل وبرطمان زجاجي 700 مل.',
    },
    hero: {
      label: 'زيت الزيتون',
      title: 'خمسة أحجام وزيت واحد',
      lead: 'علبتان للمطابخ والجملة، وثلاثة أحجام أصغر للبيع بالتجزئة. في كل عبوة زيت زيتون من تونس، مستخرج من الزيتون بوسائل ميكانيكية فقط.',
      imageAlt: 'زيتون أخضر طازج',
    },
    note: 'هل تبحثون عن حجم أو كمية غير مذكورة هنا؟ اذكروا ذلك في طلب عرض السعر وسنخبركم بما يمكننا تقديمه.',
    specs: {
      volume: 'السعة',
      packaging: 'العبوة',
      origin: 'المنشأ',
      originValue: 'منتج تونسي',
      extraction: 'الاستخراج',
      grade: 'الصنف',
      gradeValue: 'زيت زيتون بكر ممتاز',
      extractionValue: 'من الزيتون، بوسائل ميكانيكية فقط (كما هو مذكور على الملصق)',
    },
    product: { back: 'كل الأحجام', others: 'أحجام أخرى', quoteLead: 'تتوقف الأسعار والكميات على طلبكم. اطلبوا عرض سعر وسنرد عليكم بالبريد الإلكتروني.' },
  },
}

export const qualityPage: Record<Locale, QualityPage> = {
  en: {
    meta: {
      title: 'Quality and origin',
      description: 'Where óliven olive oil comes from, what its label states, and the laboratory analysis buyers can request.',
    },
    hero: {
      label: 'Quality and origin',
      title: 'What is in the tin, and where it comes from',
      lead: 'Here is what our labels state, and the document you can ask for before you order.',
      imageAlt: 'Olive oil running from a steel spout',
    },
    origin: {
      label: 'Origin',
      title: 'Grown, pressed and packed in Tunisia',
      paragraphs: [
        'The olives are grown and pressed in Tunisia by our partner mills. The oil is then filled into óliven tins and bottles and packed in Tunisia before it ships.',
      ],
      points: ['Product of Tunisia', 'Pressed at partner mills', 'Filled and packed in Tunisia'],
    },
    labelFacts: {
      label: 'On the label',
      title: 'What the label states',
      lead: 'This is the category statement and the nutrition table printed on the óliven label.',
      statement: 'Superior category olive oil obtained directly from olives and solely by mechanical means.',
      nutritionTitle: 'Nutrition',
      per: 'per 100 ml',
      rows: [
        ['Energy', nutritionValues[0]!],
        ['Fat', nutritionValues[1]!],
        ['of which saturates', nutritionValues[2]!],
        ['of which monounsaturates', nutritionValues[3]!],
        ['of which polyunsaturates', nutritionValues[4]!],
        ['Carbohydrate', nutritionValues[5]!],
        ['of which sugars', nutritionValues[6]!],
        ['Protein', nutritionValues[7]!],
        ['Salt', nutritionValues[8]!],
      ],
    },
    documents: {
      label: 'Documents',
      title: 'Extra virgin, checked by a laboratory',
      paragraphs: ['A laboratory analysis confirms that our oil is extra virgin olive oil. Buyers can ask for a copy in their quotation request and we send it with our reply.'],
      cta: 'Ask for the analysis',
    },
    galleryAlts: ['Olive branch with ripening olives in Tunisia', 'Aerial view of olive plantations in Tunisia'],
  },
  fr: {
    meta: {
      title: 'Qualité et origine',
      description: "D'où vient l'huile d'olive óliven, ce qu'indique son étiquette et l'analyse de laboratoire disponible pour les acheteurs.",
    },
    hero: {
      label: 'Qualité et origine',
      title: "Ce qu'il y a dans le bidon, et d'où ça vient",
      lead: "Voici ce qu'indiquent nos étiquettes, et le document que vous pouvez demander avant de commander.",
      imageAlt: "Huile d'olive coulant d'un bec en acier",
    },
    origin: {
      label: 'Origine',
      title: 'Cultivée, pressée et conditionnée en Tunisie',
      paragraphs: [
        "Les olives sont cultivées et pressées en Tunisie par nos moulins partenaires. L'huile est ensuite mise en bidons et en bouteilles óliven et emballée en Tunisie avant l'expédition.",
      ],
      points: ['Produit de Tunisie', 'Pressée dans des moulins partenaires', 'Conditionnée en Tunisie'],
    },
    labelFacts: {
      label: "Sur l'étiquette",
      title: "Ce qu'indique l'étiquette",
      lead: "Voici la mention de catégorie et le tableau nutritionnel imprimés sur l'étiquette óliven.",
      statement: "Huile d'olive de catégorie supérieure obtenue directement des olives et uniquement par des procédés mécaniques.",
      nutritionTitle: 'Valeurs nutritionnelles',
      per: 'pour 100 ml',
      rows: [
        ['Énergie', nutritionValues[0]!],
        ['Matières grasses', nutritionValues[1]!],
        ['dont acides gras saturés', nutritionValues[2]!],
        ['dont acides gras mono-insaturés', nutritionValues[3]!],
        ['dont acides gras polyinsaturés', nutritionValues[4]!],
        ['Glucides', nutritionValues[5]!],
        ['dont sucres', nutritionValues[6]!],
        ['Protéines', nutritionValues[7]!],
        ['Sel', nutritionValues[8]!],
      ],
    },
    documents: {
      label: 'Documents',
      title: 'Vierge extra, vérifiée en laboratoire',
      paragraphs: ["Une analyse de laboratoire confirme que notre huile est une huile d'olive vierge extra. Les acheteurs peuvent en demander une copie dans leur demande de devis, nous l'envoyons avec notre réponse."],
      cta: "Demander l'analyse",
    },
    galleryAlts: ["Branche d'olivier aux olives mûrissantes en Tunisie", "Vue aérienne d'oliveraies en Tunisie"],
  },
  ar: {
    meta: {
      title: 'الجودة والمنشأ',
      description: 'من أين يأتي زيت زيتون أوليفن، وما يذكره ملصقه، والتحليل المخبري الذي يمكن للمشترين طلبه.',
    },
    hero: {
      label: 'الجودة والمنشأ',
      title: 'ما في العلبة، ومن أين يأتي',
      lead: 'هذا ما تذكره ملصقاتنا، والوثيقة التي يمكنكم طلبها قبل الشراء.',
      imageAlt: 'زيت زيتون يسيل من صنبور معدني',
    },
    origin: {
      label: 'المنشأ',
      title: 'يُزرع ويُعصر ويُعبّأ في تونس',
      paragraphs: [
        'يُزرع الزيتون ويُعصر في تونس لدى معاصرنا الشريكة. ثم يُعبّأ الزيت في علب وقوارير أوليفن ويُغلَّف في تونس قبل شحنه.',
      ],
      points: ['منتج تونسي', 'يُعصر في معاصر شريكة', 'يُعبّأ ويُغلَّف في تونس'],
    },
    labelFacts: {
      label: 'على الملصق',
      title: 'ما يذكره الملصق',
      lead: 'هذه عبارة الصنف وجدول القيم الغذائية المطبوعان على ملصق أوليفن.',
      statement: 'زيت زيتون من الصنف الممتاز، مستخرج مباشرة من الزيتون وبوسائل ميكانيكية فقط.',
      nutritionTitle: 'القيم الغذائية',
      per: 'لكل 100 مل',
      rows: [
        ['الطاقة', nutritionValues[0]!],
        ['الدهون', nutritionValues[1]!],
        ['منها مشبعة', nutritionValues[2]!],
        ['منها أحادية غير مشبعة', nutritionValues[3]!],
        ['منها متعددة غير مشبعة', nutritionValues[4]!],
        ['الكربوهيدرات', nutritionValues[5]!],
        ['منها سكريات', nutritionValues[6]!],
        ['البروتين', nutritionValues[7]!],
        ['الملح', nutritionValues[8]!],
      ],
    },
    documents: {
      label: 'الوثائق',
      title: 'بكر ممتاز، بتحقق مخبري',
      paragraphs: ['يؤكد تحليل مخبري أن زيتنا زيت زيتون بكر ممتاز. يمكن للمشترين طلب نسخة منه مع طلب عرض السعر، وسنرسلها مع ردّنا.'],
      cta: 'اطلبوا التحليل',
    },
    galleryAlts: ['غصن زيتون بثمار تنضج في تونس', 'منظر جوي لبساتين الزيتون في تونس'],
  },
}

export const exportPage: Record<Locale, ExportPage> = {
  en: {
    meta: {
      title: 'Export and partnerships',
      description: 'How importers, distributors and retailers buy óliven olive oil from Tunisia, and what to include in a quotation request.',
    },
    hero: {
      label: 'Export and partnerships',
      title: 'Selling óliven in your market',
      lead: 'We supply óliven olive oil to companies that buy for resale or for professional kitchens.',
      imageAlt: 'Kraft shipping cartons printed with the óliven logo',
    },
    buyers: { label: 'Who we supply', title: 'Companies that buy for resale', lead: 'We sell óliven-branded products only.' },
    steps: { label: 'How an order works', title: 'Three steps from request to shipment' },
    request: {
      label: 'Your request',
      title: 'What to tell us',
      paragraphs: ['A quotation is faster when we know:'],
      items: [
        'your country, and the city or port the goods go to',
        'the formats you want',
        'an estimate of the quantities',
        'any documents you need, such as the laboratory analysis',
      ],
    },
    terms: {
      label: 'Prices and terms',
      title: 'Set in the quotation',
      paragraphs: [
        'Prices, minimum quantities, lead times and shipping terms depend on the order, so we give them in the quotation rather than on this site.',
        'We sell under the óliven brand only and do not fill oil under other brands.',
      ],
    },
  },
  fr: {
    meta: {
      title: 'Export et partenariats',
      description: "Comment les importateurs, distributeurs et détaillants achètent l'huile d'olive óliven de Tunisie, et quoi indiquer dans une demande de devis.",
    },
    hero: {
      label: 'Export et partenariats',
      title: 'Vendre óliven sur votre marché',
      lead: "Nous fournissons l'huile d'olive óliven aux entreprises qui achètent pour revendre ou pour leurs cuisines professionnelles.",
      imageAlt: "Cartons d'expédition en kraft imprimés du logo óliven",
    },
    buyers: { label: 'Nos clients', title: 'Des entreprises qui achètent pour revendre', lead: 'Nous vendons uniquement des produits sous la marque óliven.' },
    steps: { label: 'Comment se passe une commande', title: "Trois étapes, de la demande à l'expédition" },
    request: {
      label: 'Votre demande',
      title: 'Ce que vous pouvez nous indiquer',
      paragraphs: ['Nous répondons plus vite quand nous connaissons :'],
      items: [
        'votre pays, et la ville ou le port de destination',
        'les formats souhaités',
        'une estimation des quantités',
        "les documents dont vous avez besoin, par exemple l'analyse de laboratoire",
      ],
    },
    terms: {
      label: 'Prix et conditions',
      title: 'Précisés dans le devis',
      paragraphs: [
        "Les prix, les quantités minimales, les délais et les conditions d'expédition dépendent de la commande. Nous les indiquons donc dans le devis plutôt que sur ce site.",
        "Nous vendons uniquement sous la marque óliven et ne conditionnons pas d'huile pour d'autres marques.",
      ],
    },
  },
  ar: {
    meta: {
      title: 'التصدير والشراكات',
      description: 'كيف يشتري المستوردون والموزعون وتجار التجزئة زيت زيتون أوليفن من تونس، وما الذي يُذكر في طلب عرض السعر.',
    },
    hero: {
      label: 'التصدير والشراكات',
      title: 'بيع أوليفن في سوقكم',
      lead: 'نورّد زيت زيتون أوليفن للشركات التي تشتري لإعادة البيع أو لمطابخها المهنية.',
      imageAlt: 'صناديق شحن من الكرتون مطبوع عليها شعار أوليفن',
    },
    buyers: { label: 'من نورّد لهم', title: 'شركات تشتري لإعادة البيع', lead: 'نبيع منتجات تحمل علامة أوليفن فقط.' },
    steps: { label: 'كيف يتم الطلب', title: 'ثلاث خطوات من الطلب إلى الشحن' },
    request: {
      label: 'طلبكم',
      title: 'ما الذي تخبروننا به',
      paragraphs: ['نرد بسرعة أكبر عندما نعرف:'],
      items: [
        'بلدكم، والمدينة أو الميناء الذي تُشحن إليه البضاعة',
        'الأحجام التي تريدونها',
        'تقديرًا للكميات',
        'الوثائق التي تحتاجونها، مثل التحليل المخبري',
      ],
    },
    terms: {
      label: 'الأسعار والشروط',
      title: 'تُحدَّد في عرض السعر',
      paragraphs: [
        'تتوقف الأسعار والكميات الدنيا ومواعيد التسليم وشروط الشحن على الطلب، لذلك نذكرها في عرض السعر لا على هذا الموقع.',
        'نبيع تحت علامة أوليفن فقط، ولا نعبّئ الزيت لعلامات أخرى.',
      ],
    },
  },
}
