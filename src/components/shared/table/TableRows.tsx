import React from "react";
import { isObject } from "lodash";
import { addEllipsis, getTextDisplay, isEllipsis } from "./helper";
// import TableMenu from "./TableMenu";
import { CUSTOM_TYPES } from "./constants";
import { TooltipPosition } from "@/utils/constants";
import { formatDate } from "@/utils/parser";
import CustomComponent from "./customComponent";
import Tooltip from "../tooltip";

// Define the structure for each header item
interface HeaderItem {
  value: string;
  type?: string;
  disabled?: boolean;
  [key: string]: any; // Allow additional properties if needed
}

// Define the structure for each row data item
interface RowDataItem {
  [key: string]: any; // The keys correspond to header values
}

// Define the type for the action handler function
type ActionHandler = (field: string, value: any, rowData: RowDataItem) => void;

// Define the props for the TableRows component
interface TableRowsProps {
  header: HeaderItem[];
  bodyData: RowDataItem[];
  actionHandler?: ActionHandler;
}

export const TableRows: React.FC<TableRowsProps> = ({
  header,
  bodyData,
  actionHandler,
}) => {
  return (
    <>
      {bodyData.map((rowData, rowIndex) => (
        <tr key={rowIndex}>
          {header.map((item, index) => {
            const cellData = rowData[item.value];
            if (cellData === undefined) return null;

            const renderCellContent = () => {
              switch (item.type) {
                case CUSTOM_TYPES.COMPONENT:
                  return (
                    <CustomComponent
                      component={cellData}
                      disabled={item.disabled}
                      onClick={(e: React.MouseEvent) =>
                        !item.disabled &&
                        actionHandler &&
                        actionHandler(item.value, e, rowData)
                      }
                    />
                  );

                // case CUSTOM_TYPES.MENU:
                //   return (
                //     <TableMenu
                //       list={cellData}
                //       disabled={item.disabled}
                //       onClick={(e: React.MouseEvent) =>
                //         !item.disabled &&
                //         actionHandler &&
                //         actionHandler(item.value, e, rowData)
                //       }
                //     />
                //   );

                case CUSTOM_TYPES.TOGGLE:
                  return (
                    <div
                      className="form-check form-switch"
                      onClick={(e) => {
                        e.stopPropagation();
                        actionHandler &&
                          actionHandler(item.value, !cellData, rowData);
                      }}
                    >
                      <input
                        className="form-check-input table-toggle"
                        type="checkbox"
                        checked={!!cellData}
                        readOnly
                      />
                    </div>
                  );

                case CUSTOM_TYPES.STATUS:
                  return (
                    <span
                      className={`${
                        cellData?.simple
                          ? "badge badge"
                          : "customBadge customBadge"
                      }-${cellData?.badge}`}
                    >
                      {cellData?.title}
                    </span>
                  );

                case CUSTOM_TYPES.MULTI_STRING:
                  return (
                    <div className="d-flex flex-column">
                      {cellData
                        ? cellData
                            .split("-")
                            .map((rowItem: string, idx: number) => (
                              <div key={idx}>{rowItem}</div>
                            ))
                        : ""}
                    </div>
                  );

                case CUSTOM_TYPES.OBJECT_STRING:
                  return (
                    <div className="d-flex flex-column">
                      {isObject(cellData) &&
                        Object.entries(cellData).map(
                          ([key, value], idx: number) => (
                            <div key={idx} className="p-1">
                              <strong>{key}:</strong>{" "}
                              {getTextDisplay(CUSTOM_TYPES.STRING, value)}
                            </div>
                          )
                        )}
                    </div>
                  );

                case CUSTOM_TYPES.DATE:
                  return <>{formatDate(cellData)}</>;

                case CUSTOM_TYPES.WALLET:
                  return isEllipsis(cellData) ? (
                    <span>{addEllipsis(cellData)}</span>
                  ) : (
                    cellData
                  );

                case CUSTOM_TYPES.STRING:
                  return isEllipsis(cellData) ? (
                    <Tooltip position={TooltipPosition.TOP} text={cellData}>
                      <span>{addEllipsis(cellData)}</span>
                    </Tooltip>
                  ) : (
                    cellData
                  );

                default:
                  return cellData;
              }
            };

            return (
              <td key={index} className="text-tableBody">
                {renderCellContent()}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
};
