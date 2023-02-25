import React, { FC } from "react";

import { FtNavItem } from "./FtNavItem";

import styles from "../Footer.module.scss";
import TrainingsIcon from "../../../public/icon/footer/trainings.svg";
import SportsIcon from "../../../public/icon/footer/sports.svg";
import ExerciseIcon from "../../../public/icon/footer/exercise.svg";
import ContactsIcon from "../../../public/icon/footer/contacts.svg";

const navList = [
  {
    id: 0,
    title: "Программы тренировок",
    link: "/programs/all",
    IconSrc: TrainingsIcon,
    subLinkList: [
      { id: 10, title: "Набор мышечной массы", link: "/programs/up_mass" },
      { id: 11, title: "Сбросить вес", link: "/programs/down_weight" },
      {
        id: 12,
        title: "Увеличить выносливость",
        link: "/programs/increase_stamina",
      },
      { id: 13, title: "Женские программы", link: "/programs/women" },
    ],
  },
  {
    id: 1,
    title: "Спортивные категории",
    link: "/categories",
    IconSrc: SportsIcon,
    subLinkList: [
      { id: 20, title: "Фитнес", link: "/fitnes" },
      { id: 21, title: "Бег", link: "/run" },
      { id: 22, title: "Кроссфит", link: "/crossfit" },
      { id: 23, title: "Йога", link: "/yoga" },
      { id: 24, title: "Бодибилдинг", link: "/bodybuilding" },
      { id: 25, title: "Разное", link: "/other" },
    ],
  },
  {
    id: 2,
    title: "Описание упражнений",
    link: "/exercises",
    IconSrc: ExerciseIcon,
    subLinkList: [{ id: 30, title: "Что то о беге", link: "/exercises" }],
  },
  {
    id: 3,
    title: "Наши контакты",
    link: "/contacts",
    IconSrc: ContactsIcon,
    subLinkList: [
      { id: 40, title: "Email", link: "example@mail.ru", email: true },
      { id: 41, title: "Русская версия политики", link: "/policy/ru" },
      { id: 42, title: "English Policy", link: "/policy/eng" },
    ],
  },
];

const FtNavigation: FC = () => {
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
