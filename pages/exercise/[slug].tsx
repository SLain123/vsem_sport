import React, { useEffect } from "react";
import Head from "next/head";
import { NextPage } from "next";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { wrapper } from "redux/store";
import { useRouter } from "next/router";

import { BaseLayout, MainContainer } from "components/wrappers";
import { Exercise } from "components/exercise";
import { Banner } from "components/banner";
import { ExerciseDetailPanel } from "components/exercise-detail-panel";
import { AlternativeExercise } from "components/alternative-exercise";

import { ExerciseAttributeType } from "types/Exercise";
import {
  useGetPartByNameQuery,
  getPartByName,
  bodyPartsApi,
} from "redux/api/bodyPartsApi";
import {
  getExerciseBySlug,
  exercisesApi,
  useGetExerciseBySlugQuery,
  useGetMiniExercicesBySlugListQuery,
  getMiniExercicesBySlugList,
} from "redux/api/exercisesApi";

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: ["/exercise" + "/slug"],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  ({ dispatch, getState }) =>
    async ({ params }) => {
      const slug = params?.slug ? params.slug : "";

      if (slug === "") {
        return { redirect: { destination: `/`, permanent: false } };
      }

      dispatch(getExerciseBySlug.initiate(String(slug)));
      await Promise.all(dispatch(exercisesApi.util.getRunningQueriesThunk()));

      const exercise = getExerciseBySlug.select(String(slug))(getState());
      const slugList = exercise?.data?.data[0]?.attributes?.alternativeList
        ? exercise.data.data[0].attributes.alternativeList
        : [];
      const bodyPart = exercise?.data?.data[0]?.attributes?.partOfBody
        ? exercise.data.data[0].attributes.partOfBody
        : null;

      dispatch(getMiniExercicesBySlugList.initiate(slugList));
      await Promise.all(dispatch(exercisesApi.util.getRunningQueriesThunk()));

      if (bodyPart) {
        dispatch(getPartByName.initiate(bodyPart));
        await Promise.all(dispatch(bodyPartsApi.util.getRunningQueriesThunk()));
      }

      return {
        props: { slug, bodyPart },
      };
    }
);

type Props = { slug: string; bodyPart: string | null };

const ExercisePage: NextPage<Props> = ({ slug, bodyPart }) => {
  const router = useRouter();

  const { data: exerciseData, isLoading } = useGetExerciseBySlugQuery(slug);
  const exercise: ExerciseAttributeType | null = exerciseData?.data?.length
    ? exerciseData.data[0].attributes
    : null;

  const { data: alternativeData } = useGetMiniExercicesBySlugListQuery(
    exercise?.alternativeList ? exercise.alternativeList : []
  );
  const alternativeList = alternativeData?.exerciseList?.length
    ? alternativeData.exerciseList
    : [];

  const { data: bodyPartData } = useGetPartByNameQuery(String(bodyPart));
  const bodyPartUrl = bodyPartData?.data[0]?.attributes?.preview?.data
    ?.attributes?.url
    ? bodyPartData.data[0].attributes.preview.data.attributes.url
    : null;

  useEffect(() => {
    !isLoading && !exercise && router.push("/exercises");
  }, [exercise, isLoading]);

  return (
    <>
      <Head>
        <title>{exercise?.title}</title>
        <meta
          name="description"
          content="Детальное описание последовательности действий для правильного выполнения упражнения"
        />
        <meta name="robots" content="all" />
      </Head>

      <BaseLayout>
        <MainContainer className="main_grid_container">
          <div>
            {exercise && (
              <Exercise
                title={exercise.title}
                description={exercise.description}
                preview={exercise.preview}
                youtube={exercise.youtube}
              />
            )}
            {alternativeList.length ? (
              <AlternativeExercise alternativeList={alternativeList} />
            ) : null}
          </div>

          <div>
            {exercise && (
              <ExerciseDetailPanel
                equipment={exercise.equipment}
                exType={exercise.exType}
                extraBodyParts={exercise.extraBodyParts}
                level={exercise.level}
                partOfBody={exercise.partOfBody}
                score={exercise.score}
                bodyPartUrl={bodyPartUrl}
              />
            )}
            <Banner />
          </div>
        </MainContainer>
      </BaseLayout>
    </>
  );
};

export default ExercisePage;
