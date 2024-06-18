import { FC } from "react";
import "../lib/projects";
import ProjectTile from "./ProjectTile";
import { PROJECTS } from "../lib/projects";

interface ProjectsProps {}

const Projects: FC<ProjectsProps> = () => {
  return (
    <div className='mt-20'>
      <h2 className='text-4xl text-gray-400 font-bold '>Projects</h2>

      <div className='mt-6 grid gap-8 grid-cols-1 lg:grid-cols-2'>
        {PROJECTS.map((project) => (
          <ProjectTile key={project.id} projectDetails={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
