import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/AppRoutes.jsx";
import { BrowserRouter } from "react-router-dom";
import { CommandPaletteProvider } from "./components/command/CommandPalette";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CommandPaletteProvider>
        <AppRoutes />
      </CommandPaletteProvider>
    </BrowserRouter>
  </StrictMode>
);
