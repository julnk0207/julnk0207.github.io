"use client";

const themeColors = {
  light: "#f7f8ff",
  dark: "#080d1c",
} as const;

export function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";

    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);

    const themeColor = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    themeColor?.setAttribute("content", themeColors[nextTheme]);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label="Switch between light and dark theme"
      title="Switch theme"
    >
      <span className="theme-toggle-icon theme-toggle-icon-light" aria-hidden="true">☀</span>
      <span className="theme-toggle-icon theme-toggle-icon-dark" aria-hidden="true">☾</span>
      <span className="theme-toggle-label theme-toggle-label-light">Light</span>
      <span className="theme-toggle-label theme-toggle-label-dark">Dark</span>
    </button>
  );
}
