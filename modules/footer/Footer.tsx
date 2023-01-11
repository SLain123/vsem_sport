import React, { FC } from "react";

import { MainContainer } from "components/wrappers";

import { FtTopRow } from "./components/FtTopRow";
import { FtNavigation } from "./components/FtNavigation";
import { FtDownRow } from "./components/FtDownRow";

import styles from "./Footer.module.scss";

const Footer: FC = () => {
  
  return (
    <footer className={styles.ft_container}>
      <MainContainer>
        <FtTopRow />
        <FtNavigation />
        <FtDownRow />
      </MainContainer>
    </footer>
  );
};

export { Footer };
