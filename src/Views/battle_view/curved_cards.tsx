import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../Lib/class_names";

export default function CurvedCards() {
  const containerRef = useRef<HTMLUListElement>(null);
  const [cardTranslations, setCardTranslations] = useState<number[]>([]);
  const cards = [0, 1, 2, 3, 4, 5, 6, 7];

  // Throttle the update function using requestAnimationFrame
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

      const maxLift = 30;
      const factor = Math.max(0, 1 - distance / (containerRect.width / 2)) * 2;
      const newY = -maxLift * factor;

      if (newY !== cardTranslations[i]) hasChanged = true;
      return newY;
    });

    if (hasChanged) setCardTranslations(newTranslations);
  }, [cardTranslations]);

  useEffect(() => {
    let animationFrame: number;

    const handleScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateTranslations);
    };

    const handleResize = () => updateTranslations();

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }
    window.addEventListener("resize", handleResize);

    // Initial calculation
    updateTranslations();

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, [updateTranslations]);

  return (
    <ul
      ref={containerRef}
      className={cn(
        "scrollbar-hide flex h-72 w-full overflow-x-scroll py-2 before:mr-24 after:ml-24",
        "-mt-24 pt-24" // overflow + translate-y hack
      )}>
      {cards.map((card, index) => (
        <motion.li
          key={card}
          data-card-index={index}
          whileTap={{ scale: 1.05 }}
          animate={{ y: cardTranslations[index] || 0 }}
          transition={{ type: "spring", stiffness: 1500, damping: 30 }}
          className="mr-2 flex aspect-[3/4] h-full shrink-0 flex-col justify-end overflow-hidden rounded-lg bg-white p-4 text-gray-600 shadow-md">
          <h3 className="w-2/3 text-lg font-semibold">Card {card}</h3>
        </motion.li>
      ))}
    </ul>
  );
}
