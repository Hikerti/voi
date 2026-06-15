import type { Metadata } from "next";
import SiteForm from "@/components/forms/SiteForm";
import PageHeader from "@/components/layout/PageHeader";
import { getCmsReviews } from "@/lib/cms-api";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Отзывы клиентов",
  description: "Отзывы клиентов Voitov Studio и форма для отправки нового отзыва.",
  path: "/reviews",
  keywords: ["отзывы о веб-студии", "отзывы разработка сайтов"],
});

export default async function ReviewsPage() {
  const reviews = await getCmsReviews();

  return (
    <>
      <PageHeader backLabel="home" />
      <main className="vs-page-shell vs-page-shell--dark reviews-page">
        <section className="vs-page-hero reviews-page__hero">
          <div className="reviews-page__copy">
            <p className="vs-kicker">отзывы</p>
            <h1>Отзывы после реальных запусков</h1>
            <p>Публикуем впечатления клиентов после завершения работ.</p>
          </div>
        </section>

        <section className="vs-review-grid vs-review-grid--page" aria-label="Отзывы клиентов">
          {reviews.map((review) => (
            <article className="vs-review" key={`${review.name}-${review.date}`}>
              <blockquote>{review.text}</blockquote>
              <p>{review.name} · {review.date}</p>
            </article>
          ))}
        </section>

        <section className="vs-two-col reviews-page__form" aria-labelledby="review-form-title">
          <div>
            <p className="vs-kicker">оставить отзыв</p>
            <h2 id="review-form-title">Расскажите о результате работы</h2>
            <p>Отзыв появится на сайте после проверки.</p>
          </div>
          <SiteForm source="reviews" title="Отправить отзыв" submitLabel="Отправить отзыв" variant="review" />
        </section>
      </main>
    </>
  );
}
