# Design Skills Research

## What This Project Needs

The project has no final design, but it already has a strong Webflow-derived visual language. The useful design workflow is not "install a component library and rebuild everything"; it is:

1. audit the current site in browser;
2. extract the existing visual system from `webflow-export/`, screenshots, CSS, and assets;
3. produce page prototypes for missing roadmap sections;
4. implement in the current Next.js structure;
5. verify desktop/mobile visually after each major section.

## Skills Already Useful Locally

- `diegosouzapw-senior-frontend-v2`: useful for Next.js/React implementation, accessibility, and performance checks.
- `diegosouzapw-frontend-design-v6`: installed for production-grade page composition and frontend design direction.
- `wshobson-visual-design-foundations`: installed for typography, color, spacing, iconography, and visual hierarchy.
- `wshobson-design-system-patterns`: installed for design tokens, theming, and component architecture once the direction is approved.
- `anthropics-design-critique`: installed for structured design review of screenshots, Figma links, and rendered pages.
- `zach-source-webapp-testing`: useful for local Playwright verification when Browser is not available.
- `kabaka-code-review`: useful before handoff.
- `grill-me`: useful to turn the roadmap into client decisions.
- `find-skills`: useful when we need to search/install additional skills.

## Plugin Skills To Prefer In This Codex Session

- `Build Web Apps`: best available workflow for concepting, frontend implementation, visual QA, and responsive checks.
- `Browser`: preferred for local browser inspection. In this sandbox, the Browser runtime failed during setup, so Playwright with system Chrome was used as fallback.
- `imagegen`: useful only when a new bitmap concept, hero image, illustration, or asset pass is needed. Do not use it for simple vector/icon/CSS edits.

## External Skills Worth Considering

Research sources:

- [AgentSkill design category](https://agentskill.sh/for/design) lists 3700+ design-oriented skills and highlights `canvas-design`, `design-system-patterns`, and `visual-design-foundations`.
- [skills.sh design topic](https://www.skills.sh/topic/design) lists frontend/design skills such as `frontend-design`, `web-design-guidelines`, `extract-design-system`, `polish`, `critique`, `distill`, and related design-taste skills.
- [AgentSkill skillsets](https://agentskill.sh/skillsets) includes a UI/UX Design skillset bundle, but bundles should be reviewed before bulk install.
- [OpenAI frontend-skill listing](https://officialskills.sh/openai/skills/frontend-skill) describes composition-first frontend rules around heroes, hierarchy, cardless layouts, and motion.
- [shadcn/ui skills docs](https://ui.shadcn.com/docs/skills) are relevant only if the project intentionally migrates to shadcn/Tailwind-style component ownership.

Recommended candidates if the owner wants more local design skills:

- `diegosouzapw/frontend-design-v6`: installed as the closest matching frontend design guidance.
- `vercel-labs/web-design-guidelines`: good for spacing, typography, interaction, and accessibility standards.
- `arvindrk/extract-design-system`: useful if we want to formalize tokens/components from the existing Webflow site.
- `wshobson/design-system-patterns`: installed.
- `wshobson/visual-design-foundations`: installed.
- `anthropics/design-critique`: installed as the practical critique/review skill.
- `pbakaus/impeccable` skills like `polish`, `distill`, or `quieter`: still optional for later final visual review.

## Skills Not Recommended Right Now

- `shadcn`: removed locally because this project has no `components.json`, no Tailwind setup, and a Webflow CSS visual base. Reintroduce only if there is an approved migration to shadcn.
- Generic mutation testing skill: removed because there is no test runner setup and it does not help the current design/roadmap work.
- Supabase/Postgres skill: removed because there is no current Postgres backend. Reinstall only if reviews/questions/forms move to Supabase/Postgres.
- xCloud Docker deploy: removed because current deploy docs describe Node/PM2/Nginx, not xCloud.

## Suggested Design Process For First Implementation Sprint

1. Fix obvious current visual/asset issues first, especially 404 hero image requests caused by Cyrillic filenames.
2. Prototype the shared shell: Header, Footer, reusable CTA/form modal, and page section spacing.
3. Prototype and implement `/contacts` because it clarifies legal data, maps, forms, and footer content.
4. Build a structured services catalog data model before redesigning service pages.
5. Use Browser/Playwright screenshots for every major page after implementation.
6. Only after the structure works, consider generated or redesigned visual assets for the missing sections.
