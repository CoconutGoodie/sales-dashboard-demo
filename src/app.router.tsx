import { RouteUtils } from "@src/util/route.utils";
import { createBrowserRouter } from "react-router-dom";

const routeResolvers = import.meta.glob(
  "../routes/**/*.tsx"
) as RouteUtils.ResolverMap;

const routesFolderTree = RouteUtils.filePathsToTree(
  Object.keys(routeResolvers),
  "../routes"
);

const rootRouteObject = await RouteUtils.buildRouteObject(
  routeResolvers,
  routesFolderTree
);

console.log(rootRouteObject);

export const router = createBrowserRouter([rootRouteObject]);
