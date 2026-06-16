import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteForm from "@/components/forms/SiteForm";
import GridLines from "@/components/layout/GridLines";
import StructuredData from "@/components/seo/StructuredData";
import { SERVICES, getServiceBySlug } from "@/lib/site-data";
import { getCmsServiceBySlug, getCmsServices } from "@/lib/cms-api";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import ServiceSidebar from "@/components/services/ServiceSidebar";
import sidebarStyles from "@/components/services/ServiceSidebar.module.css";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = (await getCmsServiceBySlug(slug)) || getServiceBySlug(slug);

  if (!service) return {};

  return createPageMetadata({
    title: service.seoTitle || service.title,
    description: service.seoDescription || service.summary,
    path: `/services/${service.slug}`,
    keywords: [service.title, service.categoryLabel || service.category, "цена услуги"],
    image: service.image,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getCmsServiceBySlug(slug);

  if (!service) notFound();

  const allServices = await getCmsServices();
  const selectedSlugs = new Set(service.related);
  const related = [
    ...service.related
      .map((relatedSlug) => allServices.find((item) => item.slug === relatedSlug) || getServiceBySlug(relatedSlug))
      .filter(Boolean),
    ...allServices.filter((item) => item.slug !== service.slug && !selectedSlugs.has(item.slug)),
  ].slice(0, 5);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "ProfessionalService",
      name: "Voitov Studio",
      url: absoluteUrl("/"),
    },
    url: absoluteUrl(`/services/${service.slug}`),
    image: absoluteUrl(service.image),
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      description: service.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <StructuredData data={serviceJsonLd} />
      <GridLines />
      <main className="vs-page-shell vs-page-shell--dark service-detail-page">
        <div className={sidebarStyles.layout}>
          <ServiceSidebar services={allServices} currentSlug={slug} />
          <div className={sidebarStyles.content}>
            <section className="vs-detail-hero" aria-labelledby="service-title">
              <div>
                <p className="vs-kicker">услуга</p>
                <h1 id="service-title">{service.title}</h1>
                <p>{service.description}</p>
                <strong><small>Цена </small>{service.price}</strong>
              </div>
              <div
                className="vs-detail-media"
                style={{ backgroundImage: `url('${service.image}')` }}
                role="img"
                aria-label={`${service.title} — иллюстрация услуги`}
              />
            </section>

            <section className="vs-two-col" aria-labelledby="service-includes-title">
              <div className="rich-content">
                <h2 id="service-includes-title">Что входит в услугу</h2>
                <p>
                  На первом этапе фиксируем задачу, аудиторию, структуру и критерии готовности.
                  Затем собираем прототип, визуальную систему, адаптивную вёрстку и сценарии заявки.
                </p>
                <h3>Техническая SEO-подготовка</h3>
                <p>
                  Настраиваем один H1, последовательную иерархию H2–H6, метатеги,
                  внутренние ссылки, canonical, sitemap, robots.txt и понятные URL.
                </p>
                <h3>Что потребуется от заказчика</h3>
                <ul>
                  <li>информация о компании и услуге;</li>
                  <li>приоритетные направления и регионы работы;</li>
                  <li>фотографии, кейсы и подтверждённые цены;</li>
                  <li>согласование финальной семантики и текстов.</li>
                </ul>
              </div>
              <SiteForm source={`service-${service.slug}`} title="Заказать услугу" variant="general" />
            </section>

            <section className="seo-copy rich-content" aria-labelledby="service-seo-title">
              <p className="seo-copy__eyebrow">описание услуги</p>
              <h2 id="service-seo-title">{service.title} для бизнеса</h2>
              <div className="seo-copy__columns">
                <p>{service.summary}</p>
                <p>
                  Этот текст используется как временный SEO-блок. После утверждения
                  семантического ядра его заменим на текст под реальные запросы, регион,
                  аудиторию и преимущества компании.
                </p>
              </div>
            </section>

            {related.length > 0 && (
              <section className="vs-related" aria-labelledby="related-services-title">
                <p className="vs-kicker">похожие услуги</p>
                <h2 id="related-services-title">Другие форматы работы</h2>
                <div className="vs-related-grid">
                  {related.map((item) => (
                    <Link href={`/services/${item!.slug}`} className="vs-related-card" key={item!.slug}>
                      <h3>{item!.title}</h3>
                      <span>{item!.price}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
