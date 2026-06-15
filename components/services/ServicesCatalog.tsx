import Image from "next/image";
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
  const categories = Array.from(
    new Map(
      services.map((service) => [
        service.category,
        service.categoryLabel || CATEGORY_LABELS[service.category] || service.category,
      ]),
    ),
  );

  return (
    <main className="vs-page-shell vs-page-shell--dark services-page">
      <section className="vs-page-hero" aria-labelledby="services-title">
        <div>
          <p className="vs-kicker">услуги</p>
          <h1 id="services-title">Каталог услуг Voitov Studio</h1>
          <p>
            Сайты, айдентика, SEO-структура и поддержка после запуска. Карточки
            собраны по единому принципу: изображение, формат, цена и краткое описание.
          </p>
        </div>
      </section>

      <nav className="service-category-nav" aria-label="Категории услуг">
        <a href="#service-list">Все услуги</a>
        {categories.map(([slug, label]) => (
          <Link key={slug} href={`/services/${slug}`}>{label}</Link>
        ))}
      </nav>

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
            Финальные описания, цены и семантические запросы будут заменены после
            получения утверждённых материалов заказчика. Текущие данные используются
            как структурный пример для вёрстки и CMS.
          </p>
        </div>
      </section>
    </main>
  );
}
