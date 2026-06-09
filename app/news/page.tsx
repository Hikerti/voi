import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import GridLines from "@/components/layout/GridLines";
import { SITE } from "@/lib/constants";
import { NEWS_ITEMS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: `Новости | ${SITE.name}`,
  description: "Новости Voitov Studio: развитие проекта, редизайн, CMS и технические обновления.",
};

export default function NewsPage() {
  return (
    <>
      <PageHeader backLabel="home" />
      <GridLines />
      <main className="vs-page-shell vs-page-shell--dark">
        <section className="vs-page-hero">
          <p className="vs-kicker">новости</p>
          <h1>Новости проекта и этапы развития</h1>
        </section>
        <section className="vs-news-list">
          {NEWS_ITEMS.map((item) => (
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
