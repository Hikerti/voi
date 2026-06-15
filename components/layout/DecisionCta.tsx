"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HIDDEN_ROUTES = ["/", "/zayavka", "/spasibo", "/privacy", "/contacts", "/reviews", "/faq"];

function hasOwnFinalAction(pathname: string) {
  return pathname.startsWith("/services/") || pathname.startsWith("/portfolio/");
}

export default function DecisionCta() {
  const pathname = usePathname();

  if (HIDDEN_ROUTES.includes(pathname) || hasOwnFinalAction(pathname)) return null;

  return (
    <section className="decision-cta" aria-labelledby="decision-cta-title">
      <div>
        <p className="section-kicker">следующий шаг</p>
        <h2 id="decision-cta-title">Обсудим задачу и предложим понятный формат запуска</h2>
        <p>
          Можно начать с короткого сообщения: что нужно сделать, какой срок важен и
          есть ли готовые материалы.
        </p>
      </div>
      <div className="decision-cta__actions">
        <Link href="/zayavka" className="button button--accent">Оставить заявку</Link>
        <Link href="/contacts" className="button button--ghost">Контакты</Link>
      </div>
    </section>
  );
}
