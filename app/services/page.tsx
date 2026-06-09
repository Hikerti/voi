import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ServicesCatalog from "@/components/services/ServicesCatalog";
import GridLines from "@/components/layout/GridLines";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Услуги и цены | ${SITE.name}`,
  description: "Каталог услуг Voitov Studio: сайты, дизайн, SEO, поддержка и развитие проекта.",
  openGraph: {
    title: `Услуги и цены | ${SITE.name}`,
    description: "Каталог услуг Voitov Studio: сайты, дизайн, SEO, поддержка и развитие проекта.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader wrapperClass="div-block-59 w-clearfix" backLabel="home" backLabelClass="text-block-45" />
      <GridLines />
      <ServicesCatalog />
    </>
  );
}
