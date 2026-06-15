import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Страница не найдена | Voitov Studio",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="vs-page-shell vs-page-shell--dark vs-not-found">
      <p className="vs-kicker">404</p>
      <h1>Страница не найдена</h1>
      <p>Возможно, ссылка устарела или раздел переехал в новую структуру Voitov Studio.</p>
      <nav className="vs-link-row" aria-label="Полезные ссылки">
        <Link href="/">Главная</Link>
        <Link href="/services">Услуги</Link>
        <Link href="/portfolio">Портфолио</Link>
        <Link href="/sitemap.xml">Карта сайта</Link>
      </nav>
    </main>
  );
}
