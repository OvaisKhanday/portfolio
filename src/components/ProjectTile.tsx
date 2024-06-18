import { Code2, Globe } from "lucide-react";
import { ProjectTileProps } from "../lib/projects";

const ProjectTile = ({ projectDetails }: { projectDetails: ProjectTileProps }) => {
  const { title, tagLine, description, imageUrl, liveLink, codeLink } = projectDetails;
  return (
    <div className='flex flex-col md:flex-row transition hover:scale-[1.03]'>
      <div
        className=' flex-shrink-0 p-4 flex flex-col justify-end text-left rounded-tl-lg rounded-bl-lg w-full md:w-60 min-h-64 bg-no-repeat bg-cover bg-slate-700'
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className=' p-4 rounded-tr-lg rounded-br-lg text-left flex-grow bg-gray-700'>
        <h2 className='font-bold text-2xl mb-1'>{title}</h2>
        <p className='text-slate-300 font-bold'>{tagLine}</p>

        <p className='text-slate-400 font-bold'>{description}</p>
        <div className='flex mt-4 gap-4'>
          <button disabled={!liveLink || liveLink === ""} title='live link' onClick={() => window.open(liveLink, "_blank")}>
            <Globe className='w-6 h-6' />
          </button>
          <button disabled={!codeLink || codeLink === ""} title='code link' onClick={() => window.open(codeLink, "_blank")}>
            <Code2 className='w-6 h-6' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectTile;
