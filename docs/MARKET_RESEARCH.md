# Market research

Phase 2 and 3 of the website project: eight olive oil brands and companies, visited live on 22 November 2026.

## How the research was done

The brief asked for Playwright. Playwright and Chromium are installed in the cloud workspace, and they work (they rendered the logo SVG), but the workspace's network policy blocks outbound web traffic: every competitor URL returned `ERR_TUNNEL_CONNECTION_FAILED` and the proxy answered 403. So the visits ran in the Claude desktop app's built-in browser on the client's computer, a real Chromium browser driven by the same kind of automation (navigate, run scripts in the page, screenshot, resize).

On every homepage the same script read: title, meta description, `lang`, hreflang tags, canonical, Open Graph image, JSON-LD count, h1 and h2 text, navigation labels, B2B-related links, language switchers, computed fonts, forms and their fields, broken images, images without `alt`, linked PDFs, page height, request count and load time. B2B and contact pages were opened where they exist. Mobile was checked at 375 x 812 on three sites.

Limits worth knowing:

- Load times were measured on the client's own connection, so they compare sites against each other but are not lab numbers.
- Transfer sizes come from the Resource Timing API, which undercounts some third-party files.
- The screenshots are small because the browser pane was scaled down. They are in `docs/research-screenshots/`.
- Cookie banners on Monini, Frantoio Muraglia and Castillo de Canena appeared in French or Spanish on their English pages. That probably follows the browser's language setting, but it is still what a visitor with that setting sees.
- Two Tunisian exporters could not be reached: agroliva.com refused the connection, and chogroup.com is a parked domain for sale (CHO's consumer brand Terra Delyssa is covered instead).
- The `reverse-engineer-anything` skill was considered and not used: it analyses shipped binaries and app bundles, and these are public web pages whose markup can be read directly.

## Summary table

| # | Brand | Country | Kind of site | B2B path | Languages | h1 | Requests / load |
|---|---|---|---|---|---|---|---|
| 1 | Terra Delyssa | Tunisia | US consumer shop (Shopify) | "Partner with us" form aimed at influencers; wholesale sent to Faire | EN (hreflang en, fr, ja) | none | 199 req / 12.4 s |
| 2 | Les Moulins Mahjoub | Tunisia | Family heritage brand | Email address only, no form | FR, EN, DE | none | 70 req / 9.4 s |
| 3 | Castillo de Canena | Spain | Premium estate brand | Contact page | EN, ES (flag menu) | yes | 91 req / 5.6 s |
| 4 | Deoleo | Spain | Corporate group | Contact Us, PDF reports | EN, ES | yes | 42 req / 12.3 s |
| 5 | Monini | Italy | Brand + store | Contact | 15 hreflang variants | none | 47 req / 6.2 s |
| 6 | Frantoio Muraglia | Italy | Design-led mill + shop | Dedicated "Business" page with lead form | IT, EN, FR, DE | yes (generic text) | 208 req |
| 7 | GAEA | Greece | Brand, geo-redirect to UK store | None visible | Country switcher (UK, DE, USA, GR, EU) | none | 204 req / 7.8 s |
| 8 | Laconiko | Greece | Family estate + shop | "Wholesale" page with long form | EN | none | 153 req |

Five of the eight homepages have no h1. None of the eight offers Arabic. None of the eight has a quotation form with packaging format, volume or destination port fields.

## 1. Terra Delyssa (CHO, Tunisia)

URL: https://terradelyssa.com · Screenshot: `01-terra-delyssa-desktop.jpg`

- **Design.** White ground, dark top bar, rotating hero carousel of five slides (bottle on a log, seasonal campaign). Instrument Sans for everything, Nunito on some headings. Bright yellow label colour carries the brand.
- **UX.** Built for retail: cart, "Shop Now" on every slide, product cards with prices, reviews, newsletter forms (three of them).
- **Positioning.** "Single origin. Fully traceable", blockchain traceability, farmer stories, awards strip. The strongest proof-of-origin story in the set.
- **B2B.** The "Partner with us" page asks for name, email, website and message, and its text addresses bloggers and influencers. Wholesale links out to Faire. An importer has no path.
- **Technical.** About 8.6 MB transferred, 55 scripts, 12.4 s to load event, one broken tracking pixel. hreflang declares en, fr and ja.
- **Worth adapting.** Turning traceability into a page of its own, and naming the origin region on the front.
- **Opportunity for óliven/HOLIVEN.** The best-known Tunisian brand speaks to US shoppers. A Tunisian site that speaks to importers, with formats, documents and a real quotation form, has no direct rival here.

## 2. Les Moulins Mahjoub (Tunisia)

URL: https://moulinsmahjoub.com · Screenshots: `02-moulins-mahjoub-desktop.jpg`, `02-moulins-mahjoub-mobile.jpg`

- **Design.** Centred serif-free wordmark, large landscape photograph of the Medjerda valley groves, long editorial scroll with chapter headings ("A fertile valley", "Field to jar", "The wisdom of time"). Avenir-like light sans. Calm and honest.
- **UX.** Three nav items. Product catalogue with filters by ingredient and family, sizes listed per product (for example "200 g • 300 g • 640 g").
- **Positioning.** Family since 1896, Tebourba, organic, Berber know-how. Heritage told through place, not superlatives.
- **B2B.** Contact page lists a postal address and one email. No form, no export or distributor information.
- **Technical.** Light: 70 requests, about 94 KB measured. No h1. hreflang fr, en, de. No Open Graph image. On mobile, two seconds after load, the first screen still showed a blank band above the photo where the logo sits on desktop.
- **Worth adapting.** Chapter-by-chapter origin story; showing every pack size next to the product name.
- **Opportunity.** Same country, similar calm tone, but no commercial path. A buyer who likes the story has to write a cold email.

## 3. Castillo de Canena (Spain)

URL: https://www.castillodecanena.com/en/ · Screenshots: `03-castillo-de-canena-desktop.jpg`, `03-castillo-de-canena-mobile.jpg`

- **Design.** Full-screen night photo of the castle with the moon, white serif headline "Olive tree tradition since 1780", beige ground (`#F7F2EE`) below. Classical and expensive-looking.
- **UX.** Fifteen navigation entries (about, awards, sustainability and certifications, process, grove, CSR, R&D, experiences, recipes). Product list mixes premium bottles and 2.5 L tins.
- **Positioning.** History, awards, sustainability and certifications get their own pages. Quality proof is structured.
- **B2B.** Generic contact only.
- **Technical.** Headings resolve to Times New Roman, which makes the type feel default rather than chosen. No hreflang despite a language menu. On mobile at 375 px, the cookie banner covers about half the first screen, and 33 tap targets are under 32 px tall.
- **Worth adapting.** A separate "certifications" page; tins shown next to glass as premium, not as catering stock.
- **Opportunity.** HOLIVEN can match this level of polish with a fraction of the navigation, and with type that is clearly designed.

## 4. Deoleo (Spain)

URL: https://deoleo.com/en/ · Screenshots: `04-deoleo-desktop.jpg`, `04-deoleo-mobile.jpg`

- **Design.** Corporate: large Garamond headline "We are Deoleo. The Olive Oil Company." over an olive close-up, white page, brand logo carousel.
- **UX.** Company, brands, impact, talent, news, shareholders. Downloadable PDFs (results, accounts, supplier code of conduct, integrated policy).
- **Positioning.** Scale and governance: number one company, sustainability, certifications.
- **B2B.** "Contact Us" only; buying goes through their brands.
- **Technical.** 42 requests but 12.3 s to load event. hreflang en, es. On mobile the sticky header covers the first line of the hero headline.
- **Worth adapting.** Publishing policy and supplier documents as PDFs. For an exporter, the equivalent is technical sheets and lab reports.
- **Opportunity.** Large groups show documents but no product-level specs. A small exporter can be more open at the product level.

## 5. Monini (Italy)

URL: https://www.monini.com/en/ · Screenshot: `05-monini-desktop.jpg`

- **Design.** Dark green full-bleed grove photo, product bottle cut out on the left, cream ground `#F5EFD3` (very close to the óliven cream). Montserrat throughout.
- **UX.** Mega menus with 30+ links: history, mill, people, quality and transparency, awards, certification, products by line, recipes, culture, tasting guide.
- **Positioning.** A century of family history, own mill, a "how to recognise quality oil" guide.
- **B2B.** Contact link only; a North America subsidiary is in the menu.
- **Technical.** 15 hreflang variants, the best international SEO in the set. No h1.
- **Worth adapting.** Teaching buyers how to read quality (acidity, harvest, storage). An educational page builds trust without claims.
- **Opportunity.** Monini's palette is near óliven's. Glass panels, the aubergine accent and Caslon headings will keep the HOLIVEN site distinct.

## 6. Frantoio Muraglia (Italy)

URL: https://www.frantoiomuraglia.it/en/ · Screenshots: `06-frantoio-muraglia-desktop.jpg`, `06-frantoio-muraglia-business.jpg`

- **Design.** Bright yellow promo bar, black hero, product photography of hand-painted ceramic jars and colourful tins. Merriweather headings, Poppins body.
- **UX.** Online shop is the main path. A separate Business page targets restaurants, shops and distributors.
- **Positioning.** Packaging as the product: ceramic and designer tins, collectible lines each year.
- **B2B.** The best in the set. The Business page splits buyers by type (restaurant, shop, distributor), explains which formats suit each, and repeats "Ask for more information" after each block. The form asks name, surname, email, phone, company, province, country, a buyer-type field, website, and how they heard of the brand, with a privacy checkbox.
- **Technical.** 208 requests, 75 scripts. The h1 is the text "Frantoio Muraglia | Homepage", which is an SEO placeholder.
- **Worth adapting.** Segmenting the B2B page by buyer type, with the form after each segment.
- **Opportunity.** The form still lacks format, quantity and destination. HOLIVEN's quotation form can ask the questions an export manager needs on the first reply.

## 7. GAEA (Greece)

URL: https://www.gaea.gr/en/ (redirected to https://gaeagreece.uk) · Screenshot: `07-gaea-desktop.jpg`

- **Design.** Warm editorial still life (bread, olives, tins, bottles on wood), Trajan Pro headings, Abadi body. Polished photography.
- **UX.** The hero slide sends visitors to Amazon UK. Country switcher (UK, DE, USA, GR, EU) instead of a language switcher.
- **Positioning.** 30 years, awards, high-polyphenol oil, certifications page.
- **B2B.** None visible from the homepage.
- **Technical.** Geo-redirect from the .gr domain to the UK store, so the original link does not stay where it was sent. 204 requests. No h1.
- **Worth adapting.** One well-lit still life of the whole range carries a lot of credibility.
- **Opportunity.** Choose language, never force a country redirect. Importers often browse from a country other than the one they buy for.

## 8. Laconiko (Greece)

URL: https://laconiko.com · Screenshot: `08-laconiko-desktop.jpg`

- **Design.** Black header, full-screen sunset video over the sea, Playfair Display headings, Montserrat body.
- **UX.** Shop-first. A "Wholesale" link leads to a "Join the exclusive Laconiko retail family" page.
- **Positioning.** Family, awards, "the world's best extra virgin olive oil", health claim awards.
- **B2B.** A long form (name, phone, email, company, website, full address, US state, postcode, country, number of locations, checkboxes, message). The address block defaults to a US state list, which is friction for any non-US importer. Orders under 12 cases are sent to Faire.
- **Technical.** 153 requests, one image without alt, no h1.
- **Worth adapting.** Stating a minimum order rule plainly (they say "less than 12 cases, use Faire"). It saves both sides a round of emails, if the client is willing to publish one.
- **Opportunity.** A form built for international buyers from the first field: country list first, port or destination market, no domestic address block.

## What the market does, and where the gaps are

Industry standards (we should meet them):

- Origin and heritage told through landscape photography and a short history.
- Product pages that show formats and sizes.
- Quality proof grouped on its own page (awards, certifications, process).
- A contact path in the main navigation.

Gaps we can fill:

1. **No real quotation flow.** Not one site asks for format, quantity, destination or incoterm. HOLIVEN's form will.
2. **No Arabic.** None of the eight offers Arabic, and only Monini handles hreflang thoroughly. Proper EN/FR/AR with RTL is a clear differentiator for Gulf and North African buyers.
3. **Documents.** Only Deoleo links PDFs, and those are corporate. Per-product technical sheets and lab reports, downloadable without a login, are rare.
4. **Basic SEO hygiene.** Five homepages lack an h1; one uses a placeholder h1. Easy to beat.
5. **Weight.** Six of the eight load 90 to 200 requests. A static-first site under 40 requests will feel faster on export buyers' office networks.
6. **Mobile first screen.** Cookie banners and sticky headers cover the hero on three sites. A light consent banner and a compact header avoid this.
7. **Honest claims.** Several sites lean on "world's best" and award counts. HOLIVEN has none yet, and the brief forbids inventing them. Calm, specific facts (origin, formats, documents on request) will read as more serious to a procurement team than borrowed superlatives.

## Differentiation strategy for HOLIVEN

- Lead with the buyer's question: what is it, where is it from, what formats, how do I get a quote. The homepage says this on the first screen.
- One commercial path everywhere: "Request a quotation", with the format pre-filled from whichever product page the buyer came from.
- A B2B page segmented by buyer type (importer, distributor, retail chain, private label), adapted from Muraglia's approach, each with its own short explanation and a link to the form.
- Documents as first-class content: each product gets a technical sheet slot, and the Quality page lists every uploaded report with its date.
- Trilingual from day one, with Arabic set by a native-quality Arabic typeface and a mirrored layout, not a translated copy of the English page.
- A visual system taken straight from the packaging (cream, olive, teal, gold, the branch illustration, Caslon and Jost), with glass panels as the one web-specific layer.
