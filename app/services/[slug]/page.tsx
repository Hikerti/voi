import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteForm from "@/components/forms/SiteForm";
import PageHeader from "@/components/layout/PageHeader";
import GridLines from "@/components/layout/GridLines";
import { SERVICES, getServiceBySlug } from "@/lib/site-data";
import { getCmsServiceBySlug, getCmsServices } from "@/lib/cms-api";

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

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      images: [service.image],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getCmsServiceBySlug(slug);

  if (!service) notFound();

  const allServices = await getCmsServices();
  const related = service.related
    .map((relatedSlug) => allServices.find((item) => item.slug === relatedSlug) || getServiceBySlug(relatedSlug))
    .filter(Boolean);

  return (
    <>
      <PageHeader backHref="/services" backLabel="services" />
      <GridLines />
      <main className="vs-page-shell vs-page-shell--dark">
        <section className="vs-detail-hero">
          <div>
            <p className="vs-kicker">услуга</p>
            <h1>{service.title}</h1>
            <p>{service.description}</p>
            <strong>{service.price}</strong>
          </div>
          <div className="vs-detail-media" style={{ backgroundImage: `url('${service.image}')` }} />
        </section>

        <section className="vs-two-col">
          <div>
            <h2>Что входит</h2>
            <p>
              На первом этапе фиксируем задачу, структуру, визуальное направление и
              сценарий заявки. Дальше собираем прототип в коде, проверяем мобильную
              версию и доводим страницу до состояния, которое можно показывать
              клиентам.
            </p>
            <p>
              Для SEO добавляем понятные заголовки, метаописания, внутренние ссылки
              и блоки, которые отвечают на реальные вопросы перед заказом.
            </p>
          </div>
          <SiteForm source={`service-${service.slug}`} title="Заказать услугу" />
        </section>

        {related.length > 0 && (
          <section className="vs-related">
            <p className="vs-kicker">похожие услуги</p>
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
      </main>
    </>
  );
}
