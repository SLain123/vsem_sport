import React, { FC } from "react";
import Link from "next/link";

import styles from "../Footer.module.scss";

type Props = {
  title: string;
  link: string;
  isBold?: boolean;
};

const FtLinkRow: FC<Props> = ({ title, link, isBold }) => {
  return (
    <li>
      <Link href={link} className={isBold ? styles.nav_bold : styles.nav_text}>
        {title}
      </Link>
    </li>
  );
};

export { FtLinkRow };