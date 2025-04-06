import { useEffect } from "react";
import { useWindowing } from "./Lib/compass_navigator";
import HomeView from "./Views/home_view";
import WelcomeView from "./Views/welcome";
import { useTelemetry } from "./Lib/telemetry";
import LoadingView from "./Views/loading";

export default function App() {
  const windowing = useWindowing();
  const pushTelemetry = useTelemetry();

  useEffect(() => {
    const topmost = windowing.windows.at(-1);

    pushTelemetry({
      kind: "WindowingToplevelChange",
      window: topmost
        ? {
            title: topmost.title,
          }
        : null,
    });
  }, [windowing.windows]);

  useEffect(() => {
    const key = windowing.createWindow({
      component: WelcomeView,
      props: {},
      title: "Loading View",
      noAnimation: true,
    });
    return () => windowing.removeSpecificWindow(key);
  }, []);

  return null;
}
