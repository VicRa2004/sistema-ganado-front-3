import { RouteObject } from "react-router";
import { IndexApp } from "./IndexApp";
import { IndexGround } from "./grounds/IndexGround";
import { CreateGround } from "./grounds/CreateGround";
import { UpdateGround } from "./grounds/UpdateGround";

export const appRoutes: RouteObject = {
  path: "app",
  children: [
    {
      index: true,
      Component: IndexApp,
    },
    {
      path: "ground",
      Component: IndexGround,
    },
    {
      path: "ground/create",
      Component: CreateGround,
    },
    {
      path: "ground/update/:id",
      Component: UpdateGround,
    },
  ],
};
