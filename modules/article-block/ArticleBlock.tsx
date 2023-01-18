import React, { FC } from "react";

import { ArticleType } from "types/Article";
import { useGetArticleBySlugQuery } from "redux/api/articlesApi";

import { ArticleItem } from "./components/ArticleItem";

import styles from "./ArticleBlock.module.scss";

type ArticleBlockType = {
  title: string;
  articleList: ArticleType[];
};

const ArticleBlock: FC<ArticleBlockType> = ({ title, articleList }) => {
  const { data } = useGetArticleBySlugQuery("second");

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className={styles.artl_container}>
      <h2 className={styles.artl_title}>{title}</h2>
      <ul className={styles.artl_list}>
        {articleList.map(({ id, attributes }) => {
          const { title, text, keyWords, comments, sportType, slug, preview } =
            attributes;

          return (
            <li key={id}>
              <ArticleItem
                title={title}
                text={text}
                keyWords={keyWords}
                comments={comments}
                sportType={sportType}
                slug={slug}
                preview={preview}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { ArticleBlock };
