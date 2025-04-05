import { useEffect, useState } from "react";

/**
 * A hook that progressively reveals a text string over time, creating a typewriter effect.
 *
 * @param text - The full text to display.
 * @param speed - The time (in ms) between each character reveal.
 * @returns The currently visible portion of the text.
 */
export default function useScrollingText(text: string, speed: number = 50): string {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    if (!text) return;

    let index = 0;
    setVisibleText(""); // Reset for new text

    const interval = setInterval(() => {
      index++;
      setVisibleText(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return visibleText;
}
