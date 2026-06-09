import Link from "next/link";
import SiteForm from "@/components/forms/SiteForm";
import { FAQ_ITEMS, REVIEWS, SERVICES, WORK_STAGES } from "@/lib/site-data";

export default function HomeSections() {
  return (
    <>
      <section className="vs-services-band">
        <div className="vs-section-head">
          <p>услуги</p>
          <h2>Сайт должен выглядеть так, чтобы его хотелось заказать</h2>
          <Link href="/services">Все услуги</Link>
        </div>
        <div className="vs-service-strip">
          {SERVICES.slice(0, 4).map((service) => (
            <Link href={`/services/${service.slug}`} className="vs-service-card" key={service.slug}>
              <span>{service.price}</span>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="vs-prices">
        <div>
          <p className="vs-kicker">цены</p>
          <h2>Понятные стартовые пакеты без ощущения конструктора</h2>
        </div>
        <div className="vs-price-grid">
          {SERVICES.slice(0, 3).map((service) => (
            <Link href={`/services/${service.slug}`} className="vs-price-card" key={service.slug}>
              <h3>{service.title}</h3>
              <strong>{service.price}</strong>
              <p>{service.summary}</p>
            </Link>
          ))}
        </div>
      </section>

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
          <Link href="/reviews">Все отзывы</Link>
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

      <section className="vs-final-cta">
        <div>
          <p className="vs-kicker">старт</p>
          <h2>Расскажите, какой сайт нужен. Дальше соберем структуру и первый прототип.</h2>
        </div>
        <SiteForm source="home-final-cta" compact />
      </section>
    </>
  );
}
