import React, { FC } from "react";
import Image from "next/image";

import styles from "../Footer.module.scss";
import Logo from "public/img/logo-black.png";

const FtTopRow: FC = () => {
  return (
    <div className={styles.top_container}>
      <Image src={Logo} alt="logo" width={108} height={30} />
      <div className={styles.top_soc_block}>
        <span className={styles.top_soc_text}>
          Присоединяйтесь к нам в социальных сетях
        </span>
      </div>
    </div>
  );
};

export { FtTopRow };
