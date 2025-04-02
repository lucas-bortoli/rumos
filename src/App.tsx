import { useEffect } from "react";
import { useWindowing } from "./Lib/compass_navigator";
import BattleView from "./Views/battle_view";

export default function App() {
  const windowing = useWindowing();

  useEffect(() => {
    const key = windowing.createWindow({
      component: BattleView,
      props: {},
      title: "Battle View",
    });
    return () => windowing.removeSpecificWindow(key);
  }, []);

  return null;
}
