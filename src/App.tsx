import { useEffect } from "react";
import { useGameState } from "./Game/Data";
import { useWindowing } from "./Lib/compass_navigator";
import { useTelemetry } from "./Lib/telemetry";
import WelcomeView from "./Views/welcome";
import FeedbackForm from "./Views/welcome/feedback_form";

export default function App() {
  const windowing = useWindowing();
  const pushTelemetry = useTelemetry();
  const game = useGameState();

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
      title: "Welcome View",
      noAnimation: true,
    });
    return () => windowing.removeSpecificWindow(key);
  }, []);

  return null;
}
