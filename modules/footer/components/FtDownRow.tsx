import React, { FC } from "react";

import styles from "../Footer.module.scss";

const FtDownRow: FC = () => {
  return (
    <div className={styles.down_container}>
      <span className={styles.down_org_text}>
        Copyright ©2023 All rights reserved | This web portal was created by the
        company Conquest of Infinity
      </span>
    </div>
  );
};

export { FtDownRow };
