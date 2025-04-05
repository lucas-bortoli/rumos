import { createRoot } from "react-dom/client";
import App from "./App";
import { GameStateProvider } from "./Game/Data";
import "./index.css";
import { BackButtonProvider } from "./Lib/back_button";
import { WindowManagerProvider, WindowsOutlet } from "./Lib/compass_navigator";
import { MiniGBusProvider } from "./Lib/gbus_mini";

createRoot(document.getElementById("root")!).render(
  <MiniGBusProvider>
    <BackButtonProvider>
      <GameStateProvider>
        <WindowManagerProvider>
          <WindowsOutlet />
          <App />
        </WindowManagerProvider>
      </GameStateProvider>
    </BackButtonProvider>
  </MiniGBusProvider>
);
