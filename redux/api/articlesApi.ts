import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import {
  ArticlesResponse,
  Categories,
  ArticleMiniResponse,
} from "types/Article";

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
      query: (page) =>
        `/api/vs-articles?populate=*&pagination%5Bpage%5D=${page}&pagination%5BpageSize%5D=10&sort[0]=publishedAt%3Adesc`,
      providesTags: ["Articles"],
    }),
    getAllArticlesByCategories: builder.query<
      ArticlesResponse,
      { page: number; category: Categories }
    >({
      query: ({ page, category }) =>
        `/api/vs-articles-by-category?pagination%5Bpage%5D=${page}&pagination%5BpageSize%5D=10&category=${category}`,
      providesTags: ["Articles"],
    }),
    getArticleBySlug: builder.query<ArticlesResponse, string>({
      query: (slug) => `/api/vs-articles?filters[slug][$eq]=${slug}&populate=*`,
      providesTags: ["Articles"],
    }),
    getMiniArticlesBySlugList: builder.query<ArticleMiniResponse, string[]>({
      query: (slugList) => {
        const query = new URLSearchParams();
        for (const slug of slugList) {
          query.append("slugList", slug);
        }

        return `/api/vs-articles-get-mini?${String(query)}`;
      },
      providesTags: ["Articles"],
    }),
  }),
});

export const {
  useGetAllArticlesQuery,
  useGetArticleBySlugQuery,
  useGetAllArticlesByCategoriesQuery,
  useGetMiniArticlesBySlugListQuery,
} = articlesApi;
export const {
  getAllArticles,
  getArticleBySlug,
  getAllArticlesByCategories,
  getMiniArticlesBySlugList,
} = articlesApi.endpoints;
