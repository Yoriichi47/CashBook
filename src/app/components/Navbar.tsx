"use client"
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut} from "@clerk/nextjs";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  return (
    <nav className="bg-gray-200 flex justify-between items-center p-4">
      <div className="Logo">
        <div>
          <Link href={"/"}>
          <Image
            src="/Finance_Uchiha_logo.png"
            alt="Logo"
            width={50}
            height={50}
            />
            </Link>
        </div>
      </div>
      <div className="options flex items-center gap-2">
        <SignedOut>
          <Button asChild>
            <Link href={"/sign-in"}>Login</Link> 
          </Button>
          <Button asChild>
            <Link href={"/sign-up"}>Sign Up</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserDropdown />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
