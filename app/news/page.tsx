import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { getCmsNews } from "@/lib/cms-api";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Новости веб-студии",
  description: "Новости Voitov Studio о дизайне, запуске сайтов, SEO и развитии проектов.",
  path: "/news",
  keywords: ["новости веб-студии", "разработка сайтов"],
});

export default async function NewsPage() {
  const news = await getCmsNews();

  return (
    <>
      <PageHeader backLabel="home" />
      <main className="vs-page-shell vs-page-shell--dark">
        <section className="vs-page-hero" aria-labelledby="news-title">
          <p className="vs-kicker">новости</p>
          <h1 id="news-title">Новости проекта и этапы развития</h1>
        </section>
        <section className="vs-news-list" aria-label="Список новостей">
          {news.map((item) => (
            <Link href={`/news/${item.slug}`} className="vs-news-row" key={item.slug}>
              <time>{item.date}</time>
              <h2>{item.title}</h2>
              <p>{item.excerpt}</p>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
