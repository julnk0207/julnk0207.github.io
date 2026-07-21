import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { WritingArchive } from "../components/WritingArchive";
import { getAllPosts } from "../content/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes by Julian Kim about AI, software engineering, learning, and research.",
  alternates: { canonical: "/writing/" },
};

export default function WritingPage() {
  const posts = getAllPosts();
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="section-wrap inner-page">
        <header className="page-intro writing-intro">
          <p className="eyebrow">WRITING</p>
          <h1>Ideas become more useful when they&apos;re written clearly.</h1>
          <p>Traces of study, some thoughts.</p>
        </header>
        <WritingArchive posts={posts} />
      </main>
      <SiteFooter />
    </div>
  );
}
