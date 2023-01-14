import React, { FC } from "react";
import Image from "next/image";

import styles from "../Footer.module.scss";
import Logo from "public/img/logo-header.png";

const FtTopRow: FC = () => {
  return (
    <div className={styles.top_container}>
      <Image src={Logo} alt="logo" fill />
    </div>
  );
};

export { FtTopRow };
