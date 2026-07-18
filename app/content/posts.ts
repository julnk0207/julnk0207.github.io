export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  subcategory: string;
  tags: string[];
  readingTime: string;
};

export const featuredPosts: Post[] = [
  {
    slug: "designing-a-blog-that-lasts",
    title: "Designing a technical blog that can grow with you",
    description: "The content model, URL structure, and quiet design decisions behind this new home on the web.",
    date: "JUL 17, 2026",
    category: "Engineering",
    subcategory: "Web",
    tags: ["Architecture", "Astro"],
    readingTime: "6 MIN",
  },
  {
    slug: "notes-on-database-indexes",
    title: "Notes on database indexes: start with the query",
    description: "A practical mental model for choosing indexes without turning every table into a guessing game.",
    date: "JUN 28, 2026",
    category: "Backend",
    subcategory: "Databases",
    tags: ["PostgreSQL", "Performance"],
    readingTime: "9 MIN",
  },
  {
    slug: "small-tools-big-leverage",
    title: "Small tools, big leverage",
    description: "Three tiny automation experiments that removed recurring friction from my development workflow.",
    date: "MAY 12, 2026",
    category: "Engineering",
    subcategory: "Tooling",
    tags: ["Automation", "CLI"],
    readingTime: "5 MIN",
  },
];
