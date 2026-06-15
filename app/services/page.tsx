import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ServicesCatalog from "@/components/services/ServicesCatalog";
import GridLines from "@/components/layout/GridLines";
import { getCmsServices } from "@/lib/cms-api";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Услуги и цены на разработку сайтов",
  description: "Каталог услуг Voitov Studio: лендинги, корпоративные сайты, дизайн, SEO и поддержка.",
  path: "/services",
  keywords: ["услуги веб-студии", "цена разработки сайта", "заказать лендинг"],
});

export default async function ServicesPage() {
  const services = await getCmsServices();

  return (
    <>
      <PageHeader wrapperClass="div-block-59 w-clearfix" backLabel="home" backLabelClass="text-block-45" />
      <GridLines />
      <ServicesCatalog services={services} />
    </>
  );
}
