import Link from "next/link";
import {
  FAQ_ITEMS,
  REVIEWS,
  WORK_STAGES,
  type WorkStageItem,
} from "@/lib/site-data";
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

      <section className="vs-reviews-preview">
        <div className="vs-section-head">
          <h2>Клиенты приходят за сайтом, который выглядит сильнее рынка</h2>
          <h3 className="vs-section-head__label">Все отзывы</h3>
        </div>
        <div className="vs-review-grid">
          {visibleReviews.map((review) => (
            <article className="vs-review" key={review.name}>
              <p>{review.text}</p>
              <span>{review.name} · {review.date}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="vs-faq-preview">
        <div>
          <h2>Коротко о том, что обычно спрашивают до старта</h2>
        </div>
        <div className="vs-faq-list">
          {faq.slice(0, 4).map((item) => (
            <Link href={`/faq/${item.slug}`} className="vs-faq-row" key={item.slug}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
