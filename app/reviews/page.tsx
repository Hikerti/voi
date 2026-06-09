import type { Metadata } from "next";
import SiteForm from "@/components/forms/SiteForm";
import PageHeader from "@/components/layout/PageHeader";
import GridLines from "@/components/layout/GridLines";
import { SITE } from "@/lib/constants";
import { REVIEWS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: `Отзывы | ${SITE.name}`,
  description: "Отзывы клиентов Voitov Studio и форма для отправки нового отзыва.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHeader backLabel="home" />
      <GridLines />
      <main className="vs-page-shell vs-page-shell--dark">
        <section className="vs-page-hero">
          <p className="vs-kicker">отзывы</p>
          <h1>Отзывы публикуются только после модерации</h1>
          <p>В v1 форма принимает отзыв как обычную заявку. После подключения CMS добавим статус draft/published.</p>
        </section>

        <section className="vs-review-grid vs-review-grid--page">
          {REVIEWS.map((review) => (
            <article className="vs-review" key={review.name}>
              <p>{review.text}</p>
              <span>{review.name} · {review.date}</span>
            </article>
          ))}
        </section>

        <section className="vs-two-col">
          <div>
            <h2>Оставить отзыв</h2>
            <p>Напишите коротко, что делали и что получилось. Перед публикацией отзыв будет проверен вручную.</p>
          </div>
          <SiteForm source="review" title="Отправить отзыв" />
        </section>
      </main>
    </>
  );
}
