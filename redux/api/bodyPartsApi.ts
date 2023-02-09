import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { ExercisesResponse } from "types/BodyPart";

export const bodyPartsApi = createApi({
  reducerPath: "body-parts",
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
  tagTypes: ["Body-parts"],
  endpoints: (builder) => ({
    getPartByName: builder.query<ExercisesResponse, string>({
      query: (name) =>
        `/api/vs-body-parts?filters[name][$eq]=${name}&populate=*`,
      providesTags: ["Body-parts"],
    }),
  }),
});

export const { useGetPartByNameQuery } = bodyPartsApi;
export const { getPartByName } = bodyPartsApi.endpoints;
