import { ReactUtils } from "@src/util/react.utils";
import { ComponentType } from "react";
import {
  ActionFunction,
  LoaderFunction,
  Navigate,
  RouteObject,
} from "react-router-dom";

export namespace RouteUtils {
  export type Resolver = () => Promise<Record<string, unknown>>;
  export type ResolverMap = { [path: string]: Resolver };

  export interface Metadata {
    id?: string;
  }

  export type ComponentTypeWithMetadata<P = {}> = ComponentType<P> & {
    metadata?: Metadata;
  };

  export function bindMetadata<P, C extends ComponentType<P>>(
    Component: C,
    metadata: Metadata
  ) {
    const ComponentWithMetadata = Component as ComponentTypeWithMetadata<P>;
    ComponentWithMetadata.metadata = metadata;
  }

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

  export function isLoaderFunction(v: unknown): v is LoaderFunction {
    return typeof v === "function";
  }

  export function isActionFunction(v: unknown): v is ActionFunction {
    return typeof v === "function";
  }

  export async function buildRouteObject(
    resolverMap: ResolverMap,
    folderTree: FileNode,
    routePath: string = "/"
  ): Promise<RouteObject> {
    const resolve = (path: string) => {
      const resolver = resolverMap[path];
      if (!resolver) return null;
      return resolver();
    };

    const layoutPath = `${folderTree.absolutePath}/layout.tsx`;
    const pagePath = `${folderTree.absolutePath}/page.tsx`;
    const errorPath = `${folderTree.absolutePath}/error.tsx`;
    const loaderPath = `${folderTree.absolutePath}/loader.tsx`;
    const actionPath = `${folderTree.absolutePath}/action.tsx`;
    const notfoundPath = `${folderTree.absolutePath}/notfound.tsx`;

    const lazyPage = async () => {
      const pageModule = await resolve(pagePath);
      const PageComponent = pageModule?.default;

      if (!ReactUtils.isComponent(PageComponent)) {
        throw new Error(
          `${pagePath} should export a React Component as default`
        );
      }

      const loaderModule = await resolve(loaderPath);
      const LoaderFunc = loaderModule?.default;

      if (loaderModule && !isLoaderFunction(LoaderFunc)) {
        throw new Error(
          `${loaderPath} should export a LoaderFunction as default`
        );
      }

      const actionModule = await resolve(actionPath);
      const ActionFunc = actionModule?.default;

      if (actionModule && !isActionFunction(ActionFunc)) {
        throw new Error(
          `${actionPath} should export a ActionFunction as default`
        );
      }

      return {
        loader: LoaderFunc as LoaderFunction,
        action: ActionFunc as ActionFunction,
        Component: PageComponent,
      };
    };

    const lazyLayout = async () => {
      const layoutModule = await resolve(layoutPath);
      const LayoutComponent = layoutModule?.default;

      if (!ReactUtils.isComponent(LayoutComponent)) {
        throw new Error(
          `${layoutPath} should export a React Component as default`
        );
      }

      const errorModule = await resolve(errorPath);
      const ErrorComponent = errorModule?.default;

      if (errorModule && !ReactUtils.isComponent(ErrorComponent)) {
        throw new Error(
          `${errorPath} should export a React Component as default`
        );
      }

      return {
        hasErrorBoundary: !!ErrorComponent,
        ErrorBoundary: ErrorComponent as ComponentType,
        Component: LayoutComponent,
      };
    };

    const lazyNotFound = async () => {
      const notfoundModule = await resolve(notfoundPath);
      const NotFoundComponent = notfoundModule?.default;

      if (notfoundModule && !ReactUtils.isComponent(NotFoundComponent)) {
        throw new Error(
          `${notfoundPath} should export a React Component as default`
        );
      }

      return {
        Component: NotFoundComponent as ComponentType,
      };
    };

    const children: RouteObject[] = [];

    if (resolverMap[pagePath]) {
      children.push({
        index: true,
        lazy: resolverMap[pagePath] ? lazyPage : undefined,
      });
    } else if (resolverMap[notfoundPath]) {
      children.push({
        index: true,
        lazy: resolverMap[notfoundPath] ? lazyNotFound : undefined,
      });
    } else {
      children.push({
        index: true,
        // TODO: Might need to render nearest NotFound instead
        Component: () => <Navigate to={"/"} />,
      });
    }

    if (folderTree.children) {
      children.push(
        ...(await Promise.all(
          folderTree.children
            .filter((childNode) => !childNode.isFile)
            .map((childFolderTree) => {
              return buildRouteObject(
                resolverMap,
                childFolderTree,
                childFolderTree.name
              );
            })
        ))
      );
    }

    if (resolverMap[notfoundPath]) {
      children.push({
        path: "*",
        lazy: resolverMap[notfoundPath] ? lazyNotFound : undefined,
      });
    }

    const routeObject = {
      path: routePath.match(/\[.*\]/)
        ? routePath.replace("[", ":").replace("]", "")
        : routePath,
      lazy: resolverMap[layoutPath] ? lazyLayout : undefined,
      children,
    };

    if (!routeObject.lazy) {
      delete routeObject.lazy;
    }

    return routeObject;
  }
}
