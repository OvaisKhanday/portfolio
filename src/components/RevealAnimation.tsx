import { FC, HTMLAttributes, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "../utils/cn";

interface RevealAnimationProps extends HTMLAttributes<HTMLDivElement> {}

const RevealAnimation: FC<RevealAnimationProps> = ({ children, className, ...props }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true });
  const mainControl = useAnimation();
  const slideControl = useAnimation();

  useEffect(() => {
    if (inView) {
      mainControl.start("visible");
      slideControl.start("visible");
    }
  }, [inView, mainControl, slideControl]);

  return (
    <div ref={ref} className={cn("relative", className)} style={{ width: "fit-content" }} {...props}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial='hidden'
        animate={mainControl}
        transition={{ delay: 0.25, duration: 0.6 }}
      >
        {children}
      </motion.div>
      <motion.div
        className='overflow-hidden'
        variants={{ hidden: { left: 0 }, visible: { left: "100%" } }}
        initial='hidden'
        animate={slideControl}
        transition={{ duration: 0.6, delay: 0.25 }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          right: 0,
          left: 0,
          background: "var(--accent)",
          zIndex: 20,
        }}
      />
    </div>
  );
};

export default RevealAnimation;
