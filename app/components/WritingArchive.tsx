"use client";

import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore } from "react";
import type { Post } from "../content/posts";

type WritingArchiveProps = {
  posts: Post[];
};

const POSTS_PER_PAGE = 10;
const ARCHIVE_RETURN_KEY = "writing-archive-return";
const ARCHIVE_STATE_EVENT = "writing-archive-state";

function subscribeToArchiveState(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener(ARCHIVE_STATE_EVENT, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(ARCHIVE_STATE_EVENT, callback);
  };
}

function getArchiveSearch() {
  return window.location.search;
}

function getServerArchiveSearch() {
  return "";
}

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
  const archiveStartRef = useRef<HTMLParagraphElement>(null);
  const categories = ["All", ...new Set(posts.map((post) => post.category))];
  const archiveSearch = useSyncExternalStore(
    subscribeToArchiveState,
    getArchiveSearch,
    getServerArchiveSearch,
  );
  const searchParams = new URLSearchParams(archiveSearch);
  const requestedCategory = searchParams.get("category");
  const activeCategory = requestedCategory && categories.includes(requestedCategory)
    ? requestedCategory
    : "All";
  const visiblePosts = activeCategory === "All"
    ? posts
    : posts.filter((post) => post.category === activeCategory);
  const totalPages = Math.max(1, Math.ceil(visiblePosts.length / POSTS_PER_PAGE));
  const requestedPage = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1;
  const pageStart = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = visiblePosts.slice(pageStart, pageStart + POSTS_PER_PAGE);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const currentArchiveUrl = `${window.location.pathname}${window.location.search}`;
    const savedReturn = window.sessionStorage.getItem(ARCHIVE_RETURN_KEY);
    window.sessionStorage.removeItem(ARCHIVE_RETURN_KEY);
    if (savedReturn) {
      try {
        const parsed = JSON.parse(savedReturn) as { url?: string; scrollY?: number };
        if (parsed.url === currentArchiveUrl && typeof parsed.scrollY === "number") {
          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => window.scrollTo({ top: parsed.scrollY, behavior: "auto" }));
          });
        }
      } catch {
        // Ignore stale session data and continue with the URL-restored filter.
      }
    }

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  function updateArchiveUrl(category: string, page: number) {
    const url = new URL(window.location.href);
    if (category === "All") url.searchParams.delete("category");
    else url.searchParams.set("category", category);
    if (page === 1) url.searchParams.delete("page");
    else url.searchParams.set("page", String(page));
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
    window.dispatchEvent(new Event(ARCHIVE_STATE_EVENT));
  }

  function selectCategory(category: string) {
    updateArchiveUrl(category, 1);
  }

  function selectPage(page: number) {
    if (page === currentPage || page < 1 || page > totalPages) return;
    updateArchiveUrl(activeCategory, page);
    window.requestAnimationFrame(() => {
      archiveStartRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  function rememberArchivePosition() {
    window.sessionStorage.setItem(ARCHIVE_RETURN_KEY, JSON.stringify({
      url: `${window.location.pathname}${window.location.search}`,
      scrollY: window.scrollY,
    }));
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
              <h2><Link href={`/writing/${post.slug}`} onClick={rememberArchivePosition}>{post.title}</Link></h2>
              <p>{post.description}</p>
              <div className="tag-list">{post.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
            </div>
            <Link className="round-link small" href={`/writing/${post.slug}`} aria-label={`Read ${post.title}`} onClick={rememberArchivePosition}>↗</Link>
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
