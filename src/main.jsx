import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/AppRoutes.jsx";
import { BrowserRouter } from "react-router-dom";
import { CommandPaletteProvider } from "./components/command/CommandPalette";
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CommandPaletteProvider>
        <AppRoutes />
      </CommandPaletteProvider>
    </AuthProvider>
  </BrowserRouter>
);
