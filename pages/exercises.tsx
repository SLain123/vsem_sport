import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { GetStaticProps } from "next/types";
import { wrapper } from "redux/store";

import { BaseLayout, MainContainer } from "components/wrappers";

import {
  useGetAllExercisesQuery,
  getAllExercises,
  exercisesApi,
} from "redux/api/exercisesApi";
import {
  useGetFiltersQuery,
  getFilters,
  filtersApi,
} from "redux/api/filtersApi";

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  ({ dispatch }) =>
    async () => {
      dispatch(getAllExercises.initiate(1));
      dispatch(getFilters.initiate());
      await Promise.all([
        ...dispatch(exercisesApi.util.getRunningQueriesThunk()),
        ...dispatch(filtersApi.util.getRunningQueriesThunk()),
      ]);

      return {
        props: {},
      };
    }
);

const ExercisesPage: NextPage = () => {
  const { data: exerciseData } = useGetAllExercisesQuery(1);
  const { data: filterData } = useGetFiltersQuery();
  const exercises = exerciseData?.data ? exerciseData.data : [];
  const filters = filterData?.data ? filterData.data : null;

  React.useEffect(() => console.log(filters, exercises), [filters]);

  return (
    <>
      <Head>
        <title>Все упражнения</title>
        <meta name="description" content="Бег, фитнес, йога, кроссфит" />
        <meta name="robots" content="all" />
      </Head>

      <BaseLayout>
        <MainContainer className="main_grid_container">
          <div>Упражнения</div>
          <span>Side block</span>
        </MainContainer>
      </BaseLayout>
    </>
  );
};

export default ExercisesPage;
