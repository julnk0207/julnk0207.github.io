"use client";

import { useEffect } from "react";

const themeColors = {
  light: "#f7f8ff",
  dark: "#080d1c",
} as const;

type Theme = keyof typeof themeColors;
type ThemeMode = Theme | "system";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyThemeMode(mode: ThemeMode) {
  const root = document.documentElement;
  const theme = mode === "system" ? getSystemTheme() : mode;

  root.dataset.themeMode = mode;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  window.localStorage.setItem("theme-mode", mode);

  const themeColor = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );
  themeColor?.setAttribute("content", themeColors[theme]);
}

export function ThemeToggle() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncWithSystem = () => {
      if (document.documentElement.dataset.themeMode === "system") {
        applyThemeMode("system");
      }
    };

    media.addEventListener("change", syncWithSystem);
    return () => media.removeEventListener("change", syncWithSystem);
  }, []);

  function toggleTheme() {
    const currentMode = document.documentElement.dataset.themeMode;
    const nextMode: ThemeMode = currentMode === "system"
      ? "light"
      : currentMode === "light"
        ? "dark"
        : "system";

    applyThemeMode(nextMode);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label="Change color theme: System, Light, or Dark"
      title="Cycle color theme"
    >
      <span className="theme-toggle-icon theme-toggle-icon-system" aria-hidden="true">◐</span>
      <span className="theme-toggle-icon theme-toggle-icon-light" aria-hidden="true">☀</span>
      <span className="theme-toggle-icon theme-toggle-icon-dark" aria-hidden="true">☾</span>
      <span className="theme-toggle-label theme-toggle-label-system">System</span>
      <span className="theme-toggle-label theme-toggle-label-light">Light</span>
      <span className="theme-toggle-label theme-toggle-label-dark">Dark</span>
    </button>
  );
}
