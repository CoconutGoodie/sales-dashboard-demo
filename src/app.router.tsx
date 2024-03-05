import { ComponentType, PropsWithChildren } from "react";
import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";

const fsRoutes = import.meta.glob("../routes/**/*.tsx", { import: "default" });

function filePathsToTree(rootPath: string, filePaths: string[]) {
  interface FileNode {
    name: string;
    absolutePath: string;
    isFile: boolean;
    children?: FileNode[];
  }

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

    for (const part of filePath.replace(rootPath + "/", "").split(SEPARATOR)) {
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

const fsTree = filePathsToTree("../routes", Object.keys(fsRoutes));

async function buildRouteTree(
  fsPath: string = "../routes",
  routePath: string = ""
): Promise<RouteObject[]> {
  const noLayout = !fsRoutes[`${fsPath}/layout.tsx`];
  const noPage = !fsRoutes[`${fsPath}/page.tsx`];

  return [
    {
      path: routePath,
      lazy: noLayout
        ? undefined
        : async () => {
            const LayoutComponent = (await fsRoutes[
              `${fsPath}/layout.tsx`
            ]?.()) as ComponentType<PropsWithChildren>;

            return {
              Component: () => {
                return (
                  <LayoutComponent>
                    <Outlet />
                  </LayoutComponent>
                );
              },
            };
          },
      children: [
        {
          index: true,
          lazy: noPage
            ? undefined
            : async () => {
                const PageComponent = (await fsRoutes[
                  `${fsPath}/page.tsx`
                ]?.()) as ComponentType;

                return {
                  Component: PageComponent,
                };
              },
        },
        // ...
        // ...(routePath === ""
        //   ? await buildRouteTree(fsPath + "/home", "home")
        //   : []),
      ],
    },
  ];
}

const routeTree = await buildRouteTree();
console.log(routeTree);
export const router = createBrowserRouter(routeTree);
