import ArrowRight01 from "@src/assets/icons/hugeicons/arrow-right01.svg?component";
import CalendarBlock02 from "@src/assets/icons/hugeicons/calendar-block02.svg?component";

import styles from "./ActiveBookingsWidget.module.scss";
import { useScrollbarVisibility } from "@src/hooks/useScrollbarVisibility";
import { CSSProperties, ComponentRef, useRef, useState } from "react";
import clsx from "clsx";
import { Toggle } from "@src/components/Toggle";

interface Booking {
  title: string;
  timeline: string;
  color: string;
}

export const ActiveBookingsWidget = () => {
  const containerRef = useRef<ComponentRef<"div">>(null);
  const scrollbarVisible = useScrollbarVisibility(containerRef);

  const [bookings, setBookings] = useState<Booking[]>([
    {
      title: "Daily Scrum",
      timeline: "08:30 - 09:00",
      color: "#3167F2",
    },
    {
      title: "Recruitment Interview",
      timeline: "10:00 - 11:00",
      color: "#7DB439",
    },
    {
      title: "Award Ceremony",
      timeline: "13:00 - 15:15",
      color: "#7A55B8",
    },
    {
      title: "Flavor Discussion",
      timeline: "16:30 - 18:00",
      color: "#E16449",
    },
    {
      title: "Report Evaluations",
      timeline: "18:30 - 20:00",
      color: "#EF41D6",
    },
  ]);

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
        {bookings.length === 0 && (
          <div className={styles.blankslate}>
            <CalendarBlock02 width={64} height={64} />
            <span>There is no active booking.</span>
          </div>
        )}

        {bookings.map((booking, i) => (
          <BookingCard
            key={booking.title}
            index={i}
            booking={booking}
            onRemove={() =>
              setBookings((bookings) => {
                return bookings.filter((b) => b !== booking);
              })
            }
          />
        ))}
      </div>
    </div>
  );
};

// --------

const BookingCard = (props: {
  index: number;
  booking: Booking;
  onRemove?: () => void;
}) => {
  const [checked, setChecked] = useState(true);

  return (
    <div
      className={clsx(styles.card, !checked && styles.removing)}
      style={
        {
          "--index": props.index,
          "--color": props.booking.color ?? "#000",
        } as CSSProperties
      }
      onAnimationEnd={(e) => {
        if (e.animationName === styles.fadeOut) {
          props.onRemove?.();
        }
      }}
    >
      <h1>{props.booking.title}</h1>
      <h2>{props.booking.timeline}</h2>
      <Toggle
        disabled={!checked}
        checked={checked}
        onCheckedChange={setChecked}
      />
    </div>
  );
};
