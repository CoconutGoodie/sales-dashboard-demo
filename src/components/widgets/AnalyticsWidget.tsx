import { CSSProperties } from "react";
import styles from "./AnalyticsWidget.module.scss";
import { MathUtils } from "@src/util/math.utils";
import { ColorUtils } from "@src/util/color.utils";

interface Props {
  sales: number[];
}

export const AnalyticsWidget = (props: Props) => {
  const range = props.sales.reduce<MathUtils.Vector2>(
    (range, value) => {
      if (range[0] > value) range[0] = value;
      if (range[1] < value) range[1] = value;
      return range;
    },
    [Infinity, -Infinity]
  );

  return (
    <div className={styles.widget}>
      <div className={styles.header}>
        <h1>Analytics</h1>
      </div>

      <div className={styles.chart}>
        {props.sales.map((value, index) => (
          <Bar key={index} value={value} range={range} />
        ))}
      </div>
    </div>
  );
};

/* --------------------------------- */

const Bar = (props: { value: number; range: MathUtils.Vector2 }) => {
  const maxHeight = 144;
  const minHeight = 24;
  const minColor = "#c1d1fd";
  const maxColor = "#3167F2";

  return (
    <div
      className={styles.bar}
      style={
        {
          "--accent": ColorUtils.lerp(
            minColor,
            maxColor,
            MathUtils.mapRange(props.value, props.range, [0, 1])
          ),
          "--height": `${MathUtils.mapRange(props.value, props.range, [
            minHeight,
            maxHeight,
          ])}px`,
        } as CSSProperties
      }
    >
      <span>${props.value.toFixed()}</span>
      <div />
      <span>Jan</span>
    </div>
  );
};
