import { motion, Variant } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import DocumentArticle from "../../Components/DocumentArticle";
import Frame from "../../Components/Frame";
import { DOCUMENT_CONTRACT_HTML } from "../../Game/Data/data";
import { cn } from "../../Lib/class_names";
import { addListener, removeListener } from "../../Lib/event_manager";
import findElementInParents from "../../Lib/find_element_in_parents";
import qaStyle from "./qa.module.css";
import VirtualBackButton from "../../Components/VirtualBackButton";
import generateUUID from "../../Lib/uuid";
import { useMap } from "../../Lib/use_map";
import { useBackButtonHandler } from "../../Lib/back_button";
import { useWindowing } from "../../Lib/compass_navigator";
import useCurrentWindowKey from "../../Lib/compass_navigator/window_container/current_window_key_context";
import useAlert from "../../Components/AlertDialog";
import SvgIcon from "../../Components/SvgIcon";

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

type ChoiceId = string & { _tag?: "choiceId" };

interface Choice {
  id: ChoiceId;
  content: string;
}

type WhiteoutId = string & { _tag?: "whiteoutId" };

interface Whiteout {
  id: WhiteoutId;
  correctContent: string;
}

function getWhiteout(whiteout: Whiteout | WhiteoutId) {
  const id = typeof whiteout === "string" ? whiteout : whiteout.id;
  return document.querySelector(`[x-whiteout-id="${id}"]`)! as HTMLElement;
}

function censor(text: string) {
  return text; //text.replace(/[^\wç]/gi, " ").replace(/[\wç]/gi, ".");
}

