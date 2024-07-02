import { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <div className='mt-20'>
      <div className='h-[1px] w-full bg-zinc-200' />
      <div className='flex flex-col justify-between text-sm sm:flex-row text-slate-400'>
        <p>Thank you for visiting</p>
        <p>Designed and Developed by Ovais with ❤️</p>
      </div>
    </div>
  );
};

export default Footer;
