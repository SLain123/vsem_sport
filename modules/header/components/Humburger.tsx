import React, { FC, useState } from "react";
import Link from "next/link";

import { NavListType } from "../Header.d";

import styles from "../Header.module.scss";

const Humburger: FC<NavListType> = ({ navList }) => {
  const [isOpen, setOpen] = useState(false);
  const btnStyle = isOpen
    ? styles.mob_menu_btn_open
    : styles.mob_menu_btn_close;

  return (
    <>
      <button
        type="button"
        className={`${styles.mob_menu_btn} ${btnStyle}`}
        onClick={() => setOpen((status) => !status)}
      ></button>
      <>
        {isOpen && (
          <div className={styles.mob_menu_container}>
            <ul className={styles.mob_menu_list}>
              {navList.map(({ id, title, link }) => (
                <li key={id} className={styles.mob_menu_link}>
                  <Link href={link}>{title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    </>
  );
};

export { Humburger };
