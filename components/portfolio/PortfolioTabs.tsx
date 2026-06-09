"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedLink, { ShuffleText } from "@/components/ui/AnimatedLink";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const TABS = [
  { label: "1.ЖК «Изумрудная долина»", desktopCls: "text-block-18", mobileCls: "text-block-47" },
  { label: "2.Premium olivko",          desktopCls: "text-block-7",  mobileCls: "text-block-7" },
  { label: "3.Magic people",            desktopCls: "text-block-8",  mobileCls: "text-block-7" },
  { label: "4.All Dates Box",           desktopCls: "text-block-9",  mobileCls: "text-block-7" },
  { label: "5. Лесофактура",            desktopCls: "text-block-10", mobileCls: "text-block-7" },
];

export interface Project {
  slug: string;
  title: string;
  image?: string;
  tabIndex: number; // 0–4 matching tab
}

interface Props {
  projects?: Project[];
}

function CaseItem({ project, index }: { project: Project; index: number }) {
  return (
    <div role="listitem" className="w-dyn-item">
      <motion.div
        className="project-wrapper"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: EASE, delay: Math.min(index, 3) * 0.08 }}
      >
        <div className="case-item">
          {project.image && (
            <div className="project-image" style={{ backgroundImage: `url(${project.image})` }} />
          )}
          <AnimatedLink href={`/portfolio/${project.slug}`} className="case-footer-link w-inline-block">
            <div className="case-hide">
              <ShuffleText tag="h2" className="a-title-case-sm">{project.title}</ShuffleText>
            </div>
          </AnimatedLink>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * The right-hand column on the original (voitov.ru) shows ALL projects stacked,
 * regardless of which numbered tab is active. We replicate that: a single,
 * always-active pane that lists every project; the numbered menu on the left is
 * a fixed index that simply highlights the entry you click.
 */
function ProjectsPane({ projects, paneClass }: { projects: Project[]; paneClass: string }) {
  return (
    <div className={`${paneClass} w-tab-pane w--tab-active`}>
      <div className="services-right-2">
        <div className="projects-wrapper w-dyn-list">
          {projects.length > 0 ? (
            <div role="list" className="projects-list-tabs w-dyn-items">
              {projects.map((p, i) => (
                <CaseItem key={p.slug} project={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="w-dyn-empty">
              <div>No items found.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioTabs({ projects = [] }: Props) {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* Desktop */}
      <div className="servise-parent">
        <div className="left-side-child-case">
          <div className="case-left-child" />
          <div className="case-right-child">
            <motion.h1
              className="heading-17"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            >
              Наши проекты — предоставляем с гордостью
            </motion.h1>
            <motion.p
              className="paragraph-303"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            >
              За Ваш проект возьмется профессиональная команда: копирайтер, веб-дизайнер,
              верстальщик, веб-программист, специалист по конверсии и юзабилити. Мы изучим
              Ваш бизнес и создадим для Вас на 100% продаваемый и нешаблонный результат.
            </motion.p>
            <motion.div
              className="linee"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </div>

        <div className="services-left1-1" />

        <div className="services-right w-tabs">
          <div className="tabs-menu w-tab-menu">
            {TABS.map((tab, i) => (
              <button
                key={i}
                className={`current w-inline-block w-tab-link${active === i ? " w--current" : ""}`}
                onClick={() => setActive(i)}
              >
                <div className={tab.desktopCls}>{tab.label}</div>
              </button>
            ))}
          </div>
          <div className="content-parent-case-2 w-tab-content">
            <ProjectsPane projects={projects} paneClass="tab-pane-tab-1" />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="mobile-service">
        <div className="case-right-child-m">
          <h1 className="heading-19">Наши работы — предоставляем с гордостью</h1>
          <p className="paragraph-304">
            За Ваш проект возьмется профессиональная команда: копирайтер, веб-дизайнер,
            верстальщик, веб-программист, специалист по конверсии и юзабилити. Мы изучим
            Ваш бизнес и создадим для Вас на 100% продаваемый и нешаблонный результат.
          </p>
          <div className="palkdanamobile" />
          <div className="services-right-2-1-1 w-tabs">
            <div className="tabs-menu-2 w-tab-menu">
              {TABS.map((tab, i) => (
                <button
                  key={i}
                  className={`current-2 w-inline-block w-tab-link${active === i ? " w--current" : ""}`}
                  onClick={() => setActive(i)}
                >
                  <div className={tab.mobileCls}>{tab.label}</div>
                </button>
              ))}
            </div>
            <div className="content-parent-case-2-2 w-tab-content">
              <ProjectsPane projects={projects} paneClass="tab-pane-tab-1" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
