import { ComponentProps } from "react";

import clsx from "clsx";
import styles from "./Toggle.module.scss";

type Props = ComponentProps<"button"> & {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export const Toggle = (props: Props) => {
  const { checked, onCheckedChange, ...wrapperProps } = props;

  return (
    <button
      {...wrapperProps}
      className={clsx(wrapperProps.className, styles.wrapper)}
      onClick={() => onCheckedChange?.(!checked)}
    >
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
      />
      <div className={styles.knob} />
    </button>
  );
};
