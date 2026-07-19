"use client";

import Link from "next/link";
import { useState } from "react";
import type { Post } from "../content/posts";

type WritingArchiveProps = {
  posts: Post[];
};

export function WritingArchive({ posts }: WritingArchiveProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...new Set(posts.map((post) => post.category))];
  const visiblePosts = activeCategory === "All"
    ? posts
    : posts.filter((post) => post.category === activeCategory);

  return (
    <>
      <div className="filter-bar" aria-label="Filter posts by category">
        {categories.map((category) => {
          const count = category === "All"
            ? posts.length
            : posts.filter((post) => post.category === category).length;

          return (
            <button
              className={activeCategory === category ? "active" : undefined}
              type="button"
              aria-pressed={activeCategory === category}
              key={category}
              onClick={() => setActiveCategory(category)}
            >
              {category} <span>{String(count).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>
      <p className="filter-status" aria-live="polite">
        Showing {visiblePosts.length} {visiblePosts.length === 1 ? "post" : "posts"}
        {activeCategory === "All" ? "" : ` in ${activeCategory}`}.
      </p>
      <div className="writing-list">
        {visiblePosts.map((post, index) => (
          <article key={post.slug}>
            <p className="post-index">{String(index + 1).padStart(2, "0")}</p>
            <div className="writing-list-main">
              <div className="post-meta"><span>{post.category} / {post.subcategory}</span><span>{post.date}</span><span>{post.readingTime}</span></div>
              <h2><Link href={`/writing/${post.slug}`}>{post.title}</Link></h2>
              <p>{post.description}</p>
              <div className="tag-list">{post.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
            </div>
            <Link className="round-link small" href={`/writing/${post.slug}`} aria-label={`Read ${post.title}`}>↗</Link>
          </article>
        ))}
      </div>
    </>
  );
}
