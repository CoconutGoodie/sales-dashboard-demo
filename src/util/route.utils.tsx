import { ReactUtils } from "@src/util/react.utils";
import { ComponentType, PropsWithChildren } from "react";
import { Outlet, RouteObject, useRouteError } from "react-router-dom";

export namespace RouteUtils {
  export type Resolver = () => Promise<unknown>;
  export type ResolverMap = { [path: string]: Resolver };

  export interface FileNode {
    name: string;
    absolutePath: string;
    isFile: boolean;
    children?: FileNode[];
  }

  export function filePathsToTree(filePaths: string[], rootPath: string = "") {
    const SEPARATOR = /[\\/]+/i;

    const root: FileNode = {
      name: rootPath,
      absolutePath: rootPath,
      isFile: false,
      children: [],
    };

    for (const filePath of filePaths) {
      let currentNode: FileNode = root;
      let currentPath = rootPath;

      for (const part of filePath
        .replace(rootPath + "/", "")
        .split(SEPARATOR)) {
        const parentNode = currentNode.children?.find(
          (node) => node.name === part
        );

        if (parentNode) {
          currentNode = parentNode;
          currentPath = currentPath + "/" + part;
        } else {
          const node: FileNode = {
            name: part,
            isFile: false,
            absolutePath: currentPath + "/" + part,
            children: [],
          };

          currentNode.children!.push(node);
          currentNode = node;
          currentPath = node.absolutePath;
        }
      }

      currentNode.isFile = true;
      delete currentNode.children;
    }

    return root;
  }

  export async function buildRouteTree(
    resolverMap: ResolverMap,
    folderTree: FileNode,
    routePath: string
  ): Promise<RouteObject[]> {
    const tap = <T, R>(value: T, tapper: (value: T) => R) => {
      if (!value) return;
      return tapper(value);
    };

    // const childRoutes2 = Promise.all(folderTree.children);

    // const childrenRoute = await Promise.all(
    //   folderTree.children?.map((childTree) =>
    //     buildRouteTree(childTree, childTree.name)
    //   ) ?? []
    // );

    return [
      {
        path: routePath,
        lazy: tap(
          resolverMap[`${folderTree.absolutePath}/layout.tsx`],
          (layoutResolver) => {
            return async () => {
              const LayoutComponent = await layoutResolver();

              if (!ReactUtils.isComponent(LayoutComponent)) {
                throw new Error(
                  `${folderTree.absolutePath}/layout.tsx should export a React Component as default`
                );
              }

              return {
                // ErrorBoundary: () => {
                //   const error = useRouteError();
                //   console.log(error);
                //   return "Error";
                // },
                // hasErrorBoundary: true,
                Component: LayoutComponent,
              };
            };
          }
        ),
        children: [
          {
            index: true,
            lazy: tap(
              resolverMap[`${folderTree.absolutePath}/page.tsx`],
              (pageResolver) => {
                return async () => {
                  const PageComponent = await pageResolver();

                  if (!ReactUtils.isComponent(PageComponent)) {
                    throw new Error(
                      `${folderTree.absolutePath}/page.tsx should export a React Component as default`
                    );
                  }

                  return {
                    Component: PageComponent,
                  };
                };
              }
            ),
          },
          // ...childrenRoute,
          // ...
          // ...(routePath === ""
          //   ? await buildRouteTree(fsPath + "/home", "home")
          //   : []),
        ],
      },
    ];
  }
}
