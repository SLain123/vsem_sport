import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import debounce from "debounce";

import { MainContainer } from "components/wrappers";

import { HrNavigation } from "./components/HrNavigation";

import styles from "./Header.module.scss";
import Logo from "public/img/logo-header.png";

const Header: FC = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

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
            <Image src={Logo} alt="logo" width={360} height={40} />
          </Link>
          <HrNavigation />
        </MainContainer>
      </header>
      <div className={styles.hr_stub} />
    </>
  );
};

export { Header };
