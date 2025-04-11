import { useCallback, useState } from "react";
import { STUDY_CARDS, StudyCard } from "../../../Game/Data/data";
import { pickRandomUniqueChoices } from "../../../Lib/random";
import sequence, { Sequence } from "../../../Lib/sequence_generator";

const MAX_CARD_FEED_HISTORY_LEN = 16;

type ScrollCardKey = Sequence<"ScrollCardKey">;
const makeScrollCardKey = sequence<ScrollCardKey>();

interface ScrollCard {
  key: ScrollCardKey;
  card: StudyCard;
}

export default function useCardFeed() {
  // Initialize the card history with two randomly picked cards
  const [cardHistory, setCardHistory] = useState<ScrollCard[]>(() =>
    pickRandomUniqueChoices(STUDY_CARDS, MAX_CARD_FEED_HISTORY_LEN).map((card) => ({
      key: makeScrollCardKey(),
      card,
    }))
  );

  // Current card index in the history
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Go back to the previous card
  const goBack = useCallback(() => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  }, [currentCardIndex]);

  // Go forward to the next card
  const goForward = useCallback(() => {
    if (currentCardIndex < cardHistory.length - 2) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      const nextCard: ScrollCard = {
        key: makeScrollCardKey(),
        card: pickRandomUniqueChoices(
          STUDY_CARDS.filter((card) => !cardHistory.map((h) => h.card).includes(card)),
          1
        )[0],
      };

      setCardHistory((prevHistory) => {
        const newHistory = [...prevHistory, nextCard];
        while (newHistory.length > MAX_CARD_FEED_HISTORY_LEN) {
          newHistory.shift(); // Remove the oldest card to maintain history length
        }
        return newHistory;
      });
      setCurrentCardIndex(cardHistory.length - 2);
    }
  }, [cardHistory, currentCardIndex]);

  return [cardHistory, currentCardIndex, goBack, goForward] as const;
}
