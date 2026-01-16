import { RouteObject } from "react-router";
import { IndexApp } from "./IndexApp";
import { IndexGround } from "./grounds/IndexGround";
import { CreateGround } from "./grounds/CreateGround";
import { UpdateGround } from "./grounds/UpdateGround";
import { IndexIron } from "./irons/IndexIron";
import { CreateIron } from "./irons/CreateIron";
import { UpdateIron } from "./irons/UpdateIron";
import { IndexCattle } from "./cattles/IndexCattle";
import { CreateCattle } from "./cattles/CreateCattle";
import { UpdateCattle } from "./cattles/UpdateCattle";
import { ProtectedRoute } from "@/ui/components/protected-route";

export const appRoutes: RouteObject = {
  path: "app",
  Component: ProtectedRoute,
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
    {
      path: "cattle",
      Component: IndexCattle,
    },
    {
      path: "cattle/create",
      Component: CreateCattle,
    },
    {
      path: "cattle/update/:id",
      Component: UpdateCattle,
    },
  ],
};
