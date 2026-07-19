import type { Metadata, Viewport } from "next";
import { Google_Sans, Google_Sans_Code } from "next/font/google";
import "./globals.css";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

const googleSansCode = Google_Sans_Code({
  variable: "--font-google-sans-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Julian Kim — Undergraduate Researcher",
    template: "%s — Julian Kim",
  },
  description: "Engineering notes, experiments, and the thinking behind the software I build.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-128.png", type: "image/png", sizes: "128x128" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/app-icon.png", sizes: "1024x1024", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
};

const themeScript = `
  (() => {
    try {
      const savedMode = localStorage.getItem("theme-mode");
      const mode = savedMode === "light" || savedMode === "dark" || savedMode === "system"
        ? savedMode
        : "system";
      const theme = mode === "system"
        ? matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        : mode;
      document.documentElement.dataset.themeMode = mode;
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
      document.querySelector('meta[name="theme-color"]')?.setAttribute(
        "content",
        theme === "dark" ? "#080d1c" : "#f7f8ff",
      );
    } catch {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#f7f8ff" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${googleSans.variable} ${googleSansCode.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
