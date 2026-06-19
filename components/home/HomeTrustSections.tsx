import FaqAccordion from "@/components/faq/FaqAccordion";
import { FAQ_ITEMS, REVIEWS, WORK_STAGES, type WorkStageItem } from "@/lib/site-data";
import type { FaqItem, ReviewItem } from "@/lib/cms-api";

interface HomeTrustSectionsProps {
  stages?: WorkStageItem[];
  reviews?: ReviewItem[];
  faq?: FaqItem[];
}

export default function HomeTrustSections({
  stages = WORK_STAGES,
  reviews = REVIEWS,
  faq = FAQ_ITEMS,
}: HomeTrustSectionsProps) {
  const visibleReviews = reviews.slice(0, 4);
  const visibleFaq = faq.slice(0, 4);

  return (
    <>
      <section className="vs-stages">
        <div className="vs-stages__hero">
          <div>
            <h2>От идеи до сайта, который не стыдно показывать</h2>
          </div>
          <div className="vs-stages__signal" aria-hidden="true">
            <span>brief</span>
            <span>ui</span>
            <span>dev</span>
            <span>launch</span>
          </div>
        </div>
        <div className="vs-stage-list">
          {stages.map((stage, index) => (
            <div className="vs-stage" key={`${stage.stepNumber}-${stage.title}`}>
              <span>{String(stage.stepNumber || index + 1).padStart(2, "0")}</span>
              <h3>{stage.title}</h3>
              <p>{stage.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="vs-reviews-preview" aria-labelledby="home-reviews-title">
        <div className="vs-section-head">
          <h2 id="home-reviews-title">Отзывы после реальных запусков</h2>
          <p>Публикуем впечатления клиентов после завершения работ.</p>
        </div>
        <div className="vs-review-grid vs-review-grid--home">
          {visibleReviews.map((review) => (
            <article className="vs-review" key={`${review.name}-${review.date}`}>
              <blockquote>{review.text}</blockquote>
              <p>{review.name} · {review.date}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="vs-faq-preview" aria-labelledby="home-faq-title">
        <div className="vs-faq-preview__head">
          <p className="vs-kicker">FAQ</p>
          <h2 id="home-faq-title">Ответы перед стартом проекта</h2>
          <p>
            Сроки, дизайн, SEO, контент, правки и запуск — коротко и по существу.
          </p>
        </div>
        <FaqAccordion items={visibleFaq} />
      </section>
    </>
  );
}
