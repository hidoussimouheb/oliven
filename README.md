# óliven website

Official B2B website for óliven, olive oil from Tunisia supplied by QARTENO TRADING. Built with Next.js 16, Payload CMS 3 and PostgreSQL. Public pages in English, French and Arabic (right to left).

Status: Phase 8 (content editable in the admin). See `docs/PROJECT_ARCHITECTURE.md` for the full plan.

## Run it locally

Requirements: Node 20.9+ and PostgreSQL 16.

```bash
cp .env.example .env          # then fill in DATABASE_URI and PAYLOAD_SECRET
npm install
npm run dev
```

- Site: http://localhost:3000 (redirects to `/en`)
- Design system page: http://localhost:3000/en/style-guide (also `/fr`, `/ar`)
- Admin: http://localhost:3000/admin (create the first admin user on first visit)

The first time, copy the current text and photos into the admin (safe to run again: it only fills what is empty):

```bash
npm run seed:content
```

## Editing the site

Everything editors change lives under **Site content** in the admin:

- **Homepage, Our story, Our olive oil, Quality and origin, Export and partnerships, Products, Legal**: each has a **Text** tab and, where the page has pictures, a **Photos** tab.
- Pick the language with the **Locale** selector at the top (English, Français, العربية), edit, then **Save**. The page updates straight away.
- A text field left empty shows the original copy from `src/content/`, so a page never shows a gap.
- **Company details**: company name, email, phone numbers and city, used in the footer, contact page and closing bands.

Button labels, menu items and form labels are interface strings in `src/messages/` and stay in code.

How it works: `src/cms/registry.ts` lists each editable page with its default copy (`src/content/*.ts`) and its photo slots. The admin fields are generated from that copy (`src/cms/schema.ts`), and pages read it back through `src/cms/get.ts`, falling back to the default copy and the bundled photos when the database has nothing.

## Where things are

| Path | What |
|---|---|
| `src/app/(site)/[locale]/` | Public pages, one route tree for all three languages |
| `src/app/(payload)/` | Payload admin and REST API (GraphQL is disabled) |
| `src/collections/`, `src/access/` | CMS content models and role checks (admin, editor, sales) |
| `src/globals/`, `src/cms/` | Editable page content (one global per page) and the helpers pages use to read it |
| `src/content/` | Default copy, also the fallback when an admin field is empty |
| `src/components/ui/` | Buttons, glass panels, form fields, product cards, spec lists |
| `src/components/layout/` | Header, mobile menu, language switcher, footer |
| `src/styles/tokens.css` | Colours, type scale, spacing, glass settings |
| `src/messages/` | Interface strings in `en`, `fr`, `ar` (keys must match) |
| `src/fonts/` | Self-hosted packaging fonts (OFL) |
| `docs/` | Brand analysis, market research, architecture |

## Design rules worth knowing

- Colours come only from the brand board: olive `#2B401A`, teal `#28433A`, gold `#A8884A`, cream `#F5ECCD`, aubergine `#4A2F35`. Gold is never used for body text.
- Glass panels go over photographs or the branch illustration only. They fall back to solid colour when the browser has no blur or the visitor asks for reduced transparency.
- The wordmark path in `src/components/brand/wordmarkPath.ts` is the client's file, unchanged. Do not edit it.
- Use CSS logical properties (`margin-inline-start`, `inset-inline-end`) so layouts mirror in Arabic.
- "Extra virgin" is shown because the client confirmed a lab check. No "organic", "certified" or other claims until the certificate or document is in hand.
