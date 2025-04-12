import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useAlert from "../../Components/AlertDialog";
import Button from "../../Components/Button";
import DocumentArticle from "../../Components/DocumentArticle";
import SvgIcon from "../../Components/SvgIcon";
import VirtualBackButton from "../../Components/VirtualBackButton";
import { DOCUMENT_CONTRACT_HTML, KnowledgeTrail } from "../../Game/Data/data";
import { cn } from "../../Lib/class_names";
import useProvideCurrentWindow from "../../Lib/compass_navigator/window_container/use_provide_current_window";
import { addListener, removeListener } from "../../Lib/event_manager";
import findElementInParents from "../../Lib/find_element_in_parents";
import { useMap } from "../../Lib/use_map";
import generateUUID from "../../Lib/uuid";
import qaStyle from "./qa.module.css";

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

interface DocumentWhiteoutProps {
  trail: KnowledgeTrail;
}

export default function DocumentWhiteout(props: DocumentWhiteoutProps) {
  const [choices, setChoices] = useMap<ChoiceId, Choice>([]);
  const [whiteouts, setWhiteouts] = useMap<WhiteoutId, Whiteout>([]);
  const [choiceToWhiteout, setChoiceToWhiteout] = useMap<ChoiceId, WhiteoutId>([]);
  const [clickedWhiteoutId, setClickedWhiteoutId] = useState<WhiteoutId | null>(null);

  const [correctnessMap, setCorrectnessMap] = useMap<WhiteoutId, boolean>([]);

  const articleRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const article = articleRef.current;
    if (article === null) return;

    article.innerHTML = DOCUMENT_CONTRACT_HTML;

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

      $whiteout.classList.toggle(qaStyle.correct, false);
      $whiteout.classList.toggle(qaStyle.incorrect, false);

      const correctness = correctnessMap.get(whiteout.id) ?? null;
      if (correctness === true) {
        $whiteout.classList.toggle(qaStyle.correct, true);
      } else if (correctness === false) {
        $whiteout.classList.toggle(qaStyle.incorrect, true);
      }
    });

    choiceToWhiteout.forEach((whiteoutId, choiceId) => {
      const choice = choices.get(choiceId)!;
      const $whiteout = getWhiteout(whiteoutId);
      $whiteout.classList.toggle(qaStyle.populated, true);
      $whiteout.innerText = choice.content;
    });
  }, [whiteouts, choiceToWhiteout, choices, clickedWhiteoutId, correctnessMap]);

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

    choiceToWhiteout.forEach((val, key) => {
      if (val === clickedWhiteoutId) {
        setChoiceToWhiteout.remove(key);
      }
    });

    setChoiceToWhiteout.set(choice.id, clickedWhiteoutId);
  }

  function doValidate() {
    setCorrectnessMap.reset();
    setClickedWhiteoutId(null);

    let score = whiteouts.size; // start with perfect score

    const whiteoutToChoice = new Map([...choiceToWhiteout.entries()].map(([k, v]) => [v, k]));

    // remove score for each item missing
    whiteouts.forEach((whiteout) => {
      if (!whiteoutToChoice.has(whiteout.id)) {
        score--;
        setCorrectnessMap.set(whiteout.id, false);
      }
    });

    // remove score for wrong items
    choiceToWhiteout.forEach((whiteoutId, choiceId) => {
      const choice = choices.get(choiceId)!;
      const whiteout = whiteouts.get(whiteoutId)!;

      if (whiteout.correctContent.trim() !== choice.content.trim()) {
        score--;
        setCorrectnessMap.set(whiteout.id, false);
      } else {
        setCorrectnessMap.set(whiteout.id, true);
      }
    });

    showAlert({
      title: "Preenchimento do Documento",
      content: (
        <div>
          <p>
            Sua pontuação:{" "}
            <b className="font-bold">
              {score} de {whiteouts.size} pontos
            </b>
            .
          </p>
          {score === whiteouts.size ? (
            <p>Parabéns! Você obteve uma pontuação perfeita.</p>
          ) : (
            <p>
              Vamos tentar novamente? Ainda faltam alguns campos a serem preenchidos corretamente.
            </p>
          )}
        </div>
      ),
      buttons: { ok: "OK" },
    });
  }

  const showAlert = useAlert();

  useProvideCurrentWindow({
    backButtonHandler: async (killThisWindow) => {
      const choice = await showAlert({
        title: "Sair mesmo?",
        content: <p>O preenchimento do documento será perdido.</p>,
        buttons: { cancel: "Não", confirm: "Sair" },
      });
      if (choice === "cancel") return;
      setTimeout(killThisWindow, 300);
    },
  });

  const [footerExpanded, setFooterExpanded] = useState(true);

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
          <span className="shrink grow basis-0">
            {choiceToWhiteout.size} / {whiteouts.size} preenchidos
          </span>
          <Button onClick={doValidate} className="flex items-center gap-2">
            <SvgIcon icon="Touch" className="!h-4" />
            Validar
          </Button>
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
    </main>
  );
}
