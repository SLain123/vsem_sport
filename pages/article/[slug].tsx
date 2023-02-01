import React, { useEffect } from "react";
import Head from "next/head";
import { NextPage } from "next";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { wrapper } from "redux/store";
import { useRouter } from "next/router";

import { BaseLayout, MainContainer } from "components/wrappers";
import { Article } from "components/article";
import { Banner } from "components/banner";
import { RelativeArticles } from "components/relative-articles";

import { ArticleAttributeType } from "types/Article";
import {
  getArticleBySlug,
  useGetArticleBySlugQuery,
  articlesApi,
  useGetMiniArticlesBySlugListQuery,
  getMiniArticlesBySlugList,
} from "redux/api/articlesApi";

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: ["/article" + "/slug"],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  ({ dispatch, getState }) =>
    async ({ params }) => {
      const slug = params?.slug ? params.slug : "";

      if (slug === "") {
        return { redirect: { destination: `/`, permanent: false } };
      }

      dispatch(getArticleBySlug.initiate(String(slug)));
      await Promise.all(dispatch(articlesApi.util.getRunningQueriesThunk()));

      const article = getArticleBySlug.select(String(slug))(getState());
      const slugList = article.data?.data[0]?.attributes?.relativeArticles
        ? article.data.data[0].attributes.relativeArticles
        : [];

      dispatch(getMiniArticlesBySlugList.initiate(slugList));
      await Promise.all(dispatch(articlesApi.util.getRunningQueriesThunk()));

      return {
        props: { slug },
      };
    }
);

const ArticlePage: NextPage<{ slug: string }> = ({ slug }) => {
  const router = useRouter();

  const { data: articleData, isLoading } = useGetArticleBySlugQuery(slug);
  const article: ArticleAttributeType = articleData?.data?.length
    ? articleData.data[0].attributes
    : null;

  const { data: relativeData } = useGetMiniArticlesBySlugListQuery(
    article?.relativeArticles ? article.relativeArticles : []
  );
  const relativeList = relativeData?.articleList?.length
    ? relativeData.articleList
    : [];

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
          {article && (
            <Article
              title={article.title}
              keyWords={article.keyWords}
              preview={article.preview}
              text={article.text}
              comments={article.comments}
            />
          )}
          <Banner />
        </MainContainer>

        <MainContainer>
          <RelativeArticles relativeList={relativeList} />
        </MainContainer>
      </BaseLayout>
    </>
  );
};

export default ArticlePage;
