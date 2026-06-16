import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/portfolio";
import SiteForm from "@/components/forms/SiteForm";
import AnimatedLink from "@/components/ui/AnimatedLink";
import StructuredData from "@/components/seo/StructuredData";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return createPageMetadata({
    title: project.title,
    description: project.brief || project.company || `Кейс ${project.title} от Voitov Studio.`,
    path: `/portfolio/${project.slug}`,
    keywords: [project.title, "кейс разработки сайта", "портфолио веб-студии"],
    image: project.coverImage || project.heroImage || "/images/og-cover.svg",
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.brief || project.company,
    url: absoluteUrl(`/portfolio/${project.slug}`),
    image: project.coverImage || project.heroImage ? absoluteUrl(project.coverImage || project.heroImage!) : undefined,
    creator: { "@type": "Organization", name: "Voitov Studio" },
  };

  return (
    <main className="project-detail-page">
      <StructuredData data={projectJsonLd} />
      <div className="grid-parent-case" aria-hidden="true">
        <div className="grid-child-1-w" />
        <div className="grid-child-2-w" />
        <div className="grid-child-3-w" />
        <div className="grid-child-4-w" />
      </div>

      {project.heroImage && (
        <figure className="case-hero-hider">
          <div
            className="case-hero-raboti"
            style={{ backgroundImage: `url(${project.heroImage})` }}
            role="img"
            aria-label={`${project.title} — презентация проекта`}
          />
        </figure>
      )}

      <div className="wrapper-b-raboti">
        <section className="c-section-r rich-content" aria-labelledby="project-about-title">
          {project.company && (
            <>
              <h2 id="project-about-title" className="case-b push-down">О компании</h2>
              <p>{project.company}</p>
            </>
          )}

          {(project.brief || project.briefDetails) && (
            <>
              <h2 className="case-b push-down">Задача и решение</h2>
              <div className="case-info-row w-row">
                <div className="no-pad w-col w-col-4">
                  <div className="services-block w-richtext">
                    {project.brief && <p>{project.brief}</p>}
                  </div>
                </div>
                <div className="no-pad w-col w-col-8">
                  <div className="w-richtext">
                    {project.briefDetails && <p>{project.briefDetails}</p>}
                  </div>
                </div>
              </div>
            </>
          )}

          {project.content.trim() && (
            <div className="rich-text-block-3 w-richtext rich-content">
              <MDXRemote source={project.content} />
            </div>
          )}
        </section>
      </div>

      {project.gallery && project.gallery.length > 0 && (
        <section className="div-block-71" aria-label="Галерея проекта">
          {project.gallery.map((src, index) => (
            <img
              key={`${src}-${index}`}
              src={src}
              alt={`${project.title} — экран ${index + 1}`}
              className={`image-${53 + index}`}
              loading="lazy"
            />
          ))}
        </section>
      )}

      {(project.colors || project.fontImage1 || project.fontImage2) && (
        <div className="wrapper-b-raboti">
          {project.colors && project.colors.length > 0 && (
            <section className="c-section-p" aria-labelledby="project-colors-title">
              <div className="info-row w-row">
                <div className="pad-side w-col w-col-4">
                  <h2 id="project-colors-title" className="case-b push-down">Цветовая система</h2>
                </div>
                <div className="w-col w-col-8" />
              </div>
              <div className="w-row">
                {project.colors.map((color, index) => (
                  <div key={`${color.hex}-${index}`} className="no-pad w-col w-col-4">
                    <div
                      className={`c-block-${13 + index}`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={`Цвет ${color.code}`}
                    />
                    <div className="c-code">{color.code}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {(project.fontImage1 || project.fontImage2) && (
            <section className="c-section-p" aria-labelledby="project-fonts-title">
              <div className="columns-10 w-row">
                <div className="column-22 w-col w-col-4">
                  <h2 id="project-fonts-title" className="heading-82">Шрифты на сайте</h2>
                </div>
                <div className="w-col w-col-8" />
              </div>
              <div className="w-row">
                <div className="no-pad w-col w-col-6">
                  {project.fontImage1 && (
                    <img src={project.fontImage1} alt={`${project.title} — основной шрифт`} className="image-46" loading="lazy" />
                  )}
                </div>
                <div className="no-pad w-col w-col-6">
                  {project.fontImage2 && (
                    <img src={project.fontImage2} alt={`${project.title} — дополнительный шрифт`} className="image-45" loading="lazy" />
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      )}

      <nav className="project-nav" aria-label="Навигация по работам">
        {project.prevSlug ? (
          <AnimatedLink href={`/portfolio/${project.prevSlug}`} className="project-nav__link project-nav__link--prev">
            <span aria-hidden="true">←</span>
            <strong>Предыдущая работа</strong>
          </AnimatedLink>
        ) : (
          <div className="project-nav__link project-nav__link--disabled" aria-hidden="true">
            <span>←</span>
            <strong>Предыдущая работа</strong>
          </div>
        )}

        {project.nextSlug ? (
          <AnimatedLink href={`/portfolio/${project.nextSlug}`} className="project-nav__link project-nav__link--next">
            <strong>Следующая работа</strong>
            <span aria-hidden="true">→</span>
          </AnimatedLink>
        ) : (
          <div className="project-nav__link project-nav__link--disabled project-nav__link--next" aria-hidden="true">
            <strong>Следующая работа</strong>
            <span>→</span>
          </div>
        )}
      </nav>

      <section className="vs-final-cta" aria-labelledby="project-cta-title">
        <div>
          <p className="vs-kicker">проект</p>
          <h2 id="project-cta-title">Хотите сайт с таким же уровнем подачи?</h2>
        </div>
        <SiteForm source={`portfolio-${project.slug}`} compact variant="general" />
      </section>
    </main>
  );
}
