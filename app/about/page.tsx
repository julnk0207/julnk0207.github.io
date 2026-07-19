import { ContactLinks } from "../components/ContactLinks";
import { ProfileFacts } from "../components/ProfileFacts";
import { ProfilePhoto } from "../components/ProfilePhoto";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export default function AboutPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="section-wrap inner-page">
        <header className="page-intro about-intro">
          <p className="eyebrow">ABOUT · THE LONGER VERSION</p>
          <h1>Exploring how intelligent systems can understand—and act in—the physical world.</h1>
          <p>I&apos;m Julian Kim, an undergraduate at Seoul National University and an intern at DSAIL. I live in Suwon, Korea, and my current interest is Physical AI, especially vision-language-action models.</p>
        </header>
        <div className="about-layout">
          <aside className="about-sidebar">
            <ProfilePhoto compact />
            <ProfileFacts variant="about" />
            <div className="about-contact">
              <p className="eyebrow">CONTACT</p>
              <ContactLinks compact />
            </div>
          </aside>
          <div className="about-content">
            <section><span className="section-number">01</span><div><h2>Introduction</h2><p>I&apos;m interested in building AI systems that move beyond digital interfaces and interact meaningfully with the physical world. Right now, I&apos;m focusing on vision-language-action models and learning how perception, reasoning, and action come together.</p></div></section>
            <section><span className="section-number">02</span><div><h2>Academic experience</h2><p>I&apos;m currently pursuing my undergraduate studies at Seoul National University.</p><div className="detail-card"><strong>Seoul National University</strong><span>Undergraduate student · Seoul, Korea</span><p>Developing my foundations in artificial intelligence while exploring research questions in Physical AI and embodied intelligence.</p></div></div></section>
            <section><span className="section-number">03</span><div><h2>Research experience</h2><p>As an intern at DSAIL, I&apos;m gaining hands-on research experience and deepening my understanding of modern AI systems.</p><div className="detail-card"><strong>DSAIL</strong><span>Research intern · Current</span><p>Exploring research at the intersection of visual perception, language, and action.</p></div></div></section>
            <section><span className="section-number">04</span><div><h2>Certifications</h2><p>Relevant professional certificates, issuing organizations, and verification links.</p><div className="chip-row"><span>Certificate placeholder</span><span>Issuer · 2026</span></div></div></section>
            <section><span className="section-number">05</span><div><h2>Publications & talks</h2><p className="muted-note">This section will stay hidden on the finished site until you have something to add.</p></div></section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
