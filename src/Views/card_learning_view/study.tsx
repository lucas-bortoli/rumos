import { useEffect, useState } from "react";
import VirtualBackButton from "../../Components/VirtualBackButton";
import { KnowledgeTrail } from "../../Game/Data/data";
import { addListener, removeListener } from "../../Lib/event_manager";
import useSound from "../../Lib/sound";
import useUpdateEffect from "../../Lib/use_update_effect";
import Card from "./Components/Card";
import useCardFeed from "./Hooks/use_card_feed";

interface CardLearningProps {
  trail: KnowledgeTrail;
}

export default function CardLearning(props: CardLearningProps) {
  const [cardHistory, currentCardIndex, goBack, goForward] = useCardFeed();
  const currentCard = cardHistory[currentCardIndex];

  const [swipeHintVisible, setSwipeHintVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setSwipeHintVisible((v) => !v);
      },
      swipeHintVisible ? 2000 : 8000
    );
    return () => clearTimeout(timer);
  }, [swipeHintVisible, currentCard]);

  const playCard1Sound = useSound({ name: "SndCards" });
  const playCard2Sound = useSound({ name: "SndCards2" });
  useUpdateEffect(() => {
    playCard1Sound();
  }, [currentCard]);

  useEffect(() => {
    const evt = addListener(document, "keyup", (k: KeyboardEvent) => {
      if (k.key === "ArrowLeft") {
        goBack();
      } else if (k.key === "ArrowRight") {
        goForward();
      }
    });
    return () => removeListener(evt);
  }, [goBack, goForward]);

  return (
    <main className="bg-grey-400 relative h-full w-full overflow-x-hidden overflow-y-scroll">
      <nav className="sticky top-0 z-10 mb-4 flex items-center gap-4 p-4 pb-3">
        <VirtualBackButton />
      </nav>
      {cardHistory.map((scrollCard, index) => {
        return (
          <Card
            key={scrollCard.key}
            feedPosition={index}
            currentCardPosition={currentCardIndex}
            previousCard={goBack}
            nextCard={goForward}
            onCardFlipped={playCard2Sound}
            front={
              <h3 className="absolute bottom-8 left-8 w-2/3 text-start text-2xl leading-6 font-semibold">
                {scrollCard.card.back}
              </h3>
            }
            back={
              <h3 className="absolute bottom-8 left-8 w-2/3 text-start text-2xl leading-6 font-semibold">
                {scrollCard.card.front}
              </h3>
            }
          />
        );
      })}
      {/*<footer className="absolute bottom-0 left-0 flex w-full flex-col items-stretch p-4">*/}
      {/*  <p className="text-center">{cardMode === "Front" ? "Frente" : "Verso"}</p>*/}
      {/*</footer>*/}
      {/*{swipeHintVisible && cardMode === "Front" && <TapHint />}*/}
      {/*{swipeHintVisible && cardMode === "Back" && <SwipeLeftHint />}*/}
    </main>
  );
}
