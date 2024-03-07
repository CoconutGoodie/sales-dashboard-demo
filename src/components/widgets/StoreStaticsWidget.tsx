import WorldMap from "@src/assets/world-map.svg?component";
import InformationCircle from "@src/assets/icons/hugeicons/information-circle.svg?component";

import { Button } from "@src/components/Button";
import { MathUtils } from "@src/util/math.utils";
import { ComponentRef, useRef } from "react";
import { useResizeObserver } from "usehooks-ts";

import styles from "./StoreStaticsWidget.module.scss";

const worldMapSvgRange = {
  lat: [85, -30] as MathUtils.Vector2,
  lon: [-175, 200] as MathUtils.Vector2,
};

export const StoreStaticsWidget = () => {
  const pseudoCoords: MathUtils.Vector2[] = [
    [69.34, 73.45],
    [-3, -60],
    [19.11, 30.14],
    [58.52, -121.77],
  ];

  const mapRef = useRef<ComponentRef<"div">>(null);
  const { width: mapWidth = 0, height: mapHeight = 0 } = useResizeObserver({
    ref: mapRef,
    box: "border-box",
  });

  const dotPositions: MathUtils.Vector2[] = pseudoCoords.map((coord) => [
    MathUtils.mapRange(coord[1], worldMapSvgRange.lon, [0, mapWidth]),
    MathUtils.mapRange(coord[0], worldMapSvgRange.lat, [0, mapHeight]),
  ]);

  return (
    <div className={styles.widget}>
      <h1>Store Statics</h1>

      <div ref={mapRef} className={styles.map}>
        <WorldMap className={styles.world} />

        <svg className={styles.dots}>
          {dotPositions.map((pos, i) => (
            <g key={i}>
              <circle cx={pos[0]} cy={pos[1]} r={10} opacity={0.3} />
              <circle cx={pos[0]} cy={pos[1]} r={15} opacity={0.3} />
              <circle cx={pos[0]} cy={pos[1]} r={5} />
            </g>
          ))}
        </svg>
      </div>

      <div className={styles.info}>
        <InformationCircle width={18} height={18} />
        <span>Last 24 hrs</span>
      </div>

      <Button className={styles.button}>Details</Button>
    </div>
  );
};
