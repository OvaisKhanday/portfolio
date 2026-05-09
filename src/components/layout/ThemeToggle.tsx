import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./theme-context";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      onClick={toggleTheme}
      data-cursor="hover"
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-fg backdrop-blur-md transition hover:border-accent/60 hover:text-accent ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.35, ease: [0.6, 0.05, 0.3, 1] }}
          className="absolute inset-0 grid place-items-center"
        >
          {isDark ? <Moon size={18} strokeWidth={1.6} /> : <Sun size={18} strokeWidth={1.6} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
