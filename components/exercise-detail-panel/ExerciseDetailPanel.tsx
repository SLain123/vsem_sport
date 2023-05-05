import React, { FC } from "react";

import styles from "./ExerciseDetailPanel.module.scss";

type Props = {
  equipment: string;
  exType: string;
  extraBodyParts: string[] | null;
  level: string;
  partOfBody: string;
  score: number;
  bodyPartUrl: string | null;
};

const ExerciseDetailPanel: FC<Props> = ({
  equipment,
  exType,
  extraBodyParts,
  level,
  partOfBody,
  score,
  bodyPartUrl,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  return (
    <div className={styles.edp_container}>
      <div className={styles.edp_score}>{score}</div>
      <p className={styles.edp_header}>{partOfBody}</p>
      <p className={styles.edp_desc}>
        Тип упражнения: <span>{exType}</span>
      </p>
      <p className={styles.edp_desc}>
        Оборудование: <span>{equipment}</span>
      </p>
      <p className={styles.edp_desc}>
        Уровень сложности: <span>{level}</span>
      </p>

      {bodyPartUrl && (
        <img
          src={`${baseUrl}${bodyPartUrl}`}
          alt="Схема целевой мышечной группы"
          width={300}
          height={300}
          className={styles.edp_img}
        />
      )}

      {extraBodyParts?.length ? (
        <div className={styles.edp_extra_container}>
          <p className={styles.edp_extra_header}>Вспомогательные мышцы:</p>
          {extraBodyParts.map((muscle) => (
            <p key={muscle} className={styles.edp_extra_item}>
              {muscle}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export { ExerciseDetailPanel };
