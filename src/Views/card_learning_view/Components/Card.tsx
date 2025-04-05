import { motion } from "framer-motion";
import { PropsWithChildren, useRef } from "react";
import SvgIcon from "../../../Components/SvgIcon";
import { cn } from "../../../Lib/class_names";
import { useSwipe } from "../../../Lib/use_swipe";

export type CardMode = "Front" | "Back";

interface CardProps {
  cardMode: CardMode;
  front?: PropsWithChildren["children"];
  back?: PropsWithChildren["children"];
  flipCard?: () => void;
  nextCard?: () => void;
}

export default function Card(props: CardProps) {
  const cardFrontRef = useRef<HTMLDivElement | null>(null);
  const cardBackRef = useRef<HTMLDivElement | null>(null);

  useSwipe({
    target: cardBackRef,
    threshold: 60,
    onSwipeEnd: (direction, distance) => {
      console.log({ direction, distance });
      if (direction === "left" && distance >= 180) {
        props.nextCard?.();
      }
    },
  });

  return (
    <>
      {/* CARD BACK */}
      <motion.div
        ref={cardBackRef}
        whileTap={{ scale: 1.05 }}
        className={cn(
          "fixed top-1/2 left-1/2 flex aspect-[3/4] w-[calc(100%-theme('spacing.16'))] max-w-96 shrink-0 -translate-x-1/2 -translate-y-1/2 flex-col items-stretch overflow-hidden rounded-2xl bg-white p-8 text-center text-gray-600 shadow-2xl",
          props.cardMode !== "Back" && "shadow-none"
        )}
        animate={{
          scale: props.cardMode === "Back" ? 1 : 0.6,
          rotateY: props.cardMode === "Back" ? 0 : 90,
          zIndex: props.cardMode === "Back" ? 10 : 0,
        }}
        transition={{
          duration: 1, // Adjust duration as needed
          type: "spring", // optional: use a spring transition for a bouncy effect
        }}
        onTap={props.flipCard}>
        <SvgIcon
          icon="Explore"
          className="absolute right-0 translate-x-1/2 -scale-x-100 text-amber-700 opacity-20"
        />
        {props.back}
      </motion.div>

      {/* CARD FRONT */}
      <motion.div
        ref={cardFrontRef}
        whileTap={{ scale: 1.05 }}
        className={cn(
          "fixed top-1/2 left-1/2 flex aspect-[3/4] w-[calc(100%-theme('spacing.16'))] max-w-96 shrink-0 -translate-x-1/2 -translate-y-1/2 flex-col items-stretch overflow-hidden rounded-2xl bg-white p-8 text-center text-gray-600 shadow-2xl",
          props.cardMode !== "Front" && "shadow-none"
        )}
        animate={{
          scale: props.cardMode === "Front" ? 1 : 0.6,
          rotateY: props.cardMode === "Front" ? 0 : 90,
          zIndex: props.cardMode === "Front" ? 10 : 0,
        }}
        transition={{
          duration: 1, // Adjust duration as needed
          type: "spring", // optional: use a spring transition for a bouncy effect
        }}
        onTap={props.flipCard}>
        <SvgIcon icon="Explore" className="absolute -translate-x-1/2 text-amber-700 opacity-20" />
        {props.front}
      </motion.div>
    </>
  );
}
