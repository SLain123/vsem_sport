import React, { FC } from "react";
import { GhostNavbar } from "react-hamburger-menus";
import Link from "next/link";

import { NavListType } from "../Header.d";

import styles from "../Header.module.scss";

const Humburger: FC<NavListType> = ({ navList }) => {
  return (
    <GhostNavbar
      styles={{
        navigation: {
          top: 4,
          left: "calc(100% - 64px)",
        },
        navigationBackground: { background: "#e16521" },
        navigationButton: { background: "#e16521" },
      }}
    >
      <ul>
        {navList.map(({ id, title, link }) => (
          <li key={id} className={styles.menu_link}>
            <Link href={link}>{title}</Link>
          </li>
        ))}
      </ul>
    </GhostNavbar>
  );
};

export { Humburger };
