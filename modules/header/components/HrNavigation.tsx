import React, { FC } from "react";

import { NavItemStandart } from "./NavItemStandart";

import styles from "../Header.module.scss";

const HrNavigation: FC = () => {
  const navList = [
    { id: 0, title: "first", link: "1" },
    { id: 1, title: "second", link: "2" },
    { id: 2, title: "third", link: "3" },
    { id: 3, title: "fourts", link: "4" },
  ];

  return (
    <nav>
      <ul className={styles.nav_list}>
        {navList.map(({ id, title, link }) => (
          <NavItemStandart key={id} title={title} link={link} />
        ))}
      </ul>
    </nav>
  );
};

export { HrNavigation };
