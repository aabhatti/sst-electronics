import React from "react";
import {
  rowDetails,
  isCurrentEnabled,
  isForwardEnabled,
  isPreviousEnabled,
  dataExists,
  isPageButtonEnabled,
} from "./helper";

const TableFooter = ({
  loading,
  page,
  total,
  limit,
  pagination,
  handlePagination,
}) => {
  return (
    <div id="sellbthdata_wrapper" className="dataTables_wrapper no-footer">
      <div className="d-sm-flex text-center justify-content-between align-items-center mt-3 mb-3 flex-wrap">
        <div className="dataTables_info fs-14 text-body d-flex align-items-start">
          {rowDetails(page, limit, total)}
        </div>
        <div
          className="dataTables_paginate paging_simple_numbers mb-0"
          id="application-tbl1_paginate"
        >
          <button
            disabled={loading}
            className="paginate_button previous"
            onClick={() => {
              if (isPreviousEnabled(pagination, page)) {
                handlePagination(pagination[0]);
              }
            }}
          >
            <i className="fa fa-angle-double-left"></i>
          </button>
          <span>
            {dataExists(pagination) > 0 ? (
              pagination.map(
                (number, i) =>
                  isPageButtonEnabled(page, number) && (
                    <button
                      disabled={loading}
                      key={i}
                      className={`paginate_button ${
                        page - 1 === i ? "current" : ""
                      } `}
                      onClick={() => {
                        if (isCurrentEnabled(page, number))
                          handlePagination(number);
                      }}
                    >
                      {number}
                    </button>
                  )
              )
            ) : (
              <p className="paginate_button current">1</p>
            )}
          </span>

          <button
            disabled={loading}
            className="paginate_button next"
            onClick={() => {
              if (isForwardEnabled(pagination, page)) {
                handlePagination(pagination[pagination.length - 1]);
              }
            }}
          >
            <i className="fa fa-angle-double-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableFooter;
