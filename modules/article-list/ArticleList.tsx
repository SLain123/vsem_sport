import React, { FC } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";

import { ArticleType } from "types/Article";

import { ArticleItem } from "./components/ArticleItem";

import styles from "./Article.module.scss";

type ArticleBlockType = {
  title: string;
  articles: ArticleType[];
};

const ArticleList: FC<ArticleBlockType> = ({ title, articles }) => {
  return (
    <div className={styles.artl_container}>
      <h2 className={styles.artl_title}>{title}</h2>
      <ul className={styles.artl_list}>
        {articles.map(({ id, attributes }) => {
          const { title, text, keyWords, slug, preview } = attributes;

          return (
            <li key={id}>
              <LazyLoadComponent>
                <ArticleItem
                  title={title}
                  text={text}
                  keyWords={keyWords}
                  slug={slug}
                  preview={preview}
                />
              </LazyLoadComponent>
            </li>
          );
        })}
        {!articles.length && (
          <li className={styles.item_text}>
            Статьи для данной страницы не обнаружены. Попробуйте вернуться на
            более ранюю страницу или проверить корректность используемой ссылки.
          </li>
        )}
      </ul>
    </div>
  );
};

export { ArticleList };
