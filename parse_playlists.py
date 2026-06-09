"""
Парсер названий плейлистов Яндекс Музыки
Запуск: python parse_playlists.py

Требования: pip install requests beautifulsoup4
"""

import re
import time
import csv
import json
from pathlib import Path

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Установите зависимости: pip install requests beautifulsoup4")
    exit(1)

# ── Настройки ──────────────────────────────────────────────────────────────
INPUT_FILE  = "адреса_плейлистов.txt"   # файл со ссылками
OUTPUT_CSV  = "плейлисты_результат.csv"
OUTPUT_JSON = "плейлисты_результат.json"
DELAY_SEC   = 0.7   # пауза между запросами (не перегружать сервер)
# ───────────────────────────────────────────────────────────────────────────

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0 Safari/537.36"
    ),
    "Accept-Language": "ru-RU,ru;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}


def extract_title(html: str) -> str | None:
    """Ищет название плейлиста в HTML-странице несколькими способами."""
    soup = BeautifulSoup(html, "html.parser")

    # 1. og:title мета-тег  →  «Название плейлиста — Яндекс Музыка»
    og = soup.find("meta", property="og:title")
    if og and og.get("content"):
        title = og["content"]
        # Убираем хвост «— Яндекс Музыка» / «– Yandex Music»
        title = re.sub(r"\s*[—–-]\s*Яндекс Музыка.*$", "", title, flags=re.I)
        title = re.sub(r"\s*[—–-]\s*Yandex Music.*$", "", title, flags=re.I)
        return title.strip()

    # 2. <title> тег
    t = soup.find("title")
    if t and t.text:
        title = t.text.strip()
        title = re.sub(r"\s*[—–-]\s*Яндекс Музыка.*$", "", title, flags=re.I)
        title = re.sub(r"\s*[—–-]\s*Yandex Music.*$", "", title, flags=re.I)
        return title.strip() or None

    # 3. JSON-данные внутри страницы (Yandex иногда встраивает их в <script>)
    scripts = soup.find_all("script", type="application/json")
    for sc in scripts:
        try:
            data = json.loads(sc.string or "")
            # ищем ключи title/name рекурсивно
            found = _find_in_dict(data, ("title", "name"))
            if found:
                return found
        except Exception:
            pass

    return None


def _find_in_dict(obj, keys, depth=0):
    """Рекурсивный поиск первого совпадения ключа в словаре/списке."""
    if depth > 8:
        return None
    if isinstance(obj, dict):
        for k in keys:
            if k in obj and isinstance(obj[k], str) and len(obj[k]) > 2:
                return obj[k]
        for v in obj.values():
            r = _find_in_dict(v, keys, depth + 1)
            if r:
                return r
    elif isinstance(obj, list):
        for item in obj[:10]:
            r = _find_in_dict(item, keys, depth + 1)
            if r:
                return r
    return None


def parse_playlists(input_file: str) -> list[dict]:
    urls = [line.strip() for line in Path(input_file).read_text(encoding="utf-8").splitlines() if line.strip()]
    print(f"Всего ссылок: {len(urls)}")

    session = requests.Session()
    session.headers.update(HEADERS)

    results = []
    for i, url in enumerate(urls, 1):
        try:
            resp = session.get(url, timeout=15, allow_redirects=True)
            if resp.status_code == 200:
                title = extract_title(resp.text)
                status = "ok"
            elif resp.status_code == 404:
                title = None
                status = "not_found"
            else:
                title = None
                status = f"http_{resp.status_code}"
        except requests.RequestException as e:
            title = None
            status = f"error: {e}"

        results.append({"url": url, "title": title, "status": status})

        # Прогресс каждые 10 ссылок
        if i % 10 == 0 or i == len(urls):
            done = sum(1 for r in results if r["title"])
            print(f"  [{i}/{len(urls)}] найдено названий: {done}")

        time.sleep(DELAY_SEC)

    return results


def save_results(results: list[dict]) -> None:
    # CSV
    with open(OUTPUT_CSV, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=["url", "title", "status"])
        writer.writeheader()
        writer.writerows(results)
    print(f"\nCSV сохранён: {OUTPUT_CSV}")

    # JSON
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"JSON сохранён: {OUTPUT_JSON}")

    # Краткая статистика
    total   = len(results)
    found   = sum(1 for r in results if r["title"])
    missing = total - found
    print(f"\nИтого: {total} ссылок | найдено названий: {found} | без названия: {missing}")


if __name__ == "__main__":
    results = parse_playlists(INPUT_FILE)
    save_results(results)
