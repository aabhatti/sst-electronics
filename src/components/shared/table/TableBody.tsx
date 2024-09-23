import React, { ReactNode } from "react";
import { shouldDataDisplay } from "./helper";
import { TableRows } from "./TableRows";
import Spinner from "@/components/shared/spinner";
import NoDataFound from "../noDataFound";

// Define the shape of the header and body data
interface HeaderItem {
  value: string;
  type?: string;
  disabled?: boolean;
  [key: string]: any; // Allow additional properties if needed
}

interface BodyDataItem {
  [key: string]: any; // Body data is typically an object with various fields
}
// Define the structure for each row data item
interface RowDataItem {
  [key: string]: any; // The keys correspond to header values
}
type ActionHandler = (field: string, value: any, rowData: RowDataItem) => void;

// Define the props for the component
interface TableBodyProps {
  header?: HeaderItem[];
  bodyData?: BodyDataItem[];
  actionHandler?: ActionHandler;
  loading?: boolean;
  children?: ReactNode;
}

const TableBody: React.FC<TableBodyProps> = ({
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
        <thead className="sticky top-0 z-index-3 bg-lightBasePrimary">
          <tr>
            {header.map((head, i) => (
              <th className="bg-lightBasePrimary" key={i}>
                {" "}
                {head?.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shouldDataDisplay(loading, !!children, bodyData) &&
            (children || (
              <TableRows
                header={header}
                bodyData={bodyData}
                actionHandler={actionHandler}
              />
            ))}
        </tbody>
      </table>
      {!shouldDataDisplay(loading, !!children, bodyData) && (
        <div className="flex flex-1 fs-4 fw-normal card-table-color items-center justify-center py-4">
          {loading ? <Spinner color="text-primary" /> : <NoDataFound />}
        </div>
      )}
    </>
  );
};

export default TableBody;
