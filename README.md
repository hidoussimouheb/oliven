# óliven website

Official B2B website for óliven, olive oil from Tunisia supplied by QARTENO TRADING. Built with Next.js 16, Payload CMS 3 and PostgreSQL. Public pages in English, French and Arabic (right to left).

Status: Phase 5 (design system). The homepage and other pages come next; see `docs/PROJECT_ARCHITECTURE.md` for the full plan.

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

## Where things are

| Path | What |
|---|---|
| `src/app/(site)/[locale]/` | Public pages, one route tree for all three languages |
| `src/app/(payload)/` | Payload admin and REST API (GraphQL is disabled) |
| `src/collections/`, `src/access/` | CMS content models and role checks (admin, editor, sales) |
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
- No "extra virgin" or other quality claims on the site until the lab analysis is uploaded.
