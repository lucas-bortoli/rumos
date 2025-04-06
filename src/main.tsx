import { createRoot } from "react-dom/client";
import App from "./App";
import { GameStateProvider } from "./Game/Data";
import "./index.css";
import { BackButtonProvider } from "./Lib/back_button";
import { WindowManagerProvider, WindowsOutlet } from "./Lib/compass_navigator";
import { MiniGBusProvider } from "./Lib/gbus_mini";
import { TelemetryProvider } from "./Lib/telemetry";
import { SongProvider } from "./Lib/sound/song_provider";

createRoot(document.getElementById("root")!).render(
  <MiniGBusProvider>
    <BackButtonProvider>
      <GameStateProvider>
        <WindowManagerProvider>
          <SongProvider>
            <TelemetryProvider>
              <WindowsOutlet />
              <App />
            </TelemetryProvider>
          </SongProvider>
        </WindowManagerProvider>
      </GameStateProvider>
    </BackButtonProvider>
  </MiniGBusProvider>
);
