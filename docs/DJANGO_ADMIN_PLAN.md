# План внедрения Django-админки для Voitov Studio

## Цель

Сделать отдельный Django-бэкенд с админкой и SQLite-базой, чтобы быстро редактировать контент сайта без долгого разворачивания PostgreSQL/MySQL.

Фронтенд на Next.js пока оставляем основным публичным сайтом. Django на первом этапе нужен как CMS/admin + API для контента и заявок.

## Что уже есть в репозитории

Текущий проект — Next.js-приложение.

Ключевые места:

- `app/page.tsx` — главная страница, собирает блоки главной.
- `lib/site-data.ts` — сейчас здесь статично лежат услуги, этапы, FAQ, отзывы и новости.
- `lib/blog.ts` — статьи читаются из `content/blog/*.mdx` через `gray-matter`.
- `lib/portfolio.ts` — проекты читаются из `content/portfolio/*.mdx` через `gray-matter`.
- `components/forms/SiteForm.tsx` — фронтовая форма отправляет данные на `/api/contact`.
- `app/api/contact/route.ts` — текущий Next API endpoint отправляет письмо через Resend или пишет заявку в лог.
- `app/services/page.tsx`, `components/services/ServicesCatalog.tsx` — каталог услуг.
- `app/reviews/page.tsx` — страница отзывов и форма отзыва.
- `app/contacts/page.tsx` — контакты и форма заявки.

## Основания из SEO/UX-рекомендаций

В приложенном PDF есть требования к шаблонам и CMS-полям:

- на каждой странице должны быть H1, SEO Title, Description, Keywords;
- нужны блоки: услуги, цены, портфолио/кейсы, отзывы, новости, FAQ, блог, этапы работы;
- услуги должны иметь название, цену, изображение, SEO-текст и похожие услуги;
- отзывы должны иметь текст, имя и форму добавления;
- контакты должны иметь компанию, телефоны, режим работы, адрес, email, мессенджеры, соцсети, карту, ОГРН/ИНН и форму;
- формы должны иметь обязательные поля, проверку, антиспам и сообщение об успешной отправке;
- перед подвалом нужен общий блок особенностей/преимуществ компании.

## Что переносим в Django-админку

### 1. Настройки сайта

Модель: `SiteSettings`.

Поля:

- название сайта;
- слоган;
- телефон 1;
- телефон 2;
- email;
- режим работы;
- адрес;
- ОГРН;
- ИНН;
- WhatsApp;
- Telegram;
- VK / другие соцсети;
- код/ссылка Яндекс.Карты;
- текст политики / ссылка на политику;
- SEO-поля для главной.

Использование:

- header;
- footer;
- contacts page;
- формы;
- микроразметка позже.

### 2. Услуги

Модели:

- `ServiceCategory`;
- `Service`.

Поля `ServiceCategory`:

- название;
- slug;
- краткое описание;
- сортировка;
- SEO title / description / keywords / h1;
- статус публикации.

Поля `Service`:

- категория;
- название;
- slug;
- цена / цена от;
- краткий анонс;
- полное описание;
- SEO-текст;
- изображение;
- похожие услуги ManyToMany;
- сортировка;
- статус публикации;
- SEO title / description / keywords / h1.

Что заменит:

- массив `SERVICES` в `lib/site-data.ts`;
- карточки на главной;
- каталог услуг;
- страницы `/services/[slug]`.

### 3. Ценовые пакеты

Модель: `PricePackage`.

Поля:

- название;
- цена;
- описание;
- список особенностей;
- сортировка;
- статус публикации.

Зачем:

- не завязывать цены только на услуги;
- отдельно редактировать блок “цены на разработку сайтов”.

### 4. Преимущества / особенности компании

Модель: `Advantage`.

Поля:

- заголовок;
- текст;
- иконка/изображение опционально;
- сортировка;
- статус публикации.

Зачем:

- PDF требует общий блок перед footer на всех шаблонах;
- сейчас такого универсального управляемого блока нет.

### 5. Этапы работы

Модель: `WorkStage`.

Поля:

- номер;
- название;
- описание;
- сортировка;
- статус публикации.

Что заменит:

- массив `WORK_STAGES`.

### 6. FAQ

Модель: `FAQItem`.

Поля:

- вопрос;
- slug;
- короткий ответ;
- полный ответ;
- сортировка;
- статус публикации;
- SEO title / description / keywords / h1.

Что заменит:

- массив `FAQ_ITEMS`;
- блок FAQ на главной;
- `/faq` и `/faq/[slug]`.

