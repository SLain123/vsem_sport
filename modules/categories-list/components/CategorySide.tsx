import React, { FC } from "react";
import Link from "next/link";

import { categories } from "../CategoriesList";
import styles from "../Categories.module.scss";

const CategorySide: FC = () => {
  return (
    <div className={styles.side_container}>
      <p className={styles.side_header}>Быстрые ссылки:</p>
      <div className={styles.side_link_block}>
        {categories.map(({ id, title, href }) => (
          <Link key={id} href={href} className={styles.side_link}>
            {title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export { CategorySide };
