import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnimatedLink from "@/components/ui/AnimatedLink";
import { SITE } from "@/lib/constants";
import { NEWS_ITEMS, getNewsBySlug } from "@/lib/site-data";
import { getCmsNewsBySlug } from "@/lib/cms-api";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return NEWS_ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = (await getCmsNewsBySlug(slug)) || getNewsBySlug(slug);
  if (!item) return {};

  return {
    title: `${item.title} | ${SITE.name}`,
    description: item.excerpt,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const item = (await getCmsNewsBySlug(slug)) || getNewsBySlug(slug);
  if (!item) notFound();

  return (
    <main className="article-page article-page--dark">
      <AnimatedLink href="/news" className="article-back">
        <span aria-hidden="true">←</span>
        Все новости
      </AnimatedLink>

      <article className="article-page__inner">
        <header className="article-page__header">
          <p className="vs-kicker">{item.date}</p>
          <h1>{item.title}</h1>
          <p>{item.excerpt}</p>
        </header>
        <div className="article-page__body">{item.content}</div>
      </article>
    </main>
  );
}
