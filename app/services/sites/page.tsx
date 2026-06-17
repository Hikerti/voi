import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCmsServices } from "@/lib/cms-api";
import { SERVICES } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Создание сайтов",
  description: "Лендинги, корпоративные сайты и поддержка проектов от Voitov Studio.",
  path: "/services/sites",
  keywords: ["создание сайтов", "лендинг", "корпоративный сайт", "поддержка сайта"],
});

const WEBSITE_SLUGS = new Set(["landing-page", "corporate-site", "support"]);

export default async function SitesPage() {
  const services = await getCmsServices();
  const fromCms = services.filter(
    (service) => service.category === "sites" || WEBSITE_SLUGS.has(service.slug),
  );
  const websiteServices = fromCms.length
    ? fromCms
    : SERVICES.filter((service) => WEBSITE_SLUGS.has(service.slug));

  return (
    <main className="vs-page-shell vs-page-shell--dark services-page services-sites-page">
      <section className="vs-page-hero" aria-labelledby="sites-title">
        <div>
          <p className="section-kicker">сайты</p>
          <h1 id="sites-title">Разработка сайтов под задачи бизнеса</h1>
          <p>
            Лендинги, многостраничные сайты и дальнейшая поддержка. Подбираем формат,
            собираем структуру, дизайн и техническую основу проекта.
          </p>
        </div>
      </section>

      <nav className="service-category-nav" aria-label="Категории услуг">
        <Link href="/services">Все услуги</Link>
        <Link href="/services/sites" aria-current="page">Сайты</Link>
        <Link href="/services/design">Дизайн</Link>
        <Link href="/services/strategy">Стратегия</Link>
        <Link href="/services/marketing">Маркетинг</Link>
      </nav>

      <section className="vs-catalog-grid" aria-label="Услуги по созданию сайтов">
        {websiteServices.map((service) => (
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
              <span>Сайты</span>
              <h2>{service.title}</h2>
              <strong>{service.price}</strong>
              <p>{service.summary}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
