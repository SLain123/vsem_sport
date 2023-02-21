import React from "react";
import Head from "next/head";
import { NextPage, GetStaticPaths } from "next";
import { GetStaticProps } from "next/types";
import { wrapper } from "redux/store";

import { BaseLayout, MainContainer } from "components/wrappers";
import { ProgramList } from "modules/program-list";
import { TopBlock } from "components/top-block";
import { ErrorBlock } from "components/error-block";
import { Banner } from "components/banner";

import {
  getProgramInfo,
  programsApi,
  useGetProgramInfoQuery,
} from "redux/api/programsApi";
import { getTopByName, useGetTopByNameQuery, topApi } from "redux/api/topApi";

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: ["/programs/query"],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  ({ dispatch, getState }) =>
    async ({ params }) => {
      let preExpanded = -1;

      dispatch(getProgramInfo.initiate());
      dispatch(getTopByName.initiate("programs"));
      await Promise.all([
        ...dispatch(programsApi.util.getRunningQueriesThunk()),
        ...dispatch(topApi.util.getRunningQueriesThunk()),
      ]);

      if (params?.query) {
        const programData = getProgramInfo.select()(getState());
        const programInfo = programData?.data?.data
          ? programData.data.data
          : [];
        const activeSectionId = programInfo.filter(
          ({ slug }) => slug === params.query
        )[0]?.id;

        activeSectionId && (preExpanded = activeSectionId);
      }

      return {
        props: {
          preExpanded,
        },
      };
    }
);

const ProgramsPage: NextPage<{ preExpanded: number }> = ({ preExpanded }) => {
  const { data: programData } = useGetProgramInfoQuery();
  const { data: topData } = useGetTopByNameQuery("programs");
  const programInfo = programData?.data?.length ? programData.data : [];
  const topList = topData?.data?.length ? topData.data[0].attributes.list : [];

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
            {programInfo.length ? (
              <ProgramList
                programInfo={programInfo}
                preExpanded={preExpanded > -1 ? [preExpanded] : []}
              />
            ) : (
              <ErrorBlock />
            )}
          </div>
          <div>
            {topList.length ? (
              <TopBlock
                topList={topList}
                title={`Топ ${topList.length} программ`}
              />
            ) : null}
            <Banner />
          </div>
        </MainContainer>
      </BaseLayout>
    </>
  );
};

export default ProgramsPage;
