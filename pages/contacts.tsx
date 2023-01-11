import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { BaseLayout } from "components/wrappers";

const ContactsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Контакты</title>
        <meta name="description" content="Бег, фитнес, йога, кроссфит" />
      </Head>
      <BaseLayout>
        <span style={{ width: 400 }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa porro
          officia quo veniam magnam. Molestiae dolorum pariatur incidunt
          consectetur error repudiandae temporibus fuga dicta voluptatibus
        </span>
      </BaseLayout>
    </>
  );
};

export default ContactsPage;
