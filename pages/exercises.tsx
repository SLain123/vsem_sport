import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { GetStaticProps } from "next/types";
import { wrapper } from "redux/store";

import { BaseLayout, MainContainer } from "components/wrappers";
import { Pagination } from "components/ui";
import { Banner } from "components/banner";
import { ExerciseList } from "modules/exercise-list";
import { ErrorBlock } from "components/error-block";

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
        revalidate: process.env.NEXT_PUBLIC_REVALIDATE
          ? +process.env.NEXT_PUBLIC_REVALIDATE
          : 60,
      };
    }
);

const ExercisesPage: NextPage = () => {
  const { data: exerciseData } = useGetAllExercisesQuery(1);
  const { data: filterData } = useGetFiltersQuery();
  const exercises = exerciseData?.data ? exerciseData.data : [];
  const filters = filterData?.data ? filterData.data : null;

  //TODO: remove after filter feature will be done;
  React.useEffect(() => console.log(filters), [filters]);

  return (
    <>
      <Head>
        <title>Все упражнения</title>
        <meta
          name="description"
          content="Бег, фитнес, йога, кроссфит, бодибилдинг. Списки упражнений для различных категорий спорта. Подробное описание каждого из упражнений с фото и видео."
        />
        <meta name="robots" content="all" />
      </Head>

      <BaseLayout>
        <MainContainer className="main_grid_container">
          <section>
            {exercises.length ? (
              <ExerciseList title="Упражнения" exercises={exercises} />
            ) : (
              <ErrorBlock />
            )}
            {exerciseData?.meta?.pagination?.pageCount ? (
              <Pagination
                page={1}
                pageCount={exerciseData?.meta.pagination.pageCount}
                masterLink="/exercises"
                firstPageLink="/exercises"
              />
            ) : null}
          </section>
          <aside>
            <Banner />
          </aside>
        </MainContainer>
      </BaseLayout>
    </>
  );
};

export default ExercisesPage;
