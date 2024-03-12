import { CSSProperties, useMemo } from "react";
import styles from "./AnalyticsWidget.module.scss";
import { MathUtils } from "@src/util/math.utils";
import { ColorUtils } from "@src/util/color.utils";

interface Props {
  sales: number[];
}

function monthsForLocale(
  localeName = "en-US",
  format: Intl.DateTimeFormatOptions["month"]
) {
  const dateFormat = new Intl.DateTimeFormat(localeName, { month: format })
    .format;
  return [...Array(12).keys()].map((m) =>
    dateFormat(new Date(Date.UTC(2024, m)))
  );
}

export const AnalyticsWidget = (props: Props) => {
  const range = useMemo(
    () =>
      props.sales.reduce<MathUtils.Vector2>(
        (range, value) => {
          if (range[0] > value) range[0] = value;
          if (range[1] < value) range[1] = value;
          return range;
        },
        [Infinity, -Infinity]
      ),
    [props.sales]
  );

  const monthLabels = useMemo(() => monthsForLocale("en-GB", "short"), []);

  return (
    <div className={styles.widget}>
      <div className={styles.header}>
        <h1>Analytics</h1>
      </div>

      <div className={styles.chart}>
        {props.sales.map((value, index) => (
          <Bar
            key={index}
            label={monthLabels[index]}
            value={value}
            range={range}
          />
        ))}
      </div>
    </div>
  );
};

/* --------------------------------- */

const Bar = (props: {
  label: string;
  value: number;
  range: MathUtils.Vector2;
}) => {
  const maxHeight = 144;
  const minHeight = 24;
  const minColor = "#E3EAFD";
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
      <span>${(props.value / 1000).toFixed()}K</span>
      <div />
      <span>{props.label}</span>
    </div>
  );
};
