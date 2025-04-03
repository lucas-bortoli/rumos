import { motion, Variant } from "framer-motion";
import { useRef } from "react";
import { useWindowing } from "../../Lib/compass_navigator";
import useCurrentWindowKey from "../../Lib/compass_navigator/window_container/current_window_key_context";
import useCurrentWindowBackButton from "../../Lib/compass_navigator/window_container/use_current_window_back_button";
import { useSwipe } from "./use_swipe";

const variants = {
  enter: {
    translateY: "0%",
    scale: 0.3,
  } satisfies Variant,
  active: {
    translateY: "-50%",
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.15,
    },
  } satisfies Variant,
  exit: {
    translateY: "0%",
    scale: 0.3,
    transition: {
      ease: "easeIn",
      duration: 0.2,
    },
  } satisfies Variant,
};

interface ZoomedCardProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export default function ZoomedCard(props: ZoomedCardProps) {
  const cardRef = useRef<HTMLLIElement | null>(null);
  const currentWindowKey = useCurrentWindowKey();
  const windowing = useWindowing();

  function submit() {
    windowing.removeSpecificWindow(currentWindowKey);
    props.onSubmit();
  }

  function cancel() {
    windowing.removeSpecificWindow(currentWindowKey);
    props.onCancel();
  }

  useCurrentWindowBackButton(cancel);

  useSwipe({
    target: cardRef,
    threshold: 120,
    onSwipeEnd: (direction) => {
      if (direction === "up") {
        submit();
      } else if (direction === "down") {
        cancel();
      }
    },
  });

  return (
    <div className="absolute top-0 left-0 h-full w-full bg-black/50">
      <motion.li
        ref={cardRef}
        whileTap={{ scale: 1.05 }}
        variants={variants}
        initial="enter"
        animate="active"
        exit="exit"
        className="fixed top-1/2 left-8 flex aspect-[3/4] w-[calc(100%-theme('spacing.16'))] shrink-0 flex-col justify-end overflow-hidden rounded-2xl bg-white p-4 text-gray-600 shadow-2xl">
        <h3 className="w-2/3 text-lg font-semibold">Card</h3>
      </motion.li>
    </div>
  );
}
