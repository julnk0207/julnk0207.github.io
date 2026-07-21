import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-wrap footer-inner">
        <p><strong>Julian Kim</strong></p>
        <div className="footer-meta">
          <p>© 2026 · Suwon, KR</p>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
