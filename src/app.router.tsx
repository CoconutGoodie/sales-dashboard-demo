import { RouteUtils } from "@src/util/route.utils";
import { createBrowserRouter } from "react-router-dom";

const routeResolvers = import.meta.glob(
  "../routes/**/*.tsx"
) as RouteUtils.ResolverMap;

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
