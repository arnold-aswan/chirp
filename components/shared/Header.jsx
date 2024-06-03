import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-black flex justify-between items-center h-[60px] px-5 ">
      <Link href="/" className="flex items-center gap-5">
        <Image src="/cbox.jpg" alt="logo" width={78} height={50} />
        <p className="text-white font-bold text-3xl">Chirp</p>
      </Link>
      <UserButton />
    </header>
  );
};

export default Header;
