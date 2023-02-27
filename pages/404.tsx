import React from "react";

import { BaseLayout, MainContainer } from "components/wrappers";
import { ErrorPage } from "components/error-page";

const PageNotFound = () => {
  return (
    <BaseLayout>
      <MainContainer>
        <ErrorPage code={404} message="Страница потерялась..." />
      </MainContainer>
    </BaseLayout>
  );
};

export default PageNotFound;
