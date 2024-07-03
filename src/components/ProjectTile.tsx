import { Code2, Globe } from "lucide-react";
import { ProjectTileProps } from "../lib/projects";
import RevealAnimation from "./RevealAnimation";

const ProjectTile = ({ projectDetails }: { projectDetails: ProjectTileProps }) => {
  const { title, tagLine, description, imageUrl, liveLink, codeLink } = projectDetails;
  return (
    <div className='flex flex-col md:flex-row transition hover:scale-[1.015]'>
      <div
        className=' flex-shrink-0 p-4 flex flex-col justify-end text-left rounded-tl-lg rounded-bl-lg w-full md:w-60 min-h-64 bg-no-repeat bg-cover bg-slate-700 '
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className=' p-4 rounded-tr-lg rounded-br-lg text-left flex-grow bg-gray-700'>
        <RevealAnimation>
          <h2 className='font-bold text-2xl mb-1'>{title}</h2>
        </RevealAnimation>
        <RevealAnimation>
          <p className='text-slate-300 font-semibold'>{tagLine}</p>
        </RevealAnimation>

        <RevealAnimation>
          <p className='text-slate-400 font-normal text-sm'>{description}</p>
        </RevealAnimation>
        <div className='flex mt-4 gap-4'>
          <button
            disabled={!liveLink || liveLink === ""}
            title='live link'
            onClick={() => window.open(liveLink, "_blank")}
            className='flex gap-2 items-center'
          >
            <Globe className='w-6 h-6' />
            <p>Live</p>
          </button>
          <button
            disabled={!codeLink || codeLink === ""}
            title='code link'
            onClick={() => window.open(codeLink, "_blank")}
            className='flex gap-2 items-center'
          >
            <Code2 className='w-6 h-6' />
            <p>Code</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectTile;
