import type { MetadataRoute } from "next";
import { getAllPosts } from "./content/posts";
import { SITE_URL } from "./site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/writing/`, changeFrequency: "weekly", priority: 0.9 },
  ];

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/writing/${post.slug}/`,
    lastModified: post.dateValue,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...posts];
}
