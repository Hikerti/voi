import type { Metadata } from "next";
import PortfolioTabs from "@/components/portfolio/PortfolioTabs";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Наши проекты | Voitov Studio",
  description: "Портфолио Voitov Studio — проекты, которыми мы гордимся",
  openGraph: {
    title: "Наши проекты | Voitov Studio",
    description: "Портфолио Voitov Studio — проекты, которыми мы гордимся",
  },
};

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
