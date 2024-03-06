import CircleArrowUp02 from "@src/assets/icons/hugeicons/circle-arrow-up02.svg?component";
import { MathUtils } from "@src/util/math.utils";
import { ComponentRef, useId, useMemo, useRef } from "react";
import { useResizeObserver } from "usehooks-ts";

import styles from "./SalesActivityWidget.module.scss";

export const SalesActivityWidget = () => {
  const pseudoData = useMemo(() => {
    return Array.from({ length: 8 }).map(
      (_, i) => 50 + Math.random() * 1000 * (i + 1)
    );
  }, []);

  const rootRef = useRef<ComponentRef<"div">>(null);
  const { width: rootWidth = 0, height: rootHeight = 0 } = useResizeObserver({
    ref: rootRef,
    box: "border-box",
  });

  const strokeColorId = useId();
  const fillColorId = useId();

  const n2 = pseudoData.at(-2)!;
  const n1 = pseudoData.at(-1)!;
  const percentageDifference = 100 * ((n1 - n2) / ((n1 + n2) / 2));

  const total = pseudoData.reduce((sum, data) => sum + data, 0);

  const vertices = useMemo<MathUtils.Vector2[]>(() => {
    const maxValue = pseudoData.reduce(
      (max, data) => Math.max(max, data),
      -Infinity
    );

    return pseudoData.map((data, index) => [
      MathUtils.mapRange(index, [0, pseudoData.length - 1], [0, rootWidth]),
      MathUtils.mapRange(data, [0, maxValue], [0, rootHeight * 0.6]),
    ]);
  }, [rootWidth, rootHeight]);

  function generatePath(points: MathUtils.Vector2[]) {
    if (points.length < 2) {
      return "";
    }

    let d = `M 0 0`;

    for (let i = 0; i < points.length - 1; i++) {
      const xc = (points[i][0] + points[i + 1][0]) / 2;
      const yc = (points[i][1] + points[i + 1][1]) / 2;
      d += ` Q ${points[i][0]} ${points[i][1]} ${xc} ${yc}`;
    }

    d += ` T ${points[points.length - 1][0]} ${points[points.length - 1][1]}`;
    d += ` L ${points[points.length - 1][0] + 100} 0`;

    return d;
  }

  return (
    <div ref={rootRef} className={styles.widget}>
      <h1>Sales Activity</h1>
      <h2>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(total)}
      </h2>
      <h3>
        <CircleArrowUp02
          width={30}
          height={30}
          transform={percentageDifference < 0 ? "scale(-1)" : undefined}
        />
        <span>{percentageDifference.toFixed(0)}%</span>
      </h3>

      <svg className={styles.chart}>
        <g transform="translate(0,300) scale(1,-1)">
          <path
            className={styles.fill}
            d={generatePath(vertices)}
            fill={`url(#${fillColorId})`}
          />
          <path
            className={styles.stroke}
            d={generatePath(vertices)}
            stroke={`url(#${strokeColorId})`}
          />
        </g>

        <defs>
          <linearGradient
            id={strokeColorId}
            x1="319"
            y1="-25"
            x2="19"
            y2="206"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#BFD1FF" />
            <stop offset="1" stopColor="#4676F0" />
          </linearGradient>
          <linearGradient
            id={fillColorId}
            x1={400 - 203}
            y1={vertices.reduce((max, v) => Math.max(max, v[1]), 0)}
            x2={400 - 188}
            y2={200 - 186}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0F4EF0" />
            <stop offset="1" stopColor="#3167F2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
