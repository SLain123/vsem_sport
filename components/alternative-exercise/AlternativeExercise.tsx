import React, { FC } from "react";
import Link from "next/link";

import { ExerciseMini } from "types/Exercise";

import styles from "./AlternativeExercise.module.scss";

type Props = {
  alternativeList: ExerciseMini[];
};

const AlternativeExercise: FC<Props> = ({ alternativeList }) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  return (
    <div className={styles.alt_container}>
      <h2 className={styles.alt_header}>Альтернативные упражнения:</h2>

      <ul className={styles.alt_list}>
        {alternativeList.map(
          ({
            id,
            title,
            preview,
            slug,
            score,
            equipment,
            partOfBody,
            level,
          }) => (
            <li className={styles.alt_item} key={id}>
              <Link href={`/exercise/${slug}`} className={styles.alt_link}>
                <img
                  src={`${baseUrl}${preview}`}
                  alt="Изображение для следующей статьи"
                  className={styles.alt_img}
                  width={260}
                />
                <div className={styles.alt_score}>{score}</div>
              </Link>
              <div className={styles.alt_info_block}>
                <Link href={`/exercise/${slug}`}>
                  <h3 className={styles.alt_title}>{title}</h3>
                </Link>
                <div>
                  <p className={styles.alt_desc}>
                    Упражнение на <span>{partOfBody}</span>
                  </p>
                  <p className={styles.alt_desc}>
                    Оборудование: <span>{equipment}</span>
                  </p>
                  <p className={styles.alt_desc}>
                    Уровень сложности: <span>{level}</span>
                  </p>
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export { AlternativeExercise };
