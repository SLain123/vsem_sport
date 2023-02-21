import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { ProgramListResponse } from "types/Program";
import { ArticlesResponse, ArticleMiniResponse } from "types/Article";

export const programsApi = createApi({
  reducerPath: "Programs",
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
  tagTypes: ["Programs"],
  endpoints: (builder) => ({
    getProgramInfo: builder.query<ProgramListResponse, void>({
      query: () => `/api/vs-program-list-info`,
      providesTags: ["Programs"],
    }),
    getProgramBySlug: builder.query<ArticlesResponse, string>({
      query: (slug) => `/api/vs-programs?filters[slug][$eq]=${slug}&populate=*`,
      providesTags: ["Programs"],
    }),
    getMiniProgramsBySlugList: builder.query<ArticleMiniResponse, string[]>({
      query: (slugList) => {
        const query = new URLSearchParams();
        for (const slug of slugList) {
          query.append("slugList", slug);
        }

        return `/api/vs-program-get-mini?${String(query)}`;
      },
      providesTags: ["Programs"],
    }),
  }),
});

export const {
  useGetProgramInfoQuery,
  useGetProgramBySlugQuery,
  useGetMiniProgramsBySlugListQuery,
} = programsApi;
export const { getProgramInfo, getProgramBySlug, getMiniProgramsBySlugList } =
  programsApi.endpoints;
