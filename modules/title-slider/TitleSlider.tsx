import React, { FC, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";

import { Slide } from "./components/Slide";

import styles from "./TitleSlider.module.scss";
import photo1 from "public/img/title-slides/1.jpg";
import photo2 from "public/img/title-slides/2.jpg";
import photo3 from "public/img/title-slides/3.jpg";
import photo4 from "public/img/title-slides/4.jpg";
import photo5 from "public/img/title-slides/5.jpg";
import ArrowIcon from "../../public/icon/arrows/bottom-with-cyrcle.svg";

const sliderData = [
  {
    id: 0,
    imgSrc: photo1,
    alt: "Заставка для раздела бег",
    href: "/run",
    title: "Раздел о беге",
    subTitle: "Открой мир бега с нами",
  },
  {
    id: 1,
    imgSrc: photo2,
    alt: "Заставка для раздела кроссфит",
    href: "/crossfit",
    title: "Раздел о кроссфите",
    subTitle: "Открой для себя новые горизонты с кроссфитом",
  },
  {
    id: 2,
    imgSrc: photo3,
    alt: "Заставка для раздела бодибилдинг",
    href: "/bodybuilding",
    title: "Раздел о бодибилдинге",
    subTitle: "Устраняй преграды - достигай цели",
  },
  {
    id: 3,
    imgSrc: photo4,
    alt: "Заставка для раздела йога",
    href: "/yoga",
    title: "Раздел посвященный йоге",
    subTitle: "Искренняя йога - искренняя сила",
  },
  {
    id: 4,
    imgSrc: photo5,
    alt: "Заставка для раздела фитнес",
    href: "/fitnes",
    title: "Раздел о фитнесе",
    subTitle: "Улучшай свое тело и дух с нами",
  },
];

const TitleSlider: FC = () => {
  const anchorRef = useRef<HTMLDivElement>(null);

  const scrollToAnchore = () => {
    anchorRef?.current &&
      anchorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className={styles.slider_container}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          grabCursor
          spaceBetween={0}
          slidesPerView={1}
          loop
          autoplay
          pagination={{ clickable: true }}
          navigation
        >
          {sliderData.map(({ id, imgSrc, alt, href, title, subTitle }) => (
            <SwiperSlide className={styles.slider_item} key={id}>
              <Slide
                imgSrc={imgSrc}
                alt={alt}
                href={href}
                title={title}
                subTitle={subTitle}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          type="button"
          className={styles.slider_btn_bottom}
          onClick={scrollToAnchore}
        >
          <ArrowIcon width={52} height={52} />
        </button>
      </div>
      <div ref={anchorRef} />
    </>
  );
};

export { TitleSlider };
