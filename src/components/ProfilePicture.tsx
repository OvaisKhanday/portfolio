import { FC, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface ProfilePictureProps {}

const ProfilePicture: FC<ProfilePictureProps> = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainController = useAnimation();
  useEffect(() => {
    if (isInView) {
      mainController.start("visible");
    }
  }, [isInView, mainController]);
  return (
    <motion.div
      ref={ref}
      className='w-48 md:w-80 md:h-80 flex-shrink-0 h-48 rounded-full overflow-hidden  outline outline-2 outline-white'
      variants={{
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }}
      initial='hidden'
      animate={mainController}
      transition={{ duration: 1, delay: 0.25, ease: "linear" }}
    >
      <img src='/photo square.webp' alt='Profile' className='w-full h-full object-cover transition duration-500 hover:scale-125' />
    </motion.div>
  );
};

export default ProfilePicture;
