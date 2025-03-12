import { useEffect } from "react";
import { useCompass } from "./Lib/compass_navigator";
import HomeView from "./Views/home_view";

export default function App() {
  const cmp = useCompass();

  useEffect(() => {
    cmp.push(HomeView, {});
  }, []);

  return <button className="bg-amber-200">Hello</button>;
}
