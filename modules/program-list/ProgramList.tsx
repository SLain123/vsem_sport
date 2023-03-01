import React, { FC } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Link from "next/link";

import { ProgramListType } from "types/Program";

import styles from "./Program.module.scss";

type Props = {
  programInfo: ProgramListType[];
  preExpanded: number[];
};

const ProgramList: FC<Props> = ({ programInfo, preExpanded }) => {
  return (
    <div className={styles.prog_container}>
      <h1 className={styles.prog_header}>Программы</h1>
      <Accordion
        allowMultipleExpanded
        allowZeroExpanded
        preExpanded={preExpanded}
        className={styles.prog_accordion_container}
      >
        {programInfo.map(({ id, section, programs }) => {
          const programList = programs.map(({ id, title, slug }) => (
            <div
              itemScope
              itemType="https://schema.org/Article"
              className={styles.prog_accordion_link_container}
            >
              <Link
                key={id}
                href={`/program/${slug}`}
                className={styles.prog_accordion_link}
                itemProp="url"
              >
                <span itemProp="name">{title}</span>
              </Link>
            </div>
          ));

          return (
            <AccordionItem
              className={styles.prog_accordion_item}
              key={id}
              uuid={id}
            >
              <AccordionItemHeading
                className={styles.prog_accordion_head_body}
                itemScope
                itemType="https://schema.org/CategoryCodeSet"
              >
                <AccordionItemButton className={styles.prog_accordion_head_btn}>
                  <h2
                    className={styles.prog_accordion_head_text}
                    itemProp="name"
                  >
                    {section}
                  </h2>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={styles.prog_accordion_content}>
                {programList}
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export { ProgramList };
