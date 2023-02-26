import React, { FC } from "react";

import styles from "../Footer.module.scss";
import Logo from "public/img/logo-header.png";

const FtTopRow: FC = () => {
  return (
    <div className={styles.top_container}>
      <picture>
        <source
          srcSet={Logo.src}
          media="(min-width: 1024px)"
          width={468}
          height={78}
        />
        <source
          srcSet={Logo.src}
          media="(min-width: 768px)"
          width={378}
          height={63}
        />
        <img src={Logo.src} alt="Логотип" width={252} height={42} />
      </picture>
    </div>
  );
};

export { FtTopRow };
