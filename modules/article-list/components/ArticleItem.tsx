import React, { FC } from "react";
import Link from "next/link";
import removeMarkdown from "markdown-to-text";

import { ArticleAttributeType } from "types/Article";

import { cropText } from "utils/textCropper";

import styles from "../Article.module.scss";

type ArticleItemType = Omit<
  ArticleAttributeType,
  | "createdAt"
  | "updatedAt"
  | "publishedAt"
  | "comments"
  | "categories"
  | "relativeArticles"
  | "publish_at"
>;

const ArticleItem: FC<ArticleItemType> = ({
  title,
  text,
  keyWords,
  slug,
  preview,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const imgUrl = {
    tab: preview?.data?.attributes?.formats?.medium?.url
      ? `${baseUrl}${preview.data.attributes.formats.medium.url}`
      : `${baseUrl}${preview.data.attributes.url}`,
    mob: preview?.data?.attributes?.formats?.small?.url
      ? `${baseUrl}${preview.data.attributes.formats.small.url}`
      : `${baseUrl}${preview.data.attributes.url}`,
  };

  return (
    <div
      className={styles.item_container}
      itemScope
      itemType="https://schema.org/Article"
    >
      <Link href={`/article/${slug}`} itemProp="url">
        <picture>
          <source
            srcSet={imgUrl.tab}
            media="(min-width: 768px)"
            width={420}
            height={300}
          />
          <img
            className={styles.item_img}
            src={imgUrl.mob}
            alt={title}
            width={290}
            height={214}
          />
        </picture>
      </Link>

      <div className={styles.item_info_block}>
        <Link href={`/article/${slug}`} className={styles.item_img_link}>
          <h2 itemProp="name" className={styles.item_title}>
            {cropText(title, 120)}
          </h2>
        </Link>
        <p className={styles.item_text} itemProp="articleBody">
          {removeMarkdown(cropText(text, 420))}
        </p>
        <div className={styles.item_key_words_block}>
          {keyWords.map((word, indx) =>
            indx <= 5 ? (
              <span
                itemProp="about"
                key={word}
                className={styles.item_key_word}
              >
                {word}
              </span>
            ) : null
          )}
        </div>
      </div>

      <meta itemProp="image" content={imgUrl.mob}></meta>
    </div>
  );
};

export { ArticleItem };
