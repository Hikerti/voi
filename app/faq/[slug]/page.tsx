import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StructuredData from "@/components/seo/StructuredData";
import { FAQ_ITEMS } from "@/lib/site-data";
import { getCmsFaqBySlug } from "@/lib/cms-api";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

interface FaqDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return FAQ_ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: FaqDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = (await getCmsFaqBySlug(slug)) || FAQ_ITEMS.find((faq) => faq.slug === slug);
  if (!item) return {};

  return createPageMetadata({
    title: item.question,
    description: item.answer,
    path: `/faq/${item.slug}`,
    keywords: [item.question, "вопросы о разработке сайта"],
  });
}

export default async function FaqDetailPage({ params }: FaqDetailPageProps) {
  const { slug } = await params;
  const item = (await getCmsFaqBySlug(slug)) || FAQ_ITEMS.find((faq) => faq.slug === slug);
  if (!item) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
          url: absoluteUrl(`/faq/${item.slug}`),
        },
      },
    ],
  };

  return (
    <main className="faq-detail-page">
      <StructuredData data={faqJsonLd} />
      <article className="faq-detail-page__hero rich-content">
        <p className="section-kicker">вопрос и ответ</p>
        <h1>{item.question}</h1>
        <p>{item.answer}</p>
      </article>
    </main>
  );
}
