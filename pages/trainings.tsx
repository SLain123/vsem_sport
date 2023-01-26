import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { BaseLayout } from "components/wrappers";
import { DevStub } from "components/dev-stub";

const TrainingsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Программы тренировок</title>
        <meta name="description" content="Бег, фитнес, йога, кроссфит" />
        <meta name="robots" content="all" />
      </Head>
      <BaseLayout>
        <DevStub message="Портал 'Всем спорт' находится в разработке" />
      </BaseLayout>
    </>
  );
};

export default TrainingsPage;
