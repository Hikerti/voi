"use client";

import { motion } from "framer-motion";
import AnimatedLink, { ShuffleText } from "@/components/ui/AnimatedLink";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

// Bottom nav: visible at rest (fades in on load), like voitov.ru.
const btnVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6, ease: EASE } },
};

// The hero "papers" assemble into the wrench composition around the blue square.
// `tx` is the resting translateX voitov.ru applies to each (≈ its own width) so
// the strips overlap correctly. They fade up into place on load.
function paperVariants(tx: number, i: number) {
  return {
    hidden: { opacity: 0, x: tx, y: 24 },
    visible: {
      opacity: 1,
      x: tx,
      y: 0,
      transition: { duration: 0.8, delay: 0.15 + i * 0.08, ease: EASE },
    },
  };
}

const PAPERS_LEFT = [
  { src: "/images/win4left.png", alt: "paper 1", cls: "imageleft4", tx: 240 },
  { src: "/images/win3left.png", alt: "", cls: "imageleft3", tx: 120 },
  { src: "/images/win2left.png", alt: "", cls: "imageleft2", tx: 0 },
  { src: "/images/win1left.png", alt: "", cls: "imageleft1", tx: 150 },
];

const PAPERS_RIGHT = [
  { src: "/images/win4right.png", alt: "paper 2", cls: "imageright4", tx: -240 },
  { src: "/images/win3right.png", alt: "", cls: "imageright3", tx: -120 },
  { src: "/images/win2right.png", alt: "", cls: "imageright2", tx: 0 },
  { src: "/images/win1right.png", alt: "", cls: "imageright1", tx: -110 },
];

export default function Hero() {
  return (
    <div className="hero">
      {/* Секция 1 — Наш подход */}
      <motion.div className="hero-section-1" initial="hidden" animate="visible">
        <motion.div className="hero-btn-parent" variants={btnVariants}>
          <AnimatedLink href="/o-nas" className="link-block1 w-inline-block">
            <div className="hero-btn-child">
              <ShuffleText className="hero-section-head" tag="h2">
                Наш подход
              </ShuffleText>
            </div>
          </AnimatedLink>
        </motion.div>
      </motion.div>

      {/* Секция 2 — Комплекс */}
      <motion.div className="hero-section-2" initial="hidden" animate="visible">
        {PAPERS_LEFT.map((p, i) => (
          <motion.img
            key={p.cls}
            src={p.src}
            alt={p.alt}
            className={p.cls}
            variants={paperVariants(p.tx, i)}
          />
        ))}
        <motion.div className="hero-btn-parent" variants={btnVariants}>
          <AnimatedLink href="/services" className="link-block1 w-inline-block">
            <div className="hero-btn-child2">
              <ShuffleText className="hero-section-head" tag="h2">
                Комплекс
              </ShuffleText>
            </div>
          </AnimatedLink>
        </motion.div>
      </motion.div>

      {/* Секция 3 — Портфолио */}
      <motion.div className="hero-section-3" initial="hidden" animate="visible">
        {PAPERS_RIGHT.map((p, i) => (
          <motion.img
            key={p.cls}
            src={p.src}
            alt={p.alt}
            className={p.cls}
            variants={paperVariants(p.tx, i)}
          />
        ))}
        <motion.div className="hero-btn-parent" variants={btnVariants}>
          <AnimatedLink href="/portfolio" className="link-block1 nazad w-inline-block">
            <div className="hero-btn-child3">
              <ShuffleText className="hero-section-head" tag="h1">
                Портфолио
              </ShuffleText>
            </div>
          </AnimatedLink>
        </motion.div>
      </motion.div>

      {/* Секция 4 — News */}
      <motion.div className="hero-section-4" initial="hidden" animate="visible">
        <motion.div className="hero-btn-parent" variants={btnVariants}>
          <AnimatedLink href="/news" className="link-block1 w-inline-block">
            <div className="hero-btn-child4">
              <ShuffleText className="hero-section-head" tag="h2">
                {" News"}
              </ShuffleText>
            </div>
          </AnimatedLink>
        </motion.div>
      </motion.div>
    </div>
  );
}
