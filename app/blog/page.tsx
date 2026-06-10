import type { Metadata } from "next";
import BlogSection from "@/components/blog/BlogSection";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Наши статьи | Voitov Studio",
  description: "Блог Voitov Studio: статьи о веб-разработке, дизайне, SEO и запуске сайтов.",
  openGraph: {
    title: "Наши статьи | Voitov Studio",
    description: "Блог Voitov Studio: статьи о веб-разработке, дизайне, SEO и запуске сайтов.",
  },
};

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
