import { useEffect, useRef } from "react";
import SvgIcon from "../../Components/SvgIcon";
import VirtualBackButton from "../../Components/VirtualBackButton";
import { BOSS_NAME, KnowledgeTrail } from "../../Game/Data/data";
import { useWindowing, WindowKey } from "../../Lib/compass_navigator";
import BattleView from "../battle_view";
import CardLearningView from "../card_learning_view";
import QAView from "../qa_view";

interface TrailMenuViewProps {
  trail: KnowledgeTrail;
}

export default function TrailMenuView(props: TrailMenuViewProps) {
  const windowing = useWindowing();
  const childWindowRef = useRef<WindowKey | null>(null);

  function onStudyClick() {
    if (childWindowRef.current) return;
    childWindowRef.current = windowing.createWindow({
      title: `Study - ${props.trail.title}`,
      component: CardLearningView,
      props: { trail: props.trail },
    });
  }
  function onPracticeClick() {
    if (childWindowRef.current) return;
    childWindowRef.current = windowing.createWindow({
      title: `Document View - ${props.trail.title}`,
      component: QAView,
      props: {},
    });
  }
  function onDuelClick() {
    if (childWindowRef.current) return;
    childWindowRef.current = windowing.createWindow({
      title: `Duel - ${props.trail.title} - ${BOSS_NAME}`,
      component: BattleView,
      props: {},
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
