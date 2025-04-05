import { motion, Variant } from "framer-motion";
import Frame from "../../Components/Frame";
import { cn } from "../../Lib/class_names";
import { useWindowing } from "../../Lib/compass_navigator";
import DocumentArticle from "../../Components/DocumentArticle";
import BattleView from "../battle_view";
import { DOCUMENT_CONTRACT_HTML } from "../../Game/Data/data";

const MotionFrame = motion.create(Frame);

const variants = {
  enter: {
    translateY: "150%",
    opacity: 0.7,
  } satisfies Variant,
  active: {
    translateY: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.15,
    },
  } satisfies Variant,
  exit: {
    translateY: "150%",
    transition: {
      ease: "easeIn",
      duration: 0.2,
    },
  } satisfies Variant,
};

export default function QAView() {
  const windowing = useWindowing();

  function onCardClick() {
    windowing.createWindow({
      component: BattleView,
      props: {},
      title: "Battle View",
    });
  }

  return (
    <main className="flex h-full w-full flex-col overflow-hidden bg-white">
      <nav className="flex items-center gap-2 border-b border-gray-200 bg-white p-4">
        <h1 className="text-xl">Meu Contrato de Locação</h1>
      </nav>
      <div className="relative shrink grow overflow-auto">
        <DocumentArticle
          className={cn("bg-grey-100 p-8 pb-96")}
          articleHtmlDangerous={DOCUMENT_CONTRACT_HTML}
        />
        {/* deck */}
        <MotionFrame
          className="fixed bottom-2 left-2 h-48 w-[calc(100%-theme('spacing.4'))]"
          variants={variants}
          initial="enter"
          animate="active"
          exit="exit">
          <ul className="flex h-full w-full overflow-x-scroll p-2">
            {[0, 1, 2, 3, 4, 5].map((card) => {
              return (
                <motion.li
                  key={card}
                  whileTap={{ scale: 1.05 }}
                  onClick={onCardClick}
                  className="mr-2 flex aspect-[3/4] h-full shrink-0 flex-col items-stretch justify-end overflow-hidden rounded-lg bg-white p-4 text-gray-600 shadow-sm">
                  <h3 className="text-center text-lg">Carta</h3>
                </motion.li>
              );
            })}
          </ul>
        </MotionFrame>
      </div>
    </main>
  );
}
