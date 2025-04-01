import { motion } from "framer-motion";
import { useEffect } from "react";
import SvgIcon from "../../Components/SvgIcon";
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
    disabled?: boolean;
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
      titulo: "Morando sozinho, e agora?",
      modulos: [
        { titulo: "Descobrindo o IPVA", background: Trilha01 },
        { titulo: "Tipos de financiamento", background: Trilha01 },
        { titulo: "Tipos de financiamento", background: Trilha01 },
        { titulo: "Tipos de financiamento", background: Trilha01 },
        { titulo: "Tipos de financiamento", background: Trilha01 },
      ],
    },
    {
      titulo: "Meu primeiro automóvel",
      modulos: [
        { titulo: "Descobrindo o IPVA", background: Trilha01, disabled: true },
        { titulo: "Tipos de financiamento", background: Trilha02, disabled: true },
        { titulo: "Tipos de financiamento", background: Trilha02, disabled: true },
        { titulo: "Tipos de financiamento", background: Trilha02, disabled: true },
        { titulo: "Tipos de financiamento", background: Trilha02, disabled: true },
      ],
    },
  ];

  return (
    <main className="relative h-full w-full overflow-x-hidden overflow-y-scroll bg-white pb-20">
      <nav className="border-grey-200 sticky top-0 z-10 mt-8 mb-4 flex items-center gap-2 border-b bg-white p-4 pb-3">
        <h1 className="text-xl">Minhas Trilhas</h1>
      </nav>
      <section className="px-4">
        Aqui ficam as trilhas do conhecimento disponíveis. Você pode selecionar uma para iniciar!
      </section>
      {trilhas.map((trilha) => (
        <section className="flex flex-col pt-2" key={trilha.titulo}>
          <h2 className="px-4 text-xl">{trilha.titulo}</h2>
          <ul className="flex h-60 w-full overflow-x-scroll py-2 before:mr-4 after:ml-4">
            {trilha.modulos.map((modulo) => (
              <motion.li
                key={modulo.titulo}
                whileTap={{ scale: 1.05 }}
                className={cn(
                  "mr-2 flex aspect-[3/4] h-full shrink-0 flex-col justify-end overflow-hidden rounded-2xl p-4 text-gray-100 shadow-md",
                  modulo.disabled && "opacity-20 shadow-none",
                  style.trilha_card
                )}
                style={{ "--card-bg": `url('${modulo.background}')` }}
                onClick={() =>
                  windowing.createWindow({
                    component: QAView,
                    props: {},
                    title: "QA",
                  })
                }
                inert={modulo.disabled}>
                <h3 className="w-2/3 text-lg font-semibold">{modulo.titulo}</h3>
              </motion.li>
            ))}
          </ul>
        </section>
      ))}
      <footer className="bg-grey-100 border-grey-200 fixed bottom-0 left-0 z-10 flex w-full items-center border-t px-16 py-4">
        <div className="text-grey-400 flex h-12 w-full items-center justify-between">
          <SvgIcon icon="Explore" />
          <SvgIcon icon="AccountCircle" className="text-lime-600" />
          <SvgIcon icon="BarChart" />
        </div>
      </footer>
    </main>
  );
}
