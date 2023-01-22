import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { GetStaticProps } from "next/types";
import { wrapper } from "redux/store";

import { BaseLayout, MainContainer } from "components/wrappers";
import { Pagination } from "components/pagination";
import { ArticleList } from "modules/article-list";

import {
  getAllArticlesByCategories,
  getRunningOperationPromises,
  useGetAllArticlesByCategoriesQuery,
} from "redux/api/articlesApi";

const category = "run";

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    store.dispatch(getAllArticlesByCategories.initiate({ page: 1, category }));

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);

const RunPage: NextPage = () => {
  const { data } = useGetAllArticlesByCategoriesQuery({
    page: 1,
    category,
  });
  const articles = data?.data ? data.data : [];

  return (
    <>
      <Head>
        <title>{`Vsem Sport Online - ${category}`}</title>
        <meta name="description" content="Фитнес" />
      </Head>
      <BaseLayout>
        <MainContainer>
          <ArticleList title="Все статьи о беге" articles={articles} />

          {data?.meta?.pagination?.pageCount && (
            <Pagination
              page={1}
              pageCount={data?.meta.pagination.pageCount}
              masterLink={`/${category}`}
              firstPageLink={`/${category}`}
            />
          )}
        </MainContainer>
      </BaseLayout>
    </>
  );
};

export default RunPage;
