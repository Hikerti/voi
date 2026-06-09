import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import GridLines from "@/components/layout/GridLines";
import { SITE } from "@/lib/constants";
import { FAQ_ITEMS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: `FAQ | ${SITE.name}`,
  description: "Ответы на частые вопросы о разработке сайтов, SEO и будущей админке Voitov Studio.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader backLabel="home" />
      <GridLines />
      <main className="vs-page-shell">
        <section className="vs-page-hero">
          <p className="vs-kicker">faq</p>
          <h1>Короткие ответы перед стартом проекта</h1>
        </section>
        <section className="vs-faq-list vs-faq-list--page">
          {FAQ_ITEMS.map((item) => (
            <Link href={`/faq/${item.slug}`} className="vs-faq-row" key={item.slug}>
              <h2>{item.question}</h2>
              <p>{item.answer}</p>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
