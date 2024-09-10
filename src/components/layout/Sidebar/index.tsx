import React, { Fragment } from "react";
import {
  BiSolidDashboard,
  BiSolidUser,
  BiReceipt,
  BiCopyAlt,
} from "react-icons/bi";

import SidebarItem from "./SidebarItem";

interface Route {
  title: string;
  icon: JSX.Element;
  path: string;
}

const routes: Route[] = [
  {
    title: "Dashboard",
    icon: <BiSolidDashboard />,
    path: "/dashboard",
  },
  {
    title: "Users",
    icon: <BiSolidUser />,
    path: "/users",
  },
  {
    title: "Deals",
    icon: <BiReceipt />,
    path: "/deals",
  },
  {
    title: "Installments",
    icon: <BiCopyAlt />,
    path: "/installments",
  },
];

const Sidebar: React.FC = () => {
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
