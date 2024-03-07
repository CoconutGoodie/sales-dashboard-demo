import { MathUtils } from "@src/util/math.utils";
import { ComponentRef, useRef } from "react";

import styles from "./ExpensesWidget.module.scss";
import { Button } from "@src/components/Button";

export const ExpensesWidget = () => {
  const svgRef = useRef<ComponentRef<"svg">>(null);

  const generateArc = (fromAngle: number, toAngle: number, color: string) => {
    const width = 130;
    const height = 130;

    const radius = 60;

    const x = radius * Math.cos(MathUtils.degToRad(toAngle - fromAngle));
    const y = radius * Math.sin(MathUtils.degToRad(toAngle - fromAngle));

    return (
      <g
        transform={`translate(${width / 2},${height / 2}) rotate(${fromAngle})`}
      >
        <path
          className={styles.arc}
          d={`M ${radius} 0 A ${radius} ${radius} 0 0 1 ${x} ${y}`}
          stroke={color}
          strokeWidth={9}
          strokeLinecap="round"
          fill="none"
        />
      </g>
    );
  };

  return (
    <div className={styles.widget}>
      <h1>Expenses</h1>

      <svg ref={svgRef} width={140} height={140}>
        <g transform="translate(5,5)">
          {generateArc(0, 90, "#3167F2")}
          {generateArc(102, 200, "#6D98FF")}
          {generateArc(212, 250, "#E3EAFD")}
          {generateArc(262, -12, "#B9CDFD")}
        </g>
      </svg>

      <Button className={styles.button}>Details</Button>
    </div>
  );
};
