import { ComponentProps } from "react";

import clsx from "clsx";
import styles from "./Toggle.module.scss";

type Props = ComponentProps<"button"> & {
  checked: boolean;
  onChange?: (checked: boolean) => void;
};

export const Toggle = (props: Props) => {
  const { checked, onChange, ...wrapperProps } = props;

  return (
    <button
      {...wrapperProps}
      className={clsx(wrapperProps.className, styles.wrapper)}
      onClick={() => onChange?.(!checked)}
    >
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <div className={styles.knob} />
    </button>
  );
};
