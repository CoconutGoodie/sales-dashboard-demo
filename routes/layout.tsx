import { Outlet } from "react-router";

import styles from "./layout.module.scss";

const RootLayout = () => {
  return (
    <div className={styles.root}>
      <h1>Root Layout</h1>
      <Outlet />
    </div>
  );
};

export default RootLayout;
