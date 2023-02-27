import React, { FC } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import { LazyLoadComponent } from "react-lazy-load-image-component";

import { ArticleMini } from "types/Article";

import styles from "./RelativeArticles.module.scss";

type Props = {
  relativeList: ArticleMini[];
};

const RelativeArticles: FC<Props> = ({ relativeList }) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  return (
    <div className={styles.relative_container}>
      <LazyLoadComponent>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop
          autoplay={{ delay: 3500 }}
          navigation
          loopedSlides={3}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1025: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
        >
          {relativeList.map(({ id, title, slug, preview }) => (
            <SwiperSlide key={id}>
              <Link href={`/article/${slug}`}>
                <img
                  src={`${baseUrl}${preview}`}
                  alt="Изображение для следующей статьи"
                  className={styles.relative_img}
                />
                <h3 className={styles.relative_title}>{title}</h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </LazyLoadComponent>
    </div>
  );
};

export { RelativeArticles };
