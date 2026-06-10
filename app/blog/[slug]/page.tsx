import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticleBySlug, getAllArticleSlugs } from "@/lib/blog";
import AnimatedLink from "@/components/ui/AnimatedLink";

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} | Voitov Studio`,
    description: article.subtitle,
    openGraph: {
      title: `${article.title} | Voitov Studio`,
      description: article.subtitle,
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <main className="article-page">
      <AnimatedLink href="/blog" className="article-back">
        <span aria-hidden="true">←</span>
        Все статьи
      </AnimatedLink>

      <article className="article-page__inner">
        <header className="article-page__header">
          {article.date && <p className="vs-kicker">{article.date}</p>}
          <h1>{article.title}</h1>
          {article.subtitle && <p>{article.subtitle}</p>}
        </header>

        {article.thumbnail && (
          <div className="article-page__media">
            <img src={article.thumbnail} alt="" />
          </div>
        )}

        <div className="article-page__body">
          <MDXRemote source={article.content} />
        </div>
      </article>
    </main>
  );
}
