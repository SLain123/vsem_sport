import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { BaseLayout, MainContainer } from "components/wrappers";
import { Banner } from "components/banner";
import { CategoriesList } from "modules/categories-list";

const SportsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Категории спорта</title>
        <meta name="description" content="Бег, фитнес, йога, кроссфит" />
        <meta name="robots" content="all" />
      </Head>
      <BaseLayout>
        <MainContainer className="main_grid_container">
          <CategoriesList />
          <Banner />
        </MainContainer>
      </BaseLayout>
    </>
  );
};

export default SportsPage;
