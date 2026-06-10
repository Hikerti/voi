import Link from "next/link";
import { SERVICES, type ServiceItem } from "@/lib/site-data";

interface HomeSectionsProps {
  services?: ServiceItem[];
}

function splitPrice(price: string) {
  const match = price.match(/^(от)\s+(.+)$/i);

  return {
    prefix: match?.[1] ?? "",
    amount: match?.[2] ?? price,
  };
}

export default function HomeSections({ services = SERVICES }: HomeSectionsProps) {
  const previewServices = services.slice(0, 4);

  return (
    <>
      <section className="vs-services-band">
        <div className="vs-section-head">
          <p>услуги</p>
          <h2>Сайт должен выглядеть так, чтобы его хотелось заказать</h2>
          <h3 className="vs-section-head__label">Все услуги</h3>
        </div>
        <div className="vs-service-strip">
          {previewServices.map((service) => (
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
          {services.slice(0, 3).map((service) => {
            const price = splitPrice(service.price);

            return (
              <Link href={`/services/${service.slug}`} className="vs-price-card" key={service.slug}>
                <h3>{service.title}</h3>
                <strong>
                  {price.prefix && <small>{price.prefix}</small>}
                  {price.amount}
                </strong>
                <p>{service.summary}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
