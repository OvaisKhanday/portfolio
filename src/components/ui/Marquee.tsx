import { type ReactNode } from "react";
import { cn } from "../../utils/cn";

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
  /** Loop duration in seconds. Lower = faster. */
  duration?: number;
  /** Whether to pause when the user hovers the marquee. */
  pauseOnHover?: boolean;
}

/**
 * A CSS-driven marquee.
 *
 * Renders the same `children` block twice, side by side, in equal-width
 * containers. The track translates by exactly -50%, which lines the second
 * copy up perfectly with where the first started — so the loop is seamless
 * regardless of how the children are spaced internally.
 */
export function Marquee({
  children,
  reverse = false,
  className,
  duration = 25,
  pauseOnHover = false,
}: MarqueeProps) {
  return (
    <div className={cn("group relative flex w-full overflow-hidden", className)}>
      <div
        className={cn(
          "flex shrink-0 will-change-transform",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center gap-12 pr-12">{children}</div>
        <div
          aria-hidden
          className="flex shrink-0 items-center gap-12 pr-12"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
