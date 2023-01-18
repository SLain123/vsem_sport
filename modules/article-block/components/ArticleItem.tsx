import React, { FC } from "react";

import { ArticleAttributeType } from "types/Article";

type ArticleItemType = Omit<
  ArticleAttributeType,
  "createdAt" | "updatedAt" | "publishedAt" | "gallery"
>;

const ArticleItem: FC<ArticleItemType> = ({
  title,
  text,
  //   keyWords,
  //   comments,
  //   sportType,
  //   slug,
  //   preview,
}) => {
  return (
    <div>
      {title} {text}
    </div>
  );
};

export { ArticleItem };
