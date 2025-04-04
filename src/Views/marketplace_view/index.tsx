import { motion } from "framer-motion";
import useAlert from "../../Components/AlertDialog";
import SvgIcon from "../../Components/SvgIcon";
import { cn } from "../../Lib/class_names";
import { useWindowing } from "../../Lib/compass_navigator";
import useCurrentWindowKey from "../../Lib/compass_navigator/window_container/current_window_key_context";
import useSound from "../../Lib/sound";
import HomeView from "../home_view";

export default function MarketplaceView() {
  const windowing = useWindowing();
  const showAlert = useAlert();

  useSound({
    name: "MusShop",
    volume: 0.1,
    loop: true,
    autoPlay: true,
  });

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
        <h1 className="text-xl">Loja</h1>
      </nav>
      <section className="px-4">Essa é a marketplace.</section>
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
      <footer className="bg-grey-100 border-grey-200 fixed bottom-0 left-0 z-10 flex w-full items-center border-t px-16 py-4">
        <div className="text-grey-400 flex h-12 w-full items-center justify-between">
          <div onClick={() => goTo("marketplace")} className="h-full">
            <SvgIcon icon="Explore" className="text-lime-600" />
          </div>
          <div onClick={() => goTo("home")} className="h-full">
            <SvgIcon icon="AccountCircle" />
          </div>
          <div className="h-full">
            <SvgIcon icon="BarChart" />
          </div>
        </div>
      </footer>
    </main>
  );
}
