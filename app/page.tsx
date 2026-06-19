import type { Metadata } from "next";
import "./styles/home-heading-layout.css";
import "./styles/home-reviews-layout.css";
import "./styles/home-faq-layout.css";
import "./styles/home-form-project-heading.css";
import "./styles/home-content-sections.css";
import HeroExperience from "@/components/home/HeroExperience";
import IntroSection from "@/components/home/IntroSection";
import StudioSection from "@/components/home/StudioSection";
import NewsPreview from "@/components/home/NewsPreview";
import HomeSections from "@/components/home/HomeSections";
import HomeTrustSections from "@/components/home/HomeTrustSections";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import HomeSeoSection from "@/components/home/HomeSeoSection";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/portfolio";
import GridLines from "@/components/layout/GridLines";
import {
  getCmsFaq,
  getCmsNews,
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
  const [services, stages, reviews, faq, news] = await Promise.all([
    getCmsServices(),
    getCmsWorkStages(),
    getCmsReviews(),
    getCmsFaq(),
    getCmsNews(),
  ]);

  const projects = getAllProjectSlugs()
    .map((slug) => getProjectBySlug(slug))
    .filter(Boolean)
    .map((project) => ({
      slug: project!.slug,
      title: project!.title,
      image: project!.coverImage ?? project!.heroImage,
      tabIndex: project!.tabIndex ?? 0,
    }))
    .sort((a, b) => a.tabIndex - b.tabIndex);

  const newsItems = news.slice(0, 3).map((item) => ({
    slug: item.slug,
    title: item.title,
    date: item.date,
    excerpt: item.excerpt,
  }));

  return (
    <>
      <GridLines />
      <HeroExperience />
      <IntroSection />
      <HomeSections services={services} />
      <StudioSection projects={projects} />
      <HomeTrustSections stages={stages} reviews={reviews} faq={faq} />
      <NewsPreview items={newsItems} />
      <HomeFinalCta />
      <HomeSeoSection />
    </>
  );
}
