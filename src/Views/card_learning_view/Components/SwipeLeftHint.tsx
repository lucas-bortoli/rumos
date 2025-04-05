import { motion } from "framer-motion";
import SvgIcon from "../../../Components/SvgIcon";

const MotionSvgIcon = motion.create(SvgIcon);

export default function SwipeLeftHint() {
  return (
    <MotionSvgIcon
      icon="Touch"
      className="absolute top-1/2 right-1/6 z-10 !h-16"
      animate={{
        scale: [0, 1, 0.6, 1, 1, 1, 0],
        x: [0, 0, 0, -120, 0, 0, 0],
        rotate: [0, 0, 0, -15, 0, 0, 0],
      }}
      transition={{
        duration: 2,
        ease: "anticipate",
        repeat: Infinity,
      }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    />
  );
}
