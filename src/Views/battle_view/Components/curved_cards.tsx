import { motion } from "framer-motion";
import { Key, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "../../../Lib/class_names";
import SvgIcon from "../../../Components/SvgIcon";

type HintCardKey = "HintCard" & { _tag?: "HintCardKey" };

interface Card {
  key: Key;
  title: string;
}

interface CurvedCardsProps {
  onCardClick: (key: Key | HintCardKey) => void;
  className?: string;
  cards: Card[];
}

export default function CurvedCards(props: CurvedCardsProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const [cardTranslations, setCardTranslations] = useState<number[]>([]);

  // Update translations based on horizontal position
  const updateTranslations = useCallback(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerCenter = (containerRect.left + containerRect.right) / 2;
    const cardElements = containerRef.current.querySelectorAll("[data-card-index]");

    let hasChanged = false;
    const newTranslations = Array.from(cardElements).map((cardEl, i) => {
      const cardRect = cardEl.getBoundingClientRect();
      const cardCenter = (cardRect.left + cardRect.right) / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      const maxLift = 50;
      const factor = Math.max(0, 1 - distance / (containerRect.width / 2)) * 0.6;
      const newY = -maxLift * factor;

      if (newY !== cardTranslations[i]) hasChanged = true;
      return newY;
    });

    if (hasChanged) setCardTranslations(newTranslations);
  }, [cardTranslations]);

  // Mouse wheel scrolls horizontally
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (containerRef.current) {
        event.preventDefault(); // Prevent vertical scroll
        containerRef.current.scrollBy({ left: event.deltaY / 2 });
      }
    };

    const handleResize = () => updateTranslations();
    const container = containerRef.current;

    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      container.addEventListener("scroll", updateTranslations);
    }
    window.addEventListener("resize", handleResize);

    updateTranslations();

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("scroll", updateTranslations);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [updateTranslations]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollLeft = container.scrollWidth / 2 - container.getBoundingClientRect().width / 2;
  }, []);

  return (
    <ul
      ref={containerRef}
      className={cn(
        "scrollbar-hide flex h-72 w-full overflow-x-scroll py-2 before:mr-24 after:ml-24",
        "pt-16", // overflow + translate-y hack
        props.className
      )}>
      {props.cards.map((card, index) => (
        <motion.li
          key={card.key}
          data-card-index={index}
          whileTap={{ scale: 1.05 }}
          animate={{ y: cardTranslations[index] || 0 }}
          transition={{ type: "spring", stiffness: 1500, damping: 30 }}
          className="relative mr-2 aspect-[3/4] h-full shrink-0 overflow-hidden rounded-lg bg-white p-4 text-gray-600 shadow-md"
          onClick={props.onCardClick.bind(null, card.key)}>
          <h3 className="text-md absolute bottom-4 left-4 w-2/3 font-semibold">{card.title}</h3>
        </motion.li>
      ))}
      <motion.li
        key="hint"
        whileTap={{ scale: 1.05 }}
        className="relative mr-2 aspect-[3/4] h-full shrink-0 overflow-hidden rounded-lg border-4 border-amber-300 bg-amber-100 p-4 text-amber-950 shadow-md"
        onClick={props.onCardClick.bind(null, "HintCard" satisfies HintCardKey)}>
        <SvgIcon icon="HotelClass" className="text-amber-300" />
        <h3 className="text-md absolute bottom-4 left-4 w-2/3 font-semibold">Dica</h3>
      </motion.li>
    </ul>
  );
}
