import Link from "next/link";
import { FAQ_ITEMS, REVIEWS, WORK_STAGES } from "@/lib/site-data";

export default function HomeTrustSections() {
  return (
    <>
      <section className="vs-stages">
        <p className="vs-kicker">процесс</p>
        <h2>От идеи до сайта, который не стыдно показывать</h2>
        <div className="vs-stage-list">
          {WORK_STAGES.map((stage, index) => (
            <div className="vs-stage" key={stage}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{stage}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="vs-reviews-preview">
        <div className="vs-section-head">
          <p>отзывы</p>
          <h2>Клиенты приходят за сайтом, который выглядит сильнее рынка</h2>
          <h3 className="vs-section-head__label">Все отзывы</h3>
        </div>
        <div className="vs-review-grid">
          {REVIEWS.map((review) => (
            <article className="vs-review" key={review.name}>
              <p>{review.text}</p>
              <span>{review.name} · {review.date}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="vs-faq-preview">
        <div>
          <p className="vs-kicker">faq</p>
          <h2>Коротко о том, что обычно спрашивают до старта</h2>
        </div>
        <div className="vs-faq-list">
          {FAQ_ITEMS.slice(0, 4).map((item) => (
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
