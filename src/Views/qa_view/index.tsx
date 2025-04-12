import Button from "../../Components/Button";
import VirtualBackButton from "../../Components/VirtualBackButton";
import { KnowledgeTrail } from "../../Game/Data/data";
import { useWindowing } from "../../Lib/compass_navigator";
import useCurrentWindowKey from "../../Lib/compass_navigator/window_container/current_window_key_context";
import { DocumentWhiteoutWindow } from "./_windows";
import Img1 from "./icon.png";

interface DocumentWhiteoutIntroProps {
  trail: KnowledgeTrail;
}

export default function DocumentWhiteoutIntro(props: DocumentWhiteoutIntroProps) {
  const windowing = useWindowing();
  const currentWindowKey = useCurrentWindowKey();

  function start() {
    windowing.createWindow(DocumentWhiteoutWindow, { trail: props.trail });
    windowing.removeWindow(currentWindowKey);
  }

  return (
    <main className="relative h-full w-full overflow-x-hidden overflow-y-scroll bg-white pb-16">
      <nav className="border-grey-200 sticky top-0 z-10 mt-8 mb-4 flex items-center gap-4 border-b bg-white p-4 pb-3">
        <VirtualBackButton />
        <h1 className="text-xl">Prática</h1>
      </nav>
      <section className="flex flex-col items-center gap-4 text-center">
        <img src={Img1} className="aspect-square w-full max-w-48 rounded-full" />
        <p className="mx-8">Aprenda como preencher um documento</p>
        <div className="mx-8 text-left">
          <p className="font-bold">Como funciona?</p>
          <ul className="ml-8 list-disc">
            <li>
              O objetivo é que o usuário aprenda como preencher corretamente um documento com os
              devidos dados e requisitos;
            </li>
            <li>
              Ao iniciar, um documento de Contrato de Locação será aberto em formato de
              preenchimento;
            </li>
            <li>
              Você deverá preencher corretamente o documento dentro de suas cláusulas e exigências;
            </li>
            <li>
              Ao terminar de preencher o documento, você receberá uma avaliação se o preenchimento
              está correto.
            </li>
          </ul>
        </div>
        <Button onClick={start}>Iniciar</Button>
      </section>
    </main>
  );
}
