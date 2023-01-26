import React, { FC, useMemo } from "react";
import Link from "next/link";

import { TopItemType } from "types/Top";

import styles from "./TopBlock.module.scss";

type Props = {
  title: string;
  topList: TopItemType[];
};

const TopBlock: FC<Props> = ({ title, topList }) => {
  const sortedTopList = useMemo(
    () => [...topList].sort((a, b) => a.position - b.position),
    [topList]
  );

  if (!topList.length) {
    return null;
  }

  return (
    <div>
      <div className={styles.top_container}>
        <h4 className={styles.top_title}>{title}</h4>
        <ul className={styles.top_list}>
          {sortedTopList.map(({ id, position, title, category, slug }) => (
            <li className={styles.top_item} key={id}>
              <Link href={`/article/${slug}`} className={styles.top_link}>
                {position}. {title}
              </Link>

              {category && (
                <span className={styles.top_category}>{category}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { TopBlock };
