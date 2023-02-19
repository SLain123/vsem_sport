import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { GetStaticProps } from "next/types";
import { wrapper } from "redux/store";

import { BaseLayout, MainContainer } from "components/wrappers";
// import { TopBlock } from "components/top-block";
// import { ErrorBlock } from "components/error-block";

import {
  getProgramInfo,
  programsApi,
  useGetProgramInfoQuery,
} from "redux/api/programsApi";

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  ({ dispatch }) =>
    async () => {
      dispatch(getProgramInfo.initiate());
      // dispatch(getTopByName.initiate("all-sports"));
      await Promise.all([
        ...dispatch(programsApi.util.getRunningQueriesThunk()),
        // ...dispatch(topApi.util.getRunningQueriesThunk()),
      ]);

      return {
        props: {},
      };
    }
);

const TrainingsPage: NextPage = () => {
  const { data: programData } = useGetProgramInfoQuery();
  const programInfo = programData?.data?.length ? programData.data : [];

  React.useEffect(() => {
    console.log(programInfo);
  }, [programInfo]);

  return (
    <>
      <Head>
        <title>Программы тренировок</title>
        <meta name="description" content="Бег, фитнес, йога, кроссфит" />
        <meta name="robots" content="all" />
      </Head>
      <BaseLayout>
        <MainContainer className="main_grid_container">
          <div>
            {programInfo.map(({ section }) => (
              <p>{section}</p>
            ))}
          </div>
          <div>Right side</div>
        </MainContainer>
      </BaseLayout>
    </>
  );
};

export default TrainingsPage;
