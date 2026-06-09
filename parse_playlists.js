/**
 * Парсер названий плейлистов Яндекс Музыки (через Playwright)
 * 
 * Установка:
 *   npm install playwright
 *   npx playwright install chromium
 * 
 * Запуск:
 *   node parse_playlists.js
 */

const fs = require('fs');
const { chromium } = require('playwright');

const INPUT_FILE  = 'адреса_плейлистов.txt';
const OUTPUT_CSV  = 'плейлисты_результат.csv';
const OUTPUT_JSON = 'плейлисты_результат.json';
const DELAY_MS    = 1200;   // пауза между страницами
const TIMEOUT_MS  = 20000;  // максимум ожидания названия

async function closeBanners(page) {
  // Закрыть любые всплывающие окна / оверлеи
  const closeSelectors = [
    'button[aria-label="Закрыть"]',
    'button[aria-label="Close"]',
    '.modal__close',
    '.popup__close',
    '.d-modal__close',
    '[class*="close"]',
    '[class*="Close"]',
    'button:has-text("×")',
    'button:has-text("✕")',
    'button:has-text("Закрыть")',
    'button:has-text("Нет, спасибо")',
  ];
  for (const sel of closeSelectors) {
    try {
      const btn = page.locator(sel).first();
      if (await btn.isVisible({ timeout: 500 })) {
        await btn.click();
        await page.waitForTimeout(400);
      }
    } catch (_) {}
  }

  // Закрыть рекламные iframe / баннеры ESC-ом
  try { await page.keyboard.press('Escape'); } catch (_) {}
}

async function getPlaylistTitle(page, url) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: TIMEOUT_MS });

    // Закрыть всплывашки сразу после загрузки
    await closeBanners(page);

    // Ждём появления заголовка плейлиста — Яндекс вставляет его через JS
    // Пробуем несколько известных селекторов
    const titleSelectors = [
      '.page-playlist__title',
      '.playlist__title',
      'h1',
      '[class*="playlist"][class*="title"]',
      '[class*="Title"]',
    ];

    let title = null;

    for (const sel of titleSelectors) {
      try {
        await page.waitForSelector(sel, { timeout: TIMEOUT_MS });
        const el = page.locator(sel).first();
        const text = (await el.textContent({ timeout: 3000 }))?.trim();
        if (text && text.length > 1) {
          title = text;
          break;
        }
      } catch (_) {}
    }

    // Запасной вариант: og:title из мета-тегов (иногда заполняется позже)
    if (!title) {
      title = await page.evaluate(() => {
        const og = document.querySelector('meta[property="og:title"]');
        return og?.content?.replace(/\s*[—–-]\s*Яндекс Музыка.*/i, '').trim() || null;
      });
    }

    // Последний запасной: document.title
    if (!title) {
      const pageTitle = await page.title();
      title = pageTitle.replace(/\s*[—–-]\s*Яндекс Музыка.*/i, '').trim() || null;
    }

    return { title, status: 'ok' };
  } catch (e) {
    if (e.message?.includes('net::ERR') || e.message?.includes('404')) {
      return { title: null, status: 'not_found' };
    }
    return { title: null, status: `error: ${e.message.split('\n')[0]}` };
  }
}

function saveResults(results, total) {
  const csvLines = ['url,title,status'];
  for (const r of results) {
    const t = (r.title || '').replace(/"/g, '""');
    csvLines.push(`"${r.url}","${t}","${r.status}"`);
  }
  fs.writeFileSync(OUTPUT_CSV, '\uFEFF' + csvLines.join('\n'), 'utf-8');
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(results, null, 2), 'utf-8');

  const found = results.filter(r => r.title).length;
  console.log(`\nСохранено: ${OUTPUT_CSV}, ${OUTPUT_JSON}`);
  console.log(`Обработано: ${results.length} из ${total} | найдено: ${found} | без названия: ${results.length - found}`);
}

async function askUser(question) {
  return new Promise(resolve => {
    process.stdout.write(question);
    process.stdin.resume();
    process.stdin.setEncoding('utf-8');
    process.stdin.once('data', d => { process.stdin.pause(); resolve(d.trim().toLowerCase()); });
  });
}

async function main() {
  const urls = fs.readFileSync(INPUT_FILE, 'utf-8')
    .split('\n').map(l => l.trim()).filter(Boolean);

  console.log(`Всего ссылок: ${urls.length}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
    locale: 'ru-RU',
    // Блокируем рекламные и трекинговые запросы для скорости
  });

  // Блокируем рекламу и лишние ресурсы
  await context.route('**/*', (route) => {
    const type = route.request().resourceType();
    const url  = route.request().url();
    if (
      type === 'image' ||
      type === 'media' ||
      type === 'font' ||
      url.includes('mc.yandex.ru') ||
      url.includes('an.yandex.ru') ||
      url.includes('googletagmanager') ||
      url.includes('doubleclick')
    ) {
      route.abort();
    } else {
      route.continue();
    }
  });

  const page = await context.newPage();
  const results = [];

  // --- Пробный запуск: первые 10 ---
  console.log('\n--- Пробный запуск: первые 10 ссылок ---\n');
  for (let i = 0; i < Math.min(10, urls.length); i++) {
    const { title, status } = await getPlaylistTitle(page, urls[i]);
    results.push({ url: urls[i], title, status });
    console.log(`  [${i+1}/10] ${title || '(не найдено)'}  [${status}]`);
    await page.waitForTimeout(DELAY_MS);
  }

  const answer = await askUser('\n--- Первые 10 готовы. Продолжить все остальные? (y/n): ');

  if (!['y', 'yes', 'д', 'да'].includes(answer)) {
    await browser.close();
    saveResults(results, urls.length);
    return;
  }

  console.log('\nПродолжаю...\n');
  for (let i = 10; i < urls.length; i++) {
    const { title, status } = await getPlaylistTitle(page, urls[i]);
    results.push({ url: urls[i], title, status });

    if ((i + 1) % 10 === 0 || i + 1 === urls.length) {
      const found = results.filter(r => r.title).length;
      console.log(`  [${i+1}/${urls.length}] найдено: ${found}  последнее: "${title || '—'}"`);
    }
    await page.waitForTimeout(DELAY_MS);
  }

  await browser.close();
  saveResults(results, urls.length);
}

main().catch(console.error);
