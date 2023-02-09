import React, { useEffect } from "react";
import Head from "next/head";
import { NextPage } from "next";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { wrapper } from "redux/store";
import { useRouter } from "next/router";

import { BaseLayout, MainContainer } from "components/wrappers";
import { Exercise } from "components/exercise";
import { Banner } from "components/banner";

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
      const bodyPart = exercise?.data?.data[0]?.attributes?.partOfBody
        ? exercise.data.data[0].attributes.partOfBody
        : null;

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

  const { data: bodyPartData } = useGetPartByNameQuery(String(bodyPart));
  const bodyPartUrl = bodyPartData?.data[0]?.attributes?.preview?.data
    ?.attributes?.url
    ? bodyPartData.data[0].attributes.preview.data.attributes.url
    : null;

  useEffect(() => {
    console.log(bodyPartUrl);
  }, [bodyPartUrl]);

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
          {exercise && (
            <Exercise
              title={exercise.title}
              description={exercise.description}
              preview={exercise.preview}
              youtube={exercise.youtube}
            />
          )}
          <Banner />
        </MainContainer>

        <MainContainer>
          <div>Relative exercises here</div>
        </MainContainer>
      </BaseLayout>
    </>
  );
};

export default ExercisePage;
