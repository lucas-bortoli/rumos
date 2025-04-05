import { AnimatePresence, motion, Variant } from "framer-motion";
import Frame from "../../Components/Frame";
import { cn } from "../../Lib/class_names";
import { useWindowing } from "../../Lib/compass_navigator";
import DocumentArticle from "../../Components/DocumentArticle";
import BattleView from "../battle_view";
import { DOCUMENT_CONTRACT_HTML } from "../../Game/Data/data";
import Button from "../../Components/Button";
import { useEffect, useMemo, useRef, useState } from "react";
import qaStyle from "./qa.module.css";
import { addListener, removeListener } from "../../Lib/event_manager";
import findElementInParents from "../../Lib/find_element_in_parents";

const MotionFrame = motion.create(Frame);

const variants = {
  enter: {
    translateY: "150%",
    opacity: 0.7,
  } satisfies Variant,
  active: {
    translateY: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.15,
    },
  } satisfies Variant,
  exit: {
    translateY: "150%",
    transition: {
      ease: "easeIn",
      duration: 0.2,
    },
  } satisfies Variant,
};

export default function QAView() {
  const windowing = useWindowing();

  const [choices, setChoices] = useState<string[]>([]);
  const [clickedWhiteout, setClickedWhiteout] = useState<HTMLElement | null>(null);

  function gotobattle() {
    windowing.createWindow({
      component: BattleView,
      props: {},
      title: "Battle View",
    });
  }

  const articleRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const article = articleRef.current;
    if (article === null) return;

    article.innerHTML = DOCUMENT_CONTRACT_HTML;

    //@ts-expect-error
    window.article = article;
    //s@ts-expect-error
    //window.setDeckVisible = setDeckVisible;

    const whiteouts = [...article.querySelectorAll("whiteout")] as HTMLElement[];
    const choices = whiteouts.map((w) => w.getAttribute("correct")!);

    console.log({ whiteouts, choices });

    whiteouts.forEach((w) => {
      const correctContent = w.getAttribute("correct")!;
      w.innerText = correctContent.replace(/[^\wç]/gi, " ").replace(/[\wç]/gi, ".");
      w.className = cn(
        "font-mono bg-amber-200 shadow-inset-pixel text-transparent",
        qaStyle.whiteout
      );
    });

    setChoices(choices);

    return () => {};
  }, []);

  useEffect(() => {
    const article = articleRef.current;
    if (article === null) return;

    const eventKey = addListener<MouseEvent>(article, "click", (event) => {
      if (!(event.target instanceof HTMLElement)) return;
      const targetWhiteout = findElementInParents(event.target, (e) => e.tagName === "WHITEOUT");
      if (targetWhiteout) {
        setClickedWhiteout(targetWhiteout);
      } else {
        setClickedWhiteout(null);
      }
    });
    return () => {
      removeListener(eventKey);
    };
  }, []);

  return (
    <main className="flex h-full w-full flex-col overflow-hidden bg-white">
      <nav className="flex items-center gap-2 border-b border-gray-200 bg-white p-4">
        <h1 className="text-xl">Meu Contrato de Locação</h1>
        <Button onClick={gotobattle}>Gotobattle</Button>
      </nav>
      <div className="relative shrink grow overflow-auto">
        <DocumentArticle className={cn("bg-grey-100 p-8 pb-96")} ref={articleRef} />
      </div>
      {/* deck */}
      <MotionFrame
        key="deck"
        className="fixed bottom-2 left-2 h-48 w-[calc(100%-theme('spacing.4'))]"
        animate={{ scale: clickedWhiteout ? 1 : 0 }}>
        <ul className="flex h-full w-full flex-wrap gap-2 overflow-y-scroll p-2">
          {choices.map((choice, i) => {
            return (
              <motion.li
                key={`${choice}_${i}`}
                whileTap={{ scale: 1.05 }}
                className="mr-2 inline-flex shrink-0 flex-col items-stretch justify-end overflow-hidden rounded-lg bg-white p-4 text-gray-600 shadow-sm">
                <span className="">{choice}</span>
              </motion.li>
            );
          })}
        </ul>
      </MotionFrame>
    </main>
  );
}
