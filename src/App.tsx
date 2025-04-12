import { useEffect } from "react";
import { useGameState } from "./Game/Data";
import { useWindowing } from "./Lib/compass_navigator";
import { useTelemetry } from "./Lib/telemetry";
import { WelcomeWindow } from "./Views/welcome/_windows";

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
            title: topmost.title ?? "<untitled window>",
          }
        : null,
    });
  }, [windowing.windows]);

  useEffect(() => {
    const key = windowing.createWindow(WelcomeWindow, {});
    return () => windowing.removeWindow(key);
  }, []);

  return null;
}
