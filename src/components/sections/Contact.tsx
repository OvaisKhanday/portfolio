import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Linkedin, Mail } from "lucide-react";
import { AnimatedText } from "../ui/AnimatedText";
import { MagneticButton } from "../ui/MagneticButton";
import { PERSONAL } from "../../lib/personal";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { GithubIcon, XIcon } from "../ui/BrandIcons";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  { icon: GithubIcon, label: "GitHub", href: PERSONAL.socials.github, handle: "@ovaiskhanday" },
  { icon: Linkedin, label: "LinkedIn", href: PERSONAL.socials.linkedin, handle: "in/ovaiskhanday" },
  { icon: XIcon, label: "X", href: PERSONAL.socials.twitter, handle: "@ovaiskhanday" },
  { icon: Mail, label: "Email", href: PERSONAL.socials.email, handle: PERSONAL.email },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  // Slow background drift
  useGSAP(
    () => {
      if (reduced) return;
      gsap.to(".contact-blob", {
        xPercent: 12,
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative scroll-mt-24 overflow-hidden py-32 sm:py-40"
    >
      {/* Decorative gradient blobs */}
      <div
        aria-hidden
        className="contact-blob pointer-events-none absolute -left-40 top-1/4 -z-10 h-[36rem] w-[36rem] rounded-full bg-accent/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="contact-blob pointer-events-none absolute -right-40 bottom-1/4 -z-10 h-[28rem] w-[28rem] rounded-full bg-accent-2/20 blur-[120px]"
      />

      <div className="container-page">
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs uppercase tracking-[0.4em] text-muted"
          >
            Let's build something
          </motion.span>

          <h2 className="mt-6 font-display text-[clamp(2.6rem,9vw,8rem)] font-semibold leading-[0.95] tracking-tight text-fg">
            <AnimatedText text="Have a project" as="span" className="block" />
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.6, 0.05, 0.3, 1] }}
              className="gradient-text block animate-gradient"
            >
              in mind?
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-xl text-base text-muted sm:text-lg"
          >
            I'm available for full-time roles and selective freelance work. Drop
            a message — I usually reply within a day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.6, 0.05, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <MagneticButton
              variant="primary"
              onClick={() => (window.location.href = PERSONAL.socials.email)}
            >
              {PERSONAL.email}
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              onClick={() => window.open(PERSONAL.resumeUrl, "_blank")}
            >
              Download CV
            </MagneticButton>
          </motion.div>
        </div>

        {/* Socials grid */}
        <div className="mt-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="hover"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.05,
                ease: [0.6, 0.05, 0.3, 1],
              }}
              className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-xl border border-border bg-surface/50 p-5 backdrop-blur-sm transition hover:border-accent/60"
            >
              <div className="flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-elevated/80 text-fg transition-colors group-hover:bg-accent/15 group-hover:text-accent">
                  <s.icon size={18} strokeWidth={1.6} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-fg">{s.label}</p>
                  <p className="font-mono text-[11px] text-muted">{s.handle}</p>
                </div>
              </div>
              <ArrowUpRight
                size={18}
                className="text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
