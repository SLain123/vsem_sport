import React, { FC, useState, useEffect } from "react";
import { Squash as HamburgerBtn } from "hamburger-react";
import Link from "next/link";

import { NavListType } from "../Header.d";

import { useScrollBlock, useCreatePortalInBody } from "hooks";

import styles from "../Header.module.scss";

const Humburger: FC<NavListType> = ({ navList }) => {
  const [isOpen, setOpen] = useState(false);

  const [blockScroll, allowScroll] = useScrollBlock();
  const createBodyPortal = useCreatePortalInBody();

  useEffect(() => {
    isOpen ? blockScroll() : allowScroll();
    return () => {
      allowScroll();
    };
  }, [isOpen]);

  return (
    <>
      <HamburgerBtn
        toggled={isOpen}
        toggle={setOpen}
        size={40}
        color="white"
        rounded
        label="Открыть меню"
      />

      {isOpen &&
        createBodyPortal(
          <ul className={styles.menu_container}>
            {navList.map(({ id, title, link }) => (
              <li key={id} className={styles.menu_link}>
                <Link href={link}>{title}</Link>
              </li>
            ))}
          </ul>
        )}
    </>
  );
};

export { Humburger };
