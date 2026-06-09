import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ServiceDetailSection from "@/components/services/ServiceDetailSection";
import GridLines from "@/components/layout/GridLines";

export const metadata: Metadata = {
  title: "Маркетинг | Voitov Studio",
  description: "Стратегия контента, SMM, Email-маркетинг, SEO/PPC и Digital PR",
  openGraph: {
    title: "Маркетинг | Voitov Studio",
    description: "Стратегия контента, SMM, Email-маркетинг, SEO/PPC и Digital PR",
  },
};

export default function MarketingPage() {
  return (
    <>
      <PageHeader backHref="/services" backLabel="back to complex" backLabelClass="backtoysl" />
      <GridLines />
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
            <h1 className="heading-38">Маркетинг</h1>
            <h1 className="heading-37">Стратегия контента</h1>
            <p className="paragraph-312">
              <strong>
                Контент — сердце цифрового маркетинга, который формирует лояльную аудиторию в
                условиях постоянных изменений интернета. Он повышает репутацию бренда, расширяет
                охват и улучшает видимость в поисковиках. Мы разрабатываем детальный план и
                стратегию контента, создавая дорожную карту для роста трафика, конверсий и
                устойчивого успеха вашего бизнеса.
              </strong>
            </p>
            <h1 className="heading-39"><strong>SMM продвижение</strong></h1>
            <p className="paragraph-313">
              <strong>
                Социальные сети — мощный инструмент для вашего бренда. Мы обеспечиваем постоянное
                присутствие через:<br /><br />
                — Плановые публикации с оптимальным расписанием<br />
                — Органический рост сообщества и привлечение подписчиков<br />
                — Эффективный маркетинг влияния с подбором лидеров мнений<br />
                — Полную аналитику и отчетность по результатам
              </strong>
            </p>
            <h1 className="heading-40">Email-маркетинг</h1>
            <p className="paragraph-314">
              <strong>
                Мы используем профессиональные платформы для email-рассылок, предлагая полный цикл
                услуг — от настройки до запуска кампаний. Создаём адаптивные шаблоны на HTML,
                которые идеально отображаются на всех устройствах. Каждый проект подкрепляем
                детальной аналитикой для измерения открытий, кликов и ROI.
              </strong>
            </p>
            <h1 className="heading-62">SEO/PPC</h1>
            <p className="paragraph-332">
              Нам нравится видеть, как наши творения распространяются в Интернете. Наша формула
              выигрыша нарушает социальную среду, гарантируя, что вы будете иметь более высокий
              рейтинг среди таких сайтов, как Google и Bing.<br /><br />
              — Adwords &amp; AdSense кампании<br />
              — Оплата за клик (PPC)<br />
              — Создание ссылок<br />
              — Архитектура URL<br />
              — Генерация потенциальных возможностей<br />
              — Исследование ключевых слов
            </p>
            <h1 className="heading-40">Прямой маркетинг</h1>
            <p className="paragraph-314">
              <strong>
                Мы мастерски работаем с данными, чтобы доставить ваше сообщение точно в цель. Наше
                тестирование креативов и сегментация по демографии максимизирует отдачу от прямого
                маркетинга.
              </strong>
            </p>
            <h1 className="heading-63">Digital PR — Цифровой ПР</h1>
            <p className="paragraph-333">
              Мы послы вашего бренда. Мы генерируем поддержку со стороны средств массовой информации
              и обеспечиваем коммерческий позитив для ряда мировых брендов. Наша черная книга, от
              традиционной до цифровой, позволит вам стать движущей силой в вашей отрасли.
            </p>
          </>
        }
        mobileContent={
          <>
            <h1 className="heading-43">Маркетинг</h1>
            <h1 className="heading-44">Стратегия</h1>
            <p className="paragraph-316">
              Контент сейчас находится в эпицентре создания аудитории. Интернет постоянно
              трансформируется, вынуждая каждый онлайн-бизнес пересматривать пути для повышения
              репутации, охвата и видимости.
            </p>
            <h1 className="heading-45">Social</h1>
            <p className="paragraph-317">
              Глубокое понимание преимуществ социальных сетей для вашего бизнеса имеет важное
              значение.<br /><br />
              — Планируемая публикация<br />
              — Рост сообщества<br />
              — Маркетинг влияния<br />
              — Полная отчетность
            </p>
            <h1 className="heading-46">E-Marketing</h1>
            <p className="paragraph-318">
              Мы используем ведущее в отрасли программное обеспечение для электронного маркетинга,
              чтобы предлагать полный спектр услуг для наших клиентов.
            </p>
            <h1 className="heading-64">SEO/PPC</h1>
            <p className="paragraph-334">
              Нам нравится видеть, как наши творения распространяются в Интернете.<br /><br />
              — Adwords &amp; AdSense кампании<br />
              — Оплата за клик (PPC)<br />
              — Создание ссылок<br />
              — Исследование ключевых слов
            </p>
            <h1 className="heading-46">Прямой маркетинг</h1>
            <p className="paragraph-318">
              Мы управляем данными. Наше планирование тестов и креативность важны для вашего
              бренда. Мы ориентируемся на конкретные демографические данные.
            </p>
            <h1 className="heading-65">Digital PR — Цифровой ПР</h1>
            <p className="paragraph-335">
              Мы послы вашего бренда. Мы генерируем поддержку со стороны средств массовой
              информации и обеспечиваем коммерческий позитив для ряда мировых брендов.
            </p>
          </>
        }
      />
    </>
  );
}
