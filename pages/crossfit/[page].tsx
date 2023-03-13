import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { wrapper } from "redux/store";

import { BaseLayout, MainContainer } from "components/wrappers";
import { Pagination } from "components/ui";
import { Banner } from "components/banner";
import { ArticleList } from "modules/article-list";

import {
  getAllArticlesByCategories,
  articlesApi,
  useGetAllArticlesByCategoriesQuery,
} from "redux/api/articlesApi";

const category = "crossfit";

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [`/${category}` + "/page"],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  ({ dispatch }) =>
    async ({ params }) => {
      const page = params?.page ? Number(params.page) : 2;

      if (page === 1) {
        return { redirect: { destination: `/${category}`, permanent: false } };
      }

      dispatch(getAllArticlesByCategories.initiate({ page, category }));
      await Promise.all([
        ...dispatch(articlesApi.util.getRunningQueriesThunk()),
      ]);

      return {
        props: { page },
        revalidate: process.env.NEXT_PUBLIC_REVALIDATE
          ? +process.env.NEXT_PUBLIC_REVALIDATE
          : 60,
      };
    }
);

const CrossfitAllPage: NextPage<{ page: number }> = ({ page }) => {
  const { data } = useGetAllArticlesByCategoriesQuery({
    page,
    category,
  });
  const articles = data?.data ? data.data : [];

  return (
    <>
      <Head>
        <title>{`Vsem Sport Online - ${category} - ${page} page`}</title>
        <meta
          name="description"
          content="Кроссфит. На нашем портале вы можете найти статьи, рекомендации, советы."
        />
        <meta name="robots" content="all" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_URL} />
      </Head>
      <BaseLayout>
        <MainContainer className="main_grid_container">
          <section>
            <ArticleList title="Все статьи о кроссфите" articles={articles} />
            {data?.meta?.pagination?.pageCount ? (
              <Pagination
                page={page}
                pageCount={data?.meta.pagination.pageCount}
                masterLink={`/${category}`}
                firstPageLink={`/${category}`}
              />
            ) : null}
          </section>
          <aside>
            <Banner />
          </aside>
        </MainContainer>
      </BaseLayout>
    </>
  );
};

export default CrossfitAllPage;
