import React, { useEffect } from "react";
import Head from "next/head";
import { NextPage } from "next";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { wrapper } from "redux/store";
import { useRouter } from "next/router";

import { BaseLayout, MainContainer } from "components/wrappers";
import { Article } from "components/article";
import { Banner } from "components/banner";

import { ArticleAttributeType } from "types/Article";
import {
  getAllArticles,
  useGetArticleBySlugQuery,
  articlesApi,
} from "redux/api/articlesApi";

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: ["/article" + "/slug"],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  ({ dispatch }) =>
    async ({ params }) => {
      const slug = params?.slug ? params.slug : "";

      if (slug === "") {
        return { redirect: { destination: `/`, permanent: false } };
      }

      dispatch(getAllArticles.initiate(1));
      await Promise.all([
        ...dispatch(articlesApi.util.getRunningQueriesThunk()),
      ]);

      return {
        props: { slug },
      };
    }
);

const ArticlePage: NextPage<{ slug: string }> = ({ slug }) => {
  const router = useRouter();
  const { data: articleData, isLoading } = useGetArticleBySlugQuery(slug);
  const article: ArticleAttributeType | null = articleData?.data?.length
    ? articleData.data[0].attributes
    : null;

  useEffect(() => {
    !isLoading && !article && router.push("/");
  }, [article, isLoading]);

  return (
    <>
      <Head>
        <title>{article?.title}</title>
        <meta name="description" content={`${article?.keyWords}`} />
        <meta name="robots" content="all" />
      </Head>

      <BaseLayout>
        <MainContainer className="main_grid_container">
          <div>{article && <Article {...article} />}</div>
          <Banner />
        </MainContainer>
      </BaseLayout>
    </>
  );
};

export default ArticlePage;
