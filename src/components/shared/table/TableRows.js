import { isObject } from "lodash";
import React from "react";
import { addEllipsis, getTextDisplay, isEllipsis } from "./helper";
import TableMenu from "./TableMenu";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { CUSTOM_TYPES } from "./constants";
import { TOOLTIP_PLACEMENT } from "../../../utils/Constants";
import { formatDate } from "../../../utils";
import CustomComponent from "./CustomComponent";

export const TableRows = ({ header, bodyData, actionHandler }) => {
  return (
    <>
      {bodyData.map((rowData, rowIndex) => (
        <tr key={rowIndex}>
          {header.map(
            (item, index) =>
              item.value in rowData && (
                <td key={index} className="text-tableBody">
                  {item.type === CUSTOM_TYPES.COMPONENT ? (
                    <CustomComponent
                      component={rowData[item.value]}
                      disabled={item.disabled}
                      onClick={(e) =>
                        !item.disabled &&
                        actionHandler &&
                        actionHandler(item.value, e, rowData)
                      }
                    />
                  ) : item.type === CUSTOM_TYPES.MENU ? (
                    <TableMenu
                      list={rowData[item.value]}
                      disabled={item.disabled}
                      onClick={(e) =>
                        !item.disabled &&
                        actionHandler &&
                        actionHandler(item.value, e, rowData)
                      }
                    />
                  ) : item?.type === CUSTOM_TYPES.TOGGLE ? (
                    <div
                      className="form-check form-switch "
                      onClick={(e) => {
                        e.stopPropagation();
                        actionHandler &&
                          actionHandler(
                            item.value,
                            !rowData[item.value],
                            rowData
                          );
                      }}
                    >
                      <input
                        className="form-check-input table-toggle"
                        type="checkbox"
                        checked={!!rowData[item.value]}
                      />
                    </div>
                  ) : item?.type === CUSTOM_TYPES.STATUS ? (
                    <span
                      className={`${
                        rowData[item.value]?.simple
                          ? "badge badge"
                          : "customBadge customBadge"
                      }-${rowData[item.value] && rowData[item.value].badge}`}
                    >
                      {rowData[item.value]?.title}
                    </span>
                  ) : item.type === CUSTOM_TYPES.MULTI_STRING ? (
                    <div className="d-flex flex-column">
                      {rowData[item.value]
                        ? rowData[item.value]
                            ?.split("-")
                            ?.map((rowItem) => <div key={index}>{rowItem}</div>)
                        : ""}
                    </div>
                  ) : item.type === CUSTOM_TYPES.OBJECT_STRING ? (
                    <div className="d-flex flex-column">
                      {isObject(rowData[item.value]) &&
                        Object.entries(rowData[item.value])?.map(
                          ([key, value], index) => (
                            <div key={index} className="p-1">
                              <strong>{key}:</strong>{" "}
                              {getTextDisplay(CUSTOM_TYPES.STRING, value)}
                            </div>
                          )
                        )}
                    </div>
                  ) : item.type === CUSTOM_TYPES.DATE ? (
                    <>{formatDate(rowData[item?.value])}</>
                  ) : item.type === CUSTOM_TYPES.WALLET ? (
                    isEllipsis(rowData[item.value]) ? (
                      <span>{addEllipsis(rowData[item.value])}</span>
                    ) : (
                      rowData[item.value]
                    )
                  ) : (
                    item.type === CUSTOM_TYPES.STRING &&
                    (isEllipsis(rowData[item.value]) ? (
                      <OverlayTrigger
                        placement={TOOLTIP_PLACEMENT.TOP}
                        overlay={<Tooltip>{rowData[item.value]}</Tooltip>}
                      >
                        <span>{addEllipsis(rowData[item.value])}</span>
                      </OverlayTrigger>
                    ) : (
                      rowData[item.value]
                    ))
                  )}
                </td>
              )
          )}
        </tr>
      ))}
    </>
  );
};
