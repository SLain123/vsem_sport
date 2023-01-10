import React, { FC, PropsWithChildren } from "react";

import styles from "./MainContainer.module.scss";

type Props = {
  className?: string;
};

const MainContainer: FC<PropsWithChildren<Props>> = ({
  children,
  className = "",
}) => {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
};

export { MainContainer };
