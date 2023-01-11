import React, { FC } from "react";

import { FtNavItem } from "./FtNavItem";

import styles from "../Footer.module.scss";
import TrainingsIcon from "../../../public/icon/footer/trainings.svg";
import SportsIcon from "../../../public/icon/footer/sports.svg";
import ContactsIcon from "../../../public/icon/footer/contacts.svg";

const FtNavigation: FC = () => {
  const navList = [
    {
      id: 0,
      title: "Программы тренировок",
      link: "/trainings",
      IconSrc: TrainingsIcon,
      subLinkList: [
        { id: 10, title: "Набор мышечной массы", link: "/trainings" },
        { id: 11, title: "Сбросить вес", link: "/trainings" },
        { id: 12, title: "Увеличить общую выносливость", link: "/trainings" },
        { id: 13, title: "Женские программы", link: "/trainings" },
      ],
    },
    {
      id: 1,
      title: "Спортивные разделы",
      link: "/sports",
      IconSrc: SportsIcon,
      subLinkList: [
        { id: 20, title: "Фитнес", link: "/sports" },
        { id: 21, title: "Бег", link: "/sports" },
        { id: 22, title: "Кроссфит", link: "/sports" },
        { id: 23, title: "Йога", link: "/sports" },
        { id: 24, title: "Бодибилдинг", link: "/sports" },
      ],
    },
    {
      id: 2,
      title: "Наши контакты",
      link: "/contacts",
      IconSrc: ContactsIcon,
      subLinkList: [
        { id: 30, title: "Email", link: "example@mail.ru", email: true },
      ],
    },
  ];

  return (
    <ul className={styles.nav_list}>
      {navList.map(({ id, title, link, IconSrc, subLinkList }) => (
        <FtNavItem
          key={id}
          title={title}
          link={link}
          IconSrc={IconSrc}
          subLinkList={subLinkList}
        />
      ))}
    </ul>
  );
};

export { FtNavigation };
