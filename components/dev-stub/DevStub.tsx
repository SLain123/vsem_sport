import React, { FC } from "react";
import Image from "next/image";

import { MainContainer } from "components/wrappers";

import styles from "./DevStub.module.scss";
import stubAnimation from "public/img/dev-stub.gif";

type Props = {
  message: string;
};

const DevStub: FC<Props> = ({ message }) => {
  return (
    <MainContainer className={styles.stub_container}>
      <div className={styles.stub_img}>
        <Image src={stubAnimation} alt="Картинка заглушка" fill />
      </div>
      <span className={styles.stub_message}>{message}</span>
    </MainContainer>
  );
};

export { DevStub };
