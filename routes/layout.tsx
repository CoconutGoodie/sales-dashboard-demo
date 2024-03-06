import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

import logoSrc from "@src/assets/logo.svg";

import styles from "./layout.module.scss";

const RootLayout = () => {
  return (
    <main className={styles.root}>
      <aside className={styles.aside}>
        <NavLink to="/home">
          <img src={logoSrc} />
        </NavLink>
        <nav>Navbar</nav>
      </aside>

      <div className={styles.page}>
        <header className={styles.header}>Header</header>
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
