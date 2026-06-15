import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ONasSection from "@/components/o-nas/ONasSection";
import GridLines from "@/components/layout/GridLines";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "О студии и подход к работе",
  description: "Подход Voitov Studio к стратегии, дизайну, разработке и запуску сайтов.",
  path: "/o-nas",
  keywords: ["о веб-студии", "подход к разработке сайта", "команда веб-разработки"],
});

export default function ONasPage() {
  return (
    <>
      <PageHeader backLabel={null} />
      <main>
        <h1 className="sr-only">О студии и подход к работе</h1>
        <GridLines />
        <ONasSection />
      </main>
    </>
  );
}
