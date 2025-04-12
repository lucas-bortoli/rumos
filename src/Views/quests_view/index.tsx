import { motion } from "framer-motion";
import NavigationBarBottom from "../../Components/NavigationBarBottom";
import { cn } from "../../Lib/class_names";
import { ACHIEVEMENTS } from "../../Game/Data/data";
import style from "./style.module.css";
import SvgIcon from "../../Components/SvgIcon";

export default function Quests() {
  return (
    <motion.main
      className="relative h-full w-full overflow-x-hidden overflow-y-scroll bg-white pb-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0 }}>
      <nav className="border-grey-200 sticky top-0 z-10 mt-8 mb-4 flex items-center gap-2 border-b bg-white p-4 pb-3">
        <h1 className="text-xl">Conquistas</h1>
      </nav>
      <section className="px-4">Aqui você pode ver suas conquistas e desafios.</section>
      <section className="flex flex-col pt-2">
        <h2 className="px-4 text-xl">Minhas Conquistas</h2>
        <ul className="flex h-60 w-full overflow-x-scroll py-2 before:mr-4 after:ml-4">
          {ACHIEVEMENTS.map((achievement) => {
            return (
              <li key={achievement.id} className={cn("relative mr-2")}>
                <div
                  className={cn(
                    "flex aspect-[3/4] h-full shrink-0 flex-col justify-end overflow-hidden rounded-2xl p-4 text-gray-100 shadow-md",
                    "opacity-20",
                    style.trilha_card
                  )}
                  style={{
                    "--card-bg": `url('${achievement.backgroundImage}')`,
                    backgroundPosition: "center",
                  }}>
                  <h3 className="w-2/3 text-lg leading-6 font-semibold">{achievement.title}</h3>
                </div>
                <SvgIcon
                  icon="Lock"
                  className="absolute top-1/2 left-1/2 !h-10 -translate-x-1/2 -translate-y-1/2 text-amber-800"
                />
              </li>
            );
          })}
        </ul>
      </section>
      <section className="flex flex-col pt-2">
        <header className="flex items-center gap-2 px-4">
          <h2 className="text-xl">Meu Inventário</h2>
          <SvgIcon icon="Inventory" className="!h-6 text-amber-900" />
        </header>
        <p className="text-grey-600 px-4 text-sm">0 / 25 itens</p>
        <div className="border-grey-600 text-grey-600 text-extra-sm mx-4 mt-2 flex h-32 w-[calc(100%-theme('spacing.8'))] items-center justify-center rounded-xl border border-dashed py-2">
          <p>Você não tem nenhum item ainda.</p>
        </div>
      </section>
      <NavigationBarBottom currentScreen="Quests" />
    </motion.main>
  );
}
