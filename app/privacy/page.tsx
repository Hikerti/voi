import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import { SITE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Политика конфиденциальности",
  description: "Правила обработки персональных данных на сайте Voitov Studio.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader backLabel="home" />
      <main className="vs-page-shell vs-page-shell--dark privacy-page">
        <article className="vs-article rich-content privacy-page__article">
          <h1 className="privacy-page__title">Политика конфиденциальности</h1>
          <p className="privacy-page__intro">
            Настоящая политика описывает, какие данные могут передаваться через сайт
            Voitov Studio и для каких целей они используются.
          </p>

          <div className="vs-article__body privacy-page__body">
            <h2>Владелец сайта</h2>
            <p>
              {SITE.legalName}, ИНН {SITE.inn}, ОГРН {SITE.ogrn}. Адрес: {SITE.address}.
              Связаться с владельцем сайта можно по телефону {SITE.phone} или по адресу
              электронной почты {SITE.email}.
            </p>

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
              Данные хранятся только в течение срока, необходимого для обработки обращения
              и исполнения договорённостей. Для запроса на удаление данных напишите на
              <a href={SITE.emailHref}> {SITE.email}</a>.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
