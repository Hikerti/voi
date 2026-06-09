import Link from "next/link";
import { SERVICES } from "@/lib/site-data";

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
    </>
  );
}
