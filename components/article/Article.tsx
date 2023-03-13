import React, { FC } from "react";
import ReactMarkdown from "react-markdown";

import { BaseImageType } from "types/Common";

import styles from "./Article.module.scss";

type Props = {
  title: string;
  keyWords: string[];
  preview: {
    data: {
      id: number;
      attributes: BaseImageType;
    };
  };
  text: string;
  comments: string[] | null;
};

const Article: FC<Props> = ({ title, keyWords, preview, text }) => {
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
  const transformImageUri = (src: string) => `${baseUrl}${src}`;

  return (
    <div
      className={styles.art_container}
      itemScope
      itemType="https://schema.org/Article"
    >
      <h1 className={styles.art_title} itemProp="name">
        {title}
      </h1>

      {keyWords?.length ? (
        <div className={styles.art_word_container}>
          {keyWords.map((word) => (
            <span itemProp="about" key={word} className={styles.art_word_item}>
              {word}
            </span>
          ))}
        </div>
      ) : null}

      <picture>
        <source
          srcSet={imgUrl.desk}
          media="(min-width: 1024px)"
          width={660}
          height={440}
        />
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
          width={400}
          height={266}
        />
      </picture>

      <div itemProp="articleBody">
        <ReactMarkdown
          children={text}
          className={styles.art_text_block}
          transformImageUri={transformImageUri}
        />
      </div>

      <meta itemProp="image" content={imgUrl.mob}></meta>
    </div>
  );
};

export { Article };
