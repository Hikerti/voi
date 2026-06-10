# AGENTS.md

## Role

You are a senior fullstack agent working on the Voitov Studio website. Communicate with the project owner in Russian unless asked otherwise. Treat the roadmap in `C:\Users\anika\Downloads\Родмап для проекта.pdf` and the recommendations PDF in `C:\Users\anika\Downloads\Рекомендации к разработке шаблонов сайта voitov.ru для веб-дизайнеров, back-end и front-end разработчиков.pdf` as product context, but verify every implementation detail against the repository before editing.

## Current Stack

- Framework: Next.js 15 App Router, React 19, TypeScript.
- Styling: inherited Webflow CSS from `public/css/*.css`, `styles/*.css`, plus local CSS in `app/globals.css` and some inline styles.
- Animation: `framer-motion` and local hooks in `lib/hooks/`.
- Content: local MDX files in `content/blog/` and `content/portfolio/`, parsed by `gray-matter`.
- Frontend API bridge: Next route handlers under `app/api/`; contact forms post to `app/api/contact/route.ts`.
- Backend: Nest.js in `backend/`, Prisma ORM, SQLite for local demo/CMS storage.
- CMS/admin v1: Prisma Studio. A full custom admin panel is not implemented yet.
- Forms: lead/contact forms are client components. They save requests through the Nest backend into `LeadRequest`; optional email notifications use Resend env variables.

This repository is not a Vite/Tailwind/shadcn project. Do not introduce shadcn/ui, Tailwind, or a new component kit unless the owner explicitly approves a migration away from the Webflow-based visual system.

## Commands

- Install: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Lint: `npm run lint`
- Backend dev server: `npm run backend:dev`
- Backend build: `npm run backend:build`
- Backend lint: `npm run backend:lint`
- Prisma Studio: `npm run backend:studio`

After code changes, always run `npm run lint`. When backend code changes, also run `npm run backend:lint` and `npm run backend:build`. For visual/UI changes, also run the app locally and verify desktop and mobile rendering with Browser when feasible. If the Browser plugin is unavailable, use Playwright with the system Chrome executable and document the fallback.

## Encoding

All source files with Russian text must be read and written as UTF-8. PowerShell may show mojibake unless `Get-Content -Encoding UTF8` is used. Do not rewrite Russian copy just because the terminal displayed broken characters.

## Repository Map

- `app/layout.tsx` wires global CSS, fonts, `MenuProvider`, `Footer`, and tracking scripts.
- `app/page.tsx` builds the home page from hero, intro, portfolio, lead forms, and article preview components.
- `app/services/*` contains the services hub and four existing service pages.
- `app/portfolio/*` and `app/blog/*` render MDX-backed content.
- `components/layout/` contains navigation/menu/form/footer primitives.
- `components/home/` contains homepage sections and lead forms.
- `components/services/`, `components/portfolio/`, `components/blog/` contain page-specific UI.
- `lib/constants.ts` is the first place to check for site contacts, nav labels, social links, and shared constants.
- `lib/blog.ts` and `lib/portfolio.ts` contain the current content frontmatter interfaces.
- `lib/site-data.ts` contains local fallback data for services, stages, FAQ, reviews and news.
- `lib/cms-api.ts` maps Nest API responses to frontend data shapes and falls back to local data.
- `backend/prisma/schema.prisma` is the source of truth for backend data models.
- `backend/src/content/` exposes read-only content API endpoints.
- `backend/src/leads/` stores lead requests from forms.
- `webflow-export/` is a visual/reference archive from Webflow. Use it as a design reference, not as runtime source.

## Before Creating New Types Or Data Models

Check existing interfaces in:

- `lib/blog.ts`
- `lib/portfolio.ts`
- `lib/constants.ts`
- `lib/site-data.ts`
- `lib/cms-api.ts`
- `backend/prisma/schema.prisma`
- component prop interfaces near the component being changed

If adding services, news, reviews, questions, or contacts content, prefer a structured content layer under `content/` or `lib/` before scattering hardcoded arrays across pages. Keep frontmatter interfaces close to the parser that reads them.

## API And Frontend Contract

