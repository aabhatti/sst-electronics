import React, { useEffect, useMemo } from "react";
import { TYPE, DEBOUNCE_TIME, LABELS } from "@/utils/constants";
import { initialSearch } from "./helper";
import { debounce } from "lodash";
import TextField from "../inputs/TextField";
import { RxCross2 } from "react-icons/rx";

// Define the shape of the search value state
interface SearchVal {
  prev: string;
  current: string;
}

// Define the props for the component
interface TableDataSearchProps {
  searchVal: SearchVal;
  setSearchVal: React.Dispatch<React.SetStateAction<SearchVal>>;
  handleSearch: (search: string) => void;
}

const TableDataSearch: React.FC<TableDataSearchProps> = ({
  searchVal,
  setSearchVal,
  handleSearch,
}) => {
  const debounceSearch = useMemo(
    () => debounce((search: string) => handleSearch(search), DEBOUNCE_TIME),
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
      <div className="width-300 relative">
        <TextField
          type={TYPE.TEXT}
          name="search"
          value={searchVal?.current || ""}
          className="input-search bg-transparent pr-7"
          onChange={(e) => {
            setSearchVal((prev) => ({
              prev: prev.current,
              current: e.target.value,
            }));
          }}
        />
        {searchVal?.current && (
          <span
            className="clear-auto-complete cursor-pointer"
            onClick={() => {
              if (searchVal?.current?.trim()) handleSearch("");
              setSearchVal(initialSearch);
            }}
          >
            <RxCross2 className="text-primary text-lg" />
          </span>
        )}
      </div>
    </div>
  );
};

export default TableDataSearch;
