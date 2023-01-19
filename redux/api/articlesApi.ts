import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { ArticlesResponse } from "types/Article";

export const articlesApi = createApi({
  reducerPath: "Articles",
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
  tagTypes: ["Articles"],
  endpoints: (builder) => ({
    getAllArticles: builder.query<ArticlesResponse, number>({
      query: (page: number) =>
        `/api/vs-articles?populate=*&pagination%5Bpage%5D=${page}&pagination%5BpageSize%5D=1`,
      providesTags: ["Articles"],
    }),
    getArticleBySlug: builder.query<ArticlesResponse, string>({
      query: (slug: string) =>
        `/api/vs-articles?filters[slug][$eq]=${slug}&populate=*`,
      providesTags: ["Articles"],
    }),
  }),
});

export const {
  useGetAllArticlesQuery,
  useGetArticleBySlugQuery,
  util: { getRunningOperationPromises },
} = articlesApi;

export const { getAllArticles, getArticleBySlug } = articlesApi.endpoints;
