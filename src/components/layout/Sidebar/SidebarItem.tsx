"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface ItemProps {
  item: {
    title: string;
    icon: ReactNode;
    path: string;
  };
}

const SidebarItem: React.FC<ItemProps> = ({ item }) => {
  const pathName = usePathname();
  const { title, icon, path } = item;
  console.log("pathName>", pathName);
  console.log("path>", path);

  return (
    <Link
      href={path}
      className={`mw-[100%] m-1 flex items-center p-2 rounded-md ${
        pathName === path ? "active bg-primary" : ""
      } hover:bg-primary cursor-pointer `}
    >
      <span className="text-lg">{icon}</span>
      <p className="text-md ml-2">{title}</p>
    </Link>
  );
};

export default SidebarItem;
