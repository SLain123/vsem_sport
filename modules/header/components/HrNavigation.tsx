import React, { FC } from "react";

import { NavItemStandart } from "./NavItemStandart";

import styles from "../Header.module.scss";

const HrNavigation: FC = () => {
  const navList = [
    { id: 0, title: "Главная", link: "/" },
    { id: 1, title: "Посмотреть программы", link: "/trainings" },
    { id: 2, title: "Выбрать спорт", link: "/sports" },
    { id: 3, title: "Контакты", link: "/contacts" },
  ];

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
