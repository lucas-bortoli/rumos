import { motion } from "framer-motion";
import Button from "../../../Components/Button";
import NavigationBarBottom from "../../../Components/NavigationBarBottom";
import { useWindowing } from "../../../Lib/compass_navigator";
import { FeedbackFormWindow } from "../../welcome/_windows";

export default function FeedbackTab() {
  const windowing = useWindowing();

  async function requestFeedback() {
    const feedbackWindowKey = windowing.createWindow(FeedbackFormWindow, {
      onSubmit: () => windowing.removeWindow(feedbackWindowKey),
    });
  }

  return (
    <motion.main
      className="relative h-full w-full overflow-x-hidden overflow-y-scroll bg-white pb-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0 }}>
      <nav className="border-grey-200 sticky top-0 z-10 mt-8 mb-4 flex items-center gap-2 border-b bg-white p-4 pb-3">
        <h1 className="text-xl">Feedback do Aplicativo</h1>
      </nav>
      <section className="flex flex-col gap-2 px-4">
        <p>Seu feedback é extremamente importante para nós.</p>
        <p>
          Ele nos ajuda a entender melhor suas necessidades e a melhorar continuamente a experiência
          do usuário. Se você tiver sugestões, críticas ou elogios, por favor, não hesite em
          compartilhar. Sua opinião é valiosa e pode fazer a diferença no desenvolvimento da nossa
          plataforma.
        </p>
      </section>
      <section className="mt-4 flex flex-col justify-center gap-2 px-4">
        <Button onClick={requestFeedback}>Formulário de Feedback</Button>
      </section>
      <NavigationBarBottom currentScreen="Feedback" />
    </motion.main>
  );
}
