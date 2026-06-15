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

Готовый шаблон хранится в `deploy/nginx/voitov-studio.conf`.

Установить его на сервере:

```bash
cd /var/www/voitov-studio
sudo cp deploy/nginx/voitov-studio.conf /etc/nginx/sites-available/voitov-studio.conf
sudo ln -sfn /etc/nginx/sites-available/voitov-studio.conf /etc/nginx/sites-enabled/voitov-studio.conf
sudo nginx -t
sudo systemctl reload nginx
```

Конфигурация содержит:

- frontend на `127.0.0.1:3000`;
- backend API на `127.0.0.1:4000`;
- Prisma Studio на `127.0.0.1:5555`, проксируемый через текущий публичный IPv4 `2.56.241.59:5555`.

Не добавлять в `listen` IP-адреса, которых больше нет на сервере. Иначе даже корректный Nginx-конфиг не пройдёт `nginx -t`, а Certbot не сможет выпустить сертификат.

### Исправление старой привязки к `46.173.17.61`

Если на сервере уже установлен старый конфиг, сначала сделать резервную копию, удалить старый `listen` и старый IP из `server_name`:

```bash
sudo cp /etc/nginx/sites-available/voitov-studio.conf \
  /etc/nginx/sites-available/voitov-studio.conf.bak-$(date +%F-%H%M%S)

sudo sed -i \
  -e '/listen 46\.173\.17\.61:5555;/d' \
  -e 's/server_name 46\.173\.17\.61 2\.56\.241\.59 _;/server_name 2.56.241.59 _;/' \
  /etc/nginx/sites-available/voitov-studio.conf

sudo nginx -t
sudo systemctl reload nginx
```

Проверить, что старый IP полностью исчез из активной конфигурации:

```bash
sudo nginx -T 2>/dev/null | grep -n "46\.173\.17\.61" || echo "Старый IP не найден"
```

`sites-enabled/voitov-studio.conf` должен быть симлинком на файл из `sites-available`. Проверка:

```bash
readlink -f /etc/nginx/sites-enabled/voitov-studio.conf
```

## 8. SSL

Перед выпуском сертификата A/AAAA-записи домена должны вести на VPS, а порты 80 и 443 должны быть открыты.

После успешного `nginx -t`:

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
sudo nginx -T
sudo journalctl -u nginx -n 100 --no-pager
```
