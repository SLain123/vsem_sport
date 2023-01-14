import React, { FC } from "react";

import { NavItemStandart } from "./NavItemStandart";
import { NavListType } from "../Header.d";

import styles from "../Header.module.scss";

const HrNavigation: FC<NavListType> = ({ navList }) => {
  return (
    <nav className={styles.nav_container}>
      <ul className={styles.nav_list}>
        {navList.map(({ id, title, link }) => (
          <NavItemStandart key={id} title={title} link={link} />
        ))}
      </ul>
    </nav>
  );
};

export { HrNavigation };
