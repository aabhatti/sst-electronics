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
    <div className="flex flex-col items-center justify-between overflow-hidden min-h-screen w-[250px] fixed top-0 left-0 bg-gradient-to-tl from-cyan-400 from-0% via-purple-300 via-0% to-indigo-300 z-[99]">
      <h2 className="h-[70px] w-full p-6 flex items-center border-b border-primary text-primary text-bold">
        {"SST Electronics"}
      </h2>
      <div className="flex flex-col flex-1 overflow-auto w-full p-2">
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
