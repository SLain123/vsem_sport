import React, { FC } from "react";

import styles from "./Banner.module.scss";

const Banner: FC = () => {
  return (
    <div className={styles.banner_container}>
      <div className={styles.banner_body}></div>
    </div>
  );
};

export { Banner };
