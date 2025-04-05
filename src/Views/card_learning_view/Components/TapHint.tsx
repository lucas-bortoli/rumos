import { motion } from "framer-motion";
import SvgIcon from "../../../Components/SvgIcon";

const MotionSvgIcon = motion.create(SvgIcon);

export default function TapHint() {
  return (
    <MotionSvgIcon
      icon="Touch"
      className="absolute top-1/2 right-1/6 z-10 !h-16"
      animate={{
        x: [0, 20, 20, 12, 20, 20, 0],
        y: [0, 20, 20, 12, 20, 20, 0],
        scale: [0, 1, 1, 0.6, 1, 1, 0],
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
