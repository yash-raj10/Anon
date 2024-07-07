import React from "react";
import { BsIncognito } from "react-icons/bs";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import ProfileModel from "@/components/model/profileModel";

export default async function Navbar() {
  const user = await currentUser();
  const imageUrl = user?.imageUrl;
  const firstName = user?.firstName;
  const primaryEmailAddress = user?.primaryEmailAddress?.emailAddress;

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

        <div className="flex gap-2 mr-3">
          {user && (
            <ProfileModel
              imageUrl={imageUrl}
              name={firstName}
              email={primaryEmailAddress}
            />
          )}

          <SignedOut>
            <div className="btn btn-neutral">
              {" "}
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <div className=" pt-1">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
