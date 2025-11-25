import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./ui/components/theme-provider.tsx";
import { RouterProvider } from "react-router";
import { router } from "./ui/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
  </ThemeProvider>
);
