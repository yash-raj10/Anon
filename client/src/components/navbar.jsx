import React from "react";
import { BiNetworkChart } from "react-icons/bi";
import { BsIncognito } from "react-icons/bs";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import Image from "next/image";

export default async function Navbar() {
  return (
    <div className="navbar backdrop-blur bg-base-100/30 max-w-7xl border-2 rounded-3xl z-50">
      <div className="w-full flex justify-between items-center">
        <div className="">
          <a className="btn btn-ghost text-xl">
            <BsIncognito size={35} />
          </a>
        </div>

        <div className="hidden md:flex">
          <a className="btn btn-ghost text-xl">Anon</a>
        </div>

        <div className="flex-none gap-2 mr-3">
          <SignedOut>
            <div className="btn btn-neutral">
              {" "}
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <div className="">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
