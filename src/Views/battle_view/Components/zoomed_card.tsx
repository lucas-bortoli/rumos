import { motion, Variant } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useWindowing } from "../../../Lib/compass_navigator";
import useCurrentWindowKey from "../../../Lib/compass_navigator/window_container/current_window_key_context";
import useCurrentWindowBackButton from "../../../Lib/compass_navigator/window_container/use_current_window_back_button";
import { useSwipe } from "../Hooks/use_swipe";
import { cn } from "../../../Lib/class_names";
import SvgIcon from "../../../Components/SvgIcon";

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
  cardContent: string;
  isHintCard: boolean;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const MotionSvgIcon = motion.create(SvgIcon);

export default function ZoomedCard(props: ZoomedCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const currentWindowKey = useCurrentWindowKey();
  const windowing = useWindowing();

  function submit() {
    windowing.removeSpecificWindow(currentWindowKey);
    props.onSubmit?.();
  }

  function cancel() {
    windowing.removeSpecificWindow(currentWindowKey);
    props.onCancel?.();
  }

  useCurrentWindowBackButton(cancel);

  useSwipe({
    target: cardRef,
    threshold: 60,
    onSwipeEnd: (direction, distance) => {
      console.log({ direction, distance });
      if (direction === "up" && distance >= 180) {
        submit();
      } else if (direction === "down") {
        cancel();
      }
    },
  });

  const [swipeHintVisible, setSwipeHintVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSwipeHintVisible((v) => !v);
    }, 8000);
    return () => clearTimeout(timer);
  }, [swipeHintVisible]);

  return (
    <div className="absolute top-0 left-0 h-full w-full bg-black/50">
      <motion.div
        ref={cardRef}
        whileTap={{ scale: 1.05 }}
        variants={variants}
        initial="enter"
        animate="active"
        exit="exit"
        className={cn(
          "fixed top-1/2 left-8 flex aspect-[3/4] w-[calc(100%-theme('spacing.16'))] shrink-0 flex-col items-stretch overflow-hidden rounded-2xl p-8 text-center shadow-2xl",
          !props.isHintCard && "bg-white text-gray-600",
          props.isHintCard && "border-8 border-amber-700 bg-amber-100 text-amber-950"
        )}>
        {!props.isHintCard && <p>Deseja responder com essa carta?</p>}
        <SvgIcon
          icon={props.isHintCard ? "HotelClass" : "Explore"}
          className="absolute -translate-x-1/2 text-amber-700 opacity-20"
        />
        <h3 className="absolute bottom-8 left-8 w-2/3 text-start text-2xl font-semibold">
          {props.cardContent}
        </h3>
      </motion.div>
      {swipeHintVisible && (
        <MotionSvgIcon
          icon="SwipeVertical"
          className="absolute top-1/2 right-1/12 z-10 !h-16"
          animate={{
            y: [0, -120, 0, 120, 0],
            rotate: [0, 15, 0, -15, 0],
          }}
          transition={{
            duration: 3,
            ease: "anticipate",
            repeat: Infinity,
          }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        />
      )}
    </div>
  );
}
