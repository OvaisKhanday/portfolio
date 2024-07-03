export interface AnimatedTooltipItemType {
  id: number;
  name: string;
  designation: string;
  image: string;
}
export const SKILLS: AnimatedTooltipItemType[] = [
  {
    id: 1,
    name: "React.js",
    designation: "advanced",
    image: "/react.png",
  },
  {
    id: 2,
    name: "Next.js",
    designation: "advanced",
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
    designation: "advanced",
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
    name: "Redux",
    designation: "advanced",
    image: "/redux.png",
  },
] as const;
