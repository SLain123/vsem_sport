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
      { id: 10, title: "Набор мышечной массы", link: "/programs/mass-up" },
      { id: 11, title: "Сброс веса и рельеф", link: "/programs/down-weight" },
      {
        id: 12,
        title: "Увеличение силовых показателей",
        link: "/programs/strength-up",
      },
      { id: 13, title: "Кроссфит (WOD's)", link: "/programs/crossfit" },
      { id: 14, title: "Беговые программы", link: "/programs/run" },
      { id: 15, title: "Ударные виды спорта", link: "/programs/fight-sports" },
      { id: 16, title: "Разное", link: "/programs/other-training" },
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
    subLinkList: [
      { id: 30, title: "Жим лежа", link: "/exercise/bench-press-barbell" },
      { id: 31, title: "Прыжки на бокс", link: "/exercise/jumping-on-box" },
      { id: 32, title: "Скалолаз", link: "/exercise/rock-climber" },
      {
        id: 33,
        title: "Переворачивание шины",
        link: "/exercise/turning-over-tire",
      },
      { id: 34, title: "Подтягивания", link: "/exercise/pull-ups" },
      {
        id: 35,
        title: "Короткие интвервалы",
        link: "/exercise/short-intervals",
      },
      { id: 36, title: "Становая тяга", link: "/exercise/deadlift" },
      { id: 37, title: "Фартлек", link: "/exercise/fartlek" },
    ],
  },
  {
    id: 3,
    title: "Наши контакты",
    link: "/contacts",
    IconSrc: ContactsIcon,
    subLinkList: [
      { id: 40, title: "Email", link: "slayn2012@gmail.com", email: true },
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