### 7. Отзывы

Модель: `Review`.

Поля:

- имя;
- email опционально, не выводить публично;
- текст;
- дата;
- статус: `new`, `published`, `hidden`;
- источник: вручную / форма;
- сортировка.

Что заменит:

- массив `REVIEWS`;
- блок отзывов на главной;
- страницу отзывов;
- модерацию отзывов из формы.

### 8. Новости

Модель: `NewsPost`.

Поля:

- заголовок;
- slug;
- дата;
- анонс;
- текст;
- статус публикации;
- сортировка;
- SEO title / description / keywords / h1.

Важно:

- по PDF список новостей должен быть без изображений, по 2 строки с датой;
- изображение можно не добавлять на первом этапе.

Что заменит:

- массив `NEWS_ITEMS`;
- блок новостей на главной;
- `/news` и `/news/[slug]`, если они будут активны в Next.

### 9. Статьи / блог

Модель: `Article`.

Поля:

- заголовок;
- slug;
- дата;
- анонс;
- текст/MDX или HTML;
- thumbnail опционально;
- статус публикации;
- сортировка;
- SEO title / description / keywords / h1.

Что заменит позже:

- чтение `content/blog/*.mdx` через `lib/blog.ts`.

Решение для v1:

- можно оставить MDX как fallback;
- новые статьи вести через Django;
- после проверки полностью переключить блог на API.

### 10. Портфолио / кейсы

Модель: `Project`.

Поля:

- название;
- slug;
- обложка;
- hero image;
- tab index / категория;
- компания / описание клиента;
- кратко о задаче;
- детали;
- цвета проекта;
- изображения галереи;
- предыдущий/следующий проект;
- текст/MDX;
- статус публикации;
- SEO title / description / keywords / h1.

Что заменит позже:

- чтение `content/portfolio/*.mdx` через `lib/portfolio.ts`.

Решение для v1:

- портфолио можно мигрировать не первым, потому что MDX уже хорошо работает;
- сначала подключить услуги, отзывы, FAQ и формы.

### 11. Заявки и формы

Модели:

- `ContactRequest`;
- `CallbackRequest`;
- `ReviewRequest` или запись сразу в `Review` со статусом `new`;
- `QuestionRequest`.

Поля для заявок:

- имя;
- телефон;
- email;
- сообщение / вопрос / отзыв;
- source;
- статус: `new`, `in_progress`, `done`, `spam`;
- дата создания;
- IP/user-agent опционально;
- honeypot/antispam field;
- согласие на обработку данных.

Что заменит:

- текущий `/api/contact` в Next или станет прокси на Django.

## Что пока оставляем во фронтенде

Оставляем в Next.js:

- визуальные шаблоны страниц;
- анимации Framer Motion;
- Webflow CSS и текущую стилизацию;
- burger/header/footer как React-компоненты;
- общий layout;
- 404-страницу;
- текущую сетку портфолио до отдельной миграции;
- MDX-контент блога/портфолио как fallback;
- SEO metadata generation на фронте, но данные для неё позже берём из API.

Не нужно сразу переписывать весь сайт на Django templates. Django делаем как headless CMS/admin, а Next остаётся клиентской витриной.

## Архитектура папок

Предлагаемая структура после добавления бэка:

```text
backend/
  manage.py
  requirements.txt
  .env.example
  db.sqlite3              # локально, в git не коммитить
  media/                  # загрузки картинок, в git не коммитить
  static/
  config/
    settings.py
    urls.py
    asgi.py
    wsgi.py
  content/
    models.py
    admin.py
    serializers.py
    views.py
    urls.py
    migrations/
  leads/
    models.py
    admin.py
    serializers.py
    views.py
    urls.py
    migrations/
```

## API для Next.js

Минимальный набор endpoint-ов:

```text
GET  /api/site-settings/
GET  /api/services/
GET  /api/services/<slug>/
GET  /api/work-stages/
GET  /api/advantages/
GET  /api/reviews/
GET  /api/faq/
GET  /api/faq/<slug>/
GET  /api/news/
GET  /api/news/<slug>/
GET  /api/articles/
GET  /api/articles/<slug>/
GET  /api/projects/
GET  /api/projects/<slug>/
POST /api/leads/contact/
POST /api/leads/callback/
POST /api/leads/review/
POST /api/leads/question/
```

Для фронта лучше сделать безопасный fallback: если Django API недоступен, Next временно берёт старые данные из `lib/site-data.ts` / MDX. Так сайт не упадёт во время перехода.

