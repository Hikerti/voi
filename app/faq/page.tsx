import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import FaqAccordion from "@/components/faq/FaqAccordion";
import SiteForm from "@/components/forms/SiteForm";
import { getCmsFaq } from "@/lib/cms-api";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Вопросы и ответы о разработке сайтов",
  description: "Ответы на частые вопросы о разработке сайтов, дизайне, SEO, сроках и запуске.",
  path: "/faq",
  keywords: ["вопросы о разработке сайта", "сроки создания сайта", "FAQ веб-студии"],
});

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

        <section className="vs-two-col faq-page__form" aria-labelledby="faq-form-title">
          <div>
            <p className="vs-kicker">не нашли ответ</p>
            <h2 id="faq-form-title">Задайте свой вопрос</h2>
            <p>Ответим по email и при необходимости добавим вопрос в этот раздел.</p>
          </div>
          <SiteForm source="faq" title="Задать вопрос" submitLabel="Отправить вопрос" variant="question" />
        </section>
      </main>
    </>
  );
}
