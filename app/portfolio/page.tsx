import type { Metadata } from "next";
import PortfolioTabs from "@/components/portfolio/PortfolioTabs";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/portfolio";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Портфолио и кейсы",
  description: "Портфолио Voitov Studio: сайты, дизайн и цифровые проекты для бизнеса.",
  path: "/portfolio",
  keywords: ["портфолио веб-студии", "кейсы разработки сайтов", "примеры сайтов"],
});

export default function PortfolioPage() {
  const projects = getAllProjectSlugs()
    .map((slug) => getProjectBySlug(slug))
    .filter(Boolean)
    .map((p) => ({
      slug: p!.slug,
      title: p!.title,
      image: p!.coverImage ?? p!.heroImage,
      tabIndex: p!.tabIndex ?? 0,
    }))
    .sort((a, b) => a.tabIndex - b.tabIndex);

  return <PortfolioTabs projects={projects} />;
}
