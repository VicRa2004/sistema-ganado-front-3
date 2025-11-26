import { RouteObject } from "react-router";
import { IndexApp } from "./IndexApp";
import { IndexGround } from "./grounds/IndexGround";
import { CreateGround } from "./grounds/CreateGround";
import { UpdateGround } from "./grounds/UpdateGround";
import { IndexIron } from "./irons/IndexIron";
import { CreateIron } from "./irons/CreateIron";
import { UpdateIron } from "./irons/UpdateIron";

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
    {
      path: "iron",
      Component: IndexIron,
    },
    {
      path: "iron/create",
      Component: CreateIron,
    },
    {
      path: "iron/update/:id",
      Component: UpdateIron,
    },
  ],
};
