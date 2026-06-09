import Link from "next/link";
import { SERVICES } from "@/lib/site-data";

const CATEGORY_LABELS: Record<string, string> = {
  strategy: "Стратегия",
  design: "Дизайн",
  digital: "Digital",
  marketing: "Маркетинг",
};

export default function ServicesCatalog() {
  return (
    <section className="vs-page-shell vs-page-shell--dark">
      <div className="vs-page-hero">
        <p className="vs-kicker">услуги</p>
        <h1>Каталог услуг Voitov Studio</h1>
        <p>
          Сайты, айдентика, SEO-структура и поддержка после запуска. Первый
          проход собран без CMS, чтобы быстро проверить структуру и дизайн.
        </p>
      </div>

      <div className="vs-catalog-grid">
        {SERVICES.map((service) => (
          <Link href={`/services/${service.slug}`} className="vs-catalog-card" key={service.slug}>
            <span>{CATEGORY_LABELS[service.category]}</span>
            <h2>{service.title}</h2>
            <strong>{service.price}</strong>
            <p>{service.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
