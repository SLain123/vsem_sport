import React, { FC } from "react";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

export type PaginationType = {
  page: number;
  pageCount: number;
  masterLink: string;
  firstPageLink: string;
};

const Pagination: FC<PaginationType> = ({
  page,
  pageCount,
  masterLink,
  firstPageLink,
}) => {
  const router = useRouter();

  const onPageChange = (selectedItem: { selected: number }) => {
    selectedItem.selected === 0
      ? router.push(firstPageLink)
      : router.push(`${masterLink}/${selectedItem.selected + 1}`);
  };

  const hrefBuilder = (pageIndex: number, pageCount: number) =>
    pageIndex > 1 && pageIndex <= pageCount
      ? `${masterLink}/${pageIndex}`
      : firstPageLink;

  return (
    <ReactPaginate
      initialPage={page - 1}
      breakLabel="..."
      nextLabel=">"
      onPageChange={onPageChange}
      hrefBuilder={hrefBuilder}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      previousLabel="<"
      className={styles.pag_container}
      pageLinkClassName={styles.pag_link}
      previousLinkClassName={styles.pag_link}
      nextLinkClassName={styles.pag_link}
      breakLinkClassName={styles.pag_link}
      disabledLinkClassName={styles.pag_disabled}
      activeLinkClassName={styles.pag_active}
    />
  );
};

export { Pagination };
