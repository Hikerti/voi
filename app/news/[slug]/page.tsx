import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StructuredData from "@/components/seo/StructuredData";
import { NEWS_ITEMS } from "@/lib/site-data";
import { getCmsNewsBySlug } from "@/lib/cms-api";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return NEWS_ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = (await getCmsNewsBySlug(slug)) || NEWS_ITEMS.find((news) => news.slug === slug);
  if (!item) return {};

  return createPageMetadata({
    title: item.title,
    description: item.excerpt,
    path: `/news/${item.slug}`,
    keywords: [item.title, "новости веб-студии"],
    type: "article",
  });
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const item = (await getCmsNewsBySlug(slug)) || NEWS_ITEMS.find((news) => news.slug === slug);
  if (!item) notFound();

  const related = NEWS_ITEMS.filter((news) => news.slug !== item.slug).slice(0, 4);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description: item.excerpt,
    datePublished: item.date,
    mainEntityOfPage: absoluteUrl(`/news/${item.slug}`),
    author: { "@type": "Organization", name: "Voitov Studio" },
    publisher: { "@type": "Organization", name: "Voitov Studio", logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") } },
  };

  return (
    <main className="article-page article-page--dark">
      <StructuredData data={articleJsonLd} />

      <article className="article-page__inner">
        <header className="article-page__header">
          <p className="vs-kicker">{item.date}</p>
          <h1>{item.title}</h1>
          <p>{item.excerpt}</p>
        </header>
        <div className="article-page__body rich-content">{item.content}</div>
      </article>

      <aside className="related-content" aria-labelledby="related-news-title">
        <p className="section-kicker">ещё по теме</p>
        <h2 id="related-news-title">Другие новости</h2>
        <ul>
          {related.map((news) => (
            <li key={news.slug}>
              <Link href={`/news/${news.slug}`}>
                <span>{news.date}</span>
                <h3>{news.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </main>
  );
}
