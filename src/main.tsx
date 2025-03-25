import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { WindowManagerProvider, WindowsOutlet } from "./Lib/compass_navigator";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WindowManagerProvider>
      <App />
      <WindowsOutlet />
    </WindowManagerProvider>
  </StrictMode>
);
