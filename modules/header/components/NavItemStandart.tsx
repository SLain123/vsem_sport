import React, { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "../Header.module.scss";

type Props = {
  title: string;
  link: string;
};

const NavItemStandart: FC<Props> = ({ title, link }) => {
  const { route } = useRouter();
  const activeStyle = route === link ? styles.nav_link_active : "";

  return (
    <li>
      <Link href={link} className={`${styles.nav_link} ${activeStyle}`}>
        {title}
      </Link>
    </li>
  );
};

export { NavItemStandart };
