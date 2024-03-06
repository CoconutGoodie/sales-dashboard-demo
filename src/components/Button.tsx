import clsx from "clsx";
import { ComponentProps } from "react";

import styles from "./Button.module.scss";

export const Button = (props: ComponentProps<"button">) => {
  return (
    <button {...props} className={clsx(props.className, styles.button)}>
      {props.children}
    </button>
  );
};
