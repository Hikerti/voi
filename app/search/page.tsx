import Link from "next/link";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { searchSite } from "@/lib/search";

export const metadata: Metadata = createPageMetadata({
  title: "Поиск по сайту",
  description: "Поиск по услугам, работам, статьям, новостям и ответам Voitov Studio.",
  path: "/search",
  noIndex: true,
});

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const results = searchSite(q);

  return (
    <main className="search-page">
      <header className="search-page__header">
        <p className="section-kicker">поиск</p>
        <h1>Найти на сайте</h1>
        <p>Ищите по услугам, проектам, статьям, новостям и вопросам.</p>
      </header>

      <form className="site-search site-search--page" action="/search" role="search">
        <label htmlFor="site-search-page">Поиск по сайту</label>
        <div>
          <input
            id="site-search-page"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Например: SEO, лендинг или сроки"
            minLength={2}
            required
          />
          <button type="submit">Найти</button>
        </div>
      </form>

      {q ? (
        <section className="search-results" aria-labelledby="search-results-title">
          <div className="search-results__head">
            <h2 id="search-results-title">Результаты по запросу «{q}»</h2>
            <span>{results.length}</span>
          </div>

          {results.length > 0 ? (
            <ul>
              {results.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span>{item.section}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="search-results__empty">
              Ничего не найдено. Попробуйте более короткий запрос или перейдите в раздел услуг.
            </p>
          )}
        </section>
      ) : null}
    </main>
  );
}
