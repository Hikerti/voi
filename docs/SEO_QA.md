# SEO QA перед релизом

## Автоматические проверки

- `npm run lint`
- `npx next build`
- `npm --prefix backend run prisma:generate`
- `npm --prefix backend run lint`
- `npm --prefix backend run build`
- `npm --prefix backend test -- --runInBand`

## Проверка HTML

Для главной, каталога услуг, одной услуги, статьи, новости, FAQ и кейса проверить:

- один основной `h1`;
- последовательную иерархию `h2`–`h6`;
- уникальные `title` и `description`;
- canonical со слешем в конце для внутренних страниц;
- Open Graph изображение в JPG или PNG;
- JSON-LD без ошибок;
- содержательные `alt` у контентных изображений;
- отсутствие индексации у `/search/`, `/spasibo/` и страницы 404.

## Проверка production

- `https://www.voitov.ru/` перенаправляет на `https://voitov.ru/`;
- HTTP перенаправляет на HTTPS;
- старые `.html`, `index.php` и старый домен дают 301;
- `robots.txt` и `sitemap.xml` доступны;
- формы сохраняются в базе и отправляют письмо;
- цели Яндекс.Метрики и Google Analytics срабатывают;
- Prisma-миграции применены после резервного копирования.
