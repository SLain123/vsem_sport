import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { BaseLayout, MainContainer } from "components/wrappers";

import { ArticleBlock } from "modules/article-block";

const MainPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Vsem Sport Online</title>
        <meta name="description" content="Бег, фитнес, йога, кроссфит" />
      </Head>
      <BaseLayout>
        <MainContainer>
          <ArticleBlock
            title="Все статьи"
            articleList={[
              {
                id: 0,
                attributes: {
                  title: "Вторая",
                  createdAt: "2023-01-16T14:19:24.329Z",
                  updatedAt: "2023-01-16T14:28:02.752Z",
                  publishedAt: "2023-01-16T14:19:25.240Z",
                  text: "Что то дико короткое...",
                  keyWords: ["run"],
                  comments: null,
                  sportType: "other",
                  slug: "second",
                  preview: {
                    data: {
                      id: 2,
                      attributes: {
                        name: "running-for-weight-loss-01.jpg",
                        alternativeText: null,
                        caption: null,
                        width: 800,
                        height: 554,
                        formats: {
                          thumbnail: {
                            name: "thumbnail_running-for-weight-loss-01.jpg",
                            hash: "thumbnail_running_for_weight_loss_01_ba6a61a5b8",
                            ext: ".jpg",
                            mime: "image/jpeg",
                            path: null,
                            width: 225,
                            height: 156,
                            size: 7.24,
                            url: "/uploads/thumbnail_running_for_weight_loss_01_ba6a61a5b8.jpg",
                          },
                          medium: {
                            name: "medium_running-for-weight-loss-01.jpg",
                            hash: "medium_running_for_weight_loss_01_ba6a61a5b8",
                            ext: ".jpg",
                            mime: "image/jpeg",
                            path: null,
                            width: 750,
                            height: 519,
                            size: 39.85,
                            url: "/uploads/medium_running_for_weight_loss_01_ba6a61a5b8.jpg",
                          },
                          small: {
                            name: "small_running-for-weight-loss-01.jpg",
                            hash: "small_running_for_weight_loss_01_ba6a61a5b8",
                            ext: ".jpg",
                            mime: "image/jpeg",
                            path: null,
                            width: 500,
                            height: 346,
                            size: 22.44,
                            url: "/uploads/small_running_for_weight_loss_01_ba6a61a5b8.jpg",
                          },
                        },
                        hash: "running_for_weight_loss_01_ba6a61a5b8",
                        ext: ".jpg",
                        mime: "image/jpeg",
                        size: 42.89,
                        url: "/uploads/running_for_weight_loss_01_ba6a61a5b8.jpg",
                        previewUrl: null,
                        provider: "local",
                        provider_metadata: null,
                        createdAt: "2023-01-16T13:42:27.416Z",
                        updatedAt: "2023-01-16T13:42:27.416Z",
                      },
                    },
                  },
                  gallery: {
                    data: null,
                  },
                },
              },
            ]}
          />
        </MainContainer>
      </BaseLayout>
    </>
  );
};

export default MainPage;
