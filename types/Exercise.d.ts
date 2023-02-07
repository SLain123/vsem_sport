import { PaginationType, BaseImageType } from "./Common";

export type ExerciseAttributeType = {
  alternativeList?: string[];
  createdAt: string;
  description: string;
  equipment: string;
  exType: string;
  extraBodyParts: string[] | null;
  level: string;
  partOfBody: string;
  preview: {
    data: {
      id: number;
      attributes: BaseImageType;
    };
  };
  publishedAt: string;
  score: number;
  slug: string;
  title: string;
  updatedAt: string;
  youtube: string | null;
};

export type ExerciseType = {
  id: number;
  attributes: ExerciseAttributeType;
};

export type ExercisesResponse = {
  data: ExerciseType[];
  meta: {
    pagination: PaginationType;
  };
};
