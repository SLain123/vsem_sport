import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { BaseLayout } from "components/wrappers";

const SportsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Виды спорта</title>
        <meta name="description" content="Бег, фитнес, йога, кроссфит" />
      </Head>
      <BaseLayout>
        <span style={{ width: 400 }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa porro
          officia quo veniam magnam. Molestiae dolorum pariatur incidunt
          consectetur error repudiandae temporibus fuga dicta voluptatibus Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, maxime omnis officia maiores sed fuga nostrum, consectetur dolores cumque dicta illo ipsa repudiandae deserunt voluptatem quis pariatur ex laudantium, assumenda quasi quo dolorum officiis ea laborum! Quia, autem molestias recusandae sed eum delectus quisquam a officia id sint soluta qui aut eos harum? Sunt similique repudiandae nobis sint iste beatae accusantium accusamus eveniet laudantium ducimus deserunt quia dicta a dolor quasi fugit officia, harum, eaque perferendis aspernatur consequatur perspiciatis alias laborum molestias. Nulla repellendus, aspernatur soluta praesentium eos inventore hic cumque nihil nobis odio architecto aperiam maxime enim nostrum autem facere sed repudiandae a dicta illo? Accusamus, sit temporibus minus, corporis deleniti dolores mollitia non iste ex distinctio molestiae ea odit debitis architecto quo. Deserunt hic corporis obcaecati odio facilis possimus saepe maxime sapiente distinctio mollitia repellat tempora assumenda ipsa nihil ad vero nostrum, numquam tenetur? Voluptas, vitae! Facere animi excepturi praesentium corporis illo unde reiciendis placeat numquam ut dolores itaque, esse eos eveniet quae, temporibus ducimus exercitationem sequi perspiciatis maiores. Adipisci nemo eligendi molestiae odit necessitatibus dicta rem quibusdam illum deleniti magnam optio ipsam consequuntur consequatur pariatur sunt beatae qui repellendus ratione perspiciatis reiciendis fuga, consectetur architecto natus distinctio.
        </span>
      </BaseLayout>
    </>
  );
};

export default SportsPage;
