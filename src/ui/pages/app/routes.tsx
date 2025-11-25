import { RouteObject } from "react-router";
import { IndexApp } from "./IndexApp";

export const appRoutes: RouteObject = {
  path: "app",
  children: [
    {
      index: true,
      Component: IndexApp,
    },
  ],
};
