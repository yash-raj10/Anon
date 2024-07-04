import React from "react";
import { BiNetworkChart } from "react-icons/bi";
import { BsIncognito } from "react-icons/bs";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";

import Image from "next/image";

export default async function Navbar() {
  const { userId } = auth();

  return (
    <div className="navbar backdrop-blur bg-base-100/30 max-w-7xl border-2 rounded-3xl z-50">
      <div className="w-full flex justify-between items-center">
        <div className="">
          <a className="btn btn-ghost text-xl">
            <Image
              src="https://raw.githubusercontent.com/yash-raj10/bookmart/main/public/DEQUIZZ.png"
              height={40}
              width={40}
            />
          </a>
        </div>

        <div className="hidden md:flex">
          <a className="btn btn-ghost text-xl">Anon</a>
        </div>

        <div className="flex-none gap-2 mr-3">
          <BsIncognito size={40} />
        </div>

        {/* <div>
          {userId ? (
            <div className="flex gap-4 items-center">
              <Link href="/dashboard">Dashboard</Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link href="/sign-up">Sign up</Link>
              <Link href="/sign-in">Sign In</Link>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
}
