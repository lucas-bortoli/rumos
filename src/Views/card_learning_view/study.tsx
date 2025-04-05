import { useEffect, useRef, useState } from "react";
import SvgIcon from "../../Components/SvgIcon";
import { BOSS_NAME, KnowledgeTrail } from "../../Game/Data/data";
import { useWindowing, WindowKey } from "../../Lib/compass_navigator";
import BattleView from "../battle_view";
import QAView from "../qa_view";
import Button from "../../Components/Button";
import Img1 from "./trilha02.png";
import { AnimatePresence, motion, Variant } from "framer-motion";
import { cn } from "../../Lib/class_names";
import SwipeLeftHint from "./Components/SwipeLeftHint";
import TapHint from "./Components/TapHint";
import Card, { CardMode } from "./Components/Card";
import useCardFeed from "./use_card_feed";

interface CardStudyViewProps {
  trail: KnowledgeTrail;
}

const wrapperVariants = {
  enter: {
    translateX: "100%",
  } satisfies Variant,
  active: {
    translateX: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.15,
    },
  } satisfies Variant,
  exit: {
    translateX: "-100%",
    transition: {
      ease: "easeOut",
      duration: 0.2,
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

  return (
    <main className="bg-grey-400 relative h-full w-full overflow-x-hidden overflow-y-scroll">
      <AnimatePresence>
        <motion.div
          key={card.id}
          className="fixed top-0 left-0 h-full w-full"
          ref={wrapperRef}
          variants={wrapperVariants}
          initial="enter"
          animate="active"
          exit="exit">
          <Card
            cardMode={cardMode}
            flipCard={() => setCardMode((m) => (m === "Back" ? "Front" : "Back"))}
            nextCard={nextCard}
            front={
              <h3 className="absolute bottom-8 left-8 w-2/3 text-start text-2xl font-semibold">
                {card.back}
              </h3>
            }
            back={
              <h3 className="absolute bottom-8 left-8 w-2/3 text-start text-2xl font-semibold">
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
