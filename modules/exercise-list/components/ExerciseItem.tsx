import React, { FC } from "react";
import Link from "next/link";

import { BaseImageType } from "types/Common";
import { cropText } from "utils/textCropper";

import styles from "../ExerciseList.module.scss";

export type ExerciseItemType = {
  equipment: string;
  level: string;
  partOfBody: string;
  preview: {
    data: {
      id: number;
      attributes: BaseImageType;
    };
  };
  score: number;
  slug: string;
  title: string;
};

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
    <div
      className={styles.item_container}
      itemScope
      itemType="https://schema.org/Article"
    >
      <Link
        href={`/exercise/${slug}`}
        className={styles.item_img_container}
        itemProp="url"
      >
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
          <h2 itemProp="name" className={styles.item_title}>
            {cropText(title, 120)}
          </h2>
        </Link>
        <div style={{ position: "relative" }} itemProp="about">
          <p className={styles.item_desc}>
            Упражнение на <span>{partOfBody}</span>
          </p>
          <p className={styles.item_desc} itemProp="about">
            Оборудование: <span>{equipment}</span>
          </p>
          <p className={styles.item_desc} itemProp="about">
            Уровень сложности: <span>{level}</span>
          </p>
        </div>
      </div>

      <meta itemProp="image" content={imgUrl}></meta>
    </div>
  );
};

export { ExerciseItem };
