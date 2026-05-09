import { motion, type Variants } from "framer-motion";
import { cn } from "../../utils/cn";

interface AnimatedTextProps {
  text: string;
  className?: string;
  /** Element to render. Defaults to span. */
  as?: "span" | "h1" | "h2" | "h3" | "p";
  delay?: number;
  /** Stagger between word reveals (seconds). */
  stagger?: number;
  /** Trigger as soon as it mounts (true) instead of in-view. */
  immediate?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (custom: { stagger: number; delay: number }) => ({
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delay,
    },
  }),
};

const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.85, ease: [0.6, 0.05, 0.3, 1] },
  },
};

/**
 * Word-by-word reveal with masked overflow — produces a kinetic, "rolling
 * up" entry. Uses inline-block + overflow-hidden masks per word.
 */
export function AnimatedText({
  text,
  className,
  as = "span",
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: AnimatedTextProps) {
  const words = text.split(" ");
  const Component = motion[as] as typeof motion.span;

  const inViewProps = immediate
    ? { initial: "hidden" as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px" } as const,
      };

  return (
    <Component
      {...inViewProps}
      variants={containerVariants}
      custom={{ stagger, delay }}
      className={cn("inline-block", className)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden align-baseline"
          style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
        >
          <motion.span variants={wordVariants} className="inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
