import { useEffect, useRef, useState } from "react";
import { useIsTouch } from "../../hooks/useIsTouch";

/**
 * Custom cursor — desktop only. Adds a small dot + a trailing ring that grows
 * over `[data-cursor]` interactive elements.
 */
export function Cursor() {
  const isTouch = useIsTouch();
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouch) return;
    if (window.matchMedia("(pointer: fine)").matches) {
      setEnabled(true);
      document.documentElement.classList.add("has-custom-cursor");
    }
    return () => document.documentElement.classList.remove("has-custom-cursor");
  }, [isTouch]);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      const scale = hovering ? 1.7 : 1;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      hovering = !!target?.closest(
        "[data-cursor], a, button, input, textarea, [role='button']"
      );
      ring.dataset.hover = hovering ? "true" : "false";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg mix-blend-difference"
      />
      <div
        ref={ringRef}
        aria-hidden
        data-hover="false"
        className="pointer-events-none fixed left-0 top-0 z-[99] h-9 w-9 rounded-full border border-fg/60 mix-blend-difference transition-[border-color,background-color] duration-300 data-[hover=true]:border-fg data-[hover=true]:bg-fg/10"
      />
    </>
  );
}
