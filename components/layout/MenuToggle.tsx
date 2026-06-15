"use client";

import { motion, type Variants } from "framer-motion";

interface MenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const topLineVariants: Variants = {
  closed: { rotate: 0, y: -7, scaleX: 1 },
  open: { rotate: 45, y: 0, scaleX: 1.05 },
};

const middleLineVariants: Variants = {
  closed: { opacity: 1, scaleX: 0.72, x: 5 },
  open: { opacity: 0, scaleX: 0.2, x: 18 },
};

const bottomLineVariants: Variants = {
  closed: { rotate: 0, y: 7, scaleX: 1 },
  open: { rotate: -45, y: 0, scaleX: 1.05 },
};

export default function MenuToggle({ isOpen, onToggle }: MenuToggleProps) {
  return (
    <motion.button
      className={`vs-burger${isOpen ? " is-open" : ""}`}
      type="button"
      onClick={onToggle}
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      aria-expanded={isOpen}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
    >
      <img className="vs-burger__logo" src="/logo_2.png" alt="" aria-hidden="true" />
      <span className="vs-burger__rings" aria-hidden="true" />
      <span className="vs-burger__lines" aria-hidden="true">
        <motion.span
          className="vs-burger__line"
          variants={topLineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.34, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.span
          className="vs-burger__line"
          variants={middleLineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.24, ease: "easeOut" }}
        />
        <motion.span
          className="vs-burger__line"
          variants={bottomLineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.34, ease: [0.76, 0, 0.24, 1] }}
        />
      </span>
    </motion.button>
  );
}
