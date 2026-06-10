import type { Metadata } from "next";
import SiteForm from "@/components/forms/SiteForm";
import PageHeader from "@/components/layout/PageHeader";
import { SITE } from "@/lib/constants";
import { getCmsReviews } from "@/lib/cms-api";

export const metadata: Metadata = {
  title: `Отзывы | ${SITE.name}`,
  description: "Отзывы клиентов Voitov Studio и форма для отправки нового отзыва.",
};

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
            <p>
              Публикуем короткие впечатления клиентов после завершения работ.
              Если хотите оставить отзыв, отправьте его через форму ниже.
            </p>
          </div>
          <div className="reviews-page__signal" aria-hidden="true">
            <span>4</span>
            <strong>живых отзыва</strong>
            <i />
            <em>проверка вручную</em>
          </div>
        </section>

        <section className="vs-review-grid vs-review-grid--page">
          {reviews.map((review) => (
            <article className="vs-review" key={`${review.name}-${review.date}`}>
              <p>{review.text}</p>
              <span>{review.name} · {review.date}</span>
            </article>
          ))}
        </section>

        <section className="vs-two-col reviews-page__form">
          <div>
            <p className="vs-kicker">оставить отзыв</p>
            <h2>Расскажите, что сделали и какой результат получили</h2>
            <p>
              Текст можно написать свободно. Перед публикацией мы проверяем
              отзыв вручную и при необходимости уточняем детали.
            </p>
          </div>
          <SiteForm source="review" title="Отправить отзыв" />
        </section>
      </main>
    </>
  );
}
