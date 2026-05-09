import {
  forwardRef,
  useRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../../utils/cn";
import { useIsTouch } from "../../hooks/useIsTouch";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Magnetic pull strength (0–1). 0.3 ≈ subtle. */
  strength?: number;
  variant?: "primary" | "ghost" | "outline";
}

const VARIANT_STYLES: Record<NonNullable<MagneticButtonProps["variant"]>, string> = {
  primary:
    "bg-fg text-bg hover:bg-fg/90 shadow-[0_8px_30px_-8px_rgba(255,255,255,0.25)] dark:shadow-[0_8px_30px_-8px_rgba(255,255,255,0.25)]",
  ghost:
    "bg-surface/60 text-fg backdrop-blur-md border border-border hover:border-accent/60 hover:text-accent",
  outline:
    "bg-transparent text-fg border border-fg/40 hover:border-fg hover:bg-fg hover:text-bg",
};

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className, strength = 0.35, variant = "primary", ...props }, ref) => {
    const localRef = useRef<HTMLButtonElement | null>(null);
    const isTouch = useIsTouch();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });
    const innerX = useTransform(sx, (v) => v * 0.4);
    const innerY = useTransform(sy, (v) => v * 0.4);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isTouch) return;
      const el = localRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const offsetX = e.clientX - (rect.left + rect.width / 2);
      const offsetY = e.clientY - (rect.top + rect.height / 2);
      x.set(offsetX * strength);
      y.set(offsetY * strength);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.button
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: sx, y: sy }}
        data-cursor="hover"
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300",
          VARIANT_STYLES[variant],
          className
        )}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        <motion.span style={{ x: innerX, y: innerY }} className="relative z-10 inline-flex items-center gap-2">
          {children}
        </motion.span>
      </motion.button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";
