import { motion, Variant } from "framer-motion";
import type { Window } from "..";
import { CurrentWindowKeyProvider } from "./current_window_key_context";

interface WindowContainerProps<P> {
  window: Window<P>;
  zIndex: number;
}

const screenVariants = {
  enter: {
    x: "100%",
    opacity: 0.7,
  } satisfies Variant,
  active: {
    x: "0%",
    opacity: 1,
    transition: {
      type: "easeIn",
      stiffness: 300,
      damping: 30,
    },
  } satisfies Variant,
  exit: {
    x: "100%",
    opacity: 0.7,
    transition: {
      ease: "easeIn",
      duration: 0.2,
    },
  } satisfies Variant,
};

export default function WindowContainer<P extends object>({
  window,
  zIndex,
}: WindowContainerProps<P>) {
  return (
    <motion.div
      className="absolute top-0 left-0 h-full w-full"
      style={{ zIndex }}
      data-window-key={window.key}
      initial="enter"
      animate="active"
      exit="exit"
      variants={screenVariants}>
      <CurrentWindowKeyProvider windowKey={window.key}>
        <window.component {...window.props} />
      </CurrentWindowKeyProvider>
    </motion.div>
  );
}
