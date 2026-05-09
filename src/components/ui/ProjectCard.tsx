import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../lib/projects";
import { cn } from "../../utils/cn";
import { MediaCarousel } from "./MediaCarousel";

interface ProjectCardProps {
  project: Project;
  index: number;
  reverse?: boolean;
}

export function ProjectCard({ project, index, reverse }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.6, 0.05, 0.3, 1] }}
      className={cn(
        "group relative grid gap-8 lg:grid-cols-12 lg:gap-12",
        reverse && "lg:[&>*:first-child]:order-2"
      )}
    >
      {/* Visual */}
      <div className="relative lg:col-span-7">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-elevated">
          <MediaCarousel
            items={project.media}
            alt={`${project.title} preview`}
          />

          {/* Year tag (top-left) */}
          <div className="pointer-events-none absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.25em] text-white/80 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {project.year}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center lg:col-span-5">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-subtle">
            0{(index + 1).toString()} —
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            {project.featured ? "Featured" : "Selected work"}
          </span>
        </div>

        <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-2 text-base text-fg/80">{project.tagLine}</p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="hover"
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-fg"
            >
              View live
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
            </a>
          )}
          {project.codeLink && (
            <a
              href={project.codeLink}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="hover"
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-fg"
            >
              Source
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
