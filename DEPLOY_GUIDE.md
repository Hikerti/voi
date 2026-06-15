# Deploy Guide: Voitov Studio

Инструкция для production-развёртывания frontend и backend на VPS через PM2, Nginx и Certbot.

## Требования

- Ubuntu 22.04+
- Node.js 20+
- npm 10+
- Nginx
- PM2
- Certbot

## 1. Подготовка проекта

```bash
git clone <repo-url> voitov-studio
cd voitov-studio
npm install
cd backend
npm install
```

## 2. Frontend env

Создать `/path/to/voitov-studio/.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://voitov.ru
CMS_API_URL=http://127.0.0.1:4000/api
NEXT_PUBLIC_CMS_API_URL=https://voitov.ru/api
CONTACT_EMAIL_TO=<email-для-заявок>
CONTACT_EMAIL_FROM="Voitov Studio <site@voitov.ru>"
RESEND_API_KEY=<секретный-ключ-resend>
NEXT_PUBLIC_GA_ID=G-PLYNZME6SN
NEXT_PUBLIC_YANDEX_METRIKA_ID=109826670
```

`RESEND_API_KEY` хранить только на сервере. Не добавлять реальный ключ в Git, `.env.example`, скриншоты или логи.

После изменения любой переменной `NEXT_PUBLIC_*` frontend нужно пересобрать, потому что эти значения встраиваются во время `npm run build`.

## 3. Backend env

Создать `/path/to/voitov-studio/backend/.env`:

```env
DATABASE_URL="file:../.tmp/dev.db"
PORT=4000
CORS_ORIGIN="https://voitov.ru,https://www.voitov.ru,http://localhost:3000,http://127.0.0.1:3000"
```

Для production с PostgreSQL заменить `DATABASE_URL` на PostgreSQL-строку и применить Prisma-миграции. Изменения схемы базы должны оформляться миграциями, а не только `db:push`.

## 4. Подготовить базу

Локальная демо-база:

```bash
cd /path/to/voitov-studio/backend
npm run prisma:generate
npm run db:push
npm run db:seed
```

Production после появления миграций:

```bash
cd /path/to/voitov-studio/backend
npx prisma migrate deploy
```

## 5. Сборка

```bash
cd /path/to/voitov-studio
npm run build

cd /path/to/voitov-studio/backend
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

После изменения env или новой сборки:

```bash
pm2 restart voitov-frontend --update-env
pm2 restart voitov-backend --update-env
```

## 7. Nginx

Создать `/etc/nginx/sites-available/voitov.ru`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name voitov.ru www.voitov.ru;

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
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Активировать конфигурацию:

```bash
sudo ln -s /etc/nginx/sites-available/voitov.ru /etc/nginx/sites-enabled/voitov.ru
sudo nginx -t
sudo systemctl reload nginx
```

## 8. SSL

Перед выпуском сертификата A/AAAA-записи домена должны вести на VPS, а порты 80 и 443 должны быть открыты.

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d voitov.ru -d www.voitov.ru --redirect
```

Проверить автопродление:

```bash
sudo certbot renew --dry-run
systemctl status certbot.timer
```

После выпуска сертификата в Nginx оставить `voitov.ru` основным доменом, а `www.voitov.ru` перенаправлять на него. Certbot обычно добавляет HTTPS-блоки автоматически.

## 9. Проверка после релиза

- Главная и внутренние страницы открываются по HTTPS.
- `http://voitov.ru` и `https://www.voitov.ru` перенаправляются на `https://voitov.ru`.
- `/sitemap.xml` и `/robots.txt` содержат production-домен.
- Форма создаёт запись `LeadRequest` и отправляет письмо через Resend.
- В исходном коде страницы присутствуют Google Analytics и Яндекс.Метрика.
- В консоли браузера нет CORS-ошибок.
- Canonical главной указывает на `https://voitov.ru`.

## 10. Полезные команды

```bash
pm2 status
pm2 logs voitov-frontend
pm2 logs voitov-backend
sudo nginx -t
sudo journalctl -u nginx -n 100 --no-pager
```
