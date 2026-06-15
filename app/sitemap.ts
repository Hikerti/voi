import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/portfolio";
import { getAllArticleSlugs } from "@/lib/blog";
import { SITE } from "@/lib/constants";
import { FAQ_ITEMS, NEWS_ITEMS, SERVICES } from "@/lib/site-data";

const BASE_URL = SITE.baseUrl;
const now = new Date();

function entry(path: string, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], priority: number) {
  const normalized = path === "/" ? "" : `${path.replace(/\/$/, "")}/`;
  return {
    url: `${BASE_URL}${normalized}`,
    lastModified: now,
    changeFrequency,
    priority,
  } satisfies MetadataRoute.Sitemap[number];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    entry("/", "weekly", 1),
    entry("/o-nas", "monthly", 0.8),
    entry("/services", "weekly", 0.9),
    entry("/portfolio", "weekly", 0.9),
    entry("/blog", "weekly", 0.8),
    entry("/news", "weekly", 0.7),
    entry("/contacts", "monthly", 0.8),
    entry("/reviews", "monthly", 0.7),
    entry("/faq", "monthly", 0.7),
    entry("/privacy", "yearly", 0.3),
  ];

  const serviceRoutes = SERVICES.map((service) => entry(`/services/${service.slug}`, "monthly", 0.75));
  const faqRoutes = FAQ_ITEMS.map((item) => entry(`/faq/${item.slug}`, "monthly", 0.55));
  const newsRoutes = NEWS_ITEMS.map((item) => entry(`/news/${item.slug}`, "monthly", 0.6));
  const projectRoutes = getAllProjectSlugs().map((slug) => entry(`/portfolio/${slug}`, "monthly", 0.7));
  const articleRoutes = getAllArticleSlugs().map((slug) => entry(`/blog/${slug}`, "monthly", 0.65));

  return [...staticRoutes, ...serviceRoutes, ...faqRoutes, ...newsRoutes, ...projectRoutes, ...articleRoutes];
}
