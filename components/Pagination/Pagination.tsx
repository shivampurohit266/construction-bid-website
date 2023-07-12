import * as React from "react";
import { Col, Pagination } from "react-bootstrap";
import { useLocalization } from "../../utils/localization";

export const MyPagination = ({
  page,
  limit,
  recordsLength,
  totalRecords,
  totalPage,
  isLoading,
  handleLoadMoreClick,
  handleLimitChange,
}: {
  page: number;
  totalPage: number;
  totalRecords: number;
  limit: number;
  recordsLength: number;
  isLoading: boolean;
  handleLoadMoreClick: any;
  handleLimitChange: any;
}) => {
  const [t] = useLocalization();

  let endRecord = 0;
  let startPage: number, endPage: number, startRecord: number;

  if (totalPage <= 5) {
    // less than 10 total pages so show all
    startPage = 1;
    endPage = totalPage;
  } else if (page <= 4) {
    startPage = 1;
    endPage = 5;
  } else {
    // more than 10 total pages so calculate start and end pages
    if (page <= 6) {
      if (totalPage < 10) {
        startPage = 1;
        endPage = totalPage;
      } else {
        startPage = 1;
        endPage = 10;
      }
    } else if (page === 7 && totalPage === 7) {
      startPage = 2;
      endPage = 7;
    } else if (page + 4 >= totalPage) {
      startPage = totalPage - 9;
      endPage = totalPage;
    } else {
      startPage = page - 5;
      endPage = page + 4;
    }
  }
  let pageArr = [...Array.from(Array(endPage + 1 - startPage)?.keys())]?.map(
    (i) => startPage + i
  );
  // let pageArr:any = [1,2,3,4,5]

  if (page === totalPage) {
    endRecord = totalRecords;
    startRecord = endRecord + 1 - recordsLength;
  } else {
    endRecord = page * limit;
    startRecord = endRecord - limit + 1;
  }

  return (
    <Col
      xs={12}
      md={12}
      className="d-flex align-items-center justify-content-center mb-3 main-table-bottom pagination_container"
    >
      <Col xs={4} md={4} className="page_showing_col">
        <p className="showing-count">{`${t(
          "pages.Blog.Showing"
        )} ${startRecord} - ${endRecord} ${t(
          "pages.Blog.outOf"
        )} ${totalRecords}`}</p>
      </Col>
      <Col xs={6} md={6} className="pagination_inner_box">
        <div className="d-flex justify-content-end pagination_box">
          <span className="pe-2"> {t("pages.Blog.DataPerPage")}</span>
          <select
            className="me-2 select-height"
            onChange={(e) => handleLimitChange(e.target.value)}
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
          <Pagination className="blog_pagination">
            {page >= 3 && (
              <Pagination.First
                onClick={() => {
                  !isLoading && handleLoadMoreClick((page = 1));
                }}
              />
            )}
            {page !== 1 && (
              <Pagination.Prev
                onClick={() => {
                  !isLoading && page !== 1 && handleLoadMoreClick(page - 1);
                }}
              />
            )}
            {page >= 7 && <Pagination.Ellipsis />}
            {pageArr.map((pages: any, i: any) => {
              return (
                <Pagination.Item
                  active={pages === page ? true : false}
                  onClick={() => {
                    !isLoading && handleLoadMoreClick(pages);
                  }}
                  key={"pagination" + i}
                >
                  {pages}
                </Pagination.Item>
              );
            })}
            {page >= 5 && totalPage > page + 4 && <Pagination.Ellipsis />}
            {page >= 1 && page <= 4 && totalPage > 5 && <Pagination.Ellipsis />}
            {page !== totalPage && (
              <Pagination.Next
                onClick={() => {
                  !isLoading &&
                    page !== totalPage &&
                    handleLoadMoreClick(page + 1);
                }}
              />
            )}
            {page <= totalPage - 2 && (
              <Pagination.Last
                onClick={() => {
                  !isLoading && handleLoadMoreClick((page = totalPage));
                }}
              />
            )}
          </Pagination>
        </div>
      </Col>
    </Col>
  );
};
