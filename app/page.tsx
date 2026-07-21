import Link from "next/link";
import type { Metadata } from "next";
import { ContactLinks } from "./components/ContactLinks";
import { ProfileFacts } from "./components/ProfileFacts";
import { ProfilePhoto } from "./components/ProfilePhoto";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { getAllPosts } from "./content/posts";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const featuredPosts = getAllPosts().slice(0, 3);
  const latestYear = featuredPosts[0]
    ? new Date(featuredPosts[0].dateValue).getUTCFullYear()
    : new Date().getUTCFullYear();
  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="hero section-wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Undergraduate researcher · Suwon</p>
            <h1 id="hero-title">I explore how AI<br />understands and acts.</h1>
            <p className="hero-lede">
              Hello, I&apos;m Julian Kim (HyunJun). I&apos;m an undergraduate at Seoul National
              University and an intern at DSAIL, interested in Physical AI and
              vision-language-action models.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/about">More about me <span>↗</span></Link>
              <Link className="button button-quiet" href="/writing">Read my writing</Link>
            </div>
          </div>
          <aside className="profile-card" aria-label="Profile summary">
            <ProfilePhoto />
            <ProfileFacts variant="home" />
          </aside>
        </section>

        <section className="section-wrap writing-section" aria-labelledby="latest-writing">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SELECTED NOTES · {latestYear}</p>
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

        <section className="contact-band" aria-labelledby="home-contact-title">
          <div className="section-wrap contact-band-inner">
            <div className="contact-band-heading">
              <p className="eyebrow">Let&apos;s Connect</p>
              <h2 id="home-contact-title">Find me online.</h2>
            </div>
            <ContactLinks />
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
