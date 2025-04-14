import { useEffect, useState } from "react";
import { useWindowing } from "../../Lib/compass_navigator";
import useCurrentWindowKey from "../../Lib/compass_navigator/window_container/current_window_key_context";
import LoadingSpinner from "../../Components/LoadingSpinner";
import Logo from "./logo.jpeg";
import { WelcomeWindow } from "../welcome/_windows";

export default function LoadingScreen() {
  const windowing = useWindowing();
  const currentWindowKey = useCurrentWindowKey();

  const [loaded, setLoaded] = useState(false);

  function goToNext() {
    windowing.createWindow(WelcomeWindow, {});
    windowing.removeWindow(currentWindowKey);
  }

  useEffect(() => {
    const timer = setTimeout(goToNext, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-white p-8">
      <img src={Logo} className="mb-16 w-full px-8" />
      <LoadingSpinner className="w-16 bg-white" />
      <p>Carregando...</p>
    </div>
  );
}
