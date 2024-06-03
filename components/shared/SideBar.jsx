"use client";
import React from "react";
import { sidebarLiks } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

const SideBar = () => {
  const pathname = usePathname();

  return (
    <section className="hidden sticky top-0 left-0 z-20 text-white md:flex md:flex-col pt-12 px-6 h-screen ">
      <div className="flex flex-col gap-8">
        {sidebarLiks.map((link) => {
          const isActive =
            pathname.includes(link.href) && pathname === link.href;
          return (
            <Link
              href={link.href}
              key={link.name}
              className={`${
                isActive && "bg-purple"
              } flex items-center gap-6 hover:bg-purple px-3 py-2 rounded-lg `}>
              <div className="size-7 text-white">{link.icon}</div>
              <p className="capitalize md:hidden lg:flex">{link.name}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10">
        <SignedIn>
          <SignOutButton redirectUrl="/sign-in">
            <div className="flex items-center gap-4 cursor-pointer">
              <Image src="/logout.svg" alt="logout" width={24} height={24} />
              <p className="md:hidden lg:flex">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default SideBar;
