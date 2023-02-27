import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import styles from "../Categories.module.scss";

type PropsType = {
  title: string;
  href: string;
  imgSrc: StaticImageData;
  desc: string[];
};

const Category: FC<PropsType> = ({ title, href, imgSrc, desc }) => {
  return (
    <li className={styles.cat_item}>
      <Link href={href}>
        <Image
          fill
          src={imgSrc}
          alt="Фон для карточки категории"
          className={styles.cat_img}
          loading="lazy"
        />
        <h3 className={styles.cat_inner_title}>{title}</h3>
        {desc.map((par, indx) => (
          <p key={indx} className={styles.cat_desc}>
            {par}
          </p>
        ))}
      </Link>
    </li>
  );
};

export { Category };
