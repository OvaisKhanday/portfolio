import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { ProjectMedia } from "../../lib/projects";
import { cn } from "../../utils/cn";

interface MediaCarouselProps {
  items: ProjectMedia[];
  /** Fallback alt for images/videos that don't supply their own. */
  alt: string;
  /** Auto-advance interval in ms. Set to 0 to disable. */
  interval?: number;
  className?: string;
}

/**
 * A media carousel for project showcases.
 *
 * Behavior:
 * - Auto-advances on a configurable interval, but only when the carousel is in
 *   view. We pause the timer when the user hovers the carousel (so they can
 *   read it), when a video slide is actively playing, and when the page is
 *   not visible.
 * - Crossfades between slides via Framer Motion AnimatePresence.
 * - For video slides: a centered play button overlay starts playback. While a
 *   video is playing, auto-advance is suspended; when the video ends or is
 *   paused, auto-advance resumes (subject to the other gates).
 * - Single-slide carousels render as a static image with no chrome.
 */
export function MediaCarousel({
  items,
  alt,
  interval = 5000,
  className,
}: MediaCarouselProps) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [inView, setInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const hasMultiple = items.length > 1;
  const current = items[index];

  // Track in-view state so we don't burn CPU on off-screen carousels.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? true),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-advance gate.
  useEffect(() => {
    if (!hasMultiple || interval <= 0) return;
    if (hovered || videoPlaying || !inView) return;
    const id = window.setTimeout(() => {
      setIndex((i) => (i + 1) % items.length);
    }, interval);
    return () => window.clearTimeout(id);
  }, [index, hovered, videoPlaying, inView, items.length, interval, hasMultiple]);

  // When the slide changes, reset any prior video state.
  useEffect(() => {
    setVideoPlaying(false);
    const v = videoRef.current;
    if (v) {
      try {
        v.pause();
        v.currentTime = 0;
      } catch {
        /* noop */
      }
    }
  }, [index]);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % items.length),
    [items.length]
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + items.length) % items.length),
    [items.length]
  );

  const handleVideoToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {
        /* user-gesture or codec issue — silently ignore */
      });
    } else {
      v.pause();
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("group/carousel relative h-full w-full overflow-hidden", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.55, ease: [0.6, 0.05, 0.3, 1] }}
          className="absolute inset-0"
        >
          {current.type === "image" ? (
            <img
              src={current.src}
              alt={current.alt ?? alt}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-full w-full select-none object-cover"
            />
          ) : (
            <>
              <video
                ref={videoRef}
                poster={current.poster}
                preload="metadata"
                playsInline
                onPlay={() => setVideoPlaying(true)}
                onPause={() => setVideoPlaying(false)}
                onEnded={() => setVideoPlaying(false)}
                aria-label={current.alt ?? alt}
                className="h-full w-full select-none object-cover"
              >
                <source
                  src={current.src}
                  type={current.mimeType ?? "video/mp4"}
                />
              </video>

              <button
                type="button"
                aria-label={videoPlaying ? "Pause video" : "Play video"}
                onClick={handleVideoToggle}
                data-cursor="hover"
                className={cn(
                  "absolute inset-0 grid place-items-center transition-opacity duration-300",
                  videoPlaying
                    ? "opacity-0 hover:opacity-100"
                    : "opacity-100"
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-0 transition-colors duration-300",
                    videoPlaying ? "bg-transparent" : "bg-black/30"
                  )}
                />
                <span className="relative grid h-16 w-16 place-items-center rounded-full bg-white/95 text-black shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:scale-110 sm:h-20 sm:w-20">
                  {videoPlaying ? (
                    <Pause size={22} fill="currentColor" />
                  ) : (
                    <Play size={22} fill="currentColor" className="ml-0.5" />
                  )}
                </span>
              </button>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Top-right counter */}
      {hasMultiple && (
        <div className="pointer-events-none absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.25em] text-white/90 backdrop-blur-md">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </div>
      )}

      {/* Prev/Next arrows */}
      {hasMultiple && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={prev}
            data-cursor="hover"
            className="absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 hover:bg-black/60 group-hover/carousel:opacity-100"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={next}
            data-cursor="hover"
            className="absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 hover:bg-black/60 group-hover/carousel:opacity-100"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Pagination dots */}
      {hasMultiple && (
        <div className="absolute inset-x-0 bottom-3 z-20 flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              data-cursor="hover"
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index
                  ? "w-8 bg-white"
                  : "w-1.5 bg-white/40 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
