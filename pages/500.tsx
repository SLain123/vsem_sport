import React from "react";

import { BaseLayout, MainContainer } from "components/wrappers";
import { ErrorPage } from "components/error-page";

const ServerError = () => {
  return (
    <BaseLayout>
      <MainContainer>
        <ErrorPage code={500} message="Сервер не отвечает..." />
      </MainContainer>
    </BaseLayout>
  );
};

export default ServerError;
