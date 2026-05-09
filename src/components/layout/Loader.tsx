import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onDone?: () => void;
  minDurationMs?: number;
}

/**
 * Page-reveal loader. Shows a counter from 00 → 100 then sweeps off.
 * Resolves once both `window.load` AND minDurationMs have passed.
 */
export function Loader({ onDone, minDurationMs = 1400 }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    let pageLoaded = document.readyState === "complete";

    const onLoad = () => {
      pageLoaded = true;
    };
    if (!pageLoaded) window.addEventListener("load", onLoad, { once: true });

    const tick = () => {
      const elapsed = performance.now() - start;
      // Approach 100 asymptotically while waiting for `load`
      const target = pageLoaded
        ? Math.min(100, (elapsed / minDurationMs) * 100)
        : Math.min(92, (elapsed / minDurationMs) * 92);
      setProgress((p) => Math.max(p, Math.floor(target)));

      if (pageLoaded && elapsed >= minDurationMs) {
        setProgress(100);
        setTimeout(() => setExiting(true), 220);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
    };
  }, [minDurationMs]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!exiting && (
        <motion.div
          key="loader"
          aria-hidden
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          // Inline background to bypass any color transitions during mount.
          style={{ backgroundColor: "rgb(var(--bg))" }}
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Subtle radial accent on the page background */}
          <div
            className="absolute inset-0 bg-grid-fade opacity-60"
            style={{ backgroundColor: "rgb(var(--bg))" }}
          />

          <div className="relative flex flex-col items-center gap-8">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.6, 0.05, 0.3, 1] }}
              className="font-mono text-xs uppercase tracking-[0.4em] text-muted"
            >
              Loading portfolio
            </motion.span>

            {/* Circular badge holding the counter */}
            <div className="relative">
              {/* Outer soft glow */}
              <div
                className="absolute -inset-6 rounded-full opacity-70 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, rgb(var(--accent) / 0.30), transparent 70%)",
                }}
              />
              {/* Rotating gradient ring */}
              <motion.div
                aria-hidden
                className="absolute -inset-1 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgb(var(--accent)) 0deg, rgb(var(--accent-2)) 120deg, transparent 240deg, rgb(var(--accent)) 360deg)",
                  WebkitMask:
                    "radial-gradient(circle, transparent 60%, black 61%)",
                  mask: "radial-gradient(circle, transparent 60%, black 61%)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
              />
              {/* Solid circular plate */}
              <div
                className="relative grid h-44 w-44 place-items-center rounded-full border border-border sm:h-52 sm:w-52"
                style={{ backgroundColor: "rgb(var(--surface))" }}
              >
                <span className="pointer-events-none font-display text-6xl font-semibold tabular-nums text-fg sm:text-7xl">
                  {String(progress).padStart(3, "0")}
                </span>
                <span className="absolute bottom-5 font-mono text-[10px] uppercase tracking-[0.3em] text-subtle">
                  %
                </span>
              </div>
            </div>

            {/* Linear progress bar */}
            <div
              className="relative h-px w-48 overflow-hidden"
              style={{ backgroundColor: "rgb(var(--border))" }}
            >
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-accent-2"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
