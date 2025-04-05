import Button from "../../Components/Button";
import { useWindowing } from "../../Lib/compass_navigator";
import useCurrentWindowKey from "../../Lib/compass_navigator/window_container/current_window_key_context";

export default function WelcomeView() {
  const windowing = useWindowing();
  const currentWindowKey = useCurrentWindowKey();

  function goToNext() {
    //windowing.createWindow({});
    windowing.removeSpecificWindow(currentWindowKey);
  }

  return (
    <div className="flex h-full w-full flex-col items-stretch gap-2 bg-white p-4">
      <h1 className="text-2xl">Bem-vindo!</h1>
      <p>O Rumos é um jogo onde... [Texto de introducao etc]</p>
      <p>Essa é uma versão de demonstração. Dados anônimos de uso serão coletados.</p>
      <Button onClick={goToNext}>OK</Button>
    </div>
  );
}
