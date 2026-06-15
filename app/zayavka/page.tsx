import type { Metadata } from "next";
import SiteForm from "@/components/forms/SiteForm";
import { createPageMetadata } from "@/lib/seo";

const BRIEF_POINTS = [
  "формат сайта",
  "сроки и бюджет",
  "референсы",
  "что уже есть",
];

export const metadata: Metadata = createPageMetadata({
  title: "Оставить заявку",
  description: "Форма заявки на разработку сайта, дизайн, SEO или обратный звонок.",
  path: "/zayavka",
  noIndex: true,
});

type LeadPageProps = {
  searchParams: Promise<{ type?: string }>;
};

export default async function LeadPage({ searchParams }: LeadPageProps) {
  const { type } = await searchParams;
  const isCallback = type === "callback";

  return (
    <main className="lead-page">
      <section className="lead-page__hero">
        <div className="lead-page__copy">
          <p className="vs-kicker">заявка</p>
          <h1>{isCallback ? "Заказать обратный звонок" : "Расскажите, какой сайт нужен"}</h1>
          <p>
            {isCallback
              ? "Оставьте имя и телефон. Перезвоним в рабочее время и уточним задачу."
              : "Достаточно телефона и пары фраз о задаче. Мы уточним формат, оценим следующий шаг и соберём понятный план запуска."}
          </p>
        </div>

        {!isCallback && (
          <div className="lead-page__brief" aria-label="Что можно указать в заявке">
            {BRIEF_POINTS.map((point, index) => (
              <span key={point}>
                <i>{String(index + 1).padStart(2, "0")}</i>
                {point}
              </span>
            ))}
          </div>
        )}
      </section>

      <section className="lead-page__layout">
        <div className="lead-page__signal">
          <span>24ч</span>
          <strong>на первый ответ</strong>
          <i />
          <em>бриф, оценка, следующий шаг</em>
          <p>
            Контактные данные и содержание заявки используются только для связи по вашему запросу.
          </p>
        </div>
        <SiteForm
          source={isCallback ? "callback-page" : "lead-page"}
          title={isCallback ? "Обратный звонок" : "Обсудить проект"}
          submitLabel={isCallback ? "Заказать звонок" : "Отправить заявку"}
          variant={isCallback ? "callback" : "general"}
        />
      </section>
    </main>
  );
}
