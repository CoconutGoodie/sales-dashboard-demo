import { Button } from "@src/components/Button";
import { CSSProperties, ReactNode } from "react";

import styles from "./CtaCardWidget.module.scss";

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
  ctaText: string;
  accentColor?: string;
}

export const CtaCardWidget = (props: Props) => {
  return (
    <div
      className={styles.widget}
      style={{ "--accent": props.accentColor } as CSSProperties}
    >
      <div>{props.icon}</div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <Button className={styles.button}>{props.ctaText}</Button>
    </div>
  );
};
