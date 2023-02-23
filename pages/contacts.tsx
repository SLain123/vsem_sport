import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { BaseLayout, MainContainer } from "components/wrappers";
import { ContactForm } from "modules/contact-form";

const ContactsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Контакты</title>
        <meta name="description" content="Бег, фитнес, йога, кроссфит" />
        <meta name="robots" content="all" />
      </Head>
      <BaseLayout>
        <MainContainer>
          <ContactForm />
        </MainContainer>
      </BaseLayout>
    </>
  );
};

export default ContactsPage;
