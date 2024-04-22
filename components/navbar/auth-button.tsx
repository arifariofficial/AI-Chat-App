"use client";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Link href={"/profile"}>
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt="profile"
              width={30}
              height={30}
              className="rounded-full"
            />
          ) : (
            <AccountCircleIcon className="h-8 w-8 rounded-full bg-white" />
          )}
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: "/auth/logout" })}
          className=" text-top m-0 flex h-[20px] w-[70px] items-center  justify-center  bg-inherit text-xs"
        >
          Logout
        </button>
      </>
    );
  }

  return (
    <>
      <AccountCircleIcon />
      <Link href="/auth/login">
        <p className=" text-top m-0 flex h-[20px] w-[70px] items-center  justify-center  bg-inherit text-xs ">
          Login
        </p>
      </Link>
    </>
  );
}
