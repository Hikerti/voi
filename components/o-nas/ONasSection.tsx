"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const TEXTS = [
  "Мы переосмысливаем стандарты и ищем решения, которые действительно работают на результат. Для нас бизнес клиента — не просто проект, а ответственность и понятная цель.",
  "Изучаем нишу, аудиторию и конкурентов, затем собираем структуру, дизайн и разработку в единую систему.",
];

export default function ONasSection() {
  return (
    <main className="about-page-clean">
      <section className="about-page-clean__layout">
        <motion.div
          className="about-page-clean__visual"
          initial={{ x: -28, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.75, ease: EASE }}
          aria-hidden="true"
        >
          <img src="/images/winxpered.png" alt="" />
        </motion.div>

        <motion.div
          className="about-page-clean__content"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: EASE }}
        >
          <p className="section-kicker">о студии</p>
          <h1>Наш подход</h1>
          <div className="about-page-clean__text">
            {TEXTS.map((text) => <p key={text}>{text}</p>)}
          </div>
          <Link href="/services" className="button button--accent">Перейти к услугам</Link>
        </motion.div>
      </section>
    </main>
  );
}