When changing any route handler under `app/api/` or any Nest endpoint under `backend/src/`, update every frontend form or fetch caller that sends data to it. Keep payload shapes explicit with TypeScript interfaces. For forms from the roadmap, centralize validation behavior instead of duplicating ad hoc checks:

- required field markers
- visible error state
- phone normalization and minimum digit count
- email validation
- honeypot or rate-limit anti-spam
- consent text for personal data processing
- consistent success/error handling

Never commit secrets. Resend, SMTP, CRM, analytics, map keys and future messenger bot tokens must stay in environment variables.

## Design Workflow

There is no final Figma design yet. Base design work on:

1. the existing rendered site,
2. `webflow-export/`,
3. the roadmap requirements,
4. approved client references.

For redesign or new full pages, use the `Build Web Apps` workflow: create or inspect a concept first, extract tokens/components/spacing, implement faithfully, then verify in Browser. Do not introduce shadcn/ui, Tailwind, or a new component kit unless the owner explicitly approves a migration away from the Webflow-based visual system.

Design constraints for this project:

- preserve the high-contrast editorial/Webflow character unless a redesign is approved;
- avoid generic SaaS card grids for this creative-studio site;
- verify first viewport, long-page rhythm, and mobile layout;
- inspect broken/missing assets after changes;
- avoid Cyrillic filenames for new public assets because URL encoding already causes 404 risk in the current hero images.
- never show internal roadmap or implementation labels in public UI copy: no `v1`, `draft/published`, CMS/backend architecture notes, temporary tech decisions, or “current version” disclaimers unless the owner explicitly asks to publish them.

## SEO And Routing

Every new page must define `metadata` with title and description. When adding content-backed pages, include SEO fields in frontmatter where practical: `title`, `description`, `keywords`, `h1`, `date`, `slug`.

When adding or renaming routes:

- update `app/sitemap.ts`;
- check `app/robots.ts`;
- consider redirects in `next.config.ts`;
- preserve old Webflow/legacy URLs when the roadmap requires 301 redirects.

## Roadmap Priorities

The roadmap gaps to keep in mind:

- full Header with logo, phones, email, work hours, messengers, callback/search, and desktop navigation;
- richer Footer with contacts, legal data, social links, CTA buttons, and link columns;
- `/contacts`, `/reviews`, `/faq`, `/news`, and detail pages where required;
- full services catalog with prices, service cards, related services, and SEO text;
- reusable advantages, prices, reviews, FAQ, blog/news, and work-stages sections on the homepage;
- stronger 404 page with common layout;
- unified forms and anti-spam;
- SEO metadata and redirect policy.

## Local Skills

Kept skills in `.agents/skills/`:

- `diagnose` for bugs and regressions.
- `diegosouzapw-senior-frontend-v2` for React/Next.js implementation guidance.
- `diegosouzapw-frontend-design-v6` for production-grade frontend design direction before implementation.
- `wshobson-visual-design-foundations` for typography, color, spacing, iconography, and visual hierarchy.
- `wshobson-design-system-patterns` for design tokens, theming, and component architecture after the visual direction is approved.
- `anthropics-design-critique` for structured feedback on screenshots, Figma links, or browser-rendered screens.
- `zach-source-webapp-testing` for Playwright-style local app testing.
- `kabaka-code-review` for review/QA passes.
- `improve-codebase-architecture` for larger refactor planning.
- `find-skills` for searching/installing additional skills when needed.
- `grill-me` for turning vague plans into client questions and decisions.
- `handoff` for compacting context between sessions.

Removed local skills that were empty, duplicated, or not aligned with the current project: empty `webapp-testing`, empty documentation skill folder, mutation testing, Supabase/Postgres, shadcn, and xCloud Docker deploy.

## Verification Checklist

Before handing off work:

- `npm run lint` passes or failures are reported with exact blockers.
- For UI work, desktop and mobile screenshots/inspection are checked.
- Form changes are tested against success and validation paths.
- New routes are reachable and have metadata.
- Broken images, console errors, and 404 asset requests are checked.
- Existing comments and Webflow-derived logic are preserved unless the task explicitly asks to replace them.
