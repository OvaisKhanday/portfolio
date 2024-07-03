import { FC, HTMLAttributes } from "react";
import { AnimatedTooltip } from "./ui/AnimatedTooltip";
import { SKILLS } from "../lib/skills";
import { cn } from "../utils/cn";

interface SkillsProps extends HTMLAttributes<HTMLDivElement> {}

const Skills: FC<SkillsProps> = ({ className, ...props }) => {
  return (
    <div className={cn("flex flex-wrap gap-y-2 gap-x-1 items-center justify-center ", className)} {...props}>
      <AnimatedTooltip items={SKILLS} />
    </div>
  );
};

export default Skills;