## Этапы реализации

### Этап 1. Базовый Django-проект

- создать папку `backend/`;
- поставить Django, DRF, CORS, Pillow, dotenv;
- включить SQLite;
- настроить `INSTALLED_APPS`;
- настроить `MEDIA_URL`, `MEDIA_ROOT`;
- создать superuser;
- проверить `/admin/`.

### Этап 2. Модели контента

Сначала делаем:

- `SiteSettings`;
- `ServiceCategory`;
- `Service`;
- `PricePackage`;
- `Advantage`;
- `WorkStage`;
- `FAQItem`;
- `Review`.

После этого:

- `makemigrations`;
- `migrate`;
- зарегистрировать модели в `admin.py`;
- настроить `list_display`, `list_filter`, `search_fields`, `prepopulated_fields` для slug.

### Этап 3. Перенос текущих данных

Перенести из `lib/site-data.ts`:

- услуги;
- этапы;
- FAQ;
- отзывы;
- новости.

Можно сделать management command:

```bash
python manage.py import_initial_content
```

или временно забить данные руками через админку.

### Этап 4. API для публичного сайта

- добавить DRF serializers;
- сделать read-only endpoint-ы для опубликованного контента;
- добавить POST endpoint-ы для заявок;
- включить CORS для Next dev host `http://localhost:3000`;
- добавить `.env.example` с `NEXT_PUBLIC_API_URL=http://localhost:8000/api`.

### Этап 5. Подключение Next.js

- добавить helper `lib/api.ts`;
- постепенно заменить статические импорты:
  - сначала услуги;
  - потом отзывы;
  - потом FAQ;
  - потом настройки сайта;
  - потом новости/статьи/портфолио.
- текущие компоненты не ломать, только поменять источник данных.

### Этап 6. Формы

- заменить `/api/contact` на Django endpoint или сделать Next proxy;
- сохранять заявки в SQLite;
- отправку email оставить вторым шагом;
- добавить статусы заявок в админке;
- добавить простую антиспам-проверку: honeypot + минимальная задержка отправки + серверная валидация.

### Этап 7. Проверка

Проверить:

- `/admin/` открывается;
- superuser входит;
- контент создаётся и редактируется;
- картинки загружаются в `media/`;
- API отдаёт только опубликованные записи;
- формы создают заявки;
- Next работает при доступном API;
- Next не падает при недоступном API за счёт fallback.

## Команды для создания Django-бэка

### Windows PowerShell

```powershell
mkdir backend
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install "Django>=5.2,<6.0" djangorestframework django-cors-headers pillow python-dotenv
pip freeze > requirements.txt
django-admin startproject config .
python manage.py startapp content
python manage.py startapp leads
mkdir media
mkdir static
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 8000
```

### macOS / Linux

```bash
mkdir backend
cd backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install "Django>=5.2,<6.0" djangorestframework django-cors-headers pillow python-dotenv
pip freeze > requirements.txt
django-admin startproject config .
python manage.py startapp content
python manage.py startapp leads
mkdir -p media static
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 8000
```

## Что добавить в `.gitignore`

```gitignore
backend/.venv/
backend/db.sqlite3
backend/media/
backend/staticfiles/
backend/.env
```

## Первичные настройки SQLite в `settings.py`

Django обычно создаёт SQLite-конфиг сам, но для проекта можно явно оставить так:

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
        "OPTIONS": {
            "timeout": 20,
        },
    }
}
```

SQLite подходит для локальной разработки и простой админки. Если позже появится нагрузка, много заявок или несколько админов одновременно, можно перейти на PostgreSQL без изменения общей архитектуры: модели и миграции останутся основной точкой правды.

## Приоритет внедрения

1. Базовый Django + admin.
2. Модели: услуги, отзывы, FAQ, этапы, преимущества, настройки сайта.
3. Заявки из форм.
4. API для Next.
5. Подключить Next к услугам, отзывам, FAQ.
6. Подключить настройки сайта к header/footer/contacts.
7. Новости и статьи.
8. Портфолио.
9. Расширенное SEO и sitemap.
10. Подготовка к возможному PostgreSQL.

## Важное решение

На первом этапе не переносим весь фронтенд на Django templates. Это было бы долго и рискованно. Правильнее оставить текущий Next.js-интерфейс и сделать Django как управляемую админку + API. Так мы быстрее получим CMS, не ломая текущую визуальную часть сайта.
