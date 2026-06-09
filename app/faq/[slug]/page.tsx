import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import GridLines from "@/components/layout/GridLines";
import { SITE } from "@/lib/constants";
import { FAQ_ITEMS, getFaqBySlug } from "@/lib/site-data";

interface FaqDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return FAQ_ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: FaqDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getFaqBySlug(slug);
  if (!item) return {};
  return {
    title: `${item.question} | ${SITE.name}`,
    description: item.answer,
  };
}

export default async function FaqDetailPage({ params }: FaqDetailPageProps) {
  const { slug } = await params;
  const item = getFaqBySlug(slug);
  if (!item) notFound();

  return (
    <>
      <PageHeader backHref="/faq" backLabel="faq" />
      <GridLines />
      <main className="vs-page-shell">
        <section className="vs-page-hero">
          <p className="vs-kicker">faq</p>
          <h1>{item.question}</h1>
          <p>{item.answer}</p>
        </section>
      </main>
    </>
  );
}
