"use client";

import { motion, type Variants } from "framer-motion";

interface MenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const line1Variants: Variants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 6, transition: { duration: 0.3, ease: "easeInOut" as const } },
};

const line2Variants: Variants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -6, transition: { duration: 0.3, ease: "easeInOut" as const } },
};

export default function MenuToggle({ isOpen, onToggle }: MenuToggleProps) {
  return (
    <div
      className="div-block-21"
      onClick={onToggle}
      style={{ cursor: "pointer" }}
    >
      <div className="textmenu">
        <motion.div
          className="textmeny"
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          Menu
        </motion.div>
        <motion.div
          className="menuclose"
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          Close
        </motion.div>
      </div>

      <div className="div-block-22">
        <motion.div
          className="div-block-23"
          variants={line1Variants}
          animate={isOpen ? "open" : "closed"}
        />
        <motion.div
          className="div-block-24"
          variants={line2Variants}
          animate={isOpen ? "open" : "closed"}
        />
      </div>
    </div>
  );
}
