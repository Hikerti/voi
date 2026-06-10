import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Политика конфиденциальности | ${SITE.name}`,
  description: "Политика обработки персональных данных Voitov Studio.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader backLabel="home" />
      <main className="vs-page-shell">
        <article className="vs-article">
          <p className="vs-kicker">privacy</p>
          <h1>Политика конфиденциальности</h1>
          <p>
            Эта страница фиксирует базовые правила обработки данных, которые
            пользователь оставляет в формах сайта: телефон, имя, email и сообщение.
          </p>
          <div className="vs-article__body">
            <p>
              Данные используются только для связи по заявке и уточнения деталей
              проекта. Обязательное поле в формах сайта — телефон. Email, имя и
              сообщение пользователь указывает по желанию.
            </p>
            <p>
              Информация не передается третьим лицам без необходимости выполнить
              запрос пользователя. Полный юридический текст можно заменить после
              передачи реквизитов и финального шаблона политики.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
