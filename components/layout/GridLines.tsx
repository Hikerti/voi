"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

/**
 * The fixed full-height vertical guide lines ("деления") behind every page.
 * On the original (voitov.ru) they draw themselves in on page load — we
 * replicate that by growing each line from the top with a small stagger.
 */
export default function GridLines() {
  return (
    <div className="grid-parent1">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className={`grid-child-${i}`}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 + i * 0.12 }}
          style={{ transformOrigin: "top" }}
        />
      ))}
    </div>
  );
}
