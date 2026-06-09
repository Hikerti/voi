import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export interface ArticleFrontmatter {
  title: string;
  date?: string;
  thumbnail?: string;
  subtitle?: string;
  order?: number;
}

export interface ArticleData extends ArticleFrontmatter {
  slug: string;
  content: string;
}

export function getAllArticleSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getArticleBySlug(slug: string): ArticleData | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  return { slug, ...(data as ArticleFrontmatter), content };
}
