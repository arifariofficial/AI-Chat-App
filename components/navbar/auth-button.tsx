import React from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [toggleDropdown, setToggleDropdown] = useState(false);

  if (loading) {
    return <p>Loading...</p>;
  }

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
            <AccountCircleIcon fontSize="large" />
          )}
        </Link>

        <button
          onClick={() => signOut()}
          className=" text-top m-0 flex h-[20px] w-[70px] items-center  justify-center  bg-inherit text-xs"
        >
          Sign out
        </button>
      </>
    );
  }

  return (
    <>
      <AccountCircleIcon />
      <Link href="/api/auth/signin">
        <p className=" text-top m-0 flex h-[20px] w-[70px] items-center  justify-center  bg-inherit text-xs ">
          Sign in
        </p>
      </Link>
    </>
  );
}
