import Button from "../../Components/Button";
import VirtualBackButton from "../../Components/VirtualBackButton";
import { KnowledgeTrail } from "../../Game/Data/data";
import { useWindowing } from "../../Lib/compass_navigator";
import useCurrentWindowKey from "../../Lib/compass_navigator/window_container/current_window_key_context";
import CardStudyView from "./study";
import Img1 from "./trilha02.png";

interface CardLearningViewProps {
  trail: KnowledgeTrail;
}

export default function CardLearningView(props: CardLearningViewProps) {
  const windowing = useWindowing();
  const currentWindowKey = useCurrentWindowKey();

  function start() {
    windowing.createWindow({
      title: `Card Study - Inner`,
      component: CardStudyView,
      props: { trail: props.trail },
    });
    windowing.removeSpecificWindow(currentWindowKey);
  }

  return (
    <main className="relative h-full w-full overflow-x-hidden overflow-y-scroll bg-white">
      <nav className="border-grey-200 sticky top-0 z-10 mt-8 mb-4 flex items-center gap-4 border-b bg-white p-4 pb-3">
        <VirtualBackButton />
        <h1 className="text-xl">Estudo</h1>
      </nav>
      <section className="flex flex-col items-center gap-4 text-center">
        <img src={Img1} className="aspect-square w-full max-w-48 rounded-full" />
        <p className="mx-8">Aprenda o conteúdo através de flashcards.</p>
        <div className="mx-8 text-left">
          <p className="font-bold">Como funciona?</p>
          <ul className="ml-8 list-disc">
            <li>Cada cartão tem uma pergunta de um lado e uma resposta do outro.</li>
            <li>O objetivo é testar o quanto você sabe e ajudá-lo a memorizar as informações.</li>
            <li>Após responder cada cartão, você poderá ver a resposta correta.</li>
          </ul>
        </div>
        <Button onClick={start}>Iniciar</Button>
      </section>
    </main>
  );
}
