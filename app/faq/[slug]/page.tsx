import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE } from "@/lib/constants";
import { FAQ_ITEMS, getFaqBySlug } from "@/lib/site-data";
import { getCmsFaqBySlug } from "@/lib/cms-api";

interface FaqDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return FAQ_ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: FaqDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = (await getCmsFaqBySlug(slug)) || getFaqBySlug(slug);
  if (!item) return {};
  return {
    title: `${item.question} | ${SITE.name}`,
    description: item.answer,
  };
}

export default async function FaqDetailPage({ params }: FaqDetailPageProps) {
  const { slug } = await params;
  const item = (await getCmsFaqBySlug(slug)) || getFaqBySlug(slug);
  if (!item) notFound();

  return (
      <main className="faq-detail-page">
        <section className="faq-detail-page__hero">
          <h1>{item.question}</h1>
          <div className="faq-detail-page__topics" aria-hidden="true">
            <span className="faq-topic faq-topic--brief">бриф</span>
            <span className="faq-topic faq-topic--design">дизайн</span>
            <span className="faq-topic faq-topic--seo">seo</span>
            <span className="faq-topic faq-topic--launch">запуск</span>
          </div>
          <p>{item.answer}</p>
        </section>
      </main>
  );
}
