import React, { FC } from "react";
import Link from "next/link";

import styles from "../Footer.module.scss";

type Props = {
  title: string;
  link: string;
  IconSrc: any;
  subLinkList: { id: number; title: string; link: string; email?: boolean }[];
};

const FtNavItem: FC<Props> = ({ title, link, IconSrc, subLinkList }) => {
  return (
    <li>
      <Link href={link} className={styles.nav_link_container}>
        <div className={styles.nav_icon_block}>
          <IconSrc width={42} height={42} />
        </div>
        <span className={styles.nav_link_title}>{title}</span>
      </Link>
      <ul className={styles.nav_sub_list}>
        {subLinkList.map(({ id, title, link, email }) => (
          <li className={styles.nav_sub_item} key={id}>
            <Link href={email ? `mailto:${link}` : link}>{title}</Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export { FtNavItem };
