"use client";

import { motion } from "framer-motion";
import AnimatedLink, { ShuffleText } from "@/components/ui/AnimatedLink";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const iconVariants = {
  rest: { scale: 0.88, opacity: 0.55 },
  hovered: { scale: 1.05, opacity: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const textVariants = {
  rest: { y: 6, opacity: 0.65 },
  hovered: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" as const } },
};

const SECTIONS = [
  {
    sectionClass: "services-section-1",
    iconWrap: "shap-parent-1",
    icon: "/images/winxpered.png",
    iconAlt: "Strategy",
    btnWrap: "div-block-47",
    label: "Стратегия",
    href: "/services/strategy",
  },
  {
    sectionClass: "services-section-2",
    iconWrap: "minomer2",
    icon: "/images/winOpered.png",
    iconAlt: "",
    btnWrap: "div-block-48",
    label: "Дизайн",
    href: "/services/design",
  },
  {
    sectionClass: "services-section-3",
    iconWrap: "minomer3",
    icon: "/images/winKKpered.png",
    iconAlt: "",
    btnWrap: "div-block-48",
    label: "Диджитал",
    href: "/services/digital",
  },
  {
    sectionClass: "services-section-4",
    iconWrap: "minomer4 hexagon",
    icon: "/images/winRRpered.png",
    iconAlt: "",
    btnWrap: "div-block-49",
    label: "Маркетинг",
    href: "/services/marketing",
  },
];

export default function ServicesHub() {
  return (
    <motion.div
      className="herostr"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {SECTIONS.map((s) => (
        <motion.div
          key={s.href}
          className={s.sectionClass}
          initial="rest"
          whileHover="hovered"
          animate="rest"
        >
          <motion.div className={s.iconWrap} variants={iconVariants}>
            <img src={s.icon} alt={s.iconAlt} className="shape-top-1" />
          </motion.div>
          <motion.div className="btn1" variants={textVariants}>
            <AnimatedLink href={s.href} className="link-block-services w-inline-block">
              <div className={s.btnWrap}>
                <ShuffleText tag="h1" className="hero-section-head">
                  {s.label}
                </ShuffleText>
              </div>
            </AnimatedLink>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
