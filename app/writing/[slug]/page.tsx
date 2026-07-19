import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { getAllPosts, getPostBySlug } from "../../content/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Julian Kim`,
    description: post.description,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="article-page">
        <header className="article-header section-wrap">
          <Link className="back-link" href="/writing">← All writing</Link>
          <div className="article-kicker"><span>{post.category}</span><span>{post.subcategory}</span><span>{post.readingTime} READ</span></div>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <div className="article-byline"><div className="mini-avatar">JK</div><div><strong>Julian Kim</strong><span>Published {post.date}</span></div></div>
        </header>
        <div className={`article-layout section-wrap ${post.tableOfContents.length === 0 ? "article-layout-no-toc" : ""}`}>
          {post.tableOfContents.length > 0 && (
            <aside className="toc">
              <span>ON THIS PAGE</span>
              {post.tableOfContents.map((heading, index) => (
                <a className={heading.depth === 3 ? "toc-nested" : undefined} href={`#${heading.id}`} key={heading.id}>
                  {String(index + 1).padStart(2, "0")} · {heading.text}
                </a>
              ))}
            </aside>
          )}
          <article className="article-body">
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <div className="tag-list">{post.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
