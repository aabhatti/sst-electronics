import React, { ReactNode } from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";

interface TableProps {
  loading: boolean;
  title?: string;
  search?: string;
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  header?: any[]; // Define the exact type if possible
  children?: ReactNode;
  bodyData?: any[]; // Define the exact type if possible
  page?: number;
  limit?: number;
  total?: number;
  handlePagination?: (page: number) => void;
  tabs?: any[]; // Define the exact type if possible
  handleTab?: (tab: any) => void;
  selectedTab?: any; // Define the exact type if possible
  mainTabs?: any[]; // Define the exact type if possible
  activeTab?: any; // Define the exact type if possible
  handleActiveTab?: (tab: any) => void;
  handleCreate?: () => void;
  handleRefresh?: () => void;
  handleExport?: () => void;
  actionHandler?: (action: string, id: string | number) => void;
  setToggleTabs?: (toggle: boolean) => void;
  isCreateWithdrawal?: boolean;
}

const Table: React.FC<TableProps> = ({
  loading,
  title = "",
  search = "",
  handleSearch,
  header = [],
  children,
  bodyData = [],
  page = 1,
  limit = 10,
  total = 1,
  handlePagination,
  tabs,
  handleTab,
  selectedTab,
  mainTabs,
  activeTab,
  handleActiveTab,
  handleCreate,
  handleRefresh,
  handleExport,
  actionHandler,
  setToggleTabs,
  isCreateWithdrawal = false,
}) => {
  const pagination = Array(Math.ceil(total / limit))
    .fill(0)
    .map((_, i) => i + 1);

  return (
    <div className="flex flex-col flex-grow overflow-auto text-title">
      <TableHeader
        title={title}
        search={search}
        handleSearch={handleSearch}
        tabs={tabs}
        handleTab={handleTab}
        selectedTab={selectedTab}
        mainTabs={mainTabs}
        activeTab={activeTab}
        handleActiveTab={handleActiveTab}
        handleCreate={handleCreate}
        handleRefresh={handleRefresh}
        handleExport={handleExport}
        setToggleTabs={setToggleTabs}
        isCreateWithdrawal={isCreateWithdrawal}
      />

      <div className="flex flex-col flex-grow overflow-auto min-h-[220px] py-0">
        <div className="w-full h-full overflow-auto">
          <div className="h-full flex flex-col">
            <TableBody
              loading={loading}
              header={header}
              bodyData={bodyData}
              page={page}
              total={total}
              handlePagination={handlePagination}
              actionHandler={actionHandler}
            >
              {children}
            </TableBody>
          </div>
        </div>
      </div>
      {handlePagination && (
        <div className="py-0">
          <TableFooter
            loading={loading}
            page={page}
            total={total}
            pagination={pagination}
            handlePagination={handlePagination}
            limit={limit}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
