# Установка сайта на сервер

## Требования к серверу

- Ubuntu 20.04 / 22.04 (или любой Linux)
- RAM: минимум 1 GB
- Node.js 20+
- npm 10+

---

## Шаг 1 — Установка Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v   # должно показать v20.x.x
```

---

## Шаг 2 — Загрузка файлов на сервер

Скопируйте папку с проектом на сервер (через FTP, SFTP или git).

Убедитесь, что в папке есть файлы:
`package.json`, папки `app/`, `components/`, `content/`, `public/`

---

## Шаг 3 — Установка зависимостей и сборка

```bash
cd /путь/до/папки/с/проектом

npm install
npm run build
```

Сборка занимает 1–3 минуты.

---

## Шаг 4 — Запуск сайта

```bash
npm run start
```

Сайт запустится на `http://localhost:3000`

---

## Шаг 5 — Автозапуск через PM2

PM2 обеспечивает постоянную работу сайта и автозапуск после перезагрузки сервера.

```bash
# Установить PM2
npm install -g pm2

# Запустить сайт
pm2 start npm --name "creativenest" -- start

# Добавить в автозапуск при перезагрузке сервера
pm2 startup
pm2 save
```

---

## Шаг 6 — Настройка Nginx

Чтобы сайт был доступен по вашему домену, настройте Nginx.

Создайте файл конфигурации:

```bash
sudo nano /etc/nginx/sites-available/creativenest
```

Вставьте следующее содержимое (замените `ВАШ_ДОМЕН.com` на ваш домен):

```nginx
server {
    listen 80;
    server_name ВАШ_ДОМЕН.com www.ВАШ_ДОМЕН.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Активируйте конфигурацию:

```bash
sudo ln -s /etc/nginx/sites-available/creativenest /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## Шаг 7 — SSL-сертификат (HTTPS)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d ВАШ_ДОМЕН.com -d www.ВАШ_ДОМЕН.com
```

Certbot автоматически настроит HTTPS и добавит автообновление сертификата.

---

## Управление сайтом

| Действие | Команда |
|---|---|
| Посмотреть статус | `pm2 status` |
| Перезапустить | `pm2 restart creativenest` |
| Остановить | `pm2 stop creativenest` |
| Запустить | `pm2 start creativenest` |
| Логи (для диагностики) | `pm2 logs creativenest` |

---

## Если что-то пошло не так

Пришлите вывод команды:

```bash
pm2 logs creativenest
```

Это поможет найти причину ошибки.
