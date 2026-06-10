"use client";

import { AnimatePresence, motion, type Variants, type Transition } from "framer-motion";
import { usePathname } from "next/navigation";
import { SITE, NAV_LINKS } from "@/lib/constants";
import { usePageTransition } from "@/lib/hooks/usePageTransition";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

type BezierTuple = [number, number, number, number];
const EASE_SHARP: BezierTuple = [0.76, 0, 0.24, 1];

function panelTransition(delay: number): Transition {
  return { duration: 0.6, ease: EASE_SHARP, delay };
}

function panelExitTransition(delay: number): Transition {
  return { duration: 0.5, ease: EASE_SHARP, delay };
}

const overlayVariants: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.3 } },
};

const linkVariants: Variants = {
  closed: { x: -60, opacity: 0 },
  open: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
      delay: 0.35 + i * 0.07,
    },
  }),
  exit: { x: -60, opacity: 0, transition: { duration: 0.2 } },
};

export default function MobileMenu({
  isOpen,
  onClose,
}: MobileMenuProps) {
  const pathname = usePathname();
  const { navigate } = usePageTransition();
  const menuLinks = NAV_LINKS.filter((item) => item.href !== "/");

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    onClose();
    setTimeout(() => navigate(href), 100);
  }

  function PanelDiv({
    className,
    delay,
    children,
  }: {
    className: string;
    delay: number;
    children?: React.ReactNode;
  }) {
    return (
      <motion.div
        className={className}
        initial={{ y: "100%" }}
        animate={{ y: 0, transition: panelTransition(delay) }}
        exit={{ y: "100%", transition: panelExitTransition(delay) }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="menuoverlayout"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="exit"
            onClick={onClose}
          />

          <div className="menudivgl div-block-25" style={{ display: "flex" }}>
            <button className="vs-menu-close" type="button" onClick={onClose} aria-label="Закрыть меню">
              <span className="vs-menu-close__icon" aria-hidden="true">×</span>
              <span className="vs-menu-close__text">Закрыть</span>
            </button>

            <PanelDiv className="menu1" delay={0} />

            <PanelDiv className="menu2" delay={0.06}>
              <ul role="list" className="list-3">
                {menuLinks.map((item, i) => (
                  <li key={item.href} className={`m${i + 1}`}>
                    <h1 className="heading-9">
                      <motion.a
                        href={item.href}
                        className={`menu-link${pathname === item.href ? " w--current" : ""}`}
                        custom={i}
                        variants={linkVariants}
                        initial="closed"
                        animate="open"
                        exit="exit"
                        onClick={(e) => handleNavClick(e, item.href)}
                      >
                        {item.label}
                      </motion.a>
                    </h1>
                  </li>
                ))}
                <li className="m6">
                  <h1 className="heading-51">
                    <motion.a
                      href="/zayavka"
                      className="menu-link"
                      custom={menuLinks.length}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                      exit="exit"
                      onClick={(e) => handleNavClick(e, "/zayavka")}
                    >
                      Оставить заявку
                    </motion.a>
                  </h1>
                </li>
              </ul>

              <motion.p
                className="paragraph-300"
                custom={menuLinks.length + 1}
                variants={linkVariants}
                initial="closed"
                animate="open"
                exit="exit"
              >
                <a href={SITE.phoneHref} className="link-9">
                  {SITE.phone}
                </a>
                <br />
                <a href={SITE.emailHref} className="link-10">
                  {SITE.email}
                </a>
                <br />‍<br />
                {SITE.name}
                <br />
                {SITE.tagline}
                <br />
              </motion.p>
            </PanelDiv>

            <PanelDiv className="menu3" delay={0.03} />
            <PanelDiv className="menu4" delay={0.09} />
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
