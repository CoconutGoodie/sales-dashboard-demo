import ArrowRight01 from "@src/assets/icons/hugeicons/arrow-right01.svg?component";

import styles from "./ActiveBookingsWidget.module.scss";
import { useScrollbarVisibility } from "@src/hooks/useScrollbarVisibility";
import { ComponentRef, useRef } from "react";
import clsx from "clsx";

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
        <BookingCard />
        <BookingCard />
        <BookingCard />
      </div>
    </div>
  );
};

// --------

const BookingCard = () => {
  return (
    <div className={styles.card}>
      <h1>Award Ceremony</h1>
      <h2>13:00 - 15:00</h2>
      <input type="checkbox" />
    </div>
  );
};
