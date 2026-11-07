# Fazal-e-Insaaniyat Charity Works

## What this is

This repository holds the official website for Fazal-e-Insaaniyat Charity Works. It is the public face of the organisation: one place to explain who we are and what the charity does.

The public site is currently a holding page. The full site is in development, and this README will be updated as it takes shape.

## Why it exists

The site is built and maintained by a volunteer for a family-run charity. Nobody is paid for this work and there is no commercial motive behind it. The goal is simply to give the charity a clear, honest, well-built presence online.

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
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

As of this writing, the lint command reports existing errors in the GKK pages. They do not affect the production build.

## Project structure

The codebase is small, and the directories below are close to the whole of it.

- `app/` contains the App Router pages. `app/page.tsx` is the home holding page, and `app/layout.tsx` defines the root layout, metadata, and the locally hosted Garet font. `app/globals.css` holds the Tailwind import and theme tokens. `app/gkk/` is a separate GKK (Ghar Ka Khana) holding page with a privacy policy at `app/gkk/privacy/page.tsx`.
- `components/` currently contains one component, `LightRays.jsx`, the animated background used on the holding pages, plus its stylesheet.
- `lib/` contains only `utils.ts`, the small `cn` class name helper used by shadcn/ui conventions.
- `public/` contains the logo images (`FI_LOGO.png` and `GKK.png`), the Garet font files under `public/fonts/`, and a few unused default SVG assets from the original Next.js scaffold.

There is no test suite or CI configuration in the repository at this time.

## Deployment

Production runs on Vercel. The production branch is `main`, so changes reach the live site after they are merged into `main` and deployed by Vercel. Other branches and pull requests produce preview deployments, and those previews are protected by Vercel authentication, so you need to sign in with an authorised Vercel account to view them.

Deployment settings live in the Vercel project rather than in this repository.

## Contributing and scope

This is a small project maintained by one volunteer in his own time, so responses may be slow and the scope is deliberately narrow. If you find a bug, have a question, or want to suggest a change, please open an issue in the [repository issues](https://github.com/fasih-r3500/fazaleinsaaniyat-website/issues). That is the best way to reach the maintainer.

## Status and roadmap

The following work is planned, not in progress:

- The full public site to replace the holding page
- Bilingual content in English and Urdu
- A members area

Dates are not set. Progress will be visible in this repository as it happens.
