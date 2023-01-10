import React, { FC } from "react";

import { FtLinkRow } from "./FtLinkRow";

import styles from "../Footer.module.scss";

const FtNavigation: FC = () => {
  const navList = [
    { id: 0, title: "", link: "" },
    { id: 1, title: "", link: "" },
    { id: 2, title: "", link: "" },
    { id: 3, title: "", link: "" },
  ];

  return (
    <div className={styles.nav_container}>
      <ul className={styles.nav_col}>
        {navList.map(({ id, title, link }) => (
          <FtLinkRow key={id} title={title} link={link} isBold />
        ))}
      </ul>
    </div>
  );
};
export { FtNavigation };
