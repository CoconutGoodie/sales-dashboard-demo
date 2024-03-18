import { DOMUtils } from "@src/util/dom.utils";
import { RefObject, useState } from "react";
import { useResizeObserver } from "usehooks-ts";

export function useScrollbarVisibility<T extends HTMLElement>(
  ref: RefObject<T>
) {
  const [visibilities, setVisibilities] = useState({
    vertical: ref.current
      ? DOMUtils.verticalScrollbarsVisible(ref.current)
      : false,
    horizontal: ref.current
      ? DOMUtils.horizontalScrollbarsVisible(ref.current)
      : false,
  });

  useResizeObserver({
    ref,
    box: "border-box",
    onResize: () => {
      setVisibilities({
        vertical: DOMUtils.verticalScrollbarsVisible(ref.current!),
        horizontal: DOMUtils.horizontalScrollbarsVisible(ref.current!),
      });
    },
  });

  return visibilities;
}
