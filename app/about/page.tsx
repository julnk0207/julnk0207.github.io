import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export default function AboutPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="section-wrap inner-page">
        <header className="page-intro about-intro">
          <p className="eyebrow">ABOUT · THE LONGER VERSION</p>
          <h1>Curious about how systems work—and how to make them work better.</h1>
          <p>I&apos;m Hyunjun, a software engineer based in Seoul. I care about reliable systems, understandable code, and sharing what I learn along the way.</p>
        </header>
        <div className="about-layout">
          <aside className="about-sidebar">
            <div className="profile-photo compact"><span>HJ</span><small>YOUR PHOTO</small></div>
            <p>Replace this placeholder with your profile photo and personal links.</p>
          </aside>
          <div className="about-content">
            <section><span className="section-number">01</span><div><h2>Introduction</h2><p>This draft gives us space for your professional story: where you started, what kind of problems interest you, and what you hope to build next.</p></div></section>
            <section><span className="section-number">02</span><div><h2>Academic experience</h2><p>Degree, university, study period, notable coursework, research, and academic experiments will live here.</p><div className="detail-card"><strong>Academic experiment title</strong><span>Institution · Year</span><p>A concise description of the question, your method, and what you learned.</p></div></div></section>
            <section><span className="section-number">03</span><div><h2>Certifications</h2><p>Relevant professional certificates, issuing organizations, and verification links.</p><div className="chip-row"><span>Certificate placeholder</span><span>Issuer · 2026</span></div></div></section>
            <section><span className="section-number">04</span><div><h2>Publications & talks</h2><p className="muted-note">This section will stay hidden on the finished site until you have something to add.</p></div></section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
