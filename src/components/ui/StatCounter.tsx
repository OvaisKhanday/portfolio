import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  durationMs?: number;
}

export function StatCounter({
  value,
  suffix = "",
  label,
  durationMs = 1400,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, durationMs]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: [0.6, 0.05, 0.3, 1] }}
      className="flex flex-col gap-1"
    >
      <span className="font-display text-4xl font-semibold tabular-nums text-fg sm:text-5xl">
        {display}
        <span className="text-accent">{suffix}</span>
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
        {label}
      </span>
    </motion.div>
  );
}
