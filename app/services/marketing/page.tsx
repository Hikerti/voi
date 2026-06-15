import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ServiceDetailSection from "@/components/services/ServiceDetailSection";
import GridLines from "@/components/layout/GridLines";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Digital-маркетинг и SEO",
  description: "Контентная стратегия, SMM, email-маркетинг, SEO, PPC и digital PR.",
  path: "/services/marketing",
  keywords: ["digital маркетинг", "SEO продвижение", "SMM", "контентная стратегия"],
});

export default function MarketingPage() {
  return (
    <>
      <PageHeader backHref="/services" backLabel="back to complex" backLabelClass="backtoysl" />
      <GridLines />
      <h1 className="sr-only">Digital-маркетинг и SEO</h1>
      <ServiceDetailSection
        desktopClass="services-parent-4-4m"
        leftIconClass="left-side-child-conent-4-4m"
        spacerClass="services-left-4-4m"
        rightClass="services-right-2-4-4m"
        contentClass="content-parent-ser1-4-4m"
        mobileClass="mobile-services-4-4m"
        mobileHeroClass="services-hero-4-4m"
        mobileContentClass="services-content-st-2-4-4m"
        icon="/images/winRRpered.png"
        nextHref="/services/strategy"
        nextLabel="Next Strategy"
        desktopContent={
          <>
            <h2 className="heading-38">Маркетинг</h2>
            <h2 className="heading-37">Стратегия контента</h2>
            <p className="paragraph-312"><strong>Формируем темы, форматы и план публикаций, которые поддерживают продажи и поисковый спрос.</strong></p>
            <h2 className="heading-39">SMM-продвижение</h2>
            <p className="paragraph-313"><strong>Планируем присутствие в социальных сетях, контент, аналитику и взаимодействие с аудиторией.</strong></p>
            <h2 className="heading-40">Email-маркетинг</h2>
            <p className="paragraph-314"><strong>Настраиваем сценарии писем, адаптивные шаблоны, сегментацию и измерение результатов.</strong></p>
            <h2 className="heading-62">SEO и PPC</h2>
            <p className="paragraph-332">Собираем семантику, структуру посадочных страниц, рекламные кампании и аналитику конверсий.</p>
            <h2 className="heading-40">Прямой маркетинг</h2>
            <p className="paragraph-314"><strong>Сегментируем аудиторию, тестируем предложения и оцениваем эффективность каналов.</strong></p>
            <h2 className="heading-63">Digital PR</h2>
            <p className="paragraph-333">Готовим инфоповоды, публикации и внешние упоминания бренда.</p>
          </>
        }
        mobileContent={
          <>
            <h2 className="heading-43">Маркетинг</h2>
            <h2 className="heading-44">Стратегия контента</h2>
            <p className="paragraph-316">Темы, форматы и план материалов для сайта и каналов бренда.</p>
            <h2 className="heading-45">SMM</h2>
            <p className="paragraph-317">Публикации, взаимодействие с аудиторией и аналитика.</p>
            <h2 className="heading-46">Email-маркетинг</h2>
            <p className="paragraph-318">Сценарии писем, шаблоны и сегментация.</p>
            <h2 className="heading-64">SEO и PPC</h2>
            <p className="paragraph-334">Семантика, посадочные страницы, реклама и аналитика.</p>
            <h2 className="heading-46">Прямой маркетинг</h2>
            <p className="paragraph-318">Сегменты, предложения и тестирование каналов.</p>
            <h2 className="heading-65">Digital PR</h2>
            <p className="paragraph-335">Инфоповоды, публикации и внешние упоминания.</p>
          </>
        }
      />
    </>
  );
}
