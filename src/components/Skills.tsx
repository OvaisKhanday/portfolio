import { FC } from "react";
import { AnimatedTooltip } from "./ui/AnimatedTooltip";
import { SKILLS } from "../lib/skills";

interface SkillsProps {}

const Skills: FC<SkillsProps> = () => {
  return (
    <div className=' flex flex-wrap gap-y-3 mt-4 sm:flex-nowrap flex-row items-center justify-center w-full'>
      <AnimatedTooltip items={SKILLS} />
    </div>
  );
};

export default Skills;
