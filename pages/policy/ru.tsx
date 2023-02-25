import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { BaseLayout, MainContainer } from "components/wrappers";
import { PolicyRu } from "modules/policy/PolicyRu";

const PolicyRuPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Vsem Sport Online - Policy Ru</title>
        <meta name="description" content="Бег, фитнес, йога, кроссфит" />
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
