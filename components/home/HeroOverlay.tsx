"use client";

import { motion } from "framer-motion";

// At rest voitov.ru shows only the centred blue square behind the wordmark
// (the other shapes are revealed further down the page). Keep the hero clean.
export default function HeroOverlay() {
  return (
    <div className="hero-content-overlay">
      <motion.img
        src="/images/winKKpered.png"
        alt="square"
        className="sm-sq"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
      />
    </div>
  );
}
