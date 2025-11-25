import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./ui/components/theme-provider.tsx";
import { RouterProvider } from "react-router";
import { router } from "./ui/routes.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./ui/lib/queryClient.ts";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </QueryClientProvider>
);
