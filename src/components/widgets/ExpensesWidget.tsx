import { MathUtils } from "@src/util/math.utils";
import { ComponentProps, ComponentRef, useMemo, useRef } from "react";

import styles from "./ExpensesWidget.module.scss";
import { Button } from "@src/components/Button";
import { useResizeObserver } from "usehooks-ts";
import { ColorUtils } from "@src/util/color.utils";

const pseudoData = [
  { label: "Rent", amount: 50 + Math.random() * 1000 },
  { label: "Utilities", amount: 50 + Math.random() * 1000 },
  { label: "Insurance rates", amount: 50 + Math.random() * 1000 },
  { label: "Payable interest", amount: 50 + Math.random() * 1000 },
  { label: "Bank charges", amount: 50 + Math.random() * 1000 },
  // { label: "Repairs and maintenance", amount: 50 + Math.random() * 1000 },
];

export const ExpensesWidget = () => {
  const minColor = "#c1d1fd";
  const maxColor = "#3167F2";
  const gap = 15;

  const circleRef = useRef<ComponentRef<"div">>(null);

  const { width = 0, height = 0 } = useResizeObserver({
    ref: circleRef,
    box: "border-box",
  });

  const total = pseudoData.reduce((sum, data) => sum + data.amount, 0);

  const sortedExpenses = pseudoData.toSorted((a, b) => b.amount - a.amount);

  const expenseEntries = useMemo(() => {
    const unitAngle = (360 - sortedExpenses.length * gap) / total;
    return sortedExpenses
      .map((expense, index) => ({
        ...expense,
        angle: unitAngle * expense.amount,
        color: ColorUtils.lerp(
          minColor,
          maxColor,
          MathUtils.mapRange(index, [sortedExpenses.length - 1, 0], [0, 1])
        ),
      }))
      .sort(() => Math.random() - 0.5);
  }, [sortedExpenses]);

  let angle = 0;

  return (
    <div className={styles.widget}>
      <h1>Expenses</h1>

      <div ref={circleRef} className={styles.circle}>
        <svg width={140} height={140}>
          <g
            transform={`translate(${width / 2},${height / 2}) rotate(${
              10 * expenseEntries.length
            })`}
          >
            {expenseEntries.map((expense) => {
              const fromAngle = angle;
              const toAngle = angle + expense.angle;
              angle = toAngle + gap;
              return (
                <Arc
                  key={expense.label}
                  distance={60}
                  fromAngle={fromAngle}
                  toAngle={toAngle}
                  color={expense.color}
                />
              );
            })}
          </g>
        </svg>
      </div>

      <Button className={styles.button}>Details</Button>
    </div>
  );
};

/* -------------------- */

const Arc = (
  props: ComponentProps<"path"> & {
    distance: number;
    fromAngle: number;
    toAngle: number;
    color: string;
  }
) => {
  console.log(props.color);
  const x0 = props.distance * Math.cos(MathUtils.degToRad(props.fromAngle));
  const y0 = props.distance * Math.sin(MathUtils.degToRad(props.fromAngle));

  const x1 = props.distance * Math.cos(MathUtils.degToRad(props.toAngle));
  const y1 = props.distance * Math.sin(MathUtils.degToRad(props.toAngle));

  const largeArcFlag = Math.abs(props.toAngle - props.fromAngle) >= 180 ? 1 : 0;

  return (
    <path
      {...props}
      className={styles.arc}
      d={`M ${x0} ${y0} A ${props.distance} ${props.distance} 0 ${largeArcFlag} 1 ${x1} ${y1}`}
      stroke={props.color}
      strokeWidth={9}
      strokeLinecap="round"
      fill="none"
    />
  );
};
