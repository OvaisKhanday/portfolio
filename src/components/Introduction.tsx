import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { FC } from "react";
import RevealAnimation from "./RevealAnimation";
import Skills from "./Skills";
import ProfilePicture from "./ProfilePicture";

interface IntroductionProps {}

const Introduction: FC<IntroductionProps> = () => {
  return (
    <div className='flex flex-col gap-4 items-center justify-around md:flex-row'>
      <ProfilePicture />
      <div className='text-center md:text-left max-w-2xl text-xs'>
        {/* <RevealAnimation> */}
        <h1 className='font-extrabold mb-6 lg:pb-3 pb-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-4xl md:text-5xl lg:text-6xl '>
          Ovais Ahmad Khanday
        </h1>
        {/* </RevealAnimation> */}
        <RevealAnimation style={{ width: "100%" }}>
          <h3 className='font-bold text-xl text-zinc-300/85 mb-1 w-full  text-center md:text-left'>Software Developer</h3>
        </RevealAnimation>
        <RevealAnimation>
          <p className='text-zinc-400 '>
            An Aspiring Learner of Software Development, looking for career options and willing to expand my horizons by learning new things every day
            both technology and otherwise.
          </p>
        </RevealAnimation>
        <div className='mt-3 flex md:justify-start justify-center items-center gap-2'>
          <button
            className='rounded-lg  bg-zinc-600 text-zinc-50 h-10'
            onClick={() => window.open("https://raw.githubusercontent.com/OvaisKhanday/Markdowns/main/cloud/resume.pdf", "_blank")}
          >
            Download CV ✨
          </button>
          <span className='w-2 md:w-10' />
          <button className='bg-gray-700 h-10 hover:bg-blue-600' onClick={() => window.open("https://linkedin.com/in/ovaiskhanday", "_blank")}>
            <Linkedin className=' text-zinc-200' />
          </button>
          <button className='bg-gray-700 h-10 hover:bg-red-800' onClick={() => window.open("mailto:ovaiskhanday927@gmail.com", "_blank")}>
            <Mail className=' text-zinc-200 ' />
          </button>
          <button className='bg-gray-700 h-10 hover:bg-blue-500' onClick={() => window.open("https://twitter.com/ovaiskhanday", "_blank")}>
            <Twitter className=' text-zinc-200' />
          </button>
          <button className='bg-gray-700 h-10 hover:bg-black' onClick={() => window.open("https://github.com/ovaiskhanday", "_blank")}>
            <Github className=' text-zinc-200' />
          </button>
        </div>
        <Skills className='mt-4 px-6' />
      </div>
    </div>
  );
};

export default Introduction;
