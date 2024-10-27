import React, { Fragment } from "react";
import SidebarItem from "./SidebarItem";
import { getPageRoutes } from "@/utils/pageRoutes";

const Sidebar: React.FC = async () => {
  const routes = await getPageRoutes();
  return (
    <div className="sidebar bg-basePrimary flex flex-col overflow-hidden min-h-screen fixed top-0 left-0 z-[99]">
      <div className="sidebar-header p-4 flex items-center justify-center border-b border-primary text-fontPrimary text-bold">
        <span className="logo">SST</span>
        <h2 className="logo-text flex flex-1 items-center">{"Electronics"}</h2>
      </div>

      <div className="sidebar-content flex flex-col flex-1 overflow-auto w-full p-2">
        {routes.map((item, index) => (
          <Fragment key={index}>
            <SidebarItem item={item} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
