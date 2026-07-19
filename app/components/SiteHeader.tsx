import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="section-wrap header-inner">
        <Link className="site-logo" href="/" aria-label="Julian Kim home">
          <Image src="/favicon-128.png" alt="" width={44} height={44} priority />
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Link href="/writing">Writing</Link>
          <Link href="/about">About</Link>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <a className="header-contact" href="mailto:julnk0207@gmail.com">Let&apos;s talk <span>↗</span></a>
        </div>
      </div>
    </header>
  );
}
