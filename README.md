# Fazal-e-Insaaniyat Charity Works

## What this is

This repository holds the official website for Fazal-e-Insaaniyat Charity Works. It is the public face of the organisation: one place to explain who we are and what the charity does.

The public site is bilingual in English and Urdu. Every page is built for both the `/` and `/ur` route trees: home, Home-Based Madrasahs, Initiatives, About, field trips, transparency, give, get help, contact and the policy pages. The Ghar Ka Khana (GKK) holding page and its privacy policy are preserved at `/gkk` and `/gkk/privacy`.

## Why it exists

The site is built and maintained by a volunteer for a family-run charity. Nobody is paid for this work and there is no commercial motive behind it. The goal is simply to give the charity a clear, honest, well-built presence online.

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- A self-hosted font set and CSS custom properties for the public site
- Tailwind CSS 4 for the preserved GKK page
- Vercel for hosting

## Getting started

You need Node.js 20.9 or newer and npm. The project has no other local prerequisites.

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The site is then available at [http://localhost:3000](http://localhost:3000).

Create a production build, and serve it locally:

```bash
npm run build
npm run start
```

Check the code with ESLint:

```bash
npm run lint
```

## Adding a field trip, an initiative or a figure

Field trips, initiatives, ledger entries and published figures are plain files in `content/`. Adding one means adding a file, not editing page code. See [docs/CONTENT.md](docs/CONTENT.md) for the fields, the validation rules and the empty state behaviour. An initiative is a Markdown form: copy `content/initiatives/_template.md`, fill in what is known and leave the rest out.

## Project structure

- `app/(en)/` is the English route tree. English pages are served at `/`, `/madrasahs`, `/initiatives`, `/about`, `/field-trips`, `/field-trips/[slug]`, `/transparency`, `/give`, `/get-help`, `/contact` and `/policies/*`. The old `/programmes` address redirects permanently to `/initiatives`.
- `app/(ur)/ur/` is the Urdu route tree. It mirrors the same routes under `/ur`.
- `app/(en)/not-found.tsx` and `app/(ur)/not-found.tsx` render the 404 for their language tree, with the mark, the missing page sentence and links back into the site. The catch-all route under each locale calls `notFound()`, so an unknown address answers with a real 404 status and a readable title.
- `app/robots.ts` and `app/sitemap.ts` generate `/robots.txt` and `/sitemap.xml` from `lib/routes.ts`. The route list is built from the same content stores as the pages, so an unpublished record is never advertised and both language trees are listed with hreflang alternates.
- `app/(gkk)/` preserves the Ghar Ka Khana holding page and privacy policy with its original layout and font.
- `components/site/` holds the public site shell, page components, map, tables and placeholder primitives.
- `content/` holds the 20-row madrasah data, the Pakistan outline and the bilingual copy. Field trips live in `content/field-trips/`, initiatives in `content/initiatives/`, the ledger and figures in `content/facts/`, and the home mosaic snapshot in `content/social/` (built by `scripts/social-snapshot.mjs`); `docs/CONTENT.md` explains how to add or regenerate them.
- `lib/` holds locale, metadata, request path, date and money formatting, and madrasah projection helpers.
- `middleware.ts` sets the strict Content Security Policy with a per-request nonce, plus the other security headers. The CSP is set on both the request and the response because Next.js reads the request CSP nonce when stamping its own injected scripts. The matcher excludes `/gkk` and `/gkk/privacy`, so those routes keep their current security posture; hardening them is a separate follow-up.
- `public/fonts/site/` holds the self-hosted Newsreader, IBM Plex Sans, IBM Plex Mono, Noto Naskh Arabic and Noto Nastaliq Urdu woff2 files.

The public site has no third-party requests, no analytics, no embeds and no font CDN. The Content Security Policy does not use `unsafe-inline`.

## Deployment

Production runs on Vercel. The production branch is `main`, so changes reach the live site after they are merged into `main` and deployed by Vercel. Other branches and pull requests produce preview deployments, and those previews are protected by Vercel authentication, so you need to sign in with an authorised Vercel account to view them.

Deployment settings live in the Vercel project rather than in this repository.

## Contributing and scope

This is a small project maintained by one volunteer in his own time, so responses may be slow and the scope is deliberately narrow. If you find a bug, have a question, or want to suggest a change, please open an issue in the [repository issues](https://github.com/fasih-r3500/fazaleinsaaniyat-website/issues). That is the best way to reach the maintainer.

## Status and roadmap

- Every page is built in English and Urdu: home, Madrasahs, Initiatives, About, field trips, transparency, give, get help, contact and the five policy pages.
- All five policy pages are published in full, in both languages, and each opens with a contents list that links to its sections.
- Where the content layer is empty, the page shows an honest empty state instead of a table or a total: no field trip is invented, and the ledger and figure stores render their empty state.
- A fact the charity does not hold is left off the page or stated in ordinary body text, never marked with a chip or a warning colour. No impact numbers, years or beneficiary counts are invented. The phone number and the email address are published on the contact page; the postal address and the three social handles are published on both the contact page and in the footer.
- Every page is written in both languages: the Urdu tree carries its own Urdu copy, not a machine translation of the English wording.
