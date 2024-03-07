import logoSrc from "@src/assets/logo.svg";
import Home06 from "@src/assets/icons/hugeicons/home06.svg?component";
import ChartLineData01 from "@src/assets/icons/hugeicons/chart-line-data01.svg?component";
import Calendar04 from "@src/assets/icons/hugeicons/calendar04.svg?component";
import Database from "@src/assets/icons/hugeicons/database.svg?component";
import Mail01 from "@src/assets/icons/hugeicons/mail01.svg?component";
import Attachment01 from "@src/assets/icons/hugeicons/attachment01.svg?component";
import UserGroup from "@src/assets/icons/hugeicons/user-group.svg?component";
import Favourite from "@src/assets/icons/hugeicons/favourite.svg?component";
import Bookmark02 from "@src/assets/icons/hugeicons/bookmark02.svg?component";

import { PropsWithChildren } from "react";
import { Outlet, useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { clsx } from "clsx";

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
          <NavButton to="/agenda">
            <Calendar04 />
          </NavButton>
          <NavButton to="/sales-data">
            <Database />
          </NavButton>
          <NavButton to="/mails">
            <Mail01 />
          </NavButton>
          <NavButton to="/attachments">
            <Attachment01 />
          </NavButton>
          <NavButton to="/users">
            <UserGroup />
          </NavButton>
          <NavButton to="/favorites">
            <Favourite />
          </NavButton>
          <NavButton to="/bookmarks">
            <Bookmark02 />
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
