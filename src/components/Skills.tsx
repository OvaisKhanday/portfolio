import { FC } from "react";
import { AnimatedTooltip } from "./ui/AnimatedTooltip";
import { SKILLS } from "../lib/skills";

interface SkillsProps {}

const Skills: FC<SkillsProps> = () => {
  return (
    <div className='p-4 mt-20'>
      <h2 className='mb-6 text-4xl text-gray-400 font-bold  '>Skills</h2>
      <div className=' flex flex-wrap gap-y-3 sm:flex-nowrap flex-row items-center justify-center w-full'>
        <AnimatedTooltip items={SKILLS} />
      </div>
    </div>
  );
};

export default Skills;
