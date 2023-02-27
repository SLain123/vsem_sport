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
        <meta
          name="description"
          content="Бег, фитнес, йога, кроссфит, бодибилдинг. На нашем портале вы можете найти статьи, рекомендации, советы. Программы тренировок и описание упражнений для различных категорий спорта."
        />
        <meta name="robots" content="all" />

        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/icon/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/icon/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/icon/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/icon/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/icon/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/icon/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/icon/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icon/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icon/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icon/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icon/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/icon/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icon/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/icon/favicon/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/icon/favicon/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ffffff" />
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
