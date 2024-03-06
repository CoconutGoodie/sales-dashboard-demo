import { RouteUtils } from "@src/util/route.utils";
import { createBrowserRouter } from "react-router-dom";

const routeResolvers: RouteUtils.ResolverMap = import.meta.glob(
  "../routes/**/*.tsx",
  { import: "default" }
);

const routesFolderTree = RouteUtils.filePathsToTree(
  Object.keys(routeResolvers),
  "../routes"
);

const routeTree = await RouteUtils.buildRouteTree(
  routeResolvers,
  routesFolderTree,
  ""
);

console.log(routeTree);

export const router = createBrowserRouter(routeTree);
