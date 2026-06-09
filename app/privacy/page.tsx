import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import GridLines from "@/components/layout/GridLines";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Политика конфиденциальности | ${SITE.name}`,
  description: "Политика обработки персональных данных Voitov Studio.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader backLabel="home" />
      <GridLines />
      <main className="vs-page-shell">
        <article className="vs-article">
          <p className="vs-kicker">privacy</p>
          <h1>Политика конфиденциальности</h1>
          <p>
            Эта страница фиксирует базовые правила обработки данных, которые
            пользователь оставляет в формах сайта: телефон, имя, email и сообщение.
          </p>
          <div className="vs-article__body">
            Данные используются только для связи по заявке. Обязательное поле v1:
            телефон. Email, имя и сообщение пользователь указывает по желанию.
            Данные не передаются в CRM и Telegram-бота в текущей версии. Полный
            юридический текст можно заменить после передачи реквизитов и финального
            шаблона политики.
          </div>
        </article>
      </main>
    </>
  );
}
