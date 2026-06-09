"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function HeroCenter() {
  return (
    <div className="div-block-76">
      <div className="hero-conent-parent">
        <div className="block-hidden-top">
          <motion.div
            className="sub-text"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
          >
            590105
          </motion.div>
        </div>

        <div className="block-hidden-logo">
          <motion.div
            className="logo vs-hero-wordmark"
            initial={{ y: -48, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
          >
            <span>Voitov</span>
            <span>Studio</span>
          </motion.div>
        </div>

        <div className="block-hidden-botton">
          <motion.div
            className="sub-text-r"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          >
            voitov studio
          </motion.div>
        </div>
      </div>
    </div>
  );
}
