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

            {/* Academic Experience */}
            <section><span className="section-number">01</span><div><h2>Academic experience</h2><div className="detail-card"><strong>Seoul National University</strong><span>Undergraduate student · Seoul, Korea · 2021 - Current</span><p>Biological Science & Interdisciplinary Major in AI</p></div></div></section>


            {/* Research Experience */}
            <section><span className="section-number">02</span><div><h2>Research experience</h2><div className="detail-card"><strong>DSAIL</strong><span>Research intern · Seoul, Korea · July, 2026 - Current</span><p>Exploring research at the intersection of visual perception, language, and action.</p></div></div></section>


            {/* Certification */}

            <section><span className="section-number">03</span><div><h2>Certifications</h2>

            <div className="detail-card"><strong>Dean&apos;s List</strong><span> Seoul National University · 2025 Spring, Fall</span></div>

            <div className="detail-card"><strong>Woonhae Foundation Scholarship</strong><span> Woonhae Foundation · 2026</span></div>

            <div className="detail-card"><strong>AWS Solve-A-Thon 2nd Place</strong><span> Amazon Web Service · Jan, 2025</span></div>

            </div></section>

            {/* <section><span className="section-number">05</span><div><h2>Publications & talks</h2><p className="muted-note">This section will stay hidden on the finished site until you have something to add.</p></div></section> */}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
