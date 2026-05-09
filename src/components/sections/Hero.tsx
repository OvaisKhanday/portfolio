import { Suspense, lazy, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatedText } from "../ui/AnimatedText";
import { MagneticButton } from "../ui/MagneticButton";
import { Marquee } from "../ui/Marquee";
import { PERSONAL } from "../../lib/personal";
import { useIsTouch } from "../../hooks/useIsTouch";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const HeroScene = lazy(() => import("../three/HeroScene"));

gsap.registerPlugin(ScrollTrigger, useGSAP as never);

const ROLES = [
  "Software engineer",
  "Backend engineering",
  "System design",
  "Scalable systems",
  "Distributed services",
  "Node · TypeScript",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const showScene = !isTouch && !reduced;

  // Scroll-driven hero parallax (dim + lift content as user leaves)
  useGSAP(
    () => {
      if (reduced) return;
      const ctx = gsap.context(() => {
        gsap.to(contentRef.current, {
          y: -60,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }, sectionRef);
      return () => ctx.revert();
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  // Refresh ScrollTrigger after fonts load (prevents jumps)
  useEffect(() => {
    const handle = setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => clearTimeout(handle);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-32 sm:pt-36"
    >
      {/* Three.js scene (lazy, gated) */}
      {showScene && (
        <Suspense fallback={null}>
          <HeroScene className="pointer-events-none absolute inset-0 -z-10 opacity-90" />
        </Suspense>
      )}
      {/* Static gradient fallback / bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-fade"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-b from-transparent to-bg"
      />

      {/*
       * The hero content lives inside a flex-1 zone so it can centre
       * vertically without overlapping the in-flow marquee below it. The
       * scroll-cue is positioned within this zone too, so it always sits
       * just above the marquee instead of behind it.
       */}
      <div className="relative flex flex-1 items-center pb-12">
        <div className="container-page relative w-full">
          <div ref={contentRef} className="flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.6, 0.05, 0.3, 1] }}
            className="inline-flex w-fit items-center gap-3 rounded-full border border-border bg-surface/40 px-3 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              Available for opportunities
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.6rem,9vw,8rem)] font-semibold leading-[0.95] tracking-tight text-fg">
            <AnimatedText
              text="Engineering reliable"
              as="span"
              delay={0.5}
              immediate
              className="block"
            />
            <span className="block">
              <AnimatedText
                text="systems built to"
                as="span"
                delay={0.7}
                immediate
                className="inline-block"
              />{" "}
              {/*
                Render the gradient word as a plain motion.span. Wrapping it in
                AnimatedText would put the actual glyphs inside an inner
                `will-change: transform` element, which creates a new
                compositing layer and prevents the parent's
                `background-clip: text` from painting on those glyphs.
              */}
              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 1.0,
                  ease: [0.6, 0.05, 0.3, 1],
                }}
                className="gradient-text inline-block animate-gradient"
              >
                scale.
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: [0.6, 0.05, 0.3, 1] }}
            className="grid max-w-3xl gap-6 sm:grid-cols-[auto_1fr] sm:items-end"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                {PERSONAL.role}
              </p>
              <p className="mt-2 font-display text-2xl font-medium text-fg">
                {PERSONAL.shortName} —
              </p>
            </div>
            <p className="text-base text-muted sm:text-lg">{PERSONAL.intro}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25, ease: [0.6, 0.05, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              variant="primary"
              onClick={() => (window.location.hash = "#work")}
            >
              See my work
              <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              onClick={() => window.open(PERSONAL.resumeUrl, "_blank")}
            >
              Download CV
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-subtle">
            Scroll
          </span>
          <span className="relative h-10 w-[1px] overflow-hidden bg-border">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/3 bg-fg"
              animate={{ y: ["-100%", "300%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
        </div>
      </div>

      {/* Roles marquee — sits in the natural bottom of the flex-col section. */}
      <div className="relative border-y border-border/60 bg-surface/40 py-3 backdrop-blur-sm">
        <Marquee duration={28}>
          {ROLES.map((role) => (
            <span
              key={role}
              className="flex items-center gap-12 font-display text-2xl font-medium tracking-tight text-muted sm:text-3xl"
            >
              <span>{role}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
