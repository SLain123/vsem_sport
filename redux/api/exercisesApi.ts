import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { ExercisesResponse, ExerciseMiniResponse } from "types/Exercise";

export const exercisesApi = createApi({
  reducerPath: "Exercises",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_APP_URL,
    prepareHeaders: async (headers) => {
      const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
      token && headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Exercises"],
  endpoints: (builder) => ({
    getAllExercises: builder.query<ExercisesResponse, number>({
      query: (page) =>
        `/api/vs-exercises?populate=*&pagination%5Bpage%5D=${page}&pagination%5BpageSize%5D=10&sort[0]=updatedAt%3Adesc`,
      providesTags: ["Exercises"],
    }),
    //TODO: finished after API will be created
    getAllExercisesByCategories: builder.query<
      any,
      { page: number; category: any }
    >({
      query: ({ page, category }) =>
        `/api/vs-articles-by-category?pagination%5Bpage%5D=${page}&pagination%5BpageSize%5D=5&category=${category}`,
      providesTags: ["Exercises"],
    }),
    getExerciseBySlug: builder.query<ExercisesResponse, string>({
      query: (slug) =>
        `/api/vs-exercises?filters[slug][$eq]=${slug}&populate=*`,
      providesTags: ["Exercises"],
    }),
    getMiniExercicesBySlugList: builder.query<ExerciseMiniResponse, string[]>({
      query: (slugList) => {
        const query = new URLSearchParams();
        for (const slug of slugList) {
          query.append("slugList", slug);
        }

        return `/api/vs-exercise-get-mini?${String(query)}`;
      },
      providesTags: ["Exercises"],
    }),
  }),
});

export const {
  useGetAllExercisesQuery,
  useGetExerciseBySlugQuery,
  useGetMiniExercicesBySlugListQuery,
} = exercisesApi;
export const {
  getAllExercises,
  getExerciseBySlug,
  getMiniExercicesBySlugList,
} = exercisesApi.endpoints;
