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

  return (
    <Link
      href={path}
      className={`sidebar-item mw-[100%] flex items-center rounded-md text-fontPrimary ${
        pathName === path ? "active bg-lightBasePrimary" : ""
      } hover:bg-lightBasePrimary cursor-pointer `}
    >
      <span className="icon text-lg">{icon}</span>
      <p className="text text-md">{title}</p>
    </Link>
  );
};

export default SidebarItem;
