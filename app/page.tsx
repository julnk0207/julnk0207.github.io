import Link from "next/link";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { featuredPosts } from "./content/posts";

export default function Home() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="hero section-wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Software engineer · Seoul</p>
            <h1 id="hero-title">I build useful systems<br />and write down what I learn.</h1>
            <p className="hero-lede">
              Hello, I&apos;m Hyunjun. This is my digital garden for engineering
              notes, experiments, and the decisions behind the software I build.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/writing">Read my writing <span>↗</span></Link>
              <Link className="button button-quiet" href="/about">More about me</Link>
            </div>
          </div>
          <aside className="profile-card" aria-label="Profile summary">
            <div className="profile-photo" aria-label="Profile photo placeholder">
              <span>HJ</span>
              <small>YOUR PHOTO</small>
            </div>
            <div className="profile-details">
              <div><span>FOCUS</span><strong>Backend · Data · Systems</strong></div>
              <div><span>CURRENTLY</span><strong>Learning in public</strong></div>
              <div><span>ELSEWHERE</span><strong>GitHub · LinkedIn · Email</strong></div>
            </div>
          </aside>
        </section>

        <section className="signal-strip" aria-label="Professional highlights">
          <div className="section-wrap signal-grid">
            <p><span>01</span> Practical engineering</p>
            <p><span>02</span> Clear documentation</p>
            <p><span>03</span> Continuous experiments</p>
          </div>
        </section>

        <section className="section-wrap writing-section" aria-labelledby="latest-writing">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SELECTED NOTES · 2026</p>
              <h2 id="latest-writing">Latest writing</h2>
            </div>
            <Link className="text-link" href="/writing">View all posts <span>→</span></Link>
          </div>
          <div className="post-grid">
            {featuredPosts.map((post, index) => (
              <article className={`post-card ${index === 0 ? "post-card-featured" : ""}`} key={post.slug}>
                <div className="post-card-top">
                  <span>{post.category} / {post.subcategory}</span>
                  <span>{post.readingTime}</span>
                </div>
                <div>
                  <p className="post-index">0{index + 1}</p>
                  <h3><Link href={`/writing/${post.slug}`}>{post.title}</Link></h3>
                  <p className="post-description">{post.description}</p>
                </div>
                <div className="post-card-bottom">
                  <time>{post.date}</time>
                  <div className="tag-list">
                    {post.tags.slice(0, 2).map((tag) => <span key={tag}>#{tag}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-wrap now-card" aria-labelledby="now-title">
          <div>
            <p className="eyebrow">NOW · JULY 2026</p>
            <h2 id="now-title">Currently exploring reliable systems and better ways to explain them.</h2>
          </div>
          <p>
            I&apos;m collecting notes on database performance, infrastructure,
            and the small engineering choices that make software easier to own.
          </p>
          <Link className="round-link" href="/about" aria-label="Read the About page">↗</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
