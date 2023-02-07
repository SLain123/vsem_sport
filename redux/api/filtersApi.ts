import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { ExerciseFilterResponse } from "types/Filter";

export const filtersApi = createApi({
  reducerPath: "filters",
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
  tagTypes: ["Filters"],
  endpoints: (builder) => ({
    getFilters: builder.query<ExerciseFilterResponse, void>({
      query: () => `/api/vs-filter`,
      providesTags: ["Filters"],
    }),
  }),
});

export const { useGetFiltersQuery } = filtersApi;
export const { getFilters } = filtersApi.endpoints;
