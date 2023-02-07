import { PaginationType, BaseImageType } from "./Common";

export type Categories =
  | "other"
  | "fitnes"
  | "crossfit"
  | "run"
  | "yoga"
  | "bodybuilding";

export type ArticleAttributeType = {
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  text: string;
  keyWords: string[];
  comments: string[] | null;
  categories: Categories[];
  slug: string;
  preview: {
    data: {
      id: number;
      attributes: BaseImageType;
    };
  };
  relativeArticles: string[];
};

export type ArticleType = {
  id: number;
  attributes: ArticleAttributeType;
};

export type ArticlesResponse = {
  data: ArticleType[];
  meta: {
    pagination: PaginationType;
  };
};

export type ArticleMini = {
  id: number;
  title: string;
  slug: string;
  preview: string;
};

export type ArticleMiniResponse = {
  articleList: ArticleMini[];
};
