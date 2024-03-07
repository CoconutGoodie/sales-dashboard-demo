import { MathUtils } from "@src/util/math.utils";
import { ComponentRef, useRef } from "react";

export const ExpensesWidget = () => {
  const svgRef = useRef<ComponentRef<"svg">>(null);

  const generateArc = (fromAngle: number, toAngle: number, color: string) => {
    const width = 130;
    const height = 130;

    const radius = 50;

    const x = radius * Math.cos(MathUtils.degToRad(toAngle - fromAngle));
    const y = radius * Math.sin(MathUtils.degToRad(toAngle - fromAngle));

    return (
      <g
        transform={`translate(${width / 2},${height / 2}) rotate(${fromAngle})`}
      >
        <path
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
    <div
      style={{
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg ref={svgRef} width={130} height={130}>
        {generateArc(0, 90, "#3167F2")}
        {generateArc(105, 200, "#6D98FF")}
        {generateArc(215, 250, "#E3EAFD")}
        {generateArc(265, -15, "#B9CDFD")}
      </svg>
    </div>
  );
};
