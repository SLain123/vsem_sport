import React, { FC } from "react";
import Link from "next/link";

import styles from "../Footer.module.scss";

const FtDownRow: FC = () => {
  return (
    <div className={styles.down_container}>
      <Link
        href="https://education.finam.ru/privacy"
        className={styles.down_link}
      >
        Политика конфиденциальности
      </Link>

      <div className={styles.down_org_block}>Данные</div>

      <div className={styles.down_org_block}>
        <span className={styles.down_org_text}>© 2000–2022 «ФИНАМ»</span>
      </div>

      <div className={styles.text_end}>
        <a className={styles.down_mail} href={`mailto:example`}>
          example.mail
        </a>
      </div>
    </div>
  );
};

export { FtDownRow };
