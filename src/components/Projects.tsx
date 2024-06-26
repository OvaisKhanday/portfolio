import { FC } from "react";
import "../lib/projects";
import ProjectTile from "./ProjectTile";
import { PROJECTS } from "../lib/projects";

interface ProjectsProps {}

const Projects: FC<ProjectsProps> = () => {
  return (
    <div className='mt-20'>
      {/* <RevealAnimation className='flex justify-center items-center text-center flex-grow w-full' style={{ width: "100%" }}>
        <h2 className='text-2xl text-gray-400/90 font-bold '>
          Projects<span className='font-medium text-gray-400/60 text-xl'> - Here are some of my projects</span>
        </h2>
      </RevealAnimation> */}
      <div className='flex gap-4 justify-between items-baseline'>
        <div className='h-[1px] bg-zinc-400/60 w-full ' />
        <p className='font-bold text-zinc-400 text-2xl'>
          Projects<span className='text-5xl font-extrabold text-white'>.</span>
        </p>
      </div>

      <div className='mt-6 grid gap-4 grid-cols-1 lg:grid-cols-2'>
        {PROJECTS.map((project) => (
          <ProjectTile key={project.id} projectDetails={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
