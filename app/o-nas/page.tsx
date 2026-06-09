import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ONasSection from "@/components/o-nas/ONasSection";
import GridLines from "@/components/layout/GridLines";

export const metadata: Metadata = {
  title: "Наш подход | Voitov Studio",
  description:
    "Команда экспертов Voitov Studio — переосмысливаем стандарты веб-разработки и создаём сайты, которые работают на ваш результат.",
  openGraph: {
    title: "Наш подход | Voitov Studio",
    description:
      "Команда экспертов Voitov Studio — переосмысливаем стандарты веб-разработки и создаём сайты, которые работают на ваш результат.",
  },
};

export default function ONasPage() {
  return (
    <>
      <PageHeader />
      <div>
        <GridLines />
        <ONasSection />
      </div>
    </>
  );
}
