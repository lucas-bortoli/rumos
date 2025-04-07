import { motion } from "framer-motion";
import NavigationBarBottom from "../../Components/NavigationBarBottom";
import { cn } from "../../Lib/class_names";
import { useBackgroundSong } from "../../Lib/sound/song_provider";
import { MARKETPLACE_ITEMS } from "../../Game/Data/data";
import style from "./style.module.css";

export default function MarketplaceView() {
  useBackgroundSong({
    name: "MusShop",
    volume: 0.5,
  });

  return (
    <motion.main
      className="relative h-full w-full overflow-x-hidden overflow-y-scroll bg-white pb-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0 }}>
      <nav className="border-grey-200 sticky top-0 z-10 mt-8 mb-4 flex items-center gap-2 border-b bg-white p-4 pb-3">
        <h1 className="text-xl">Marketplace</h1>
      </nav>
      <section className="px-4">Essa é a marketplace. Aqui, nossos parceiros.</section>
      {Object.entries(MARKETPLACE_ITEMS).map(([categoria, items]) => (
        <section className="flex flex-col pt-2" key={categoria}>
          <h2 className="px-4 text-xl">{categoria}</h2>
          <ul className="flex h-60 w-full overflow-x-scroll py-2 before:mr-4 after:ml-4">
            {items.map((item) => (
              <motion.li
                key={item.id}
                whileTap={{ scale: 1.05 }}
                className={cn(
                  "mr-2 flex aspect-[3/4] h-full shrink-0 flex-col justify-end overflow-hidden rounded-2xl p-4 text-gray-100 shadow-md",
                  "opacity-100",
                  style.trilha_card
                )}
                style={{
                  "--card-bg": `url('${item.backgroundImage}')`,
                }}>
                <h3 className="w-2/3 text-lg leading-6 font-semibold">{item.title}</h3>
              </motion.li>
            ))}
          </ul>
        </section>
      ))}
      <NavigationBarBottom currentScreen="Marketplace" />
    </motion.main>
  );
}
