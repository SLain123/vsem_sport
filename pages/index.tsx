import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { GetStaticProps } from "next/types";
import { wrapper } from "redux/store";

import { BaseLayout, MainContainer } from "components/wrappers";
import { Pagination } from "components/pagination";
import { TopBlock } from "components/top-block";
import { ArticleList } from "modules/article-list";
import { TitleSlider } from "modules/title-slider";

import {
  getAllArticles,
  useGetAllArticlesQuery,
  articlesApi,
} from "redux/api/articlesApi";
import { getTopByName, useGetTopByNameQuery, topApi } from "redux/api/topApi";

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  ({ dispatch }) =>
    async () => {
      dispatch(getAllArticles.initiate(1));
      dispatch(getTopByName.initiate("all-sports"));

      await Promise.all([
        ...dispatch(articlesApi.util.getRunningQueriesThunk()),
        ...dispatch(topApi.util.getRunningQueriesThunk()),
      ]);

      return {
        props: {},
      };
    }
);

const MainPage: NextPage = () => {
  const { data: articleData } = useGetAllArticlesQuery(1);
  const { data: topData } = useGetTopByNameQuery("all-sports");
  const articles = articleData?.data ? articleData.data : [];
  const topList = topData?.data?.length ? topData.data[0].attributes.list : [];

  return (
    <>
      <Head>
        <title>Vsem Sport Online</title>
        <meta name="description" content="Бег, фитнес, йога, кроссфит" />
      </Head>

      <BaseLayout>
        <TitleSlider />
        <MainContainer className="main_grid_container">
          <div>
            <ArticleList title="Все статьи" articles={articles} />
            {articleData?.meta?.pagination?.pageCount && (
              <Pagination
                page={1}
                pageCount={articleData?.meta.pagination.pageCount}
                masterLink="/all"
                firstPageLink="/"
              />
            )}
          </div>
          <TopBlock
            topList={topList}
            title="Топ 10 статей по всем видам спорта:"
          />
        </MainContainer>
      </BaseLayout>
    </>
  );
};

export default MainPage;
