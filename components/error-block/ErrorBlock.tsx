import React, { FC } from "react";

import styles from "./ErrorBlock.module.scss";

export type ErrorBlockType = {
  message?: string;
  withRefresh?: boolean;
};

const ErrorBlock: FC<ErrorBlockType> = ({
  message = "Данные не были загружены.",
  withRefresh = true,
}) => {
  return (
    <div className={styles.error_container}>
      <span className={styles.error_message}>{message}</span>
      {withRefresh && (
        <>
          <span className={styles.error_message}>
            Пожалуйста, попробуйте обновить страницу.
          </span>
          <button
            type="button"
            className={styles.error_refresh_btn}
            onClick={() => document.location.reload()}
          >
            Обновить
          </button>
        </>
      )}
    </div>
  );
};

export { ErrorBlock };
