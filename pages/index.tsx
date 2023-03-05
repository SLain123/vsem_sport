import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { GetStaticProps } from "next/types";
import { wrapper } from "redux/store";

import { BaseLayout, MainContainer } from "components/wrappers";
import { Pagination } from "components/ui";
import { TopBlock } from "components/top-block";
import { ArticleList } from "modules/article-list";
import { TitleSlider } from "modules/title-slider";
import { ErrorBlock } from "components/error-block";
import { CategorySide } from "modules/categories-list";

import {
  getAllArticles,
  useGetAllArticlesQuery,
  articlesApi,
} from "redux/api/articlesApi";
import { getTopByName, useGetTopByNameQuery, topApi } from "redux/api/topApi";

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  ({ dispatch, getState }) =>
    async () => {
      dispatch(getAllArticles.initiate(1));
      dispatch(getTopByName.initiate("all-sports"));
      await Promise.all([
        ...dispatch(articlesApi.util.getRunningQueriesThunk()),
        ...dispatch(topApi.util.getRunningQueriesThunk()),
      ]);
      const data = getAllArticles.select(1)(getState());
      console.log(
        "=====================DATA START=================",
        JSON.stringify(data.data),
        "=====================DATA END================="
      );
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

  React.useEffect(() => {
    console.log(articleData);
  }, [articleData]);
  return (
    <>
      <Head>
        <title>Vsem Sport Online</title>
        <meta
          name="description"
          content="Бег, фитнес, йога, кроссфит, бодибилдинг. На нашем портале вы можете найти статьи, рекомендации, советы. Программы тренировок и описание упражнений для различных категорий спорта."
        />
        <meta name="robots" content="all" />
      </Head>

      <BaseLayout>
        <TitleSlider />
        <MainContainer className="main_grid_container">
          <div>
            {articles?.length ? (
              <ArticleList title="Все статьи" articles={articles} />
            ) : (
              <ErrorBlock />
            )}
            {articleData?.meta?.pagination?.pageCount && (
              <Pagination
                page={1}
                pageCount={articleData?.meta.pagination.pageCount}
                masterLink="/all"
                firstPageLink="/"
              />
            )}
          </div>
          <div>
            {topList.length ? (
              <TopBlock
                topList={topList}
                title={`Топ ${topList.length} статей по всем видам спорта`}
              />
            ) : null}
            <CategorySide />
          </div>
        </MainContainer>
      </BaseLayout>
    </>
  );
};

export default MainPage;
