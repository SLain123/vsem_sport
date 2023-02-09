import { PaginationType, BaseImageType } from "./Common";

export type BodyPartAttributeType = {
  name: string;
  preview: {
    data: {
      id: number;
      attributes: BaseImageType;
    };
  };
  updatedAt: string;
  publishedAt: string;
  createdAt: string;
};

export type BodyPartType = {
  id: number;
  attributes: BodyPartAttributeType;
};

export type ExercisesResponse = {
  data: BodyPartType[];
  meta: {
    pagination: PaginationType;
  };
};
