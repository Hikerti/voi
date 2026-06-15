import type { Metadata } from "next";
import HeroExperience from "@/components/home/HeroExperience";
import IntroSection from "@/components/home/IntroSection";
import StudioSection from "@/components/home/StudioSection";
import NewsPreview from "@/components/home/NewsPreview";
import HomeSections from "@/components/home/HomeSections";
import HomeTrustSections from "@/components/home/HomeTrustSections";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import HomeSeoCopy from "@/components/home/HomeSeoCopy";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/portfolio";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/blog";
import GridLines from "@/components/layout/GridLines";
import {
  getCmsFaq,
  getCmsReviews,
  getCmsServices,
  getCmsWorkStages,
} from "@/lib/cms-api";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Разработка сайтов и веб-дизайн",
  description:
    "Voitov Studio создаёт лендинги, корпоративные сайты, дизайн и SEO-структуру для бизнеса.",
  path: "/",
  keywords: [
    "разработка сайтов в Москве",
    "заказать сайт",
    "креативный веб-дизайн",
    "создание лендинга",
    "корпоративный сайт",
  ],
});

export default async function HomePage() {
  const [services, stages, reviews, faq] = await Promise.all([
    getCmsServices(),
    getCmsWorkStages(),
    getCmsReviews(),
    getCmsFaq(),
  ]);

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
      <HeroExperience />
      <IntroSection />
      <HomeSections services={services} />
      <StudioSection projects={projects} />
      <HomeTrustSections stages={stages} reviews={reviews} faq={faq} />
      <NewsPreview items={newsItems} />
      <HomeSeoCopy />
      <HomeFinalCta />
    </>
  );
}
