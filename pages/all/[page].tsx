import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { wrapper } from "redux/store";

import { BaseLayout, MainContainer } from "components/wrappers";
import { Pagination } from "components/ui";
import { Banner } from "components/banner";
import { ArticleList } from "modules/article-list";
import { CategorySide } from "modules/categories-list";

import {
  getAllArticles,
  useGetAllArticlesQuery,
  articlesApi,
} from "redux/api/articlesApi";

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: ["/all" + "/page"],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  ({ dispatch }) =>
    async ({ params }) => {
      const page = params?.page ? Number(params.page) : 2;

      if (page === 1) {
        return { redirect: { destination: `/`, permanent: false } };
      }

      dispatch(getAllArticles.initiate(page));
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

const AllPage: NextPage<{ page: number }> = ({ page }) => {
  const { data } = useGetAllArticlesQuery(page);
  const articles = data?.data ? data.data : [];

  return (
    <>
      <Head>
        <title>{`Vsem Sport Online - ${page} page`}</title>
        <meta
          name="description"
          content="Бег, фитнес, йога, кроссфит, бодибилдинг. На нашем портале вы можете найти статьи, рекомендации, советы. Программы тренировок и описание упражнений для различных категорий спорта."
        />
        <meta name="robots" content="all" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_URL} />
      </Head>
      <BaseLayout>
        <MainContainer className="main_grid_container">
          <section>
            <ArticleList title="Все статьи" articles={articles} />
            {data?.meta?.pagination?.pageCount ? (
              <Pagination
                page={page}
                pageCount={data?.meta.pagination.pageCount}
                masterLink="/all"
                firstPageLink="/"
              />
            ) : null}
          </section>
          <aside>
            <CategorySide />
            <Banner />
          </aside>
        </MainContainer>
      </BaseLayout>
    </>
  );
};

export default AllPage;
