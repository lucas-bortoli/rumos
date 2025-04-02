import { useEffect } from "react";
import { useWindowing } from "./Lib/compass_navigator";
import HomeView from "./Views/home_view";

export default function App() {
  const windowing = useWindowing();

  useEffect(() => {
    const key = windowing.createWindow({
      component: HomeView,
      props: {},
      title: "Home View",
    });
    return () => windowing.removeSpecificWindow(key);
  }, []);

  return null;
}
