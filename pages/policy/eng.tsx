import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { BaseLayout, MainContainer } from "components/wrappers";
import { PolicyEng } from "modules/policy/PolicyEng";

const PolicyEngPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Vsem Sport Online - Policy Eng</title>
        <meta name="description" content="Бег, фитнес, йога, кроссфит" />
        <meta name="robots" content="all" />
      </Head>

      <BaseLayout>
        <MainContainer>
          <PolicyEng />
        </MainContainer>
      </BaseLayout>
    </>
  );
};

export default PolicyEngPage;
