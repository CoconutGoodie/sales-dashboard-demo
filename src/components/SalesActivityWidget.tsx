import { ComponentRef, useEffect, useRef, useState } from "react";
import { MathUtils } from "@src/util/math.utils";
import CircleArrowUp02 from "@src/assets/icons/hugeicons/circle-arrow-up02.svg?component";

import styles from "./SalesActivityWidget.module.scss";

export const SalesActivityWidget = () => {
  // const pseudoData = [100, 200, 150, 400, 600, 500, 800, 900];
  const pseudoData = Array.from({ length: 8 }).map(
    (_, i) => 50 + Math.random() * 100 * (i + 1)
  );

  const rootRef = useRef<ComponentRef<"div">>(null);

  const [points, setPoints] = useState<MathUtils.Vector2[]>([]);

  const n2 = pseudoData.at(-2)!;
  const n1 = pseudoData.at(-1)!;
  const percentageDifference = 100 * ((n1 - n2) / ((n1 + n2) / 2));

  useEffect(() => {
    if (!rootRef.current) return;

    const boundingBox = rootRef.current.getBoundingClientRect();

    const maxValue = pseudoData.reduce(
      (max, data) => Math.max(max, data),
      -Infinity
    );

    setPoints(
      pseudoData.map((data, index) => [
        MathUtils.mapRange(
          index,
          [0, pseudoData.length - 1],
          [0, boundingBox.width]
        ),
        MathUtils.mapRange(data, [0, maxValue], [0, boundingBox.height * 0.6]),
      ])
    );
  }, []);

  return (
    <div ref={rootRef} className={styles.widget}>
      <h1>Sales Activity</h1>
      <h2>${pseudoData.reduce((sum, data) => sum + data, 0).toFixed(2)}</h2>
      <h3>
        <CircleArrowUp02
          width={30}
          height={30}
          transform={percentageDifference < 0 ? "scale(-1)" : undefined}
        />
        <span>{percentageDifference.toFixed(0)}%</span>
      </h3>

      <svg>
        <g transform="translate(0,300) scale(1,-1)">
          <path
            d={points.reduce((d, point, index) => {
              if (index === 0) {
                return `M ${point[0]},${point[1]}`;
              }
              return `${d} L ${point[0]},${point[1]}`;
            }, "")}
          />
        </g>
      </svg>
    </div>
  );
};
