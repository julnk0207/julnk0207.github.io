"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Post } from "../content/posts";

type WritingArchiveProps = {
  posts: Post[];
};

const POSTS_PER_PAGE = 10;

function paginationItems(currentPage: number, totalPages: number) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);

  const visiblePages = [...new Set([
    1,
    totalPages,
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ])]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  return visiblePages.flatMap((page, index) => {
    const previousPage = visiblePages[index - 1];
    return previousPage && page - previousPage > 1 ? [`ellipsis-${page}`, page] : [page];
  });
}

export function WritingArchive({ posts }: WritingArchiveProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const archiveStartRef = useRef<HTMLParagraphElement>(null);
  const categories = ["All", ...new Set(posts.map((post) => post.category))];
  const visiblePosts = activeCategory === "All"
    ? posts
    : posts.filter((post) => post.category === activeCategory);
  const totalPages = Math.max(1, Math.ceil(visiblePosts.length / POSTS_PER_PAGE));
  const pageStart = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = visiblePosts.slice(pageStart, pageStart + POSTS_PER_PAGE);

  function selectCategory(category: string) {
    setActiveCategory(category);
    setCurrentPage(1);
  }

  function selectPage(page: number) {
    if (page === currentPage || page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.requestAnimationFrame(() => {
      archiveStartRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });
  }

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
              onClick={() => selectCategory(category)}
            >
              {category} <span>{String(count).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>
      <p className="filter-status" aria-live="polite" ref={archiveStartRef}>
        Showing {pageStart + 1}–{Math.min(pageStart + POSTS_PER_PAGE, visiblePosts.length)} of {visiblePosts.length} {visiblePosts.length === 1 ? "post" : "posts"}
        {activeCategory === "All" ? "" : ` in ${activeCategory}`}.
      </p>
      <div className="writing-list">
        {pagePosts.map((post, index) => (
          <article key={post.slug}>
            <p className="post-index">{String(pageStart + index + 1).padStart(2, "0")}</p>
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
      {totalPages > 1 && (
        <nav className="pagination" aria-label="Writing pagination">
          <button
            className="pagination-direction"
            disabled={currentPage === 1}
            onClick={() => selectPage(currentPage - 1)}
            type="button"
          >
            ← Previous
          </button>
          <div className="pagination-center">
            <span className="pagination-summary">Page {currentPage} of {totalPages}</span>
            <div className="pagination-pages">
              {paginationItems(currentPage, totalPages).map((item) => typeof item === "number" ? (
                <button
                  aria-current={item === currentPage ? "page" : undefined}
                  aria-label={`Page ${item}`}
                  className={item === currentPage ? "active" : undefined}
                  key={item}
                  onClick={() => selectPage(item)}
                  type="button"
                >
                  {item}
                </button>
              ) : (
                <span aria-hidden="true" className="pagination-ellipsis" key={item}>…</span>
              ))}
            </div>
          </div>
          <button
            className="pagination-direction pagination-next"
            disabled={currentPage === totalPages}
            onClick={() => selectPage(currentPage + 1)}
            type="button"
          >
            Next →
          </button>
        </nav>
      )}
    </>
  );
}
