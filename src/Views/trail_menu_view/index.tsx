import { useEffect, useRef, useState } from "react";
import SvgIcon from "../../Components/SvgIcon";
import VirtualBackButton from "../../Components/VirtualBackButton";
import { BOSS_NAME, KnowledgeTrail } from "../../Game/Data/data";
import { useWindowing, WindowKey } from "../../Lib/compass_navigator";
import BattleView from "../battle_view";
import CardLearningView from "../card_learning_view";
import DocumentWhiteoutIntroductionView from "../qa_view";
import useAlert from "../../Components/AlertDialog";
import FeedbackForm from "../welcome/feedback_form";
import delay from "../../Lib/delay";
import { useGameState } from "../../Game/Data";

interface TrailMenuViewProps {
  trail: KnowledgeTrail;
}

export default function TrailMenuView(props: TrailMenuViewProps) {
  const windowing = useWindowing();
  const childWindowRef = useRef<WindowKey | null>(null);
  const showAlert = useAlert();
  const game = useGameState();

  async function requestFeedback() {
    if (game.data.userGaveFeedback) return;

    await delay(1000);
    const response = await showAlert({
      title: "Feedback",
      content: <p>Está gostando da plataforma? Por favor, nos diga o que você está achando.</p>,
      buttons: { ok: "OK" },
    });
    const key = windowing.createWindow({
      component: FeedbackForm,
      props: { onSubmit: () => windowing.removeSpecificWindow(key) },
      title: "Feedback Form View",
      backButton: false,
    });
  }

  function onStudyClick() {
    if (childWindowRef.current) return;
    childWindowRef.current = windowing.createWindow({
      title: `Card Study Introduction View - ${props.trail.title}`,
      component: CardLearningView,
      props: { trail: props.trail },
    });
  }
  function onPracticeClick() {
    if (childWindowRef.current) return;
    childWindowRef.current = windowing.createWindow({
      title: `Document Whiteout Introduction View - ${props.trail.title}`,
      component: DocumentWhiteoutIntroductionView,
      props: { trail: props.trail },
    });
  }
  function onDuelClick() {
    if (childWindowRef.current) return;
    childWindowRef.current = windowing.createWindow({
      title: `Duel - ${props.trail.title} - ${BOSS_NAME}`,
      component: BattleView,
      props: {
        onBattleDone: async () => {
          requestFeedback();
        },
      },
      backButton: false,
    });
  }

  useEffect(() => {
    return () => {
      if (childWindowRef.current) {
        windowing.removeSpecificWindow(childWindowRef.current);
        childWindowRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // are we holding a reference to an nonexistent window?
    if (
      childWindowRef.current !== null &&
      windowing.windows.find((w) => w.key === childWindowRef.current)
    ) {
      childWindowRef.current = null;
    }
  }, [windowing]);

  return (
    <main className="relative h-full w-full overflow-x-hidden overflow-y-scroll bg-white pb-20">
      <nav className="border-grey-200 sticky top-0 z-10 mt-8 flex items-center gap-4 border-b bg-white p-4 pb-3">
        <VirtualBackButton />
        <h1 className="text-xl">{props.trail.title}</h1>
      </nav>
      <section className="border-grey-400 flex border-b px-4 py-4" onClick={onStudyClick}>
        <header></header>
        <main className="flex shrink grow basis-0 flex-col">
          <h1 className="text-lg">Estudo</h1>
          <p>Aprenda os conceitos dessa trilha usando flashcards</p>
        </main>
        <footer className="flex items-center justify-center">
          <SvgIcon icon="ChevronRight" className="!h-8" />
        </footer>
      </section>
      <section className="border-grey-400 flex border-b px-4 py-4" onClick={onPracticeClick}>
        <header></header>
        <main className="flex shrink grow basis-0 flex-col">
          <h1 className="text-lg">Prática</h1>
          <p>Aplique os conceitos da trilha em um documento</p>
        </main>
        <footer className="flex items-center justify-center">
          <SvgIcon icon="ChevronRight" className="!h-8" />
        </footer>
      </section>
      <section
        className="border-grey-400 flex border-b bg-green-50 px-4 py-4"
        onClick={onDuelClick}>
        <header></header>
        <main className="flex shrink grow basis-0 flex-col">
          <h1 className="text-lg">Desafio</h1>
          <p>Duele com {BOSS_NAME}! Quem sabe mais sobre o assunto?</p>
        </main>
        <footer className="flex items-center justify-center">
          <SvgIcon icon="ChevronRight" className="!h-8" />
        </footer>
      </section>
    </main>
  );
}
