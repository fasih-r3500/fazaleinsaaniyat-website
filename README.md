# Fazal-e-Insaaniyat Charity Works

## What this is

This repository holds the official website for Fazal-e-Insaaniyat Charity Works. It is the public face of the organisation: one place to explain who we are and what the charity does.

The public site is being rebuilt in bilingual English and Urdu. The home page, the Home-Based Madrasahs page, the Our work page and the About page are built for both the `/` and `/ur` route trees. The remaining routes — reports, reports/[id], transparency, give, get-help, contact and policies/* — are phase 2 follow-up work and are not part of this build. The Ghar Ka Khana (GKK) holding page and its privacy policy are preserved at `/gkk` and `/gkk/privacy`.

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

## Project structure

- `app/(en)/` is the English route tree. English pages are served at `/`, `/madrasahs`, `/programmes` and `/about`.
- `app/(ur)/ur/` is the Urdu route tree. It mirrors the same routes under `/ur`.
- `app/(gkk)/` preserves the Ghar Ka Khana holding page and privacy policy with its original layout and font.
- `components/site/` holds the public site shell, page components, map, tables and placeholder primitives.
- `content/` holds the 20-row madrasah data, the Pakistan outline, bilingual copy and the Urdu pending list. `content/ur-pending.md` records the strings that still need a native Urdu review.
- `lib/` holds locale, metadata, request path and madrasah projection helpers.
- `middleware.ts` sets the strict Content Security Policy with a per-request nonce, plus the other security headers. The CSP is set on both the request and the response because Next.js reads the request CSP nonce when stamping its own injected scripts.
- `public/fonts/site/` holds the self-hosted Newsreader, IBM Plex Sans, IBM Plex Mono, Noto Naskh Arabic and Noto Nastaliq Urdu woff2 files.

The public site has no third-party requests, no analytics, no embeds and no font CDN. The Content Security Policy does not use `unsafe-inline`.

## Deployment

Production runs on Vercel. The production branch is `main`, so changes reach the live site after they are merged into `main` and deployed by Vercel. Other branches and pull requests produce preview deployments, and those previews are protected by Vercel authentication, so you need to sign in with an authorised Vercel account to view them.

Deployment settings live in the Vercel project rather than in this repository.

## Contributing and scope

This is a small project maintained by one volunteer in his own time, so responses may be slow and the scope is deliberately narrow. If you find a bug, have a question, or want to suggest a change, please open an issue in the [repository issues](https://github.com/fasih-r3500/fazaleinsaaniyat-website/issues). That is the best way to reach the maintainer.

## Status and roadmap

- The home page, Madrasahs, Our work and About pages are built in English and Urdu.
- The remaining route list (reports, reports/[id], transparency, give, get-help, contact and policies/*) is phase 2 follow-up work. Unbuilt paths show an honest page that says the page is not part of the current build.
- Urdu copy that did not already exist in the v2 build is shown as a visible placeholder and listed in `content/ur-pending.md` for a native reviewer.
- Facts that are not confirmed are shown as amber placeholder chips. No impact numbers, years or beneficiary counts are invented.
