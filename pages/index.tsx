import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { BaseLayout } from "components/wrappers";
import { DevStub } from "components/dev-stub";

const MainPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Vsem Sport Online</title>
        <meta name="description" content="Бег, фитнес, йога, кроссфит" />
      </Head>
      <BaseLayout>
        <DevStub message="Портал 'Всем спорт' находится в разработке" />
      </BaseLayout>
    </>
  );
};

export default MainPage;
