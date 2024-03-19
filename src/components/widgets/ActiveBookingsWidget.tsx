import ArrowRight01 from "@src/assets/icons/hugeicons/arrow-right01.svg?component";

import styles from "./ActiveBookingsWidget.module.scss";
import { useScrollbarVisibility } from "@src/hooks/useScrollbarVisibility";
import { CSSProperties, ComponentRef, useRef } from "react";
import clsx from "clsx";
import { Toggle } from "@src/components/Toggle";

export const ActiveBookingsWidget = () => {
  const containerRef = useRef<ComponentRef<"div">>(null);
  const scrollbarVisible = useScrollbarVisibility(containerRef);

  return (
    <div className={styles.widget}>
      <div className={styles.header}>
        <h1>Active Bookings</h1>
        <a>
          <span>All</span>
          <ArrowRight01 width={18} height={18} />
        </a>
      </div>

      <div
        ref={containerRef}
        className={clsx(
          styles.container,
          scrollbarVisible.vertical && styles.scrollable
        )}
      >
        <BookingCard index={0} color="#3167F2" />
        <BookingCard index={1} color="#7DB439" />
        <BookingCard index={2} color="#EF41D6" />
      </div>
    </div>
  );
};

// --------

const BookingCard = (props: { color?: string; index: number }) => {
  return (
    <div
      className={styles.card}
      style={
        {
          "--color": props.color ?? "#000",
          "--index": props.index,
        } as CSSProperties
      }
    >
      <h1>Award Ceremony</h1>
      <h2>13:00 - 15:00</h2>
      <Toggle checked />
    </div>
  );
};
