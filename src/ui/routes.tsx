import { createHashRouter } from "react-router";
import { Index } from "./pages/Index";
import { Layout } from "./pages/Layout";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Index,
      },
    ],
  },
]);
