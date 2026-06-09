"use client";

import { motion } from "framer-motion";
import AnimatedLink, { ShuffleText } from "@/components/ui/AnimatedLink";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

interface Props {
  desktopClass: string;
  leftIconClass: string;
  spacerClass: string;
  rightClass: string;
  contentClass: string;
  mobileClass: string;
  mobileHeroClass: string;
  mobileContentClass: string;
  icon: string;
  desktopContent: ReactNode;
  mobileContent: ReactNode;
  nextHref: string;
  nextLabel: string;
}

export default function ServiceDetailSection({
  desktopClass,
  leftIconClass,
  spacerClass,
  rightClass,
  contentClass,
  mobileClass,
  mobileHeroClass,
  mobileContentClass,
  icon,
  desktopContent,
  mobileContent,
  nextHref,
  nextLabel,
}: Props) {
  return (
    <>
      {/* Desktop */}
      <div className={desktopClass}>
        <div className={leftIconClass}>
          <motion.img
            src={icon}
            alt=""
            className="logo-ser"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          />
        </div>
        <div className={spacerClass} />
        <div className={rightClass}>
          <div className={contentClass}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            >
              {desktopContent}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            >
              <AnimatedLink href={nextHref} className="n-s-link w-inline-block">
                <ShuffleText tag="h2" className="a-title new">
                  {nextLabel}
                </ShuffleText>
              </AnimatedLink>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className={mobileClass}>
        <div className={mobileHeroClass}>
          <img src={icon} alt="" className="image-31" />
        </div>
        <div className={mobileContentClass}>
          {mobileContent}
          <AnimatedLink href={nextHref} className="n-s-link w-inline-block">
            <ShuffleText tag="h2" className="a-title new">
              {nextLabel}
            </ShuffleText>
          </AnimatedLink>
        </div>
      </div>
    </>
  );
}
