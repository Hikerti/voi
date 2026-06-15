"use client";

import { motion } from "framer-motion";
import AnimatedLink, { ShuffleText } from "@/components/ui/AnimatedLink";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const DESKTOP_TEXT =
  "Мы переосмысливаем стандарты и ищем решения, которые действительно работают на результат. Для нас бизнес клиента — не просто проект, а ответственность и понятная цель.";

const DESKTOP_TEXT_2 =
  "Изучаем нишу, аудиторию и конкурентов, затем собираем структуру, дизайн и разработку в единую систему.";

const MOBILE_TEXT =
  "Начинаем с задачи бизнеса, исследуем аудиторию и формируем понятную структуру будущего сайта.";

const MOBILE_TEXT_2 =
  "Над проектом работают специалисты по текстам, дизайну, разработке, UX и аналитике.";

export default function ONasSection() {
  return (
    <>
      <div className="services-parent1-1">
        <div className="left-side-child-conent1-1">
          <motion.img
            src="/images/winxpered.png"
            alt=""
            className="image-25"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          />
        </div>
        <div className="services-left1-1" />
        <div className="services-right">
          <div className="content-parent-ser1-1-1">
            <motion.h2
              className="heading-31"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            >
              Наш<br />подход
            </motion.h2>
            <motion.p
              className="paragraph-305"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            >
              {DESKTOP_TEXT}
              <br /><br />
              {DESKTOP_TEXT_2}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65, ease: EASE }}
            >
              <AnimatedLink href="/services" className="n-s-link w-inline-block">
                <ShuffleText tag="span" className="btn-text">Перейти к услугам</ShuffleText>
              </AnimatedLink>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mobile-services">
        <div className="services-hero">
          <img src="/images/winxpered.png" alt="" className="image-26" />
        </div>
        <div className="services-content-st">
          <h2 className="a-title">Наш<br />подход</h2>
          <p className="paragraph-306">
            {MOBILE_TEXT}
            <br /><br />
            {MOBILE_TEXT_2}
          </p>
          <AnimatedLink href="/services" className="n-s-link w-inline-block">
            <ShuffleText tag="span" className="heading-33">Перейти к услугам</ShuffleText>
          </AnimatedLink>
        </div>
      </div>
    </>
  );
}
