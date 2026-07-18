import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="section-wrap header-inner">
        <Link className="wordmark" href="/" aria-label="Julian Kim home">
          JK<span>.</span>
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Link href="/writing">Writing</Link>
          <Link href="/about">About</Link>
        </nav>
        <a className="header-contact" href="mailto:hello@example.com">Let&apos;s talk <span>↗</span></a>
      </div>
    </header>
  );
}
