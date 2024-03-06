import { ComponentType } from "react";

export namespace ReactUtils {
  export function isFunctionalComponent(v: unknown): v is ComponentType {
    return typeof v === "function";
  }

  export function isClassComponent(v: unknown): v is ComponentType {
    return typeof v === "function" && !!v.prototype.isReactComponent;
  }

  export function isComponent<T extends ComponentType = ComponentType>(
    v: unknown
  ): v is T {
    return isFunctionalComponent(v) || isClassComponent(v);
  }
}
