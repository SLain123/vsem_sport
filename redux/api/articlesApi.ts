import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  tagTypes: ["Articles"],
  endpoints: (builder) => ({
    getAllArticles: builder.query<ArticlesResponse, void>({
      query: () => "/api/vs-articles?populate=*",
      providesTags: ["Articles"],
    }),
    getArticleBySlug: builder.query<ArticlesResponse, string>({
      query: (slug: string) =>
        `/api/vs-articles?filters[slug][$eq]=${slug}&populate=*`,
      providesTags: ["Articles"],
    }),
  }),
});

export const { useGetAllArticlesQuery, useGetArticleBySlugQuery } = articlesApi;
