import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import styles from "../TitleSlider.module.scss";

export type SlideType = {
  imgSrc: StaticImageData;
  alt: string;
  href: string;
  title: string;
  subTitle: string;
};

const Slide: FC<SlideType> = ({ imgSrc, alt, href, title, subTitle }) => {
  return (
    <>
      <Image fill src={imgSrc} alt={alt} className={styles.slide_img} />
      <p className={styles.slide_title}>{title}</p>
      <span className={styles.slide_subtitle}>{subTitle}</span>
      <Link href={href} className={styles.slide_link}>
        Подробнее
      </Link>
    </>
  );
};

export { Slide };
