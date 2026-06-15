import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Спасибо за обращение",
  description: "Заявка принята.",
  path: "/spasibo",
  noIndex: true,
});

export default function SpasiboPage() {
  return (
    <main className="div-block-77">
      <h1 className="spasibo-h1">
        Спасибо за<br />заявку!
      </h1>
      <p className="paragraph-337">
        Обращение принято. Мы свяжемся с вами в рабочее время, а пока можно посмотреть{" "}
        <Link href="/blog" className="link-20">наши статьи</Link>.
      </p>
      <Link href="/" className="button-21 w-button">
        Вернуться на главную
      </Link>
    </main>
  );
}
