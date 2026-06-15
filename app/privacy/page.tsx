import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Политика конфиденциальности",
  description: "Базовые правила обработки персональных данных на сайте Voitov Studio.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader backLabel="home" />
      <main className="vs-page-shell vs-page-shell--dark privacy-page">
        <article className="vs-article rich-content privacy-page__article">
          <p className="vs-kicker">privacy</p>
          <h1 className="privacy-page__title">Политика конфиденциальности</h1>
          <p className="privacy-page__intro">
            Это временный текст для этапа разработки. Юридическую редакцию необходимо
            заменить после получения реквизитов и утверждённой политики заказчика.
          </p>

          <div className="vs-article__body privacy-page__body">
            <h2>Какие данные обрабатываются</h2>
            <p>
              В зависимости от формы пользователь может передать имя, телефон, email,
              текст заявки, вопрос или отзыв, а также адрес страницы отправки.
            </p>

            <h2>Цель обработки</h2>
            <p>
              Данные используются для ответа на обращение, подготовки предложения,
              обратного звонка или проверки отзыва перед публикацией.
            </p>

            <h2>Защита от автоматических отправок</h2>
            <p>
              Формы используют скрытое поле и проверку времени заполнения. Технические
              сведения о запросе могут сохраняться для защиты от спама и диагностики ошибок.
            </p>

            <h2>Срок хранения и удаление</h2>
            <p>
              Срок хранения и порядок удаления данных будут уточнены в финальной редакции
              документа после получения юридических данных владельца сайта.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
