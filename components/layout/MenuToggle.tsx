"use client";

import { motion, type Variants } from "framer-motion";

interface MenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const topLineVariants: Variants = {
  closed: { rotate: 0, y: -7, scaleX: 1 },
  open: { rotate: 45, y: 0, scaleX: 1 },
};

const middleLineVariants: Variants = {
  closed: { opacity: 1, scaleX: 1, x: 0 },
  open: { opacity: 0, scaleX: 0.2, x: 0 },
};

const bottomLineVariants: Variants = {
  closed: { rotate: 0, y: 7, scaleX: 1 },
  open: { rotate: -45, y: 0, scaleX: 1 },
};

export default function MenuToggle({ isOpen, onToggle }: MenuToggleProps) {
  return (
    <motion.button
      className={`vs-burger${isOpen ? " is-open" : ""}`}
      type="button"
      onClick={onToggle}
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      aria-expanded={isOpen}
    >
      <span className="vs-burger__lines" aria-hidden="true">
        <motion.span
          className="vs-burger__line"
          variants={topLineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.28, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.span
          className="vs-burger__line"
          variants={middleLineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
        <motion.span
          className="vs-burger__line"
          variants={bottomLineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.28, ease: [0.76, 0, 0.24, 1] }}
        />
      </span>
    </motion.button>
  );
}
