import React from "react";
import { shouldDataDisplay } from "./helper";
import { TableRows } from "./TableRows";
import Spinner from "../Spinner";
import NoDataFound from "../NoDataFound";

const TableBody = ({
  header = [],
  bodyData = [],
  actionHandler,
  loading = false,
  children,
}) => {
  return (
    <>
      <table
        id="example"
        className="table dataTable shadow-hover display m-0"
        style={{ minWidth: "fit-content" }}
      >
        <thead className="position-sticky top-0 bg-white z-index-3">
          <tr>
            {header.map((head, i) => (
              <th key={i}> {head?.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shouldDataDisplay(loading, children, bodyData) &&
            (children || (
              <TableRows
                header={header}
                bodyData={bodyData}
                actionHandler={actionHandler}
              />
            ))}
        </tbody>
      </table>
      {!shouldDataDisplay(loading, children, bodyData) && (
        <div className="d-flex flex-grow-1 fs-4 fw-normal card-table-color align-items-center justify-content-center py-4">
          {loading ? (
            <Spinner color="text-primary" size={35} />
          ) : (
            <NoDataFound />
          )}
        </div>
      )}
    </>
  );
};

export default TableBody;
