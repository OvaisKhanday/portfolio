import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ThemeContext, type Theme } from "./theme-context";

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* localStorage unavailable */
  }
  return "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => readInitialTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* localStorage unavailable */
    }
  }, [theme]);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === "dark" ? "light" : "dark")),
    []
  );

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
