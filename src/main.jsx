import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import IsLoginContextProvider from "./contexts/IsLoginContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <HeroUIProvider>
    <ToastProvider placement="top-right" />
    <IsLoginContextProvider>
      <App />
    </IsLoginContextProvider>
  </HeroUIProvider>
  // </StrictMode>
);
