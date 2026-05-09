import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { PERSONAL } from "../../lib/personal";
import { cn } from "../../utils/cn";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.6, 0.05, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[padding,background-color,border-color] duration-500",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div className="container-page">
          <div
            className={cn(
              "flex items-center justify-between rounded-full border px-4 py-2 transition-all duration-500",
              scrolled
                ? "border-border/70 bg-surface/70 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]"
                : "border-transparent bg-transparent"
            )}
          >
            <a
              href="#top"
              data-cursor="hover"
              className="group flex items-center gap-2 pl-2 font-display text-sm font-semibold tracking-tight"
              aria-label="Home"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-bg">
                <span className="font-mono text-[11px] font-bold">OK</span>
              </span>
              <span className="hidden sm:inline">{PERSONAL.shortName}</span>
            </a>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  data-cursor="hover"
                  className="relative rounded-full px-4 py-1.5 text-sm text-muted transition hover:text-fg"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <a
                href={PERSONAL.socials.email}
                data-cursor="hover"
                className="hidden rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition hover:opacity-90 sm:inline-flex"
              >
                Get in touch
              </a>
              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/60 text-fg backdrop-blur-md md:hidden"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <nav className="container-page flex h-full flex-col items-start justify-center gap-6 pt-24">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, ease: [0.6, 0.05, 0.3, 1] }}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl font-semibold tracking-tight text-fg"
                >
                  {item.label}.
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                href={PERSONAL.socials.email}
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg"
              >
                Get in touch
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
