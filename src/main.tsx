import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { WindowManagerProvider, WindowsOutlet } from "./Lib/compass_navigator";
import { MiniGBusProvider } from "./Lib/gbus_mini";

createRoot(document.getElementById("root")!).render(
  <WindowManagerProvider>
    <MiniGBusProvider>
      <WindowsOutlet />
      <App />
    </MiniGBusProvider>
  </WindowManagerProvider>
);
