import React, { FC } from "react";
import Link from "next/link";

import styles from "./ErrorPage.module.scss";

type Props = {
  code: string | number;
  message: string;
};

const ErrorPage: FC<Props> = ({ code, message }) => {
  return (
    <div className={styles.ep_container}>
      <div className={styles.ep_background}></div>
      <div className={styles.ep_info_block}>
        <p className={styles.ep_code}>{code}</p>
        <p className={styles.ep_message}>{message}</p>
        <Link className={styles.ep_btn} href="/">
          Отправиться домой
        </Link>
      </div>
    </div>
  );
};

export { ErrorPage };
