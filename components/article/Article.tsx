import React, { FC } from "react";
import ReactMarkdown from "react-markdown";

import { ArticleAttributeType } from "types/Article";

import styles from "./Article.module.scss";

type Props = Omit<
  ArticleAttributeType,
  | "createdAt"
  | "updatedAt"
  | "publishedAt"
  | "categories"
  | "slug"
  | "relativeArticles"
>;

const Article: FC<Props> = ({ title, keyWords, preview, text }) => {
  if (!preview) {
    return null;
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const imgUrl = {
    desk: `${baseUrl}${preview.data.attributes.url}`,
    tab: preview?.data?.attributes?.formats?.medium?.url
      ? `${baseUrl}${preview.data.attributes.formats.medium.url}`
      : `${baseUrl}${preview.data.attributes.url}`,
    mob: preview?.data?.attributes?.formats?.small?.url
      ? `${baseUrl}${preview.data.attributes.formats.small.url}`
      : `${baseUrl}${preview.data.attributes.url}`,
  };

  return (
    <div className={styles.art_container}>
      <h1 className={styles.art_title}>{title}</h1>

      {keyWords.length && (
        <div className={styles.art_word_container}>
          {keyWords.map((word) => (
            <span key={word} className={styles.art_word_item}>
              {word}
            </span>
          ))}
        </div>
      )}

      <picture>
        <source srcSet={imgUrl.desk} media="(min-width: 1024px)" width={660} />
        <source
          srcSet={imgUrl.tab}
          media="(min-width: 768px)"
          width={400}
          height={266}
        />
        <img
          className={styles.art_img}
          src={imgUrl.mob}
          alt={title}
          width="100%"
        />
      </picture>

      <ReactMarkdown children={text} className={styles.art_text_block} />
    </div>
  );
};

export { Article };
