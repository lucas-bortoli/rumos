import { motion } from "framer-motion";
import { PropsWithChildren, useRef, useState } from "react";
import { useSwipe } from "../../../Lib/use_swipe";

export type CardSide = "Front" | "Back";

interface CardProps {
  feedPosition: number;
  currentCardPosition: number;
  front?: PropsWithChildren["children"];
  back?: PropsWithChildren["children"];
  previousCard?: () => void;
  nextCard?: () => void;
  onCardFlipped?: () => void;
}

export default function Card(props: CardProps) {
  const cardWrapperRef = useRef<HTMLDivElement | null>(null);
  const [cardSide, setCardSide] = useState<CardSide>("Front");

  const flipCard = () => {
    setCardSide(cardSide === "Back" ? "Front" : "Back");
    props.onCardFlipped?.();
  };

  useSwipe({
    target: cardWrapperRef,
    threshold: 30,
    onSwipeEnd: (direction, distance) => {
      console.log({ direction, distance });
      if (direction === "left") {
        props.nextCard?.();
      } else if (direction === "right") {
        props.previousCard?.();
      }
    },
  });

  const isCurrentCard = props.feedPosition === props.currentCardPosition;

  return (
    <motion.div
      ref={cardWrapperRef}
      whileTap={{ scale: 1.05 }}
      onTap={flipCard}
      className="fixed top-1/2 left-1/2 aspect-[3/4] w-[calc(100%-theme('spacing.16'))] max-w-96 -translate-x-1/2 -translate-y-1/2"
      initial={{ x: innerWidth * 2 }}
      animate={{
        x: (innerWidth - 44) * (props.feedPosition - props.currentCardPosition),
        transition: { duration: 0.3, type: "spring" },
      }}
      exit={{ x: -innerWidth }}
      inert={!isCurrentCard}>
      {/* CARD BACK */}
      <motion.div
        className="absolute top-0 left-0 flex h-full w-full flex-col items-stretch overflow-hidden rounded-2xl bg-white p-8 text-center text-gray-600 shadow-2xl"
        style={{
          zIndex: cardSide === "Back" ? 10 : 0,
        }}
        animate={{
          scale: cardSide === "Back" ? 1 : 0.9,
          rotateY: cardSide === "Back" ? 0 : 90,
          transition: {
            duration: 0.2,
            ease: "easeInOut",
            delay: cardSide == "Back" ? 0.2 : 0,
          },
        }}
        transition={{
          duration: 1,
          type: "spring",
        }}
        onTap={flipCard}>
        {props.back}
      </motion.div>

      {/* CARD FRONT */}
      <motion.div
        className="absolute top-0 left-0 flex h-full w-full flex-col items-stretch overflow-hidden rounded-2xl bg-white p-8 text-center text-gray-600 shadow-2xl"
        style={{ zIndex: cardSide === "Front" ? 10 : 0 }}
        animate={{
          scale: cardSide === "Front" ? 1 : 0.9,
          rotateY: cardSide === "Front" ? 0 : 90,
          transition: {
            duration: 0.2,
            ease: "easeInOut",
            delay: cardSide == "Front" ? 0.2 : 0,
          },
        }}
        transition={{
          duration: 1,
          type: "spring",
        }}>
        {props.front}
      </motion.div>
    </motion.div>
  );
}
