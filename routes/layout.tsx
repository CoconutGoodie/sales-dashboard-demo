import Home06 from "@src/assets/icons/hugeicons/home06.svg?component";
import ChartLineData01 from "@src/assets/icons/hugeicons/chart-line-data01.svg?component";
import { PropsWithChildren } from "react";
import { Outlet, useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { clsx } from "clsx";

import logoSrc from "@src/assets/logo.svg";

import styles from "./layout.module.scss";
import "./style.scss";

const NavButton = (props: PropsWithChildren<{ to: string }>) => {
  const location = useLocation();

  const active = location.pathname === props.to;

  return (
    <NavLink
      to={props.to}
      className={clsx(styles.navbutton, active && styles["navbutton--active"])}
      // Prevented for demo purposes
      onClick={(e) => e.preventDefault()}
    >
      {props.children}
      {active && <div className={styles.marker} />}
    </NavLink>
  );
};

const RootLayout = () => {
  return (
    <main className={styles.root}>
      <aside className={styles.aside}>
        <NavLink to="/home" className={styles.logo}>
          <img src={logoSrc} />
        </NavLink>

        <nav className={styles.navigation}>
          <NavButton to="/home">
            <Home06 />
          </NavButton>
          <NavButton to="/analysis">
            <ChartLineData01 />
          </NavButton>
        </nav>
      </aside>

      <header className={styles.header}></header>

      <div className={styles.page}>
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
