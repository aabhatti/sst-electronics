import React, { useState, useEffect } from "react";
import { CREATE_WITHDRAW, EXPORT } from "./constants";
import TableDataSearch from "./TableDataSearch";
import { initialSearch } from "./helper";
import { LuRefreshCw } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";

interface TabType {
  value: string;
  title: string;
}

interface TableHeaderProps {
  title?: string;
  search?: string;
  handleSearch?: (searchVal: string) => void;
  tabs?: TabType[];
  selectedTab?: string;
  mainTabs?: TabType[];
  activeTab?: string;
  handleActiveTab?: (tab: string) => void;
  handleTab?: (tabValue: string) => void;
  handleCreate?: () => void;
  handleRefresh?: () => void;
  handleExport?: () => void;
  setToggleTabs?: (toggle: boolean) => void;
  isCreateWithdrawal?: boolean;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  title = "",
  search = "",
  handleSearch,
  tabs = [],
  selectedTab = "",
  mainTabs,
  activeTab,
  handleActiveTab,
  handleTab = null,
  handleCreate = null,
  handleRefresh = null,
  handleExport = null,
  setToggleTabs,
  isCreateWithdrawal,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchVal, setSearchVal] = useState({
    ...initialSearch,
    current: search,
  });

  useEffect(() => {
    setSearchVal((prev) => ({
      ...prev,
      current: search,
    }));
  }, [search]);

  const handleRefreshClick = () => {
    if (handleRefresh && !refreshing) {
      setRefreshing(true);
      handleRefresh();
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-start pb-0">
      <div className="flex items-end justify-between flex-wrap w-full">
        {handleSearch && (
          <TableDataSearch
            searchVal={searchVal}
            setSearchVal={setSearchVal}
            handleSearch={handleSearch}
          />
        )}
        <div className="flex gap-2 mb-4 flex-wrap ml-auto">
          <div className="flex gap-3 items-center">
            {handleRefresh && (
              <button
                className="btn btn-sm rounded-full bg-baseSecondary hover:bg-primary text-primary hover:text-secondary p-4 border-baseSecondary"
                onClick={handleRefreshClick}
                disabled={refreshing}
              >
                <LuRefreshCw className="text-xl" />
              </button>
            )}
            {handleCreate && (
              <button
                className={`btn btn-sm ${
                  isCreateWithdrawal ? "rounded-md" : "rounded-full"
                } bg-baseSecondary hover:bg-primary text-primary hover:text-secondary p-4 border-baseSecondary`}
                onClick={() => handleCreate()}
              >
                {isCreateWithdrawal ? (
                  <div className="flex items-center gap-2">
                    <FaPlus />
                    <span className="font-normal">{CREATE_WITHDRAW}</span>
                  </div>
                ) : (
                  <FaPlus className="text-xl" />
                )}
              </button>
            )}

            {handleExport && (
              <button
                className="btn btn-sm rounded-md bg-baseSecondary hover:bg-primary text-primary hover:text-secondary p-4 border-baseSecondary"
                onClick={() => handleExport()}
              >
                <div className="flex items-center gap-2">
                  <IoMdDownload className="text-xl" />
                  <span className="font-semibold">{EXPORT}</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
