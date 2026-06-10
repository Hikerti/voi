import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { SITE } from "@/lib/constants";
import { getCmsFaq } from "@/lib/cms-api";

export const metadata: Metadata = {
  title: `FAQ | ${SITE.name}`,
  description: "Ответы на частые вопросы о разработке сайтов, дизайне, SEO, сроках и запуске Voitov Studio.",
};

export default async function FaqPage() {
  const faq = await getCmsFaq();

  return (
    <>
      <PageHeader backLabel="home" />
      <main className="vs-page-shell faq-page">
        <section className="vs-page-hero faq-page__hero">
          <div className="faq-page__copy">
            <p className="vs-kicker">faq</p>
            <h1>Короткие ответы перед стартом проекта</h1>
            <p>
              Собрали вопросы, которые обычно появляются до брифа: сроки, дизайн,
              SEO, контент, правки, запуск и дальнейшее развитие сайта.
            </p>
          </div>
          <div className="faq-page__map" aria-hidden="true">
            <span className="faq-topic faq-topic--brief">бриф</span>
            <span className="faq-topic faq-topic--design">дизайн</span>
            <span className="faq-topic faq-topic--seo">seo</span>
            <span className="faq-topic faq-topic--launch">запуск</span>
          </div>
        </section>
        <FaqAccordion items={faq} />
      </main>
    </>
  );
}
