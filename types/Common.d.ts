export type PaginationType = {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
};

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
