import { motion } from "framer-motion";
import Button from "../../Components/Button";
import { cn } from "../../Lib/class_names";
import { useWindowing } from "../../Lib/compass_navigator";
import useCurrentWindowKey from "../../Lib/compass_navigator/window_container/current_window_key_context";
import style from "./style.module.css";
import RegisterForm from "./register_form";

export default function WelcomeView() {
  const windowing = useWindowing();
  const currentWindowKey = useCurrentWindowKey();

  function goToNext() {
    windowing.createWindow({
      title: "Register Form View",
      component: RegisterForm,
      props: {},
    });
    // windowing.removeSpecificWindow(currentWindowKey);
  }

  return (
    <motion.div
      className={cn(
        "relative mx-auto flex h-full w-full max-w-[768px] flex-col items-stretch gap-4 overflow-y-scroll p-8",
        style.container
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2 } }}
      exit={{ opacity: 0 }}>
      <h1 className="text-2xl">Bem-vindo!</h1>
      <p>
        A Rumos é uma plataforma móvel de aprendizado sobre carreira e desenvolvimento pessoal que
        oferece trilhas de aprendizado guiadas com microcursos e atividades interativas.
      </p>
      <p>
        Se você busca aprimorar suas habilidades, explorar novas áreas de conhecimento e se preparar
        para seus objetivos, você está no lugar certo.
      </p>
      <p>
        <b className="font-bold">Versão Beta</b>: Você está usando uma versão de demonstração da
        Rumos, criada para fins de estudo e validação da experiência.
      </p>
      <Button onClick={goToNext}>Iniciar</Button>
    </motion.div>
  );
}
