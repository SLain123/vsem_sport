import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { BaseLayout, MainContainer } from "components/wrappers";
import { PolicyEng } from "modules/policy/PolicyEng";

const PolicyEngPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Policy</title>
        <meta name="description" content="Policy for rest of the World." />
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
