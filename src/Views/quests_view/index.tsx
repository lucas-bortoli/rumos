import { motion } from "framer-motion";
import NavigationBarBottom from "../../Components/NavigationBarBottom";
import { cn } from "../../Lib/class_names";
import useSound from "../../Lib/sound";

export default function QuestsView() {
  return (
    <motion.main
      className="relative h-full w-full overflow-x-hidden overflow-y-scroll bg-white pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0 }}>
      <nav className="border-grey-200 sticky top-0 z-10 mt-8 mb-4 flex items-center gap-2 border-b bg-white p-4 pb-3">
        <h1 className="text-xl">Conquistas</h1>
      </nav>
      <section className="px-4">Aqui você pode ver suas conquistas e desafios.</section>
      {[0, 1, 3].map((categoria) => (
        <section className="flex flex-col pt-2" key={categoria}>
          <h2 className="px-4 text-xl">Quadros</h2>
          <ul className="flex h-60 w-full overflow-x-scroll py-2 before:mr-4 after:ml-4">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
              <motion.li
                key={item}
                whileTap={{ scale: 1.05 }}
                className={cn(
                  "mr-2 flex aspect-[3/4] h-full shrink-0 flex-col justify-end overflow-hidden rounded-2xl p-4 text-gray-100 shadow-md"
                )}>
                <h3 className="w-2/3 text-lg font-semibold">Quadro {item}</h3>
              </motion.li>
            ))}
          </ul>
        </section>
      ))}
      <NavigationBarBottom currentScreen="Quests" />
    </motion.main>
  );
}
