import { AnimatePresence, motion, Variant } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { KnowledgeTrail } from "../../Game/Data/data";
import useSound from "../../Lib/sound";
import useUpdateEffect from "../../Lib/use_update_effect";
import Card, { CardMode } from "./Components/Card";
import SwipeLeftHint from "./Components/SwipeLeftHint";
import TapHint from "./Components/TapHint";
import useCardFeed from "./use_card_feed";
import VirtualBackButton from "../../Components/VirtualBackButton";
import { cn } from "../../Lib/class_names";

interface CardStudyViewProps {
  trail: KnowledgeTrail;
}

const wrapperVariants = {
  enter: {
    scale: 0.8,
    translateX: "100%",
  } satisfies Variant,
  active: {
    scale: 1,
    translateX: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.15,
    },
  } satisfies Variant,
  exit: {
    scale: 0.8,
    translateX: "-200%",
    transition: {
      ease: "linear",
      duration: 0.25,
    },
  } satisfies Variant,
};

export default function CardStudyView(props: CardStudyViewProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [cardMode, setCardMode] = useState<CardMode>("Front");

  const [card, nextCard] = useCardFeed();

  const [swipeHintVisible, setSwipeHintVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(
      () => {
        setSwipeHintVisible((v) => !v);
      },
      swipeHintVisible ? 2000 : 8000
    );
    return () => clearTimeout(timer);
  }, [swipeHintVisible, card]);

  useEffect(() => {
    setCardMode("Front");
  }, [card]);

  const playCard1Sound = useSound({ name: "SndCards" });
  const playCard2Sound = useSound({ name: "SndCards2" });
  useUpdateEffect(() => {
    playCard1Sound();
  }, [card]);
  useUpdateEffect(() => {
    playCard2Sound();
  }, [cardMode]);

  return (
    <main className="bg-grey-400 relative h-full w-full overflow-x-hidden overflow-y-scroll">
      <nav className="sticky top-0 z-10 mb-4 flex items-center gap-4 p-4 pb-3">
        <VirtualBackButton />
      </nav>
      <AnimatePresence>
        <motion.div
          key={card.id}
          className="fixed top-0 left-0 h-full w-full"
          ref={wrapperRef}
          variants={wrapperVariants}
          initial="enter"
          animate="active"
          exit="exit">
          <motion.div
            className={cn(
              "fixed top-1/2 left-[calc(100%-30px)] flex aspect-[3/4] w-[calc(100%-theme('spacing.16'))] max-w-96 shrink-0 -translate-y-1/2 scale-90 flex-col items-stretch overflow-hidden rounded-2xl bg-white p-8 text-center text-gray-600 shadow-2xl"
            )}
            initial={{ x: "100%" }}
            animate={{
              x: [-5, 5, -5],
            }}
            transition={{
              duration: 5, // Adjust duration as needed
              type: "linear", // optional: use a spring transition for a bouncy effect
              repeat: Infinity,
            }}
            exit={{ x: "-100%", transition: { duration: 0.2 } }}
          />
          <Card
            cardMode={cardMode}
            flipCard={() => setCardMode((m) => (m === "Back" ? "Front" : "Back"))}
            nextCard={nextCard}
            front={
              <h3 className="absolute bottom-8 left-8 w-2/3 text-start text-2xl leading-6 font-semibold">
                {card.back}
              </h3>
            }
            back={
              <h3 className="absolute bottom-8 left-8 w-2/3 text-start text-2xl leading-6 font-semibold">
                {card.front}
              </h3>
            }
          />
        </motion.div>
      </AnimatePresence>
      <footer className="absolute bottom-0 left-0 flex w-full flex-col items-stretch p-4">
        <p className="text-center">{cardMode === "Front" ? "Frente" : "Verso"}</p>
      </footer>
      {swipeHintVisible && cardMode === "Front" && <TapHint />}
      {swipeHintVisible && cardMode === "Back" && <SwipeLeftHint />}
    </main>
  );
}
