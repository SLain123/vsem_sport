import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { GetStaticPaths, GetStaticProps } from "next/types";
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

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [`/exercises` + "/page"],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  ({ dispatch }) =>
    async ({ params }) => {
      const page = params?.page ? Number(params.page) : 2;

      if (page === 1) {
        return { redirect: { destination: `/exercises`, permanent: false } };
      }

      dispatch(getAllExercises.initiate(page));
      dispatch(getFilters.initiate());
      await Promise.all([
        ...dispatch(exercisesApi.util.getRunningQueriesThunk()),
        ...dispatch(filtersApi.util.getRunningQueriesThunk()),
      ]);

      return {
        props: { page },
        revalidate: process.env.NEXT_PUBLIC_REVALIDATE
          ? +process.env.NEXT_PUBLIC_REVALIDATE
          : 60,
      };
    }
);

const ExercisesAllPage: NextPage<{ page: number }> = ({ page }) => {
  const { data: exerciseData } = useGetAllExercisesQuery(page);
  const { data: filterData } = useGetFiltersQuery();
  const exercises = exerciseData?.data ? exerciseData.data : [];
  const filters = filterData?.data ? filterData.data : null;

  //TODO: remove after filter feature will be done;
  React.useEffect(() => console.log(filters), [filters]);

  return (
    <>
      <Head>
        <title>{`Все упражнения - ${page}`}</title>
        <meta
          name="description"
          content="Бег, фитнес, йога, кроссфит, бодибилдинг. Списки упражнений для различных категорий спорта. Подробное описание каждого из упражнений с фото и видео."
        />
        <meta name="robots" content="all" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/exercises`}
        />
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
                page={page}
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

export default ExercisesAllPage;
