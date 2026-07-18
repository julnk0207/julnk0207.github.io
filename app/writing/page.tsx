import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { featuredPosts } from "../content/posts";

export default function WritingPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="section-wrap inner-page">
        <header className="page-intro writing-intro">
          <p className="eyebrow">WRITING · NOTES FROM THE WORK</p>
          <h1>Ideas become more useful when they&apos;re written clearly.</h1>
          <p>Engineering notes, experiments, and explanations. Organized for discovery—not an endless chronological feed.</p>
        </header>
        <div className="filter-bar" aria-label="Post filters">
          <button className="active" type="button">All <span>03</span></button>
          <button type="button">Engineering <span>02</span></button>
          <button type="button">Backend <span>01</span></button>
          <button type="button">Experiments <span>00</span></button>
        </div>
        <div className="writing-list">
          {featuredPosts.map((post, index) => (
            <article key={post.slug}>
              <p className="post-index">0{index + 1}</p>
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
      </main>
      <SiteFooter />
    </div>
  );
}
