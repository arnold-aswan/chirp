import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={100} height={50} />
      </Link>
      <UserButton />
    </header>
  );
};

export default Header;