export default function DocumentWhiteoutView() {
  const [choices, setChoices] = useMap<ChoiceId, Choice>([]);
  const [whiteouts, setWhiteouts] = useMap<WhiteoutId, Whiteout>([]);
  const [choiceToWhiteout, setChoiceToWhiteout] = useMap<ChoiceId, WhiteoutId>([]);
  const [clickedWhiteoutId, setClickedWhiteoutId] = useState<WhiteoutId | null>(null);

  const articleRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const article = articleRef.current;
    if (article === null) return;

    article.innerHTML = DOCUMENT_CONTRACT_HTML;

    //@ts-expect-error
    window.article = article;
    //s@ts-expect-error
    //window.setDeckVisible = setDeckVisible;

    const $whiteouts = [...article.querySelectorAll("whiteout")] as HTMLElement[];

    $whiteouts.forEach((w) => {
      w.setAttribute("x-whiteout-id", generateUUID());
    });

    const whiteouts: Whiteout[] = $whiteouts.map((w) => ({
      id: w.getAttribute("x-whiteout-id")!,
      correctContent: w.getAttribute("correct")!,
      selectedChoice: null,
    }));

    const choices: Choice[] = $whiteouts.map((w) => ({
      id: generateUUID(),
      content: w.getAttribute("correct")!,
      used: false,
    }));

    console.log({ choices, whiteouts });

    setClickedWhiteoutId(whiteouts[0].id);

    setChoices.reset();
    setChoices.setAll(choices.map((c) => [c.id, c]));
    setWhiteouts.reset();
    setWhiteouts.setAll(whiteouts.map((w) => [w.id, w]));
    setChoiceToWhiteout.reset();

    return () => {};
  }, []);

  useLayoutEffect(() => {
    // reset all styles
    whiteouts.forEach((whiteout) => {
      const $whiteout = getWhiteout(whiteout);
      $whiteout.innerText = censor(whiteout.correctContent);
      $whiteout.classList.add(qaStyle.whiteout);
      $whiteout.classList.toggle(qaStyle.populated, false);
      $whiteout.classList.toggle(qaStyle.clicked, clickedWhiteoutId === whiteout.id);
    });

    choiceToWhiteout.forEach((whiteoutId, choiceId) => {
      const choice = choices.get(choiceId)!;
      const $whiteout = getWhiteout(whiteoutId);
      $whiteout.classList.toggle(qaStyle.populated, true);
      $whiteout.innerText = choice.content;
    });
  }, [whiteouts, choiceToWhiteout, choices, clickedWhiteoutId]);

  useEffect(() => {
    const article = articleRef.current;
    if (article === null) return;

    const eventKey = addListener<MouseEvent>(article, "click", (event) => {
      if (!(event.target instanceof HTMLElement)) return;
      const targetWhiteout = findElementInParents(event.target, (e) => e.tagName === "WHITEOUT");
      if (targetWhiteout) {
        setClickedWhiteoutId(targetWhiteout.getAttribute("x-whiteout-id"));
      } else {
        setClickedWhiteoutId(null);
      }
    });
    return () => {
      removeListener(eventKey);
    };
  }, []);

  function handleListItemClick(choice: Choice) {
    if (!clickedWhiteoutId) return;

    const correspondingWhiteoutId = choiceToWhiteout.get(choice.id);

    choiceToWhiteout.forEach((val, key) => {
      if (val === clickedWhiteoutId) {
        setChoiceToWhiteout.remove(key);
      }
    });

    setChoiceToWhiteout.set(choice.id, clickedWhiteoutId);
  }

  const windowing = useWindowing();
  const currentWindowKey = useCurrentWindowKey();
  const showAlert = useAlert();
  useBackButtonHandler(async () => {
    if (windowing.windows.at(-1)?.key !== currentWindowKey) return;

    const choice = await showAlert({
      title: "Sair mesmo?",
      content: <p>O preenchimento do documento será perdido.</p>,
      buttons: { cancel: "Não", confirm: "Sair" },
    });
    if (choice === "cancel") return;
    setTimeout(() => {
      windowing.removeSpecificWindow(currentWindowKey);
    }, 300);
  });

  const [footerExpanded, setFooterExpanded] = useState(false);

  return (
    <main className="flex h-full w-full flex-col overflow-hidden bg-white">
      <nav className="flex items-center gap-4 border-b border-gray-200 bg-white p-4">
        <VirtualBackButton />
        <h1 className="text-xl">Meu Contrato de Locação</h1>
      </nav>
      <div className="relative shrink grow overflow-auto">
        <DocumentArticle className={cn("bg-grey-100 p-8 pb-96")} ref={articleRef} />
      </div>
      <motion.footer
        className="fixed bottom-0 left-0 flex w-full flex-col border-t border-gray-200 bg-white"
        animate={{ y: footerExpanded ? 0 : 128 }}>
        <div className="flex items-center gap-2 p-4">
          <button onClick={setFooterExpanded.bind(null, !footerExpanded)}>
            <SvgIcon
              icon={footerExpanded ? "KeyboardArrowDown" : "KeyboardArrowUp"}
              className="!h-8"
            />
          </button>
          {choiceToWhiteout.size} / {whiteouts.size}
        </div>
        <ul className="h-32 w-full overflow-y-scroll px-4 pb-4">
          {[...choices.values()].map((choice, i) => {
            const choiceWasUsed = choiceToWhiteout.has(choice.id);

            return (
              <motion.li
                key={`${choice}_${i}`}
                whileTap={{ scale: 1.05 }}
                className={cn(
                  "bg-grey-800 text-grey-200 mr-2 mb-2 inline-block rounded-lg p-2 shadow-sm",
                  choiceWasUsed && "line-through"
                )}
                onClick={handleListItemClick.bind(null, choice)}>
                <span>{choice.content}</span>
              </motion.li>
            );
          })}
        </ul>
      </motion.footer>
      {/* deck */}
      {/*<MotionFrame
        key="deck"
        className="fixed bottom-2 left-2 h-48 w-[calc(100%-theme('spacing.4'))]"
        animate={{ scale: clickedWhiteoutId ? 1 : 0 }}></MotionFrame>*/}
    </main>
  );
}
