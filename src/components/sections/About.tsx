import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeading } from "../ui/SectionHeading";
import { StatCounter } from "../ui/StatCounter";
import { PERSONAL } from "../../lib/personal";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  // Parallax photo
  useGSAP(
    () => {
      if (reduced || !photoWrapRef.current) return;
      gsap.fromTo(
        photoWrapRef.current,
        { y: 40 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative scroll-mt-24 py-32 sm:py-40"
    >
      <div className="container-page">
        <div className="grid gap-16 lg:grid-cols-[5fr_6fr] lg:gap-20">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.3, 1] }}
            className="relative"
          >
            <div ref={photoWrapRef} className="relative mx-auto aspect-[4/5] max-w-md">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/40 to-accent-2/40 opacity-60 blur-2xl" />
              <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-surface">
                <img
                  src="/profile.jpeg"
                  alt={`Portrait of ${PERSONAL.name}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-smooth hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent" />
              </div>
              {/* Floating tag */}
              <div className="glass absolute -bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full px-4 py-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-accent/20 text-[11px] font-mono text-accent">
                  {PERSONAL.shortName.slice(0, 2).toUpperCase()}
                </span>
                <span className="text-xs text-fg">
                  Based in <span className="text-muted">{PERSONAL.location}</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow="About"
              title="Backend engineer obsessed with scale."
              description={PERSONAL.longBio}
            />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.6, 0.05, 0.3, 1], delay: 0.1 }}
              className="text-base text-muted"
            >
              I gravitate toward system design — modeling domains, picking the
              right primitives, and building services that hold up under
              traffic, failure, and the edge cases nobody planned for. Most of
              my work is in Node.js, TypeScript, and Java; the principles
              travel.
            </motion.p>

            <div className="grid grid-cols-3 gap-6 border-t border-border/60 pt-10">
              {PERSONAL.stats.map((s) => (
                <StatCounter
                  key={s.label}
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
