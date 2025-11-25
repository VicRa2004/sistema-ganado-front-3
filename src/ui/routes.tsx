import { createHashRouter } from "react-router";
import { Index } from "./pages/Index";
import { Layout } from "./pages/Layout";
import { authRoutes } from "./pages/auth/routes";
import { appRoutes } from "./pages/app/routes";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Index,
      },
      authRoutes,
      appRoutes,
    ],
  },
]);
