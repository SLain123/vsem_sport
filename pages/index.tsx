import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { GetStaticProps } from "next/types";
import { wrapper } from "redux/store";

import { BaseLayout, MainContainer } from "components/wrappers";
import { Pagination } from "components/pagination";
import { ArticleList } from "modules/article-list";
import { TitleSlider } from "modules/title-slider";

import {
  getAllArticles,
  getRunningOperationPromises,
  useGetAllArticlesQuery,
} from "redux/api/articlesApi";

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    store.dispatch(getAllArticles.initiate(1));

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);

const MainPage: NextPage = () => {
  const { data } = useGetAllArticlesQuery(1);
  const articles = data?.data ? data.data : [];

  return (
    <>
      <Head>
        <title>Vsem Sport Online</title>
        <meta name="description" content="Бег, фитнес, йога, кроссфит" />
      </Head>

      <BaseLayout>
        <TitleSlider />
        <MainContainer>
          <ArticleList title="Все статьи" articles={articles} />

          {data?.meta?.pagination?.pageCount && (
            <Pagination
              page={1}
              pageCount={data?.meta.pagination.pageCount}
              masterLink="/all"
              firstPageLink="/"
            />
          )}
        </MainContainer>
      </BaseLayout>
    </>
  );
};

export default MainPage;
