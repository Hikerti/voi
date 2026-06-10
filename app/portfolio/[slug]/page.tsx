import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/portfolio";
import SiteForm from "@/components/forms/SiteForm";
import AnimatedLink from "@/components/ui/AnimatedLink";

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
  return {
    title: `${project.title} | Voitov Studio`,
    openGraph: { title: `${project.title} | Voitov Studio` },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <div className="grid-parent-case">
        <div className="grid-child-1-w" />
        <div className="grid-child-2-w" />
        <div className="grid-child-3-w" />
        <div className="grid-child-4-w" />
      </div>

      {/* Hero image */}
      <div className="case-hero-hider">
        <div
          className="case-hero-raboti"
          style={
            project.heroImage
              ? { backgroundImage: `url(${project.heroImage})` }
              : undefined
          }
        />
      </div>

      {/* Title bar */}
      <div className="block-strip c-4">
        <div className="title-holder">
          <h2 className="project-title">{project.title}</h2>
        </div>
      </div>

      {/* Section 1 — О компании + Вкратце */}
      <div className="wrapper-b-raboti">
        <div className="c-section-r">
          {project.company && (
            <>
              <h3 className="case-b push-down">О компании</h3>
              <div className="w-richtext">
                <p>{project.company}</p>
              </div>
            </>
          )}

          {(project.brief || project.briefDetails) && (
            <>
              <h3 className="case-b push-down">Вкратце</h3>
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

          {/* Main MDX content */}
          {project.content.trim() && (
            <div className="rich-text-block-3 w-richtext">
              <MDXRemote source={project.content} />
            </div>
          )}
        </div>
      </div>

      {/* Gallery images */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="div-block-71">
          {project.gallery.map((src, i) => (
            <img key={i} src={src} alt="" className={`image-${53 + i}`} />
          ))}
        </div>
      )}

      {/* Colors + Fonts section */}
      {(project.colors || project.fontImage1 || project.fontImage2) && (
        <div className="wrapper-b-raboti">
          {project.colors && project.colors.length > 0 && (
            <div className="c-section-p">
              <div className="info-row w-row">
                <div className="pad-side w-col w-col-4">
                  <h3 className="case-b push-down">Colours</h3>
                </div>
                <div className="w-col w-col-8" />
              </div>
              <div className="w-row">
                {project.colors.map((c, i) => (
                  <div key={i} className="no-pad w-col w-col-4">
                    <div
                      className={`c-block-${13 + i}`}
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="c-code">{c.code}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(project.fontImage1 || project.fontImage2) && (
            <div className="c-section-p">
              <div className="columns-10 w-row">
                <div className="column-22 w-col w-col-4">
                  <h1 className="heading-82">Шрифты на сайте</h1>
                </div>
                <div className="w-col w-col-8" />
              </div>
              <div className="w-row">
                <div className="no-pad w-col w-col-6">
                  {project.fontImage1 && (
                    <img src={project.fontImage1} alt="" className="image-46" />
                  )}
                </div>
                <div className="no-pad w-col w-col-6">
                  {project.fontImage2 && (
                    <img src={project.fontImage2} alt="" className="image-45" />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Prev / Next navigation */}
      <nav className="project-nav" aria-label="Навигация по работам">
        {project.prevSlug ? (
          <AnimatedLink href={`/portfolio/${project.prevSlug}`} className="project-nav__link project-nav__link--prev">
            <span>←</span>
            <strong>Предыдущая работа</strong>
          </AnimatedLink>
        ) : (
          <div className="project-nav__link project-nav__link--disabled">
            <span>←</span>
            <strong>Предыдущая работа</strong>
          </div>
        )}

        {project.nextSlug ? (
          <AnimatedLink href={`/portfolio/${project.nextSlug}`} className="project-nav__link project-nav__link--next">
            <strong>Следующая работа</strong>
            <span>→</span>
          </AnimatedLink>
        ) : (
          <div className="project-nav__link project-nav__link--disabled project-nav__link--next">
            <strong>Следующая работа</strong>
            <span>→</span>
          </div>
        )}
      </nav>

      <section className="vs-final-cta">
        <div>
          <p className="vs-kicker">проект</p>
          <h2>Хотите сайт с таким же уровнем подачи? Обсудим задачу и первый прототип.</h2>
        </div>
        <SiteForm source={`portfolio-${project.slug}`} compact />
      </section>
    </>
  );
}
