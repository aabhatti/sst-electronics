import React from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

import {
  rowDetails,
  isCurrentEnabled,
  isForwardEnabled,
  isPreviousEnabled,
  isPageButtonEnabled,
} from "./helper";

interface TableFooterProps {
  loading: boolean;
  page: number;
  total: number;
  limit: number;
  pagination: number[];
  handlePagination: (page: number) => void;
}

const TableFooter: React.FC<TableFooterProps> = ({
  loading,
  page,
  total,
  limit,
  pagination,
  handlePagination,
}) => {
  return (
    <div id="sellbthdata_wrapper" className="dataTables_wrapper no-footer">
      <div className="flex text-center justify-between items-end mt-4 flex-wrap">
        <div className="dataTables_info text-sm text-body flex items-end ml-1">
          {rowDetails(page, limit, total)}
        </div>
        <div className="mb-0 flex items-center" id="application-tbl1_paginate">
          <button
            disabled={loading}
            className="paginate_button previous"
            onClick={() => {
              if (isPreviousEnabled(pagination, page)) {
                handlePagination(pagination[0]);
              }
            }}
          >
            <MdKeyboardDoubleArrowLeft className="text-primary text-5xl" />
          </button>
          <span>
            {!!(pagination?.length > 0) ? (
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
            <MdKeyboardDoubleArrowRight className="text-primary text-5xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableFooter;
