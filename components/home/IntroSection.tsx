"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import s from "./IntroSection.module.css";

const STEPS = [
  {
    num: "01",
    title: "Качественно выделим\nваш бизнес среди конкурентов",
    p: "Во-первых, это красиво. Стильный и мощный лендинг показывает клиентам ваш подход к бизнесу, привлекает внимание, а конкурентов оставляет далеко позади.",
  },
  {
    num: "02",
    title: "Понятно преподносят ваши\nтовары или услуги",
    p: "Любому посетителю легко понять преимущества вашего оффера, порядок предоставления услуг, и он без затруднений может связаться с вами для консультации или заказа.",
  },
  {
    num: "03",
    title: "Дают конкретный результат\nв виде заявок от клиентов",
    p: "Лендинг — это не просто эффектный сайт. Это мощный инструмент маркетинга. Он создает постоянный поток горячих заказов и позволяет вам вывести бизнес на новый уровень.",
  },
  {
    num: "04",
    title: "Создают мощный фундамент\nдля интернет-маркетинга",
    p: "Лендинги легко конвертируют любой вид трафика — из соцсетей, email-рассылок или контекстной рекламы. Их высокий процент конверсии превращает простые клики в горячие лиды.",
  },
];

export default function IntroSection() {
  const [active, setActive] = useState(0);

  return (
    <section className={s.section}>
      <motion.h2
        className={s.heading}
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55 }}
      >
        Какие задачи решают<br />наши сайты?
      </motion.h2>

      <div className={s.grid}>
        {/* ── Left: decorative number + active description ── */}
        <div className={s.left}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`num-${active}`}
              className={s.decorNum}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {STEPS[active].num}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${active}`}
              className={s.description}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {STEPS[active].p}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* ── Right: clickable list ── */}
        <motion.div
          className={s.list}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              className={`${s.item} ${active === i ? s.itemActive : ""}`}
              onClick={() => setActive(i)}
              animate={{ opacity: active === i ? 1 : 0.38 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              <span className={s.itemNum}>{step.num}</span>
              <div>
                <span className={s.itemTitle}>
                  {step.title.split("\n").map((line, j) => (
                    <span key={j}>{line}{j === 0 && <br />}</span>
                  ))}
                </span>
                {/* Mobile only: description inline */}
                {active === i && (
                  <AnimatePresence>
                    <motion.p
                      className={s.mobileDesc}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.p}
                    </motion.p>
                  </AnimatePresence>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
