"use client";
import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import Logout from "@/components/shared/logout";
import { CgMenuGridO } from "react-icons/cg";
import { MdArrowForward } from "react-icons/md";

import {
  SidebarContext,
  SidebarContextType,
} from "@/app/context/SidebarContext";

const Header = () => {
  const { open, handleSidebarToggle } = useContext(
    SidebarContext
  ) as SidebarContextType;

  const path = usePathname();
  return (
    <div className="bg-[#36246514] header flex items-center justify-between fixed top-0 right-0 w-full">
      <span
        className="text-primary text-[32px] cursor-pointer mx-4 inline-block"
        onClick={handleSidebarToggle}
      >
        {open ? <CgMenuGridO /> : <MdArrowForward />}
      </span>

      <h2>{path}</h2>
      <Logout />
    </div>
  );
};

export default Header;
