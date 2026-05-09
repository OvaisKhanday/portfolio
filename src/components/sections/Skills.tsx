import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Marquee } from "../ui/Marquee";
import {
  SKILLS,
  SKILL_CATEGORIES,
  type Skill,
  type SkillCategory,
} from "../../lib/skills";

const LEVEL_VALUE: Record<Skill["level"], number> = {
  advanced: 92,
  intermediate: 70,
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.6, 0.05, 0.3, 1] as [number, number, number, number] },
  }),
};

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const value = LEVEL_VALUE[skill.level];
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={cardVariants}
      data-cursor="hover"
      className="group relative overflow-hidden rounded-xl border border-border bg-surface/50 p-4 backdrop-blur-sm transition-colors hover:border-accent/60"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-lg bg-elevated/80 p-2 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
          <img
            src={skill.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-fg">{skill.name}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
            {skill.level}
          </p>
        </div>
      </div>

      <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-elevated">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: value / 100 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, delay: 0.1 + index * 0.04, ease: [0.6, 0.05, 0.3, 1] }}
          className="h-full origin-left bg-gradient-to-r from-accent to-accent-2"
          style={{ width: "100%" }}
        />
      </div>

      {/* Hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120px 80px at var(--mx,50%) var(--my,50%), rgb(var(--accent)/0.15), transparent 70%)",
        }}
      />
    </motion.div>
  );
}

function CategoryGroup({ category, skills }: { category: SkillCategory; skills: Skill[] }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-fg">{category}</h3>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-subtle">
          0{skills.length}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {skills.map((s, i) => (
          <SkillCard key={s.id} skill={s} index={i} />
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-24 overflow-hidden py-32 sm:py-40"
    >
      <div className="container-page">
        <div className="mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Toolkit"
            title="Tech I work with."
            description="A focused stack I've shipped production work with — picked for reliability, ergonomics, and DX."
          />
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:gap-x-16 lg:gap-y-14">
          {SKILL_CATEGORIES.map((cat) => (
            <CategoryGroup
              key={cat}
              category={cat}
              skills={SKILLS.filter((s) => s.category === cat)}
            />
          ))}
        </div>
      </div>

      {/* Tools marquee */}
      <div className="mt-24 border-y border-border/60 bg-surface/30 py-6">
        <Marquee duration={22}>
          {SKILLS.map((s) => (
            <div key={s.id} className="flex items-center gap-3 whitespace-nowrap">
              <img
                src={s.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-7 w-7 object-contain opacity-80"
              />
              <span className="font-display text-2xl font-medium tracking-tight text-muted sm:text-3xl">
                {s.name}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-border" aria-hidden />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
