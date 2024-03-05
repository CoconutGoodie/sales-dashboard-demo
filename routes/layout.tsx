import { PropsWithChildren } from "react";

import styles from "./layout.module.scss";

const RootLayout = (props: PropsWithChildren) => {
  return (
    <div className={styles.root}>
      <h1>Root Layout</h1>
      {props.children}
    </div>
  );
};

export default RootLayout;
