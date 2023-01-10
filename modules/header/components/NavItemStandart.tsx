import React, { FC } from "react";
import Link from "next/link";

import styles from "../Header.module.scss";

type Props = {
  title: string;
  link: string;
};

const NavItemStandart: FC<Props> = ({ title, link }) => {
  return (
    <li className={styles.nav_item}>
      <Link href={link} className={styles.nav_link}>
        {title}
      </Link>
    </li>
  );
};

export { NavItemStandart };