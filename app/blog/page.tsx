import type { Metadata } from "next";
import BlogSection from "@/components/blog/BlogSection";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/blog";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Статьи о разработке сайтов и SEO",
  description: "Статьи Voitov Studio о веб-разработке, дизайне, SEO, доменах и запуске сайтов.",
  path: "/blog",
  keywords: ["статьи о разработке сайтов", "блог о SEO", "веб-дизайн статьи"],
});

export default function BlogPage() {
  const items = getAllArticleSlugs()
    .map((slug) => getArticleBySlug(slug))
    .filter(Boolean)
    .sort((a, b) => (a!.order ?? 99) - (b!.order ?? 99))
    .map((a) => ({
      slug: a!.slug,
      title: a!.title,
      date: a!.date,
      image: a!.thumbnail,
      subtitle: a!.subtitle,
    }));

  return <BlogSection items={items} />;
}
