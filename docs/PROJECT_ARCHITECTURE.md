# Project architecture (proposal)

Phase 4. This is the proposal for approval. `DATABASE_SCHEMA.md`, `IMPLEMENTATION_PLAN.md` and `SECURITY_PLAN.md` will be written in full once the stack is approved; their outlines are in sections 5 to 7 below so the whole plan can be judged now.

## 1. Recommendation in one paragraph

One Next.js application with Payload CMS running inside it, backed by PostgreSQL, deployed as a Docker container on a small EU server. Payload gives the client an admin dashboard (login, roles, products, media, documents, per-language content, SEO fields, inquiry management) without a second app to build or host. Public pages are rendered on the server and cached, so visitors download almost no JavaScript. Every editable text, image and document lives in the database, never in components.

## 2. Stack

| Need | Choice | Why |
|---|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript strict | Mature, server rendering and static caching, image optimisation, large hiring pool |
| CMS and admin | Payload CMS 3 (MIT licence), mounted at `/admin` in the same Next.js app | Admin UI generated from typed schemas; built-in auth, access control per field and per collection, localisation (EN/FR/AR per field), versions and drafts, upload handling. No vendor fees |
| Database | PostgreSQL 16 | Payload's first-class adapter; reliable; easy backups with `pg_dump` |
| Translations | Payload localised fields for content; `next-intl` for interface strings (buttons, form labels, errors) | Content and UI strings are both editable or versioned per locale; missing translations fail the build instead of falling back silently |
| Arabic / RTL | `<html lang="ar" dir="rtl">`, CSS logical properties throughout (`margin-inline-start`, not `margin-left`) | One stylesheet works in both directions |
| Styling | Plain CSS with design tokens (custom properties) and CSS modules | Glass effects, RTL and theming need fine control; no utility framework required |
| Fonts | Libre Caslon Text, Jost, Noto Sans Arabic (and Noto Naskh Arabic for Arabic headings), self-hosted via `next/font` | The packaging fonts; self-hosting avoids third-party requests and layout shift |
| Forms | Server Actions with Zod validation; Cloudflare Turnstile plus a honeypot field; per-IP rate limit | Validation runs on the server; no CAPTCHA puzzle for buyers |
| Email | SMTP through Nodemailer (any provider: Brevo, Postmark, the client's own mailbox) | Credentials stay in environment variables; provider can change without code changes |
| File storage | Local volume in v1, S3-compatible bucket (Cloudflare R2 or Scaleway) when needed, via Payload's storage adapter | Start simple; switch with configuration |
| Images | Next.js image optimisation to AVIF/WebP, responsive sizes, lazy loading below the fold | Performance target below |
| Hosting | Docker Compose on a VPS in the EU (Hetzner or OVH, 2 vCPU / 4 GB), Caddy as reverse proxy with automatic HTTPS | About 10 EUR a month; full control; close to Tunisia and Europe |
| CDN / DNS | Cloudflare (free plan) in front | Caching of static files worldwide, DDoS protection, Turnstile |
| Backups | Nightly `pg_dump` and media sync to an off-server bucket, 30 daily and 12 monthly copies, monthly restore test | Required by the brief; cheap |
| Monitoring | Uptime check (Better Stack or UptimeRobot), Sentry for errors, Payload's own activity log | Free tiers cover this site |
| Testing | Playwright (end-to-end, visual, RTL, viewports), Vitest (validation and access rules), axe-core (accessibility) | As required in phases 10 and 11 |
| CI | GitHub Actions: type check, lint, unit tests, Playwright against a preview build, `npm audit` | Once a repository exists |

Alternative if the client prefers managed hosting: Vercel for the app, Neon for Postgres, R2 for media. Same code. Costs more as traffic grows, and Vercel's Hobby plan does not allow commercial use, so it would be the Pro plan.

## 3. Application structure

```
holiven/
  src/
    app/
      (site)/[locale]/            public pages: /en, /fr, /ar
        page.tsx                  homepage
        our-story/
        olive-oil/ [slug]/        product list and product page
        quality-origin/
        export-partnerships/
        contact/                  request a quotation
        legal/[slug]/
      (payload)/admin/            Payload admin (generated)
      api/                        Payload REST/GraphQL (admin only), health check
      sitemap.ts, robots.ts
    collections/                  Payload schemas: Products, Media, Documents, Pages, Inquiries, Users, AuditLog
    globals/                      Homepage, SiteSettings, Navigation, Footer, SEO defaults
    access/                       role checks shared by collections
    components/                   design system: Button, GlassPanel, ProductCard, SpecTable, LanguageSwitcher...
    lib/                          validation schemas, email, rate limit, i18n helpers
    messages/                     en.json, fr.json, ar.json (interface strings)
    styles/                       tokens.css, base.css
  tests/e2e/                      Playwright
  docs/                           the documents in this folder
  docker-compose.yml, Dockerfile, .env.example
```

## 4. Content model (who edits what)

| Item | Type | Localised | Editable by |
|---|---|---|---|
| Homepage sections (headings, text, images, CTA labels, visibility toggles) | Global | Yes | Editor, Admin |
| Pages: Our Story, Quality & Origin, Export & Partnerships, legal pages | Collection with blocks | Yes | Editor, Admin |
| Products (name, slug, format, volume, material, description, specs table, images, technical sheet, status active/archived, order) | Collection | Text yes, numbers no | Editor, Admin |
| Documents (certificates, lab reports, sheets) with date, issuer, linked products, public or on-request | Collection with upload | Title yes | Editor, Admin |
| Media library with alt text per language | Upload collection | Alt text yes | Editor, Admin |
| Site settings: company info, contact details, social links, default SEO | Global | Partly | Admin |
| Inquiries | Collection, created only by the public form | No | Sales, Admin |
| Users | Auth collection | No | Admin |

Roles: **Admin** (everything, users, settings), **Editor** (content, products, media, documents; no inquiries, no users), **Sales** (inquiries only: read, status, notes, export).

## 5. Outline of DATABASE_SCHEMA.md

Payload generates the Postgres tables from the collection definitions and keeps them in versioned migrations. Main entities:

- `users` (email, password hash, role, login attempts, lock until, last login)
- `products` and `products_locales` (per-language name, description, specs labels)
- `media`, `documents`, `pages`, globals
- `inquiries`: full name, company, business email, country (ISO code), phone, business type (enum), products of interest (relation), packaging formats (enum list), estimated quantity (number + unit), destination market or port, message, locale, status (new / contacted / qualified / closed), internal notes (array with author and date), source page, created at, IP hash (not the raw IP), consent timestamp
- `audit_log`: user, action, collection, document id, timestamp, changed fields

## 6. Outline of SECURITY_PLAN.md

- Admin at `/admin` only, behind Payload auth with HTTP-only, Secure, SameSite=Lax cookies; session expiry; lock after 5 failed logins for 10 minutes; rate limit on the login route.
- Passwords hashed by Payload (PBKDF2, salted); minimum 12 characters; optional TOTP for admins via plugin.
- Access control on every collection and field; the public site reads only published content through server code, never through open APIs. Payload's REST and GraphQL endpoints require auth for everything except published content.
- Inquiries: server-side Zod validation, length limits, Turnstile token verified on the server, honeypot, 5 submissions per IP per hour; stored in Postgres; email notification without the buyer's message in the subject line.
- XSS: React escaping; rich text rendered through Payload's serializer, no raw HTML; strict Content-Security-Policy with nonces.
- CSRF: Server Actions check origin; Payload uses SameSite cookies and CSRF origin checks.
- SQL injection: queries only through Payload's Drizzle adapter (parameterised).
- Uploads: allow-list of MIME types checked by content (JPEG, PNG, WebP, AVIF, PDF), size limit (images 10 MB, PDF 20 MB), random file names, served with `Content-Disposition` for PDFs, no SVG uploads from the admin (logo SVG ships with the code).
- Headers: HSTS, CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors none.
- Secrets only in environment variables; `.env.example` with placeholders; nothing in the repository.
- Dependency checks: `npm audit` and Dependabot; results reported honestly in `TEST_REPORT.md`.
- Privacy: consent checkbox on the form, privacy page, inquiry retention period set by the client, CSV export limited to Admin and Sales.

## 7. Outline of IMPLEMENTATION_PLAN.md

| Phase | Work | Output |
|---|---|---|
| 5 | Design system: tokens, type scale, glass panel rules, components, RTL checks | Style guide page, tokens |
| 6 | Homepage | Working page in EN with real brand assets |
| 7 | Remaining pages, FR and AR, language switcher, hreflang | All pages in three languages |
| 8 | Payload collections and globals, roles, inquiry flow, emails, CSV export | Working admin |
| 9 | Security headers, rate limits, SEO (metadata, sitemap, JSON-LD Organization and Product), image pipeline, performance budget | Hardened build |
| 10 | Playwright: visitor journeys, admin journeys, 5 viewports, RTL, console and network errors, axe | Test report |
| 11 | Fix and re-run | Updated test report |
| 12 | README, ADMIN_GUIDE, DEPLOYMENT_GUIDE, `.env.example` | Handover |

Performance budget: under 150 KB of JavaScript on public pages, Largest Contentful Paint under 2.5 s on 4G, Cumulative Layout Shift under 0.05, under 40 requests on the homepage.

## 8. What I need before Phase 4 closes

- Approval of the stack (or the managed-hosting alternative).
- A GitHub repository for the code. I can't create one from here; if you create an empty repository and tell me its name, I'll attach it.
- Hosting and domain: who owns the domain, and whether you already have a server or provider.
