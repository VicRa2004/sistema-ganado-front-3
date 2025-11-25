import { RouteObject } from "react-router";
import { Login } from "./Login";

export const authRoutes: RouteObject = {
  path: "auth",
  children: [
    {
      path: "login",
      Component: Login,
    },
  ],
};
