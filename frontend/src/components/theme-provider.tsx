"use client";

import * as React from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  ...props
}: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  // Use useEffect to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);

    // Check if we should use dark theme
    const isDark = defaultTheme === "dark" ||
      (defaultTheme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

    // Apply theme
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [defaultTheme]);

  // Avoid rendering children until after hydration to prevent hydration mismatch
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <>{children}</>
  );
}
