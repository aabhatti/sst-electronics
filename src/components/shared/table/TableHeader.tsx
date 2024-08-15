import React, { useState, useEffect } from "react";
// import ShowTabs from "../Tab";
import { CREATE_WITHDRAW, EXPORT } from "./constants";
import TableDataSearch from "./TableDataSearch";
import { initialSearch } from "./helper";
import { BUTTON_TYPE } from "../../../utils/Constants";

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
      {title && (
        <h4 className="text-lg font-semibold">
          {setToggleTabs && (
            <i
              className="las la-chevron-circle-left me-2 cursor-pointer text-lg"
              onClick={() => {
                setToggleTabs(false);
              }}
            />
          )}
          {title}
        </h4>
      )}

      {/* {mainTabs && (
        <ShowTabs
          mainTabs={mainTabs}
          activeTab={activeTab}
          handleActiveTab={handleActiveTab}
        />
      )} */}

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
                className="btn btn-sm rounded-full bg-primary text-white"
                onClick={handleRefreshClick}
                disabled={refreshing}
              >
                <i className="las la-sync text-xl" />
              </button>
            )}
            {handleCreate && (
              <button
                className={`btn btn-sm ${
                  isCreateWithdrawal ? "rounded-md" : "rounded-full"
                } bg-primary text-white`}
                onClick={() => handleCreate()}
              >
                {isCreateWithdrawal ? (
                  <div className="flex items-center gap-2">
                    <i className="fa fa-plus text-lg" />
                    <span className="font-normal">{CREATE_WITHDRAW}</span>
                  </div>
                ) : (
                  <i className="fa fa-plus text-lg" />
                )}
              </button>
            )}

            {handleExport && (
              <button
                className="btn btn-sm rounded-md bg-primary text-white"
                onClick={() => handleExport()}
              >
                <div className="flex items-center gap-2">
                  <i className="las la-download text-xl" />
                  <span className="font-semibold">{EXPORT}</span>
                </div>
              </button>
            )}
          </div>

          {tabs?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  type={BUTTON_TYPE.BUTTON}
                  className={`px-4 py-2 rounded-md ${
                    tab.value === selectedTab
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => {
                    if (tab.value !== selectedTab) {
                      setSearchVal(initialSearch);
                      handleTab(tab.value);
                    }
                  }}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
