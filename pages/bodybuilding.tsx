import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { GetStaticProps } from "next/types";
import { wrapper } from "redux/store";

import { BaseLayout, MainContainer } from "components/wrappers";
import { Pagination } from "components/pagination";
import { TopBlock } from "components/top-block";
import { ArticleList } from "modules/article-list";

import {
  getAllArticlesByCategories,
  articlesApi,
  useGetAllArticlesByCategoriesQuery,
} from "redux/api/articlesApi";
import { getTopByName, useGetTopByNameQuery, topApi } from "redux/api/topApi";

const category = "bodybuilding";

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  ({ dispatch }) =>
    async () => {
      dispatch(getAllArticlesByCategories.initiate({ page: 1, category }));
      dispatch(getTopByName.initiate(category));

      await Promise.all([
        ...dispatch(articlesApi.util.getRunningQueriesThunk()),
        ...dispatch(topApi.util.getRunningQueriesThunk()),
      ]);

      return {
        props: {},
      };
    }
);

const BodybuildingPage: NextPage = () => {
  const { data: articleData } = useGetAllArticlesByCategoriesQuery({
    page: 1,
    category,
  });
  const { data: topData } = useGetTopByNameQuery(category);
  const articles = articleData?.data ? articleData.data : [];
  const topList = topData?.data?.length ? topData.data[0].attributes.list : [];

  return (
    <>
      <Head>
        <title>{`Vsem Sport Online - ${category}`}</title>
        <meta name="description" content="Фитнес" />
        <meta name="robots" content="all" />
      </Head>
      <BaseLayout>
        <MainContainer className="main_grid_container">
          <div>
            <ArticleList
              title="Все статьи о бодибилдинге"
              articles={articles}
            />
            {articleData?.meta?.pagination?.pageCount && (
              <Pagination
                page={1}
                pageCount={articleData?.meta.pagination.pageCount}
                masterLink={`/${category}`}
                firstPageLink={`/${category}`}
              />
            )}
          </div>

          <TopBlock topList={topList} title="Топ 10 статей по бодибилдингу:" />
        </MainContainer>
      </BaseLayout>
    </>
  );
};

export default BodybuildingPage;
