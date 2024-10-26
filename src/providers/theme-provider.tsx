"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useEffect, useState } from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Ensures that the component is only mounted after client-side hydration
    setMounted(true);
  }, []);

  const getInitialTheme = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour <= 18 ? "light" : "dark";
  };

  // If not mounted, return null to avoid hydration issues
  if (!mounted) return null;

  return (
    <NextThemesProvider
      {...props}
      defaultTheme={getInitialTheme()}
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  );
}
