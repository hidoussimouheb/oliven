import type { Locale } from '@/i18n/routing'
import { siteDefaults } from '@/config/site'

/**
 * Legal pages. Plain statements of what the site does today.
 * To review with the client before launch: hosting provider, company registration details, retention period.
 */
export type LegalDoc = { title: string; description: string; updated: string; sections: { title: string; paragraphs: string[] }[] }
export const legalSlugs = ['notice', 'privacy'] as const
export type LegalSlug = (typeof legalSlugs)[number]

const { company, email, phones } = siteDefaults
const phoneList = phones.join(', ')

export const legalContent: Record<Locale, Record<LegalSlug, LegalDoc>> = {
  en: {
    notice: {
      title: 'Legal notice',
      description: 'Publisher and contact details for the óliven website.',
      updated: 'Last updated: November 2026',
      sections: [
        { title: 'Publisher', paragraphs: [`This website is published by ${company}, Tunis, Tunisia. óliven is the olive oil brand of ${company}.`, `Email: ${email}. Phone: ${phoneList}.`] },
        { title: 'Hosting', paragraphs: ['The hosting provider will be named here when the site goes live.'] },
        { title: 'Photographs', paragraphs: ['Product photographs and brand images belong to óliven. Other photographs are used under the Unsplash licence and are credited in the footer of the pages that show them.'] },
        { title: 'Product information', paragraphs: ['Product details on this site come from the óliven labels. Prices and commercial terms are given only in written quotations.'] },
      ],
    },
    privacy: {
      title: 'Privacy policy',
      description: 'What the óliven website collects when you request a quotation, and how it is used.',
      updated: 'Last updated: November 2026',
      sections: [
        { title: 'Who is responsible', paragraphs: [`${company}, Tunis, Tunisia, is responsible for the personal data collected on this site. You can reach us at ${email}.`] },
        { title: 'What we collect', paragraphs: ['When you send a quotation request we store the details you enter: your name, company, business email, country, phone number if you give one, business type, the formats and quantities you ask about, your destination and your message.', 'We also store the date of the request, the language of the page and a scrambled form of your IP address, which helps us block abusive submissions. We do not store the IP address itself.'] },
        { title: 'Why we use it', paragraphs: ['We use these details only to answer your request and to follow up on it. We do not sell them or use them for advertising.'] },
        { title: 'Who can see it', paragraphs: ['Only the óliven sales team and site administrators can read quotation requests, through a password-protected admin area.'] },
        { title: 'How long we keep it', paragraphs: ['We keep a request for as long as we need it to answer you and to manage any order that follows. You can ask us to delete it at any time.'] },
        { title: 'Your rights', paragraphs: [`You can ask to see, correct or delete the details we hold about you by writing to ${email}.`] },
        { title: 'Cookies', paragraphs: ['The public site sets one cookie that remembers the language you chose. It has no advertising or analytics cookies. The admin area uses a login cookie for staff only.'] },
      ],
    },
  },
  fr: {
    notice: {
      title: 'Mentions légales',
      description: "Éditeur et coordonnées du site óliven.",
      updated: 'Dernière mise à jour : novembre 2026',
      sections: [
        { title: 'Éditeur', paragraphs: [`Ce site est édité par ${company}, Tunis, Tunisie. óliven est la marque d'huile d'olive de ${company}.`, `E-mail : ${email}. Téléphone : ${phoneList}.`] },
        { title: 'Hébergement', paragraphs: ["L'hébergeur sera indiqué ici lors de la mise en ligne du site."] },
        { title: 'Photographies', paragraphs: ["Les photos de produits et les visuels de marque appartiennent à óliven. Les autres photos sont utilisées sous licence Unsplash et sont créditées en bas des pages qui les affichent."] },
        { title: 'Informations produits', paragraphs: ['Les informations produits de ce site proviennent des étiquettes óliven. Les prix et les conditions commerciales sont donnés uniquement dans les devis écrits.'] },
      ],
    },
    privacy: {
      title: 'Politique de confidentialité',
      description: 'Les données que le site óliven recueille lors d’une demande de devis, et leur utilisation.',
      updated: 'Dernière mise à jour : novembre 2026',
      sections: [
        { title: 'Responsable', paragraphs: [`${company}, Tunis, Tunisie, est responsable des données personnelles recueillies sur ce site. Vous pouvez nous écrire à ${email}.`] },
        { title: 'Ce que nous recueillons', paragraphs: ['Quand vous envoyez une demande de devis, nous enregistrons les informations saisies : nom, entreprise, e-mail professionnel, pays, téléphone si vous le donnez, type d’activité, formats et quantités demandés, destination et message.', 'Nous enregistrons aussi la date de la demande, la langue de la page et une forme brouillée de votre adresse IP, qui nous aide à bloquer les envois abusifs. Nous ne conservons pas l’adresse IP elle-même.'] },
        { title: 'Pourquoi', paragraphs: ['Nous utilisons ces informations uniquement pour répondre à votre demande et en assurer le suivi. Nous ne les vendons pas et ne les utilisons pas pour de la publicité.'] },
        { title: 'Qui y a accès', paragraphs: ["Seuls l'équipe commerciale óliven et les administrateurs du site peuvent lire les demandes de devis, dans un espace d'administration protégé par mot de passe."] },
        { title: 'Durée de conservation', paragraphs: ["Nous conservons une demande le temps nécessaire pour vous répondre et gérer la commande qui peut suivre. Vous pouvez nous demander de la supprimer à tout moment."] },
        { title: 'Vos droits', paragraphs: [`Vous pouvez demander à consulter, corriger ou supprimer les informations que nous détenons sur vous en écrivant à ${email}.`] },
        { title: 'Cookies', paragraphs: ["Le site public dépose un seul cookie, qui retient la langue choisie. Il n'utilise aucun cookie publicitaire ni de mesure d'audience. L'espace d'administration utilise un cookie de connexion réservé à l'équipe."] },
      ],
    },
  },
  ar: {
    notice: {
      title: 'الإشعار القانوني',
      description: 'ناشر موقع أوليفن ومعلومات الاتصال.',
      updated: 'آخر تحديث: نوفمبر 2026',
      sections: [
        { title: 'الناشر', paragraphs: [`ينشر هذا الموقع ${company}، تونس، تونس. أوليفن هي علامة زيت الزيتون التابعة لـ ${company}.`, `البريد الإلكتروني: ${email}. الهاتف: ${phoneList}.`] },
        { title: 'الاستضافة', paragraphs: ['سيُذكر اسم مزوّد الاستضافة هنا عند إطلاق الموقع.'] },
        { title: 'الصور', paragraphs: ['صور المنتجات وصور العلامة ملك لأوليفن. أما الصور الأخرى فمستعملة بترخيص Unsplash ومذكور أصحابها في أسفل الصفحات التي تعرضها.'] },
        { title: 'معلومات المنتجات', paragraphs: ['معلومات المنتجات في هذا الموقع مأخوذة من ملصقات أوليفن. لا تُذكر الأسعار والشروط التجارية إلا في عروض الأسعار المكتوبة.'] },
      ],
    },
    privacy: {
      title: 'سياسة الخصوصية',
      description: 'ما يجمعه موقع أوليفن عند طلب عرض سعر، وكيف يُستعمل.',
      updated: 'آخر تحديث: نوفمبر 2026',
      sections: [
        { title: 'المسؤول', paragraphs: [`${company}، تونس، تونس، هي المسؤولة عن البيانات الشخصية التي يجمعها هذا الموقع. يمكنكم مراسلتنا على ${email}.`] },
        { title: 'ما نجمعه', paragraphs: ['عندما ترسلون طلب عرض سعر نحفظ المعلومات التي تُدخلونها: الاسم، الشركة، البريد الإلكتروني المهني، البلد، رقم الهاتف إن ذكرتموه، نوع النشاط، الأحجام والكميات المطلوبة، جهة الوصول ورسالتكم.', 'ونحفظ أيضًا تاريخ الطلب ولغة الصفحة وصيغة مشفّرة من عنوان IP الخاص بكم، تساعدنا على منع الإرسال المسيء. لا نحفظ عنوان IP نفسه.'] },
        { title: 'لماذا نستعملها', paragraphs: ['نستعمل هذه المعلومات فقط للرد على طلبكم ومتابعته. لا نبيعها ولا نستعملها للإعلان.'] },
        { title: 'من يطّلع عليها', paragraphs: ['لا يقرأ طلبات عروض الأسعار إلا فريق المبيعات في أوليفن ومديرو الموقع، عبر مساحة إدارة محمية بكلمة مرور.'] },
        { title: 'مدة الحفظ', paragraphs: ['نحتفظ بالطلب المدة اللازمة للرد عليكم ولإدارة أي طلبية تليه. يمكنكم أن تطلبوا حذفه في أي وقت.'] },
        { title: 'حقوقكم', paragraphs: [`يمكنكم طلب الاطلاع على المعلومات التي نحتفظ بها عنكم أو تصحيحها أو حذفها بمراسلتنا على ${email}.`] },
        { title: 'ملفات تعريف الارتباط', paragraphs: ['يضع الموقع العام ملف تعريف ارتباط واحدًا يتذكّر اللغة التي اخترتموها. لا يستعمل ملفات إعلانية ولا لقياس الزيارات. وتستعمل مساحة الإدارة ملف ارتباط لتسجيل الدخول خاصًّا بالفريق.'] },
      ],
    },
  },
}
