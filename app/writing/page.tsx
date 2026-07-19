import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { WritingArchive } from "../components/WritingArchive";
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
        <WritingArchive posts={featuredPosts} />
      </main>
      <SiteFooter />
    </div>
  );
}
