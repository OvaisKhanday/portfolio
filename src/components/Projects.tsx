import { FC, useEffect, useState } from "react";
import ProjectTile, { ProjectTileProps } from "./ProjectTile";
import "./projects.json";

interface ProjectsProps {}

const Projects: FC<ProjectsProps> = () => {
  const [projects, setProjects] = useState<ProjectTileProps[]>([]);
  useEffect(() => {
    fetch("./projects.json").then((resp) => {
      resp.json().then((json: ProjectTileProps[]) => setProjects(json));
    });
  });
  return (
    <div className='mt-20'>
      <h2 className='text-4xl text-gray-400 font-bold '>Projects</h2>

      <div className='mt-6 grid gap-8 grid-cols-1 lg:grid-cols-2'>
        {projects.map((project) => (
          <ProjectTile key={project.id} projectDetails={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
