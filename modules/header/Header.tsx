import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import debounce from "debounce";

import { MainContainer } from "components/wrappers";

import { HrNavigation } from "./components/HrNavigation";
import { Humburger } from "./components/Humburger";

import { useWindowDimensions } from "hooks";

import styles from "./Header.module.scss";
import Logo from "public/img/logo-header.png";

const navList = [
  { id: 1, title: "Посмотреть программы", link: "/programs/all" },
  { id: 2, title: "Выбрать категорию спорта", link: "/categories" },
  { id: 0, title: "Описание упражнений", link: "/exercises" },
  { id: 3, title: "Контакты", link: "/contacts" },
];

const Header: FC = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { width } = useWindowDimensions();

  const handleScroll = debounce(() => {
    if (window.pageYOffset > 72) {
      // find current scroll position
      const currentScrollPos = window.pageYOffset;
      // set state based on location info (explained in more detail below)
      setVisible(prevScrollPos > currentScrollPos);
      // set state to new scroll position
      setPrevScrollPos(currentScrollPos);
    } else {
      setVisible(true);
    }
  }, 50);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  return (
    <>
      <header
        className={styles.hr_container}
        style={{ top: visible ? "0" : "-72px" }}
      >
        <MainContainer className={styles.hr_content}>
          <Link href="/" className={styles.hr_logo_link}>
            <picture>
              <source
                srcSet={Logo.src}
                media="(min-width: 1024px)"
                width={300}
                height={50}
              />
              <source
                srcSet={Logo.src}
                media="(min-width: 768px)"
                width={264}
                height={44}
              />
              <img src={Logo.src} alt="Логотип" width={220} height={36} />
            </picture>
          </Link>
          <HrNavigation navList={navList} />
          {width < 1024 && <Humburger navList={navList} />}
        </MainContainer>
      </header>
      <div className={styles.hr_stub} />
    </>
  );
};

export { Header };
