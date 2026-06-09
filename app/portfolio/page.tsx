import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import PortfolioTabs from "@/components/portfolio/PortfolioTabs";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/portfolio";
import GridLines from "@/components/layout/GridLines";

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

  return (
    <>
      <PageHeader wrapperClass="nav-bar w-clearfix" backLabelClass="text-block-6" backLabel="back" />
      <GridLines />
      <PortfolioTabs projects={projects} />
    </>
  );
}
