import type { ReactNode } from "react";
import "../../styles/home-form-project-heading.css";
import "../../styles/project-detail-layout.css";
import { getProjectBySlug } from "@/lib/portfolio";

interface ProjectDetailLayoutProps {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailLayout({
  children,
  params,
}: ProjectDetailLayoutProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return (
    <div className="project-detail-page project-detail-layout">
      {project && (
        <header className="project-detail-heading">
          <p className="vs-kicker">кейс</p>
          <h1>{project.title}</h1>
        </header>
      )}
      {children}
    </div>
  );
}
