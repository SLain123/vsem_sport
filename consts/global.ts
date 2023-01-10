export const TABLET_SIZE = 768;
export const STRAPI_PAGE_URL = process.env.NEXT_PUBLIC_APP_URL
  ? process.env.NEXT_PUBLIC_APP_URL + "/api/pages/"
  : "/api/pages/";
export const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN
  ? process.env.NEXT_PUBLIC_STRAPI_TOKEN
  : "";
