import type { Metadata } from "next";
import SiteForm from "@/components/forms/SiteForm";
import PageHeader from "@/components/layout/PageHeader";
import GridLines from "@/components/layout/GridLines";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Контакты | ${SITE.name}`,
  description: "Контакты Voitov Studio: телефон, email и форма заявки на сайт.",
};

export default function ContactsPage() {
  return (
    <>
      <PageHeader backLabel="home" />
      <GridLines />
      <main className="vs-page-shell">
        <section className="vs-page-hero">
          <p className="vs-kicker">контакты</p>
          <h1>Обсудить сайт, дизайн или развитие проекта</h1>
          <p>Телефон обязателен только в форме. Остальные данные можно оставить по желанию.</p>
        </section>

        <section className="vs-contact-layout">
          <div className="vs-contact-list">
            <a href={SITE.phoneHref}>{SITE.phone}</a>
            <a href={SITE.emailHref}>{SITE.email}</a>
            <p>Юридическую информацию добавим после передачи реквизитов.</p>
          </div>
          <SiteForm source="contacts" title="Оставить заявку" />
        </section>
      </main>
    </>
  );
}
