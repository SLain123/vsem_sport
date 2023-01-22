import React, { FC } from "react";
import Link from "next/link";
import removeMarkdown from "markdown-to-text";

import { ArticleAttributeType } from "types/Article";

import { cropText } from "utils/textCropper";

import styles from "../ArticleList.module.scss";

type ArticleItemType = Omit<
  ArticleAttributeType,
  "createdAt" | "updatedAt" | "publishedAt" | "comments" | "categories"
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
    // TODO: remove desk variable after realise article page;
    desk: `${baseUrl}${preview.data.attributes.url}`,
    tab: preview?.data?.attributes?.formats?.medium?.url
      ? `${baseUrl}${preview.data.attributes.formats.medium.url}`
      : `${baseUrl}${preview.data.attributes.url}`,
    mob: preview?.data?.attributes?.formats?.small?.url
      ? `${baseUrl}${preview.data.attributes.formats.small.url}`
      : `${baseUrl}${preview.data.attributes.url}`,
  };

  return (
    <div className={styles.item_container}>
      <Link href={`/article/${slug}`}>
        <picture>
          <source
            srcSet={imgUrl.tab}
            media="(min-width: 768px)"
            width={490}
            height={318}
          />
          <img
            className={styles.item_img}
            src={imgUrl.mob}
            alt={title}
            width={290}
            height={184}
          />
        </picture>
      </Link>

      <div className={styles.item_info_block}>
        <Link href={`/article/${slug}`}>
          <h3 className={styles.item_title}>{cropText(title, 120)}</h3>
        </Link>
        <p className={styles.item_text}>
          {removeMarkdown(cropText(text, 380))}
        </p>
        <div className={styles.item_key_words_block}>
          {keyWords.map((word, indx) =>
            indx <= 5 ? (
              <span className={styles.item_key_word}>{word}</span>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export { ArticleItem };
