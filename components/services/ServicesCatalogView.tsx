import Image from "next/image";
import Link from "next/link";
import { SERVICES, type ServiceItem } from "@/lib/site-data";

const CATEGORY_LINKS = [
  { slug: "sites", label: "Сайты" },
  { slug: "design", label: "Дизайн" },
  { slug: "strategy", label: "Стратегия" },
  { slug: "marketing", label: "Маркетинг" },
  { slug: "digital", label: "Digital" },
] as const;

const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  CATEGORY_LINKS.map((item) => [item.slug, item.label]),
);

interface ServicesCatalogViewProps {
  services?: ServiceItem[];
}

export default function ServicesCatalogView({ services = SERVICES }: ServicesCatalogViewProps) {
  return (
    <main className="vs-page-shell vs-page-shell--dark services-page">
      <section className="vs-page-hero" aria-labelledby="services-title">
        <div>
          <h1 id="services-title">Каталог услуг Voitov Studio</h1>
          <p>
            Сайты, айдентика, SEO-структура и поддержка после запуска. В каждой карточке
            указаны формат работы, стартовая цена и краткое описание результата.
          </p>
        </div>
      </section>

      <section className="services-catalog-toolbar" aria-labelledby="services-catalog-label">
        <p id="services-catalog-label">Каталог услуг</p>
        <nav className="service-category-nav" aria-label="Категории услуг">
          <a href="#service-list">Все услуги</a>
          {CATEGORY_LINKS.map((item) => (
            <Link key={item.slug} href={`/services/${item.slug}`}>{item.label}</Link>
          ))}
        </nav>
      </section>

      <section id="service-list" className="vs-catalog-grid" aria-label="Список услуг">
        {services.map((service) => (
          <Link href={`/services/${service.slug}`} className="vs-catalog-card" key={service.slug}>
            <div className="vs-catalog-card__media">
              <Image
                src={service.image}
                alt={`${service.title} — услуга Voitov Studio`}
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
            </div>
            <div className="vs-catalog-card__body">
              <span>{service.categoryLabel || CATEGORY_LABELS[service.category] || service.category}</span>
              <h2>{service.title}</h2>
              <strong><small>Цена </small>{service.price}</strong>
              <p>{service.summary}</p>
            </div>
          </Link>
        ))}
      </section>

      <section className="seo-copy rich-content" aria-labelledby="services-seo-title">
        <p className="seo-copy__eyebrow">подбор формата</p>
        <h2 id="services-seo-title">Услуги по разработке и развитию сайта</h2>
        <div className="seo-copy__columns">
          <p>
            Подбираем формат под задачу: посадочная страница для рекламы,
            корпоративный сайт с каталогом услуг, визуальная система бренда или
            SEO-подготовка существующего проекта.
          </p>
          <p>
            Проектируем структуру, дизайн и техническую основу как единую систему,
            чтобы сайт был понятным для посетителей, удобным для развития и готовым
            к дальнейшему продвижению.
          </p>
        </div>
      </section>
    </main>
  );
}
