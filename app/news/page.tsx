import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { SITE } from "@/lib/constants";
import { getCmsNews } from "@/lib/cms-api";

export const metadata: Metadata = {
  title: `Новости | ${SITE.name}`,
  description: "Новости Voitov Studio: дизайн, запуск сайтов, SEO, контент и развитие проектов.",
};

export default async function NewsPage() {
  const news = await getCmsNews();

  return (
    <>
      <PageHeader backLabel="home" />
      <main className="vs-page-shell vs-page-shell--dark">
        <section className="vs-page-hero">
          <p className="vs-kicker">новости</p>
          <h1>Новости проекта и этапы развития</h1>
        </section>
        <section className="vs-news-list">
          {news.map((item) => (
            <Link href={`/news/${item.slug}`} className="vs-news-row" key={item.slug}>
              <span>{item.date}</span>
              <h2>{item.title}</h2>
              <p>{item.excerpt}</p>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
