import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { GetStaticProps } from "next/types";
import { wrapper } from "redux/store";

import { BaseLayout, MainContainer } from "components/wrappers";
import { Pagination } from "components/ui";
import { TopBlock } from "components/top-block";
import { ArticleList } from "modules/article-list";
import { ErrorBlock } from "components/error-block";
import { CategorySide } from "modules/categories-list";

import {
  getAllArticlesByCategories,
  articlesApi,
  useGetAllArticlesByCategoriesQuery,
} from "redux/api/articlesApi";
import { getTopByName, useGetTopByNameQuery, topApi } from "redux/api/topApi";

const category = "crossfit";

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

const CrossfitPage: NextPage = () => {
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
        <meta
          name="description"
          content="Кроссфит. На нашем портале вы можете найти статьи, рекомендации, советы."
        />
        <meta name="robots" content="all" />
      </Head>
      <BaseLayout>
        <MainContainer className="main_grid_container">
          <div>
            {articles?.length ? (
              <ArticleList title="Все статьи о кроссфите" articles={articles} />
            ) : (
              <ErrorBlock />
            )}
            {articleData?.meta?.pagination?.pageCount && (
              <Pagination
                page={1}
                pageCount={articleData?.meta.pagination.pageCount}
                masterLink={`/${category}`}
                firstPageLink={`/${category}`}
              />
            )}
          </div>

          <div>
            {topList.length ? (
              <TopBlock
                topList={topList}
                title={`Топ ${topList.length} статей по кроссфиту`}
              />
            ) : null}
            <CategorySide />
          </div>
        </MainContainer>
      </BaseLayout>
    </>
  );
};

export default CrossfitPage;
