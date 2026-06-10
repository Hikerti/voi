# Project Checklist: Voitov Studio

Дата проверки: 9 июня 2026.

Источники сверки:

- `C:/Users/anika/Downloads/Рекомендации к разработке шаблонов сайта voitov.ru для веб-дизайнеров, back-end и front-end разработчиков.pdf`
- текущий roadmap проекта
- фактический код Next.js frontend и Nest.js backend

## Готово для демо

- Бренд в публичных title/description/UI заменен на `Voitov Studio`.
- Главная страница собрана из ключевых блоков: hero, услуги, цены, работы, процесс, отзывы, FAQ, статьи, финальная заявка.
- Есть страницы:
  - `/services`
  - `/services/[slug]`
  - `/portfolio`
  - `/portfolio/[slug]`
  - `/reviews`
  - `/faq`
  - `/faq/[slug]`
  - `/news`
  - `/news/[slug]`
  - `/blog`
  - `/blog/[slug]`
  - `/contacts`
  - `/zayavka`
  - `/privacy`
  - 404 через `app/not-found.tsx`
- UI v2 применен к основным блокам: темные секции с glow, светлые секции с бумажными вставками, улучшенные hover-состояния.
- Портфолио:
  - desktop: один крупный активный кейс + переключение кнопками;
  - mobile: свайп-лента карточек.
- Формы используют единый компонент `SiteForm`.
- Обязательное поле заявки: телефон.
- Валидация:
  - минимум 10 цифр в телефоне;
  - email проверяется только если введен.
- Заявки сохраняются в backend-модель `LeadRequest`.
- Backend на Nest.js + Prisma + SQLite содержит модели для:
  - site settings;
  - services;
  - service categories;
  - prices;
  - advantages;
  - work stages;
  - reviews;
  - FAQ;
  - news;
  - articles;
  - projects;
  - lead requests.
- Frontend умеет читать CMS API и использовать fallback-данные, если API недоступен.
- Есть `robots.ts`, `sitemap.ts`, редиректы legacy URL в `next.config.ts`.
- Подключение Google Analytics и Яндекс.Метрики сделано через env.
- Добавлены актуальные `README.md`, `DEPLOY_GUIDE.md`, `.env.example`.

## Частично закрыто

- Header:
  - есть логотип, навигация, активный пункт, мобильное меню;
  - нет поиска по сайту;
  - телефон/email не выведены в шапку, чтобы не ломать утвержденный компактный UI.
- Footer:
  - есть логотип, контакты, основные ссылки, соцсети/мессенджеры;
  - юридические данные и адрес нужно добавить после получения от заказчика.
- SEO:
  - базовые metadata есть;
  - нужны финальные SEO-тексты, keywords и реальные title/description от SEO-специалиста.
- CMS:
  - backend/API/Prisma готовы как базовая версия;
  - полноценной admin-panel нет, управление сейчас через Prisma Studio.
- Контент:
  - услуги/новости/FAQ/отзывы заполнены демо-данными;
  - реальные тексты, цены, отзывы и юридические данные нужно согласовать.

## Не сделано намеренно

- Полный dark mode не включался, потому что roadmap требует постепенный переход.
- CRM и Telegram-бот не подключались, потому что заказчик подтвердил, что пока не нужны.
- Карта на контактах не добавлялась, потому что заказчик сказал “пока нет”.
- Internet Explorer не поддерживается.
- Левое меню каталога услуг из PDF не внедрено: оно конфликтует с текущим креативным UI и требует отдельного UX-решения.
- Поиск по сайту из PDF не внедрен: нужен отдельный индекс/контентная модель и дизайн search overlay.
- Хлебные крошки на всех внутренних страницах не внедрены: нужно решить, как совместить их с текущей визуальной системой.

## Проверка перед показом заказчику

```bash
npm run lint
npm run build
npm run backend:lint
npm run backend:build
npm run backend:test
npm run backend:test:e2e
```

Для базы:

```bash
cd backend
npm run prisma:generate
npm run db:push
npm run db:seed
npm run prisma:studio
```

Для формы:

1. Запустить backend на `http://localhost:4000`.
2. Запустить frontend на `http://localhost:3000`.
3. Отправить заявку на `/zayavka`.
4. Проверить запись в Prisma Studio, таблица `LeadRequest`.

## Риски перед финальным релизом

- Нужно заменить временный текстовый логотип на финальный SVG/PNG/WebP от заказчика.
- Нужно добавить реальные legal/contact данные.
- Нужно выбрать production-БД: SQLite подходит для демо, PostgreSQL лучше для VPS/production.
- Нужно визуально проверить все основные viewport: desktop, laptop, tablet, mobile.
- Нужно проверить реальные email-настройки `RESEND_API_KEY`.
- Нужно настроить домен, SSL и `www -> non-www` на Nginx.
