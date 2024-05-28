import { Linkedin, Mail, Twitter } from "lucide-react";
import { FC } from "react";

interface IntroductionProps {}

const Introduction: FC<IntroductionProps> = () => {
  return (
    <div className='flex flex-col  gap-4 items-center justify-around md:flex-row'>
      <div className='w-48 md:w-80 md:h-80 flex-shrink-0 h-48 rounded-full overflow-hidden transition hover:scale-105 outline outline-2 outline-white'>
        <img src='/photo square.webp' alt='Profile' className='w-full h-full object-cover' />
      </div>
      <div className='text-center md:text-left max-w-2xl'>
        <h1 className='font-extrabold mb-6 lg:pb-3 pb-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-5xl lg:text-6xl'>
          Ovais Ahmad Khanday
        </h1>
        <h3 className='font-bold text-xl text-zinc-300/85 mb-1'>Software Developer</h3>
        <p className='text-zinc-400'>
          An Aspiring Learner of Software Development, looking for career options and willing to expand my horizons by learning new things every day
          both technology and otherwise.
        </p>
        <div className='mt-3 flex md:justify-start justify-center items-center gap-2'>
          <button className='rounded-lg  bg-zinc-600 text-zinc-50' onClick={() => window.open("/Resume SD.pdf", "_blank")}>
            Download CV ✨
          </button>
          <span className='w-10'></span>
          <button className='bg-gray-700' onClick={() => window.open("https://linkedin.com/in/ovaiskhanday", "_blank")}>
            <Linkedin className=' text-blue-400' />
          </button>
          <button className='bg-gray-700' onClick={() => window.open("mailto:ovaiskhanday927@gmail.com", "_blank")}>
            <Mail className=' text-red-600' />
          </button>
          <button className='bg-gray-700' onClick={() => window.open("https://twitter.com/ovaiskhanday", "_blank")}>
            <Twitter className=' text-zinc-200' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
