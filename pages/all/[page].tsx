import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { wrapper } from "redux/store";

import { BaseLayout, MainContainer } from "components/wrappers";
import { Pagination } from "components/pagination";
import { ArticleList } from "modules/article-list";

import {
  getAllArticles,
  getRunningOperationPromises,
  useGetAllArticlesQuery,
} from "redux/api/articlesApi";

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: ["/all" + "/page"],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      const page = params?.page ? Number(params.page) : 2;
      store.dispatch(getAllArticles.initiate(page));

      await Promise.all(getRunningOperationPromises());

      return {
        props: { page },
      };
    }
);

const ListPage: NextPage<{ page: number }> = ({ page }) => {
  const { data } = useGetAllArticlesQuery(page);
  const articles = data?.data ? data.data : [];

  return (
    <>
      <Head>
        <title>Vsem Sport Online</title>
        <meta name="description" content="Бег, фитнес, йога, кроссфит" />
      </Head>
      <BaseLayout>
        <MainContainer>
          <ArticleList title="Все статьи" articles={articles} />

          {data?.meta?.pagination?.pageCount && (
            <Pagination
              page={page}
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

export default ListPage;
