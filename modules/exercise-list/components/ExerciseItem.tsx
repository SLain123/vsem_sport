import React, { FC } from "react";
import Link from "next/link";

import { ExerciseAttributeType } from "types/Exercise";

import { cropText } from "utils/textCropper";

import styles from "../ExerciseList.module.scss";

export type ExerciseItemType = Omit<
  ExerciseAttributeType,
  | "alternativeList"
  | "createdAt"
  | "description"
  | "extraBodyParts"
  | "publishedAt"
  | "updatedAt"
  | "youtube"
  | "exType"
>;

const ExerciseItem: FC<ExerciseItemType> = ({
  equipment,
  level,
  partOfBody,
  preview,
  score,
  slug,
  title,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const imgUrl = preview?.data?.attributes?.formats?.small?.url
    ? `${baseUrl}${preview.data.attributes.formats.small.url}`
    : `${baseUrl}${preview.data.attributes.url}`;

  return (
    <div className={styles.item_container}>
      <Link href={`/exercise/${slug}`} className={styles.item_img_container}>
        <img
          className={styles.item_img}
          src={imgUrl}
          alt={title}
          width={330}
          height={220}
        />
        <div className={styles.item_score}>{score}</div>
      </Link>
      <div className={styles.item_info_block}>
        <Link href={`/exercise/${slug}`} className={styles.item_img_link}>
          <h3 className={styles.item_title}>{cropText(title, 120)}</h3>
        </Link>
        <div style={{ position: "relative" }}>
          <p className={styles.item_desc}>
            Упражнение на <span>{partOfBody}</span>
          </p>
          <p className={styles.item_desc}>
            Оборудование: <span>{equipment}</span>
          </p>
          <p className={styles.item_desc}>
            Уровень сложности: <span>{level}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export { ExerciseItem };
