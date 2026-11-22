# Brand analysis

Phase 1 of the website project. Sources inspected on 22 November 2026:

| File | What it is |
|---|---|
| `Oliven-Brand-Board-editable VF.pdf` | One-page brand board (1080 x 2084 pt): logo, palette, logo colour variations, stationery mock-up, flat 2 L tin label, carton and 5 L tin mock-ups, illustration pattern |
| `maquette oliven 5L.pdf` | Flat print label for the 5 L tin, trilingual (EN/FR/AR) |
| `oliven logo design.svg` | Vector wordmark, single colour |
| `bottle_reference.jpg` (upload) | AI-generated reference showing three small formats with the label applied |

Copies of all four, plus high-resolution renders, are in `holiven/source/`. Extracted assets are in `holiven/public/assets/` (see the asset table at the end).

## 1. The name: the files say óliven, the brief says HOLIVEN

Every brand file uses the name **óliven**. None of them contains "HOLIVEN". This has to be settled before any page is built, because the brief forbids redesigning or inventing a logo, and the only logo we have spells óliven.

The spelling also varies inside the files:

| Where | Spelling |
|---|---|
| Logo SVG and wordmark on all packaging | óliven (acute accent on the o, a leaf-shaped grave accent over the e) |
| Brand board label copy (2 L) | Olivèn |
| 5 L label copy, carton and 5 L mock-ups | Olivén |
| 5 L label Arabic copy | أوليفيان (reads "Olivian") |

The website needs one written form of the name for titles, SEO and body copy, in Latin and Arabic script.

## 2. Logo

**Primary wordmark.** Custom lettering, lowercase, high contrast, with two leaf-shaped accents (over the ó and the è) that double as olive leaves. Supplied as one SVG path, fill `#2B401A`, on a 1000 x 1000 artboard with wide empty margins (the mark sits roughly between y 400 and y 600). For the web we should crop the viewBox to the mark itself, without touching the paths.

**Variations shown on the board** (raster only, no vector files supplied):

| Variation | Ground | Mark colour |
|---|---|---|
| Wordmark | Aubergine `#4A2F35` | Cream `#F5ECCD` |
| Monogram "ó" | Deep teal `#28433A` | Cream |
| Monogram "ó" | Olive `#2B401A` | Cream |
| Wordmark | Gold `#A8884A` | Cream |
| Wordmark | Cream | Metallic gold gradient |
| Wordmark | Aubergine | Metallic gold gradient |

**Seal.** A circular badge with the monogram, the arc text "TUNISIAN OLIVE OIL" on top and "EXTRA VIRGIN" below, used on tin sides and the round sticker.

**Usage rules.** The board gives no written rules (clear space, minimum size, forbidden uses). Until the client supplies them, the site will follow conservative defaults: clear space equal to the height of the "ó" bowl on all sides, no stretching, no recolouring outside the six combinations above, no effects (shadows, outlines, glass blur) on the mark itself.

**Missing:** vector files for the cream, gold and gradient versions, the monogram and the seal. We can recolour the single-colour SVG for the flat variants (cream, gold), since those are the same paths in a palette colour shown on the board. The gold gradient and the seal need the designer's source files.

## 3. Colour palette (exact values from the board)

| Swatch | HEX | Role observed in the files |
|---|---|---|
| Olive | `#2B401A` | Logo, primary dark ground, headline ink |
| Deep teal | `#28433A` | Secondary dark ground, label text, leaf illustration |
| Gold | `#A8884A` | Accent, flat gold wordmark, rules and dividers |
| Cream | `#F5ECCD` | Main light ground (labels, cartons, stationery) |
| Aubergine | `#4A2F35` | Rare accent ground |

The 5 L label ground renders slightly greener (about `#EFECCB`) than the board swatch. That is likely a print profile difference; the site will use the board value `#F5ECCD`.

Contrast checks for text (WCAG 2.2):

| Pair | Ratio | Use |
|---|---|---|
| Olive on cream | 9.6 : 1 | Body text, headings |
| Teal on cream | 9.1 : 1 | Body text |
| Cream on aubergine | 10.2 : 1 | Text on dark band |
| Gold on cream | 2.8 : 1 | Too low for text. Rules, icons and decorative display only |
| Gold on olive | 3.4 : 1 | Large text (24 px+, or 19 px bold) only |
| Gold on aubergine | 3.6 : 1 | Large text only |

## 4. Typography (fonts embedded in the PDFs)

| Font | Where it is used | Licence |
|---|---|---|
| Libre Caslon Text | Tagline "ROOTED IN ORIGIN. REFINED FOR THE WORLD.", arc text on the seal | SIL OFL, on Google Fonts |
| Jost (Regular, Italic) | Label body copy, small caps lines ("PRODUCT OF TUNISIA"), French translations in italic | SIL OFL, on Google Fonts |
| Source Sans 3 | Nutrition table | SIL OFL, on Google Fonts |
| Noto Sans Arabic | All Arabic copy on the 5 L label | SIL OFL, on Google Fonts |

Hierarchy on the packaging: the wordmark is the only display element; Caslon in spaced capitals for the tagline; Jost in wide-tracked capitals for labels; Jost regular for paragraphs. All four fonts are free for web use, so the site can match the packaging exactly.

## 5. Visual language

- Cream grounds, one or two inks, a lot of empty space.
- A hand-drawn olive branch: teal leaves, gold olives, scattered gold dots. Supplied as a transparent PNG (two crops). It is the brand's only illustration.
- Thin gold double rules framing the label edges.
- Tracked capitals for small labels.
- Photography in the mock-ups: warm natural light, olive-branch shadows on beige walls, wood surfaces.
- Tunisian flag on the 5 L label ("PRODUCT OF TUNISIA / منتج تونسي").

