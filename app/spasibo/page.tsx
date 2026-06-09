import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Спасибо! | Voitov Studio",
  description: "Ваша заявка принята. Мы перезвоним вам в течении 30 минут.",
};

export default function SpasiboPage() {
  return (
    <div className="div-block-77">
      <h1 className="spasibo-h1">
        Спасибо за<br />заявку!
      </h1>
      <p className="paragraph-337">
        Мы перезвоним вам в течении 30 минут,<br />а пока вы можете почитать{" "}
        <Link href="/blog" className="link-20">наши статьи</Link>
      </p>
      <Link href="/" className="button-21 w-button">
        Или Вернуться на главную
      </Link>
    </div>
  );
}
