# Установка сайта — краткая инструкция

Нужен сервер на Linux (Ubuntu) с доступом по SSH.

### 1. Установить Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Загрузить проект на сервер
Скопируйте папку с сайтом на сервер (через FTP/SFTP или git).

### 3. Установить и собрать
```bash
cd /путь/до/папки
npm install
npm run build
```

### 4. Запустить (с автозапуском)
```bash
npm install -g pm2
pm2 start npm --name creativenest -- start
pm2 startup && pm2 save
```
Сайт работает на `http://localhost:3000`.

### 5. Подключить домен (Nginx + HTTPS)
```bash
sudo nano /etc/nginx/sites-available/creativenest
```
Вставьте (замените `ВАШ_ДОМЕН.com`):
```nginx
server {
    listen 80;
    server_name ВАШ_ДОМЕН.com www.ВАШ_ДОМЕН.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }
}
```
Активируйте и включите HTTPS:
```bash
sudo ln -s /etc/nginx/sites-available/creativenest /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d ВАШ_ДОМЕН.com -d www.ВАШ_ДОМЕН.com
```

---

**Управление:**
`pm2 restart creativenest` — перезапуск · `pm2 logs creativenest` — логи

Если что-то не работает — пришлите вывод `pm2 logs creativenest`.
