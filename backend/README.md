# Voitov Studio Backend

Nest.js API for the Voitov Studio website CMS/content layer.

## Stack

- Nest.js
- Prisma ORM
- SQLite for local CMS storage
- DTO validation with `class-validator`

## Setup

Create `.env` from `.env.example`:

```bash
DATABASE_URL="file:../.tmp/dev.db"
PORT=4000
CORS_ORIGIN="http://localhost:3000,http://127.0.0.1:3000"
```

Local npm scripts also default to `file:../.tmp/dev.db` when `DATABASE_URL` is not set.

Install and prepare the local database:

```bash
npm install
npm run prisma:generate
npm run db:push
npm run db:seed
```

`db:push` intentionally uses `--skip-generate`; run `prisma:generate` separately after schema changes.

## Development

```bash
npm run start:dev
```

API base URL: `http://localhost:4000/api`.

Prisma Studio CMS:

```bash
npm run prisma:studio
```

## Public API

- `GET /api/health`
- `GET /api/site-settings`
- `GET /api/service-categories`
- `GET /api/services`
- `GET /api/services/:slug`
- `GET /api/prices`
- `GET /api/advantages`
- `GET /api/work-stages`
- `GET /api/reviews`
- `GET /api/faq`
- `GET /api/faq/:slug`
- `GET /api/news`
- `GET /api/news/:slug`
- `GET /api/articles`
- `GET /api/articles/:slug`
- `GET /api/projects`
- `GET /api/projects/:slug`

## Lead API

- `POST /api/leads/contact`
- `POST /api/leads/callback`
- `POST /api/leads/review`
- `POST /api/leads/question`

Required payload field:

- `phone`

Optional fields:

- `name`
- `email`
- `message`
- `source`
- `pageUrl`
- `consent`
- `startedAt`

Spam guards:

- `company` is a honeypot field and must stay empty.
- `startedAt` blocks submissions faster than 2.5 seconds.

## Verification

```bash
npm run lint
npm run build
npm run test
npm run test:e2e
```