## 6. Products and packaging

| # | Format | Material | Source | Status |
|---|---|---|---|---|
| 1 | 5 L (5000 ml) | Metal tin, handle, screw cap | 5 L label PDF, mock-up photo | Label final, trilingual |
| 2 | 2 L (2000 ml) | Metal tin | Flat label on brand board (back 140 mm, sides 90 mm, front 140 mm) | Label final, EN/FR only |
| 3 | 500 ml | Round metal tin, black screw cap | Reference image only | Label adapted by AI; needs a real label file |
| 4 | 500 ml | Dark glass bottle (dorica/marasca type) with hang tag | Reference image only | Same |
| 5 | 700 ml | Wide glass jar, dark lid | Reference image only | Same |

The reference photo answers the question of the fifth product: it shows three items (500 ml tin, 500 ml bottle, 700 ml jar), which with the 2 L and 5 L tins makes five. This still needs the client's confirmation.

The reference image is AI generated. It cannot be published as a product photograph, because it would present a mock-up as the real product. Real photographs (or properly made 3D renders from the final dielines) are needed for the glass formats. The 5 L tin mock-up and the carton mock-up from the board can be used as interim product visuals, labelled internally as mock-ups.

## 7. Product information printed on the labels

These are the only product facts we can publish without further evidence:

- Product of Tunisia.
- Ingredients: 100% extra virgin olive oil.
- Nutrition per 100 ml: energy 3404 kJ / 828 kcal; fat 92 g, of which saturates 13 g, monounsaturates 67 g, polyunsaturates 9 g; carbohydrate 0 g, of which sugars 0 g; protein 0 g; salt 0 g.
- Storage: store in a cool, dark place, away from heat and light.
- Net volumes: 2000 ml ℮, 5000 ml ℮.
- Category statement: "Superior category olive oil obtained directly from olives and solely by mechanical means." (The 5 L label adds the word "traditional".)

Fields left blank on the labels: packer name and address, lot number, best-before date, EAN-13 barcode, website.

## 8. Claims and compliance flags

1. **"Extra virgin".** The labels state it, but the brief says not to publish it without evidence. We need a recent laboratory analysis (free acidity, peroxide value, K232, K270, ΔK, and an organoleptic panel test) from an accredited lab. Until then, the site copy will say "olive oil from Tunisia" and keep the category in the product data as "pending documentation".
2. **Arabic category wording.** The 5 L front says "زيت زيتون بكر تونسي" (Tunisian virgin olive oil) under the tagline. "بكر" alone means virgin, which is a lower category than extra virgin ("بكر ممتاز"). The side panel uses "بكر ممتاز" correctly. Worth fixing before printing, and the website will use "بكر ممتاز" once the category is confirmed.
3. **Arabic letter spacing.** The Arabic lines on the front and "منتج تونسي" are spaced out with tatweel to match the tracked Latin capitals. This reads as stretched to Arabic readers; the website will set Arabic without tracking.
4. **"Traditional means"** (5 L only) implies a traditional press. Only use it on the site if the partner mills actually use traditional presses.
5. **Taglines.** "Rooted in origin. Refined for the world." The word "refined" is a technical olive oil category (refined olive oil is not virgin). As a tagline it is fine on packaging, but in Arabic and French translations we should avoid wording that reads as "refined oil".

## 9. Tone of voice (from the label copy)

Short, calm, factual sentences about origin and travel: "bottled to carry the character of its groves to tables around the world." No superlatives, no awards, no health claims. The website copy will keep that register.

## 10. Certifications and documents

None supplied. No certificates, lab reports, technical sheets, or organic claims appear in the files. The Quality & Origin page will be built to hold them and will show only what the client uploads.

## 11. Missing information and assets

Blocking:

- Final brand name and its single spelling (section 1).
- Confirmation of the five formats.
- Company legal name, address, export contact email and phone.

Needed before launch:

- Lab analysis supporting the quality category.
- Product photographs of all five formats (or approved renders).
- Vector logo variants, monogram and seal.
- Label files for the 500 ml tin, 500 ml bottle and 700 ml jar.
- Technical sheets per product (shelf life, packaging dimensions, case and pallet configuration).
- Commercial terms the client is willing to publish: private label, customisation, Incoterms, ports. Nothing will be invented.
- Editorial photography of Tunisian groves, mills and landscape (owned or licensed).
- Domain name and social media links.
- Logo usage rules, if the designer has them.

## Asset inventory

| Path | Content | Origin |
|---|---|---|
| `public/assets/brand/logo-wordmark-olive.svg` | Primary wordmark, `#2B401A` | Client SVG, unchanged |
| `public/assets/brand/olive-branch-illustration.png` | Branch illustration, transparent | Extracted from brand board |
| `public/assets/brand/olive-branch-illustration-wide.png` | Wider crop, transparent | Extracted from 5 L label |
| `public/assets/packaging/tin-5l-mockup-scene.png` | 5 L tin on wood with olive branches | Brand board mock-up |
| `public/assets/packaging/shipping-cartons-mockup.png` | Kraft cartons with wordmark | Brand board mock-up |
| `public/assets/editorial/stationery-mockup.png` | Letterhead, business cards, sticker | Brand board mock-up |
| `public/assets/products/glass-range-reference-ai-generated.jpg` | 500 ml tin, 500 ml bottle, 700 ml jar | AI reference, do not publish |
| `public/assets/documents/` | Empty, waiting for lab reports and sheets | |
| `source/` | Original PDFs, SVG and high-resolution renders | Client files |
