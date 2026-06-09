import Link from "next/link";

export default function NotFound() {
  return (
    <main className="vs-page-shell vs-page-shell--dark vs-not-found">
      <p className="vs-kicker">404</p>
      <h1>Страница не найдена</h1>
      <p>Возможно, ссылка устарела или раздел переехал в новую структуру Voitov Studio.</p>
      <div className="vs-link-row">
        <Link href="/">Главная</Link>
        <Link href="/services">Услуги</Link>
        <Link href="/portfolio">Портфолио</Link>
      </div>
    </main>
  );
}
