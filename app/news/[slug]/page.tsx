import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import GridLines from "@/components/layout/GridLines";
import { SITE } from "@/lib/constants";
import { NEWS_ITEMS, getNewsBySlug } from "@/lib/site-data";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return NEWS_ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return {};
  return {
    title: `${item.title} | ${SITE.name}`,
    description: item.excerpt,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  return (
    <>
      <PageHeader backHref="/news" backLabel="news" />
      <GridLines />
      <main className="vs-page-shell vs-page-shell--dark">
        <article className="vs-article">
          <p className="vs-kicker">{item.date}</p>
          <h1>{item.title}</h1>
          <p>{item.excerpt}</p>
          <div className="vs-article__body">{item.content}</div>
        </article>
      </main>
    </>
  );
}
