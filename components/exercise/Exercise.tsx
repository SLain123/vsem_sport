import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import YouTube, { YouTubeProps } from "react-youtube";

import { BaseImageType } from "types/Common";

import styles from "./Exercise.module.scss";

type Props = {
  title: string;
  description: string;
  preview: {
    data: {
      id: number;
      attributes: BaseImageType;
    };
  };
  youtube: string | null;
};

const Exercise: FC<Props> = ({ title, description, preview, youtube }) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const imgUrl = {
    desk: `${baseUrl}${preview.data.attributes.url}`,
    tab: preview?.data?.attributes?.formats?.medium?.url
      ? `${baseUrl}${preview.data.attributes.formats.medium.url}`
      : `${baseUrl}${preview.data.attributes.url}`,
    mob: preview?.data?.attributes?.formats?.small?.url
      ? `${baseUrl}${preview.data.attributes.formats.small.url}`
      : `${baseUrl}${preview.data.attributes.url}`,
  };
  const transformImageUri = (src: string) => `${baseUrl}${src}`;
  const opts: YouTubeProps["opts"] = { width: "100%", height: "100%" };

  return (
    <div className={styles.ex_container}>
      <h1 className={styles.ex_title}>{title}</h1>

      {youtube && (
        <YouTube videoId={youtube} opts={opts} className={styles.ex_youtube} />
      )}

      <picture>
        <source srcSet={imgUrl.desk} media="(min-width: 1024px)" width={660} />
        <source
          srcSet={imgUrl.tab}
          media="(min-width: 768px)"
          width={400}
          height={266}
        />
        <img
          className={styles.ex_img}
          src={imgUrl.mob}
          alt={title}
          width="100%"
        />
      </picture>

      <ReactMarkdown
        children={description}
        className={styles.ex_text_block}
        transformImageUri={transformImageUri}
      />
    </div>
  );
};

export { Exercise };
