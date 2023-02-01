export type CategoriesType =
  | "other"
  | "fitnes"
  | "crossfit"
  | "run"
  | "yoga"
  | "bodybuilding";

export type SideImageType = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null | string;
  width: number;
  height: number;
  size: number;
  url: string;
};

export type BaseImageType = {
  name: string;
  alternativeText: null | string;
  caption: null | string;
  width: number;
  height: number;
  formats: {
    thumbnail: SideImageType;
    small: SideImageType;
    medium: SideImageType;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null | string;
  provider: string;
  provider_metadata: null | string;
  createdAt: string;
  updatedAt: string;
};

export type ArticleAttributeType = {
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  text: string;
  keyWords: string[];
  comments: string[] | null;
  categories: CategoriesType[];
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

export type PaginationType = {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
};

export type ArticlesResponse = {
  data: Article[];
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
