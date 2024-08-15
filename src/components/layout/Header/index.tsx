"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Logout from "@/components/shared/logout";

const Header = () => {
  const path = usePathname();
  console.log("usePathname>>>", usePathname);
  return (
    <div className="header p-2 flex items-center justify-between bg-gradient-to-r fixed pl-[250px] top-0 right-0 w-full h-[70px] bg-gradient-to-tl from-cyan-400 from-0% via-purple-300 via-0% to-indigo-300">
      <h2>{path}</h2>
      <Logout />
    </div>
  );
};

export default Header;
