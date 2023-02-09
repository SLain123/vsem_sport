import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { articlesApi } from "./api/articlesApi";
import { topApi } from "./api/topApi";
import { exercisesApi } from "./api/exercisesApi";
import { filtersApi } from "./api/filtersApi";
import { bodyPartsApi } from "./api/bodyPartsApi";

const makeStore = () =>
  configureStore({
    reducer: {
      [articlesApi.reducerPath]: articlesApi.reducer,
      [topApi.reducerPath]: topApi.reducer,
      [exercisesApi.reducerPath]: exercisesApi.reducer,
      [filtersApi.reducerPath]: filtersApi.reducer,
      [bodyPartsApi.reducerPath]: bodyPartsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        articlesApi.middleware,
        topApi.middleware,
        exercisesApi.middleware,
        filtersApi.middleware,
        bodyPartsApi.middleware
      ),
    devTools: process.env.NODE_ENV === "development",
  });
// eslint-disable-next-line no-undef
export type AppStore = ReturnType<typeof makeStore>;
// eslint-disable-next-line no-undef
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  // eslint-disable-next-line no-undef
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
