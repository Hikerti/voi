# Deploy Guide: Voitov Studio

Инструкция для демо/production-развертывания на VPS. Для первого показа можно поднять frontend и backend через PM2. Для полноценного production позже лучше вынести базу в PostgreSQL и добавить backup.

## Требования

- Ubuntu 22.04+
- Node.js 20+
- npm 10+
- Nginx
- PM2
- SSL через Certbot

## 1. Подготовка проекта

```bash
git clone <repo-url> voitov-studio
cd voitov-studio
npm install
cd backend
npm install
```

## 2. Frontend env

Создать `.env.local` в корне:

```env
CMS_API_URL=http://127.0.0.1:4000/api
NEXT_PUBLIC_CMS_API_URL=http://127.0.0.1:4000/api
CONTACT_EMAIL_TO=hello@voitov.studio
CONTACT_EMAIL_FROM="Voitov Studio <site@voitov.studio>"
RESEND_API_KEY=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_YANDEX_METRIKA_ID=
```

## 3. Backend env

Создать `backend/.env`:

```env
DATABASE_URL="file:../.tmp/dev.db"
PORT=4000
CORS_ORIGIN="https://voitov.studio,https://www.voitov.studio,http://localhost:3000"
```

Для production с PostgreSQL позже заменить `DATABASE_URL` на PostgreSQL-строку и обновить provider в Prisma.

## 4. Подготовить базу

```bash
cd backend
npm run prisma:generate
npm run db:push
npm run db:seed
```

Проверить данные:

```bash
npm run prisma:studio
```

## 5. Сборка

```bash
cd /path/to/voitov-studio
npm run build
cd backend
npm run build
```

## 6. Запуск через PM2

```bash
cd /path/to/voitov-studio
pm2 start npm --name "voitov-frontend" -- start

cd /path/to/voitov-studio/backend
pm2 start npm --name "voitov-backend" -- start:prod

pm2 save
pm2 startup
```

## 7. Nginx

Пример для домена без `www`, где `www` редиректится на основной домен:

```nginx
server {
    listen 80;
    server_name www.voitov.studio;
    return 301 https://voitov.studio$request_uri;
}

server {
    listen 80;
    server_name voitov.studio;

    location /api/ {
        proxy_pass http://127.0.0.1:4000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Проверка и перезагрузка:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 8. SSL

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d voitov.studio -d www.voitov.studio
```

## 9. Проверка после релиза

- Главная открывается.
- `/services`, `/portfolio`, `/reviews`, `/faq`, `/news`, `/blog`, `/contacts`, `/zayavka` открываются.
- `/sitemap.xml` и `/robots.txt` доступны.
- `www` редиректится на домен без `www`.
- Форма заявки сохраняет запись в `LeadRequest`.
- Email-уведомления работают, если заполнен `RESEND_API_KEY`.
- Яндекс.Метрика и Google Analytics появляются только после заполнения env.

## 10. Полезные команды

```bash
pm2 status
pm2 logs voitov-frontend
pm2 logs voitov-backend
pm2 restart voitov-frontend
pm2 restart voitov-backend
```
