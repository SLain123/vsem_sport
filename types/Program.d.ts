export type ProgramListType = {
  id: number;
  programs: {
    id: number;
    title: string;
    slug: string;
  }[];
  section: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
};

export type ProgramListResponse = {
  data: ProgramListType[];
};
