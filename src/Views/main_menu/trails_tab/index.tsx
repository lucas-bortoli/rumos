import { motion } from "framer-motion";
import useAlert from "../../../Components/AlertDialog";
import NavigationBarBottom from "../../../Components/NavigationBarBottom";
import { KNOWLEDGE_TRAIL_CATEGORIES, KNOWLEDGE_TRAILS } from "../../../Game/Data/data";
import { cn } from "../../../Lib/class_names";
import { useWindowing } from "../../../Lib/compass_navigator";
import { useBackgroundSong } from "../../../Lib/sound/song_provider";
import { TrailMenuWindow } from "../../trail_menu_view/_windows";
import style from "./style.module.css";

export default function Home() {
  const windowing = useWindowing();
  const showAlert = useAlert();

  useBackgroundSong({ name: "MusLobby" });

  function trilhaNotAvailable() {
    showAlert({
      title: "Trilha indisponível",
      content: (
        <p>Desculpe, essa trilha está indisponível na versão de demonstração do aplicativo.</p>
      ),
      buttons: { ok: "OK" },
    });
  }

  return (
    <motion.main
      className="relative h-full w-full overflow-x-hidden overflow-y-scroll bg-white pb-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0 }}>
      <nav className="border-grey-200 sticky top-0 z-10 mt-8 mb-4 flex items-center gap-2 border-b bg-white p-4 pb-3">
        <h1 className="text-xl">Minhas Trilhas</h1>
      </nav>
      <section className="px-4">
        Aqui ficam as trilhas de conhecimento disponíveis. Você pode selecionar uma para iniciar!
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
                    ? windowing.createWindow(TrailMenuWindow, { trail })
                    : trilhaNotAvailable()
                }>
                <h3 className="w-full text-lg leading-6 font-semibold">{trail.title}</h3>
              </motion.li>
            ))}
          </ul>
        </section>
      ))}
      <NavigationBarBottom currentScreen="Home" />
    </motion.main>
  );
}
