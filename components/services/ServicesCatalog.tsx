import Link from "next/link";
import { SERVICES, type ServiceItem } from "@/lib/site-data";

const CATEGORY_LABELS: Record<string, string> = {
  strategy: "Стратегия",
  design: "Дизайн",
  digital: "Digital",
  marketing: "Маркетинг",
  sites: "Сайты",
};

interface ServicesCatalogProps {
  services?: ServiceItem[];
}

export default function ServicesCatalog({ services = SERVICES }: ServicesCatalogProps) {
  return (
    <section className="vs-page-shell vs-page-shell--dark">
      <div className="vs-page-hero">
        <p className="vs-kicker">услуги</p>
        <h1>Каталог услуг Voitov Studio</h1>
        <p>
          Сайты, айдентика, SEO-структура и поддержка после запуска. Услуги
          собраны так, чтобы быстро понять формат работы, бюджет и следующий шаг.
        </p>
      </div>

      <div className="vs-catalog-grid">
        {services.map((service) => (
          <Link href={`/services/${service.slug}`} className="vs-catalog-card" key={service.slug}>
            <span>{service.categoryLabel || CATEGORY_LABELS[service.category] || service.category}</span>
            <h2>{service.title}</h2>
            <strong>{service.price}</strong>
            <p>{service.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
