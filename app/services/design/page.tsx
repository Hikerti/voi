import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ServiceDetailSection from "@/components/services/ServiceDetailSection";
import GridLines from "@/components/layout/GridLines";

export const metadata: Metadata = {
  title: "Дизайн | Voitov Studio",
  description: "Логотипы, брендинг и полиграфический дизайн от Voitov Studio",
  openGraph: {
    title: "Дизайн | Voitov Studio",
    description: "Логотипы, брендинг и полиграфический дизайн от Voitov Studio",
  },
};

export default function DesignPage() {
  return (
    <>
      <PageHeader backHref="/services" backLabel="back to complex" backLabelClass="backtoysl" />
      <GridLines />
      <ServiceDetailSection
        desktopClass="services-parent1-1"
        leftIconClass="left-side-child-conent1-1"
        spacerClass="services-left1-1"
        rightClass="services-right-2-1-1"
        contentClass="content-parent-ser1-1-1112"
        mobileClass="mobile-services"
        mobileHeroClass="services-hero"
        mobileContentClass="services-content-st"
        icon="/images/winOpered.png"
        nextHref="/services/digital"
        nextLabel="Next Digital"
        desktopContent={
          <>
            <h1 className="heading-38">Дизайн</h1>
            <h1 className="heading-37">Подход к дизайну</h1>
            <p className="paragraph-312">
              <strong>
                Мы увлечены визуальными решениями, которые работают на бизнес‑результат. Для нас
                дизайн — это не просто картинка, а инструмент коммуникации и инновации в простой,
                понятной форме. Мы погружаемся в атмосферу вашего бренда, изучаем эмоции и
                ассоциации, чтобы создавать концепции, которые откликаются вашей аудитории.
              </strong>
            </p>
            <h1 className="heading-39">Создание логотипа</h1>
            <p className="paragraph-313">
              <strong>
                Мы разрабатываем логотипы, которые легко запоминаются и формируют устойчивый образ
                компании в сознании клиентов. Знак, шрифт, цвет и форма работают вместе, чтобы
                передать характер и ценности вашего сервиса. В итоге вы получаете узнаваемый
                визуальный символ и сильную «визитную карточку» бренда, которая выделяет вас среди
                конкурентов.
              </strong>
            </p>
            <h1 className="heading-40">Руководство по бренду</h1>
            <p className="paragraph-314">
              <strong>
                Мы создаём продуманное бренд‑руководство, которое фиксирует ключевые правила
                использования фирменного стиля. В него входят логотип и его варианты, цветовая
                палитра, шрифты, графические элементы и принципы их применения. Чёткие стандарты
                помогают сохранять последовательность во всех каналах, усиливая узнаваемость и
                доверие к бренду.
              </strong>
            </p>
            <h1 className="heading-54">Полиграфический дизайн</h1>
            <p className="paragraph-324">
              Мы не просто делаем цифровые. Редко печать существует в вакууме. Скорее, это часть
              многоканальной или многоканальной кампании. Мы фокусируемся на мельчайших деталях,
              чтобы обеспечить блестящую, четкую и качественную композицию во всем нашем дизайне.
            </p>
          </>
        }
        mobileContent={
          <>
            <h1 className="heading-43">Дизайн</h1>
            <h1 className="heading-44">Подход к дизайну</h1>
            <p className="paragraph-316">
              Мы увлечены дизайном. Мы верим, что искусство — это инновация в самой простой форме.
              Мы позволяем себе погрузиться в «настроение» и позволяем нашим мыслям влиять на наше
              творение.
            </p>
            <h1 className="heading-45">Создание логотипа</h1>
            <p className="paragraph-317">
              Мы создаем что-то запоминающееся. Ваш логотип является знаком, который вы оставляете
              в сознании потребителей. Мы помогаем отразить суть вашего сервиса и создать мгновенно
              узнаваемую визитную карточку.
            </p>
            <h1 className="heading-46">Руководство по бренду</h1>
            <p className="paragraph-318">
              Мы создаем ваш фирменный набор инструментов. Мы считаем, что последовательность — это
              ключ к развитию вашего бренда, поэтому мы устанавливаем правила, чтобы обеспечить
              эффективную коммуникацию вашего бренда.
            </p>
            <h1 className="heading-55">Полиграфический дизайн</h1>
            <p className="paragraph-325">
              Мы не просто делаем цифровые. Редко печать существует в вакууме. Скорее, это часть
              многоканальной или многоканальной кампании. Мы фокусируемся на мельчайших деталях,
              чтобы обеспечить блестящую, четкую и качественную композицию во всем нашем дизайне.
            </p>
          </>
        }
      />
    </>
  );
}
