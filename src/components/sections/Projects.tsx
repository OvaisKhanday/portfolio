import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "../ui/ProjectCard";
import { PROJECTS } from "../../lib/projects";
import { PERSONAL } from "../../lib/personal";

export function Projects() {
  return (
    <section id="work" className="relative scroll-mt-24 py-32 sm:py-40">
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Things I've built."
            description="A small set of projects that show how I think about product, design, and engineering."
          />
          <a
            href={PERSONAL.socials.github}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="hover"
            className="group/all inline-flex items-center gap-2 self-start rounded-full border border-border px-4 py-2 text-sm text-muted transition hover:border-fg hover:text-fg sm:self-end"
          >
            All projects on GitHub
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover/all:-translate-y-0.5 group-hover/all:translate-x-0.5"
            />
          </a>
        </div>

        <div className="mt-20 flex flex-col gap-28">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
