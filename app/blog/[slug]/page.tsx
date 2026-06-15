import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticleBySlug, getAllArticleSlugs } from "@/lib/blog";
import AnimatedLink from "@/components/ui/AnimatedLink";
import StructuredData from "@/components/seo/StructuredData";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

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

  return createPageMetadata({
    title: article.title,
    description: article.subtitle || `Статья ${article.title}`,
    path: `/blog/${article.slug}`,
    keywords: [article.title, "разработка сайтов", "SEO"],
    image: article.thumbnail || "/images/og-cover.svg",
    type: "article",
  });
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getAllArticleSlugs()
    .filter((articleSlug) => articleSlug !== slug)
    .map((articleSlug) => getArticleBySlug(articleSlug))
    .filter(Boolean)
    .slice(0, 4);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.subtitle,
    datePublished: article.date,
    image: article.thumbnail ? absoluteUrl(article.thumbnail) : absoluteUrl("/images/og-cover.svg"),
    mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
    author: { "@type": "Organization", name: "Voitov Studio" },
    publisher: {
      "@type": "Organization",
      name: "Voitov Studio",
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
  };

  return (
    <main className="article-page">
      <StructuredData data={articleJsonLd} />
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
          <figure className="article-page__media">
            <img src={article.thumbnail} alt={`Иллюстрация к статье «${article.title}»`} />
          </figure>
        )}

        <div className="article-page__body rich-content">
          <MDXRemote source={article.content} />
        </div>
      </article>

      <aside className="related-content" aria-labelledby="related-articles-title">
        <p className="section-kicker">продолжить чтение</p>
        <h2 id="related-articles-title">Другие статьи</h2>
        <ul>
          {related.map((item) => (
            <li key={item!.slug}>
              <Link href={`/blog/${item!.slug}`}>
                <span>{item!.date}</span>
                <h3>{item!.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </main>
  );
}
