import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { featuredPosts } from "../../content/posts";

export function generateStaticParams() {
  return featuredPosts.map((post) => ({ slug: post.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = featuredPosts.find((item) => item.slug === slug);
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
        <div className="article-layout section-wrap">
          <aside className="toc"><span>ON THIS PAGE</span><a href="#context">01 · Context</a><a href="#model">02 · Content model</a><a href="#next">03 · What comes next</a></aside>
          <article className="article-body">
            <p className="article-lead">A personal technical blog has two jobs: it should make reading effortless today, and it should keep your writing portable years from now.</p>
            <h2 id="context">Context before technology</h2>
            <p>This is sample article content showing the intended reading experience. The final posts will come from Markdown files, while the design takes care of hierarchy, spacing, code, and navigation.</p>
            <blockquote>Good structure should make the next post easier to publish—not harder.</blockquote>
            <h2 id="model">A small, useful content model</h2>
            <p>Each article has one category, an optional subcategory, and several tags. That hierarchy keeps navigation predictable while still allowing ideas to connect across topics.</p>
            <pre><code>{`category: Backend\nsubcategory: Databases\ntags: [PostgreSQL, Performance]`}</code></pre>
            <h2 id="next">What comes next</h2>
            <p>Once your existing posts are available, we&apos;ll map their metadata into this model, preserve useful URLs, and replace every piece of sample content with your own work.</p>
            <div className="tag-list">{post.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
