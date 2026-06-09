import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/portfolio");

export interface ProjectColor {
  hex: string;
  code: string;
}

export interface ProjectFrontmatter {
  title: string;
  heroImage?: string;
  coverImage?: string;     // 560×280 / 551×400 laptop-mockup thumbnail (portfolio + home studio card)
  tabIndex?: number;       // 0-4, maps to portfolio tab category
  company?: string;        // "О компании" text
  brief?: string;          // left column of "Вкратце" (services list)
  briefDetails?: string;   // right column of "Вкратце"
  colors?: ProjectColor[];
  fontImage1?: string;
  fontImage2?: string;
  gallery?: string[];      // image URLs for .div-block-71
  prevSlug?: string;
  prevTitle?: string;
  nextSlug?: string;
  nextTitle?: string;
}

export interface ProjectData extends ProjectFrontmatter {
  slug: string;
  content: string;
}

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getProjectBySlug(slug: string): ProjectData | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  return { slug, ...(data as ProjectFrontmatter), content };
}
