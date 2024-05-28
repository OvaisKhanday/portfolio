import { FC } from "react";
import { AnimatedTooltip, AnimatedTooltipItemType } from "./ui/AnimatedTooltip";

interface SkillsProps {}

const SKILLS: AnimatedTooltipItemType[] = [
  {
    id: 1,
    name: "React.js",
    designation: "intermediate",
    image: "/react.png",
  },
  {
    id: 2,
    name: "Next.js",
    designation: "intermediate",
    image: "/next.png",
  },
  {
    id: 3,
    name: "Node.js",
    designation: "advanced",
    image: "/node.png",
  },
  {
    id: 4,
    name: "Express.js",
    designation: "advanced",
    image: "/express.png",
  },
  {
    id: 5,
    name: "MongoDB",
    designation: "advanced",
    image: "/mongo.png",
  },
  {
    id: 6,
    name: "JavaScript",
    designation: "advanced",
    image: "/javascript.png",
  },
  {
    id: 7,
    name: "TypeScript",
    designation: "intermediate",
    image: "/typescript.png",
  },
  {
    id: 8,
    name: "Java",
    designation: "intermediate",
    image: "/java.png",
  },
  {
    id: 9,
    name: "Flutter",
    designation: "intermediate",
    image: "/flutter.png",
  },
  {
    id: 10,
    name: "Tailwind",
    designation: "intermediate",
    image: "/tailwind.png",
  },
  {
    id: 11,
    name: "Git",
    designation: "advanced",
    image: "/git.png",
  },
  {
    id: 12,
    name: "MySQL",
    designation: "intermediate",
    image: "/mysql.png",
  },
  {
    id: 13,
    name: "REST API",
    designation: "intermediate",
    image: "/rest-api.png",
  },
  {
    id: 14,
    name: "Postman",
    designation: "intermediate",
    image: "/postman.png",
  },
];

const Skills: FC<SkillsProps> = () => {
  return (
    <div className='p-4 mt-20'>
      <h2 className='mb-6 text-4xl text-gray-400 font-bold'>Skills</h2>
      <div className=' flex flex-wrap gap-y-3 sm:flex-nowrap flex-row items-center justify-center w-full'>
        <AnimatedTooltip items={SKILLS} />
      </div>
    </div>
  );
};

export default Skills;
