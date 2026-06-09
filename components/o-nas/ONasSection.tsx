"use client";

import { motion } from "framer-motion";
import AnimatedLink, { ShuffleText } from "@/components/ui/AnimatedLink";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const DESKTOP_TEXT =
  "Мы переосмысливаем стандарты и ищем решения, которые действительно работают на ваш результат. Для нас ваш бизнес — это не просто проект, а личная ответственность и амбициозная цель. С вашим проектом будет работать сплочённая команда экспертов: копирайтер, веб-дизайнер, верстальщик, программист, специалист по конверсии и UX.";

const DESKTOP_TEXT_2 =
  "Мы подробно изучим вашу нишу, аудиторию и конкурентов, чтобы создать уникальный, продающий и эффективный сайт, который действительно выделит вас на рынке.";

const MOBILE_TEXT =
  "Мы бросаем вызов традиционному мышлению, находим для клиента больше, чем кто-либо другой, выходя за рамки служебного долга и относимся к вашему бизнесу, как к нашему собственному.";

const MOBILE_TEXT_2 =
  "За Ваш проект возьмется профессиональная команда: копирайтер, веб-дизайнер, верстальщик, веб-программист, специалист по конверсии и юзабилити. Мы изучим Ваш бизнес и создадим для Вас на 100% продаваемый и нешаблонный результат.";

export default function ONasSection() {
  return (
    <>
      {/* Desktop */}
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
            <motion.h1
              className="heading-31"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            >
              Наш<br />подход
            </motion.h1>
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
                <ShuffleText tag="h3" className="btn-text">Далее</ShuffleText>
              </AnimatedLink>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="mobile-services">
        <div className="services-hero">
          <img src="/images/winxpered.png" alt="" className="image-26" />
        </div>
        <div className="services-content-st">
          <h1 className="a-title">Наш<br />подход</h1>
          <p className="paragraph-306">
            {MOBILE_TEXT}
            <br /><br />
            {MOBILE_TEXT_2}
          </p>
          <AnimatedLink href="/services" className="n-s-link w-inline-block">
            <ShuffleText tag="h3" className="heading-33">Далее</ShuffleText>
          </AnimatedLink>
        </div>
      </div>
    </>
  );
}
