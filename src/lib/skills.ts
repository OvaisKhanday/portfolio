export type SkillLevel = "advanced" | "intermediate";
export type SkillCategory = "Frontend" | "Backend" | "Mobile" | "Tools & DB";

export interface Skill {
  id: number;
  name: string;
  level: SkillLevel;
  category: SkillCategory;
  image: string;
}

export const SKILLS: Skill[] = [
  { id: 1, name: "React", level: "advanced", category: "Frontend", image: "/react.png" },
  { id: 2, name: "Next.js", level: "advanced", category: "Frontend", image: "/next.png" },
  { id: 3, name: "TypeScript", level: "intermediate", category: "Frontend", image: "/typescript.png" },
  { id: 4, name: "JavaScript", level: "advanced", category: "Frontend", image: "/javascript.png" },
  { id: 5, name: "Tailwind CSS", level: "advanced", category: "Frontend", image: "/tailwind.png" },
  { id: 6, name: "Redux", level: "advanced", category: "Frontend", image: "/redux.png" },

  { id: 7, name: "Node.js", level: "advanced", category: "Backend", image: "/node.png" },
  { id: 8, name: "NestJS", level: "intermediate", category: "Backend", image: "/nestjs.svg" },
  { id: 9, name: "Express", level: "advanced", category: "Backend", image: "/express.png" },
  { id: 10, name: "REST APIs", level: "advanced", category: "Backend", image: "/rest-api.png" },
  { id: 11, name: "Java", level: "intermediate", category: "Backend", image: "/java.png" },

  { id: 12, name: "Flutter", level: "intermediate", category: "Mobile", image: "/flutter.png" },

  { id: 13, name: "PostgreSQL", level: "intermediate", category: "Tools & DB", image: "/postgresql.svg" },
  { id: 14, name: "MongoDB", level: "advanced", category: "Tools & DB", image: "/mongo.png" },
  { id: 15, name: "MySQL", level: "intermediate", category: "Tools & DB", image: "/mysql.png" },
  { id: 16, name: "Git", level: "advanced", category: "Tools & DB", image: "/git.png" },
  { id: 17, name: "Postman", level: "advanced", category: "Tools & DB", image: "/postman.png" },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  "Frontend",
  "Backend",
  "Mobile",
  "Tools & DB",
];
