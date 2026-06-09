import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticleBySlug, getAllArticleSlugs } from "@/lib/blog";
import PageHeader from "@/components/layout/PageHeader";
import AnimatedLink, { ShuffleText } from "@/components/ui/AnimatedLink";

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
    <>
      <div className="grid-parent-case">
        <div className="grid-child-1-w" />
        <div className="grid-child-2-w" />
        <div className="grid-child-3-w" />
        <div className="grid-child-4-w" />
      </div>

      {/* Hero */}
      <div className="case-hero-hider">
        <div
          className="case-hero"
          style={
            article.thumbnail
              ? { backgroundImage: `url(${article.thumbnail})` }
              : undefined
          }
        />
      </div>

      {/* Title bar */}
      <div className="block-strip">
        <div className="title-holder">
          <h1 className="project-title">{article.title}</h1>
        </div>
      </div>

      {/* Article body */}
      <div className="wrapper-b-mnews">
        {article.thumbnail && (
          <div className="news-div-1">
            <img src={article.thumbnail} alt="" className="news-thumbnail" />
          </div>
        )}
        <div className="c-section">
          <div className="news-row w-row">
            <div className="news-col-fixed w-col w-col-3" />
            <div className="w-col w-col-2" />
            <div className="news-col-no-overflow w-col w-col-7">
              {article.subtitle && (
                <h5 className="heading-27">{article.subtitle}</h5>
              )}
              <div className="rich-text-block w-richtext">
                <MDXRemote source={article.content} />
              </div>
              <AnimatedLink href="/blog" className="n-s-link w-inline-block">
                <ShuffleText tag="h3" className="btn-text">
                  Другие статьи
                </ShuffleText>
              </AnimatedLink>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom nav — matches original placement */}
      <PageHeader
        backHref="/blog"
        backLabel="back news"
        backLabelClass="nynaxyi"
      />
    </>
  );
}
