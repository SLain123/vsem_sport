import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { MailRequest, MailResponse } from "types/Email";

export const emailApi = createApi({
  reducerPath: "email",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_APP_URL,
    prepareHeaders: async (headers) => {
      const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
      token && headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ["Email"],
  endpoints: (builder) => ({
    sendMail: builder.mutation<MailResponse, MailRequest>({
      query: (body) => ({
        url: `/api/mail-stores`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSendMailMutation } = emailApi;
