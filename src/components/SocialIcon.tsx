import { FC } from "react";

interface SocialIconProps {
  children: React.ReactNode;
}

const SocialIcon: FC<SocialIconProps> = ({ children }) => {
  return <span className='border-2 border-zinc-500 w-11 flex justify-center items-center rounded-full h-11   bg-zinc-600'>{children}</span>;
};

export default SocialIcon;
