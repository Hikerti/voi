# Voitov Studio

Сайт и базовая CMS/API для Voitov Studio.

Проект сейчас собран как демонстрационная версия UI v2 на Next.js с отдельным Nest.js backend для контента и заявок. Frontend умеет работать с backend, а если API временно недоступен, публичный контент берется из локальных fallback-данных.

## Стек

### Frontend

- Next.js 15 App Router
- React 19
- TypeScript
- MDX-контент для статей и портфолио
- Framer Motion
- Webflow legacy CSS + `app/ui-fixes.css` для нового UI

### Backend

- Nest.js
- Prisma ORM
- SQLite для локальной демо/CMS-версии
- DTO validation через `class-validator`

## Быстрый старт

Установить зависимости фронта:

```bash
npm install
```

Установить зависимости backend:

```bash
cd backend
npm install
npm run prisma:generate
npm run db:push
npm run db:seed
```

Запустить backend:

```bash
cd backend
npm run start:dev
```

Запустить frontend:

```bash
npm run dev
```

Frontend: `http://localhost:3000`

Backend API: `http://localhost:4000/api`

Prisma Studio:

```bash
cd backend
npm run prisma:studio
```

## Переменные окружения

Скопировать `.env.example` в `.env.local` для frontend и `backend/.env.example` в `backend/.env` для backend.

Главные frontend-переменные:

- `CMS_API_URL` - серверный URL Nest API.
- `NEXT_PUBLIC_CMS_API_URL` - публичный URL Nest API, если понадобится клиентский fetch.
- `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM`, `RESEND_API_KEY` - email-уведомления.
- `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_YANDEX_METRIKA_ID` - аналитика.

Главные backend-переменные:

- `DATABASE_URL` - SQLite/PostgreSQL URL для Prisma.
- `PORT` - порт API.
- `CORS_ORIGIN` - разрешенные frontend-origin.

## Основные маршруты

- `/` - главная
- `/services` и `/services/[slug]` - услуги
- `/portfolio` и `/portfolio/[slug]` - работы
- `/reviews` - отзывы
- `/faq` и `/faq/[slug]` - вопросы и ответы
- `/news` и `/news/[slug]` - новости
- `/blog` и `/blog/[slug]` - статьи
- `/contacts` - контакты
- `/zayavka` - отдельная страница заявки
- `/privacy` - политика конфиденциальности

## Проверка перед сдачей

```bash
npm run lint
npm run build
npm run backend:lint
npm run backend:build
npm run backend:test
npm run backend:test:e2e
```

Для проверки базы:

```bash
cd backend
npm run prisma:studio
```

Заявки сохраняются в модель `LeadRequest`.

## Важные замечания

- Новый логотип пока заменен текстовым `Voitov Studio`.
- Файл `public/css/creativenest.webflow.css` оставлен как legacy Webflow CSS, поэтому его имя не означает старый бренд в публичном UI.
- Старый Django/Python backend удален из рабочей версии, вместо него используется `backend/` на Nest.js.
- Для production на VPS см. `DEPLOY_GUIDE.md`.
