import { motion } from "framer-motion";
import { useEffect } from "react";
import { cn } from "../../Lib/class_names";
import { useWindowing } from "../../Lib/compass_navigator";
import QAView from "../qa_view";
import style from "./style.module.css";
import Trilha01 from "./trilha01.png";
import Trilha02 from "./trilha02.png";

interface Trilha {
  titulo: string;
  modulos: {
    background: string;
    titulo: string;
  }[];
}

export default function HomeView() {
  const windowing = useWindowing();

  useEffect(() => {
    //compass.push(QAView, {});
    //return () => compass.pop();
  }, []);

  const trilhas: Trilha[] = [
    {
      titulo: "Meu primeiro automóvel",
      modulos: [
        { titulo: "Descobrindo o IPVA", background: Trilha01 },
        { titulo: "Tipos de financiamento", background: Trilha02 },
      ],
    },
    {
      titulo: "Morar sozinho, e agora?",
      modulos: [
        { titulo: "Descobrindo o IPVA", background: Trilha01 },
        { titulo: "Tipos de financiamento", background: Trilha01 },
      ],
    },
  ];

  return (
    <main className="relative h-full w-full overflow-x-hidden overflow-y-scroll bg-white pb-18">
      <nav className="sticky top-0 z-10 my-8 flex items-center gap-2 border-b border-gray-200 bg-white p-4">
        <h1 className="text-xl">Home</h1>
      </nav>
      {trilhas.map((trilha) => (
        <section className="flex flex-col gap-2 py-2" key={trilha.titulo}>
          <h2 className="px-4 text-xl">{trilha.titulo}</h2>
          <ul className="flex h-64 w-full overflow-x-scroll pb-2 before:mr-4 after:ml-4">
            {trilha.modulos.map((modulo) => (
              <motion.li
                key={modulo.titulo}
                whileTap={{ scale: 1.05 }}
                className={cn(
                  "mr-2 flex aspect-[3/4] h-full shrink-0 flex-col justify-end overflow-hidden rounded-2xl p-4 text-gray-100 shadow-md",
                  style.trilha_card
                )}
                style={{ "--card-bg": `url('${modulo.background}')` }}
                onClick={() =>
                  windowing.createWindow({
                    component: QAView,
                    props: {},
                    title: "QA",
                  })
                }>
                <h3 className="w-2/3 text-lg font-semibold">{modulo.titulo}</h3>
              </motion.li>
            ))}
          </ul>
        </section>
      ))}
      <footer className="fixed bottom-0 left-0 z-10 flex h-16 w-full items-center justify-between bg-amber-100 p-2"></footer>
    </main>
  );
}
