export type TopItemType = {
  id: number;
  position: number;
  title: string;
  category: string | null;
  slug: string;
};

export type TopResponceType = {
  data: {
    id: number;
    attributes: {
      name: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      list: TopItemType[];
    };
  }[];
};
