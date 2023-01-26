import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { TopResponceType } from "types/Top";

export const topApi = createApi({
  reducerPath: "Top",
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
  tagTypes: ["Top"],
  endpoints: (builder) => ({
    getTopByName: builder.query<TopResponceType, string>({
      query: (name) => `/api/tops?filters[name][$eq]=${name}&populate=*`,
      providesTags: ["Top"],
    }),
  }),
});

export const { useGetTopByNameQuery } = topApi;
export const { getTopByName } = topApi.endpoints;
