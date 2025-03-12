import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { CompassProvider } from "./Lib/compass_navigator";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CompassProvider>
      <App />
    </CompassProvider>
  </StrictMode>
);
