import { useCallback, useState } from "react";
import { pickRandomUniqueChoices } from "../../Lib/random";
import { STUDY_CARDS, StudyCard } from "../../Game/Data/data";

export default function useCardFeed() {
  const [card, setCard] = useState<StudyCard>(() => pickRandomUniqueChoices(STUDY_CARDS, 1)[0]);

  const advance = useCallback(
    function () {
      const withoutRecentlySeen = STUDY_CARDS.filter((k) => k.id !== card.id);
      console.log(withoutRecentlySeen);
      const nextCard = pickRandomUniqueChoices(withoutRecentlySeen, 1)[0];

      setCard(nextCard);
    },
    [card]
  );

  return [card, advance] as const;
}
