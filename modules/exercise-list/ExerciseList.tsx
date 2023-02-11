import React, { FC } from "react";

import { ExerciseItem } from "./components/ExerciseItem";

import { ExerciseType } from "types/Exercise";

import styles from "./ExerciseList.module.scss";

type Props = { title: string; exercises: ExerciseType[] };

const ExerciseList: FC<Props> = ({ title, exercises }) => {
  return (
    <div className={styles.ex_container}>
      <h2 className={styles.ex_title}>{title}</h2>
      <ul className={styles.ex_list}>
        {exercises.map(({ id, attributes }) => {
          const { equipment, level, partOfBody, preview, score, slug, title } =
            attributes;

          return (
            <li key={id} className={styles.ex_item}>
              <ExerciseItem
                preview={preview}
                title={title}
                slug={slug}
                score={score}
                partOfBody={partOfBody}
                level={level}
                equipment={equipment}
              />
            </li>
          );
        })}

        {!exercises.length && (
          <li className={styles.item_text}>
            Описание упражнений для данной страницы не обнаружены. Попробуйте
            вернуться на более ранюю страницу или проверить корректность
            используемой ссылки.
          </li>
        )}
      </ul>
    </div>
  );
};

export { ExerciseList };
