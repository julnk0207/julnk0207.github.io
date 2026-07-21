import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy information for Julian Kim's website and publishing integration.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="section-wrap inner-page privacy-page">
        <header className="page-intro">
          <p className="eyebrow">PRIVACY</p>
          <h1>Privacy policy.</h1>
          <p>Last updated July 21, 2026</p>
        </header>

        <article className="article-body privacy-content">
          <p className="article-lead">
            This is Julian Kim&apos;s personal website. It does not sell personal
            information or operate visitor accounts.
          </p>

          <h2>Information this website handles</h2>
          <p>
            The website is published as a static site and does not include its own
            analytics, advertising trackers, contact forms, or account system. It
            stores a visitor&apos;s light or dark theme preference locally in the
            visitor&apos;s browser. That preference is not sent to Julian Kim.
          </p>
          <p>
            The hosting provider may process routine technical information, such as
            IP addresses and request logs, under its own privacy terms.
          </p>

          <h2>LinkedIn publishing integration</h2>
          <p>
            This website may use LinkedIn&apos;s API to publish summaries and links to
            Julian Kim&apos;s own LinkedIn account. The integration is used only after
            Julian Kim authorizes it. It does not collect data from visitors or
            access other LinkedIn members&apos; private information.
          </p>
          <p>
            LinkedIn access credentials are kept in private deployment secrets and
            are not included in the public website repository. Published summaries
            and LinkedIn post identifiers may be retained with the related article
            to prevent duplicate posts and support intentional updates.
          </p>

          <h2>Automated summaries</h2>
          <p>
            If automated summarization is enabled, the public text of an article may
            be sent to an AI service to prepare a proposed LinkedIn summary. Visitor
            information is not included. A summary is reviewed before it is approved
            for publication.
          </p>

          <h2>External links</h2>
          <p>
            This website links to services such as LinkedIn, GitHub, Instagram, and
            X. Those services process information according to their own privacy
            policies when a visitor follows a link.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy can be sent to{" "}
            <a href="mailto:julnk0207@gmail.com">julnk0207@gmail.com</a>.
          </p>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
