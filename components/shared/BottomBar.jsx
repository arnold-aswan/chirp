"use client";

import React from "react";
import { sidebarLiks } from "@/constants/data";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const BottomBar = () => {
  const pathname = usePathname();
  return (
    <section className="md:hidden bg-black text-white fixed bottom-0 right-0 left-0 flex items-center justify-around w-full py-2 ">
      {sidebarLiks.map((link) => {
        const isActive = pathname.includes(link.href) && pathname === link.href;
        return (
          <Link
            href={link.href}
            key={link.name}
            className={`${
              isActive && "bg-purple-500"
            } flex flex-col items-center gap-2 hover:bg-purple text-white px-3 sm:px-5 py-2 rounded-lg`}>
            <div className="size-7">{link.icon}</div>
            <p className="capitalize hidden sm:flex ">{link.name}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default BottomBar;
