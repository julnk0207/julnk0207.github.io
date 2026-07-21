import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, Renderer } from "marked";

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "posts");
const WORDS_PER_MINUTE = 220;
const SOCIAL_STATUSES = ["draft", "generate", "review", "publish", "published"] as const;

export type SocialStatus = typeof SOCIAL_STATUSES[number];

export type SocialMetadata = {
  status: SocialStatus;
  summary: string;
  postId: string;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateValue: string;
  category: string;
  subcategory: string;
  tags: string[];
  readingTime: string;
  linkedin: SocialMetadata;
  x: SocialMetadata;
};

export type TableOfContentsItem = {
  id: string;
  text: string;
  depth: number;
};

export type Article = Post & {
  html: string;
  tableOfContents: TableOfContentsItem[];
};

type PostSource = {
  metadata: Post;
  markdown: string;
};

function displayDate(value: unknown, filename: string) {
  if (typeof value !== "string" && !(value instanceof Date)) {
    throw new Error(`${filename}: frontmatter must include a valid \"date\".`);
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${filename}: \"date\" must be a valid date such as 2026-07-19.`);
  }

  return {
    display: new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      timeZone: "UTC",
      year: "numeric",
    }).format(date).toUpperCase(),
    value: date.toISOString(),
  };
}

function textDescription(markdown: string) {
  const paragraph = markdown
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith("#") && !block.startsWith("```"));

  return (paragraph ?? "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>#-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function socialMetadata(
  value: unknown,
  filename: string,
  platform: "linkedin" | "x",
  summaryLimit: number,
): SocialMetadata {
  if (value === undefined) {
    return { status: "draft", summary: "", postId: "" };
  }

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${filename}: "${platform}" must be an object.`);
  }

  const social = value as Record<string, unknown>;
  const status = social.status ?? "draft";
  const summary = social.summary ?? "";
  const postId = social.postId ?? "";

  if (typeof status !== "string" || !SOCIAL_STATUSES.includes(status as SocialStatus)) {
    throw new Error(
      `${filename}: "${platform}.status" must be one of ${SOCIAL_STATUSES.join(", ")}.`,
    );
  }
  if (typeof summary !== "string") {
    throw new Error(`${filename}: "${platform}.summary" must be a string.`);
  }
  if (summary.length > summaryLimit) {
    throw new Error(
      `${filename}: "${platform}.summary" must not exceed ${summaryLimit} characters.`,
    );
  }
  if (typeof postId !== "string") {
    throw new Error(`${filename}: "${platform}.postId" must be a string.`);
  }
  if (status === "publish" && !summary.trim()) {
    throw new Error(`${filename}: a ${platform} summary is required before publishing.`);
  }
  if (status === "published" && !postId.trim()) {
    throw new Error(`${filename}: a ${platform} post ID is required for published posts.`);
  }

  return {
    status: status as SocialStatus,
    summary: summary.trim(),
    postId: postId.trim(),
  };
}

function loadPostSources(): PostSource[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) return [];

  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((filename) => filename.endsWith(".md") && !filename.startsWith("_"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const source = fs.readFileSync(path.join(POSTS_DIRECTORY, filename), "utf8");
      const { data, content } = matter(source);

      if (typeof data.title !== "string" || !data.title.trim()) {
        throw new Error(`${filename}: frontmatter must include a \"title\".`);
      }

      const parsedDate = displayDate(data.date, filename);
      const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
      const description = typeof data.description === "string" && data.description.trim()
        ? data.description.trim()
        : textDescription(content);

      return {
        markdown: content,
        metadata: {
          slug,
          title: data.title.trim(),
          description,
          date: parsedDate.display,
          dateValue: parsedDate.value,
          category: typeof data.category === "string" ? data.category : "Notes",
          subcategory: typeof data.subcategory === "string" ? data.subcategory : "General",
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
          readingTime: `${Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))} MIN`,
          linkedin: socialMetadata(data.linkedin, filename, "linkedin", 3_000),
          x: socialMetadata(data.x, filename, "x", 280),
        },
      };
    })
    .sort((a, b) => b.metadata.dateValue.localeCompare(a.metadata.dateValue));
}

function headingId(text: string, usedIds: Map<string, number>) {
  const base = text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-") || "section";
  const count = usedIds.get(base) ?? 0;
  usedIds.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

function renderMarkdown(markdown: string) {
  const tableOfContents: TableOfContentsItem[] = [];
  const usedIds = new Map<string, number>();
  const renderer = new Renderer();

  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const id = headingId(text, usedIds);
    if (depth === 2 || depth === 3) {
      tableOfContents.push({ id, text: text.replace(/<[^>]+>/g, ""), depth });
    }
    return `<h${depth} id="${id}">${text}</h${depth}>\n`;
  };

  const marked = new Marked({ gfm: true, renderer });
  return {
    html: marked.parse(markdown) as string,
    tableOfContents,
  };
}

export function getAllPosts(): Post[] {
  return loadPostSources().map(({ metadata }) => metadata);
}

export function getPostBySlug(slug: string): Article | undefined {
  const source = loadPostSources().find((post) => post.metadata.slug === slug);
  if (!source) return undefined;

  return {
    ...source.metadata,
    ...renderMarkdown(source.markdown),
  };
}
