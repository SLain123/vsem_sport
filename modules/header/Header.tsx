import React, { FC, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import debounce from "debounce";

import { MainContainer } from "components/wrappers";

import { HrNavigation } from "./components/HrNavigation";
import { Humburger } from "./components/Humburger";

import { useWindowDimensions } from "hooks";

import styles from "./Header.module.scss";
import Logo from "public/img/logo-header.png";

const Header: FC = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const navList = useMemo(
    () => [
      { id: 0, title: "Главная", link: "/" },
      { id: 1, title: "Посмотреть программы", link: "/trainings" },
      { id: 2, title: "Выбрать спорт", link: "/sports" },
      { id: 3, title: "Контакты", link: "/contacts" },
    ],
    []
  );

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
          <div className={styles.hr_logo_link}>
            <Image src={Logo} alt="Логотип" fill />
          </div>
          <HrNavigation navList={navList} />
          {width < 1024 && <Humburger navList={navList} />}
        </MainContainer>
      </header>
      <div className={styles.hr_stub} />
    </>
  );
};

export { Header };
