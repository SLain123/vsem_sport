import React, { FC, PropsWithChildren } from "react";

import { Header } from "modules/header";
import { Footer } from "modules/footer";

const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export { BaseLayout };
