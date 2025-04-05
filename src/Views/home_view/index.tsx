import { motion } from "framer-motion";
import useAlert from "../../Components/AlertDialog";
import SvgIcon from "../../Components/SvgIcon";
import { cn } from "../../Lib/class_names";
import { useWindowing } from "../../Lib/compass_navigator";
import useCurrentWindowKey from "../../Lib/compass_navigator/window_container/current_window_key_context";
import MarketplaceView from "../marketplace_view";
import QAView from "../qa_view";
import style from "./style.module.css";
import Trilha01 from "./trilha01.png";
import Trilha02 from "./trilha02.png";
import {
  KNOWLEDGE_TRAIL_CATEGORIES,
  KNOWLEDGE_TRAILS,
  KnowledgeTrail,
  KnowledgeTrailCategory,
} from "../../Game/Data/data";

interface Trilha {
  titulo: string;
  modulos: {
    id: number;
    background: string;
    titulo: string;
    disabled?: boolean;
  }[];
}

export default function HomeView() {
  const windowing = useWindowing();
  const showAlert = useAlert();

  function trilhaNotAvailable() {
    showAlert({
      title: "Trilha indisponível",
      content: (
        <p>Desculpe, essa trilha está indisponível na versão de demonstração do aplicativo.</p>
      ),
      buttons: { ok: "OK" },
    });
  }

  const currentWindowKey = useCurrentWindowKey();
  function goTo(other: "marketplace" | "home") {
    switch (other) {
      case "home":
        windowing.createWindow({
          component: HomeView,
          props: {},
          title: "Minhas Trilhas",
          noAnimation: true,
        });
        break;
      case "marketplace":
        windowing.createWindow({
          component: MarketplaceView,
          props: {},
          title: "Marketplace",
          noAnimation: true,
        });
        break;
    }

    windowing.removeSpecificWindow(currentWindowKey);
  }

  return (
    <main className="relative h-full w-full overflow-x-hidden overflow-y-scroll bg-white pb-20">
      <nav className="border-grey-200 sticky top-0 z-10 mt-8 mb-4 flex items-center gap-2 border-b bg-white p-4 pb-3">
        <h1 className="text-xl">Minhas Trilhas</h1>
      </nav>
      <section className="px-4">
        Aqui ficam as trilhas do conhecimento disponíveis. Você pode selecionar uma para iniciar!
      </section>
      {KNOWLEDGE_TRAIL_CATEGORIES.map((category) => (
        <section className="flex flex-col pt-2" key={category.id}>
          <h2 className="px-4 text-xl">{category.title}</h2>
          <ul className="flex h-60 w-full overflow-x-scroll py-2 before:mr-4 after:ml-4">
            {KNOWLEDGE_TRAILS.filter((t) => t.categoryId === category.id).map((trail) => (
              <motion.li
                key={trail.id}
                whileTap={trail.isEnabled ? { scale: 1.05 } : undefined}
                className={cn(
                  "mr-2 flex aspect-[3/4] h-full shrink-0 flex-col justify-end overflow-hidden rounded-2xl p-4 text-gray-100 shadow-md",
                  !trail.isEnabled && "opacity-20 shadow-none",
                  style.trilha_card
                )}
                style={{ "--card-bg": `url('${trail.backgroundImage}')` }}
                onClick={() =>
                  trail.isEnabled
                    ? windowing.createWindow({
                        component: QAView,
                        props: {},
                        title: "QA",
                      })
                    : trilhaNotAvailable()
                }>
                <h3 className="w-full text-lg font-semibold">{trail.title}</h3>
              </motion.li>
            ))}
          </ul>
        </section>
      ))}
      <footer className="bg-grey-100 border-grey-200 fixed bottom-0 left-0 z-10 flex w-full items-center border-t px-16 py-4">
        <div className="text-grey-400 flex h-12 w-full items-center justify-between">
          <div onClick={() => goTo("marketplace")} className="h-full">
            <SvgIcon icon="Explore" />
          </div>
          <div onClick={() => goTo("home")} className="h-full">
            <SvgIcon icon="AccountCircle" className="text-lime-600" />
          </div>
          <div className="h-full">
            <SvgIcon icon="BarChart" />
          </div>
        </div>
      </footer>
    </main>
  );
}
