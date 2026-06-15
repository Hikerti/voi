import { FAQ_ITEMS, NEWS_ITEMS, SERVICES } from "@/lib/site-data";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/blog";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/portfolio";

export type SearchItem = {
  title: string;
  description: string;
  href: string;
  section: string;
};

export function getSearchIndex(): SearchItem[] {
  const services = SERVICES.map((item) => ({
    title: item.title,
    description: item.summary,
    href: `/services/${item.slug}`,
    section: "Услуги",
  }));

  const faq = FAQ_ITEMS.map((item) => ({
    title: item.question,
    description: item.answer,
    href: `/faq/${item.slug}`,
    section: "Вопросы и ответы",
  }));

  const news = NEWS_ITEMS.map((item) => ({
    title: item.title,
    description: item.excerpt,
    href: `/news/${item.slug}`,
    section: "Новости",
  }));

  const articles = getAllArticleSlugs()
    .map((slug) => getArticleBySlug(slug))
    .filter(Boolean)
    .map((item) => ({
      title: item!.title,
      description: item!.subtitle || "Статья Voitov Studio",
      href: `/blog/${item!.slug}`,
      section: "Статьи",
    }));

  const projects = getAllProjectSlugs()
    .map((slug) => getProjectBySlug(slug))
    .filter(Boolean)
    .map((item) => ({
      title: item!.title,
      description: item!.brief || item!.company || "Проект Voitov Studio",
      href: `/portfolio/${item!.slug}`,
      section: "Работы",
    }));

  return [...services, ...projects, ...articles, ...news, ...faq];
}

export function searchSite(query: string) {
  const normalized = query.trim().toLocaleLowerCase("ru-RU");
  if (!normalized) return [];

  return getSearchIndex().filter((item) =>
    `${item.title} ${item.description} ${item.section}`
      .toLocaleLowerCase("ru-RU")
      .includes(normalized),
  );
}
