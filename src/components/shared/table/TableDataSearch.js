import React, { useEffect, useMemo } from "react";
import { TYPE, DEBOUNCE_TIME, LABELS } from "../../../utils/Constants";
import { initialSearch } from "./helper";
import Input from "../Input/Input";
import { debounce } from "lodash";

const TableDataSearch = ({ searchVal, setSearchVal, handleSearch }) => {
  const debounceSearch = useMemo(
    () => debounce((search) => handleSearch(search), DEBOUNCE_TIME),
    [handleSearch]
  );
  useEffect(() => {
    if (searchVal.prev !== searchVal.current)
      debounceSearch(searchVal?.current?.trim());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVal?.current?.trim()]);

  return (
    <div className="d-flex flex-column flex-wrap ml-2">
      <span className="my-2 text-body">{LABELS.SEARCH}</span>
      <div className="input-group table-search-area width-300 position-relative">
        <Input
          type={TYPE.TEXT}
          value={searchVal?.current || ""}
          className="input-search bg-transparent"
          onChange={(e) => {
            setSearchVal((prev) => ({
              prev: prev.current,
              current: e.target.value,
            }));
          }}
        />
        {searchVal?.current && (
          <span
            className="clear-auto-complete c-pointer"
            onClick={() => {
              if (searchVal?.current?.trim()) handleSearch("");
              setSearchVal(initialSearch);
            }}
          >
            <i className="bi bi-x text-primary fs-3 fw-bold"></i>
          </span>
        )}
      </div>
    </div>
  );
};

export default TableDataSearch;
