export type ExerciseFilterAttributes = {
  exerciseTypes: string[];
  equipments: string[];
  levels: string[];
  bodyParts: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type ExerciseFilterResponse = {
  data: { id: number; attributes: ExerciseFilterAttributes };
};
