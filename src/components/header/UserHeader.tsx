import Notifications02 from "@src/assets/icons/hugeicons/notification02.svg?component";
import Settings02 from "@src/assets/icons/hugeicons/settings01.svg?component";
import SedaProfilePhoto from "@src/assets/profile/seda.png";
import { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

import clsx from "clsx";
import styles from "./UserHeader.module.scss";

export const UserHeader = () => {
  return (
    <div className={styles.header}>
      <nav className={styles.nav}>
        <NavButton to="/notifications" badge>
          <Notifications02 />
        </NavButton>

        <NavButton to="/notifications">
          <Settings02 />
        </NavButton>
      </nav>

      <UserCard
        fullname="Seda Şen"
        title="UI/UX Designer"
        photoUrl={SedaProfilePhoto}
      />
    </div>
  );
};

/* ------------- */

const NavButton = (
  props: PropsWithChildren<{ to: string; badge?: boolean }>
) => {
  return (
    <NavLink
      to={props.to}
      className={clsx(styles.navLink, props.badge && styles.badge)}
      // Prevented for demo purposes
      onClick={(e) => e.preventDefault()}
    >
      {props.children}
    </NavLink>
  );
};

const UserCard = (props: {
  fullname: string;
  title: string;
  photoUrl: string;
}) => {
  return (
    <a
      className={styles.userCard}
      href="https://www.figma.com/@seda"
      target="_blank"
      rel="noreferrer"
    >
      <img src={props.photoUrl} alt="User Profile Photo" />
      <h1>{props.fullname}</h1>
      <h2>{props.title}</h2>
    </a>
  );
};
