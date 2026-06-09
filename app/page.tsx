import type { Metadata } from "next";
import HeroOverlay from "@/components/home/HeroOverlay";
import HeroCenter from "@/components/home/HeroCenter";
import Hero from "@/components/home/Hero";
import IntroSection from "@/components/home/IntroSection";
import StudioSection from "@/components/home/StudioSection";
import NewsPreview from "@/components/home/NewsPreview";
import HomeSections from "@/components/home/HomeSections";
import HomeTrustSections from "@/components/home/HomeTrustSections";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/portfolio";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/blog";
import GridLines from "@/components/layout/GridLines";

export const metadata: Metadata = {
  title: "Voitov Studio | Нешаблонные сайты с вау-эффектом",
  description: "Voitov Studio делает креативные сайты, лендинги и визуальные системы, которые помогают бизнесу выглядеть сильнее конкурентов.",
  openGraph: {
    title: "Voitov Studio | Нешаблонные сайты с вау-эффектом",
    description: "Креативная веб-студия с нешаблонным дизайном, анимациями и фокусом на заявки.",
  },
};

export default function HomePage() {
  const projects = getAllProjectSlugs()
    .map((slug) => getProjectBySlug(slug))
    .filter(Boolean)
    .map((p) => ({ slug: p!.slug, title: p!.title, image: p!.coverImage ?? p!.heroImage, tabIndex: p!.tabIndex ?? 0 }))
    .sort((a, b) => a.tabIndex - b.tabIndex);

  const newsItems = getAllArticleSlugs()
    .map((slug) => getArticleBySlug(slug))
    .filter(Boolean)
    .slice(0, 6)
    .map((a) => ({ slug: a!.slug, title: a!.title, date: a!.date, image: a!.thumbnail }));

  return (
    <>
      <GridLines />

      <HeroOverlay />
      <Hero />
      <HeroCenter />
      <IntroSection />
      <HomeSections />
      <StudioSection projects={projects} />
      <HomeTrustSections />
      <NewsPreview items={newsItems} />
      <HomeFinalCta />
    </>
  );
}
