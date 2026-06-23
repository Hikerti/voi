import type { Metadata } from "next";
import Link from "next/link";
import BackButton from "@/components/spasibo/BackButton";
import { createPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Спасибо за обращение",
  description: "Заявка принята.",
  path: "/spasibo",
  noIndex: true,
});

export default function SpasiboPage() {
  return (
    <main id="spasibo-page" className={styles.page}>
      <section className={styles.card}>
        <p className={styles.kicker}>Заявка успешно отправлена</p>
        <h1 className={styles.title}>Спасибо!</h1>
        <p className={styles.text}>Мы получили обращение и свяжемся с вами в рабочее время.</p>
        <div className={styles.actions}>
          <BackButton className={styles.secondaryButton} />
          <Link className={styles.primaryButton} href="/">На главную</Link>
        </div>
      </section>
    </main>
  );
}
