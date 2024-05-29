import React from "react";
import { sidebarLiks } from "@/constants/data";
import Link from "next/link";

const BottomBar = () => {
  return (
    <>
      {sidebarLiks.map((link) => (
        <Link
          href={link.href}
          key={link.name}
          className="flex flex-col items-center gap-2 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-lg w-fit ">
          <div className="size-7">{link.icon}</div>
          <p className="capitalize">{link.name}</p>
        </Link>
      ))}
    </>
  );
};

export default BottomBar;
