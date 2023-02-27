import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { BaseLayout, MainContainer } from "components/wrappers";
import { PolicyRu } from "modules/policy/PolicyRu";

const PolicyRuPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Политика</title>
        <meta
          name="description"
          content="Политика в отношении обработки персональных данных для РФ."
        />
        <meta name="robots" content="all" />
      </Head>

      <BaseLayout>
        <MainContainer>
          <PolicyRu />
        </MainContainer>
      </BaseLayout>
    </>
  );
};

export default PolicyRuPage;
