"use client";

import Link from "next/link";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRef, useState } from "react";
import Image from "next/image";

function AuthButton() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [toggleDropdown, setToggleDropdown] = useState(false);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
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
      <button
        onClick={() => signIn()}
        className=" text-top m-0 flex h-[20px] w-[70px] items-center  justify-center  bg-inherit text-xs "
      >
        Sign in
      </button>
    </>
  );
}

const Nav = () => {
  return (
    <div className="sticky top-0 z-10  rounded-bl-md rounded-br-md bg-[#2d4242] shadow-sm shadow-teal-800">
      <nav className="mx-auto flex  max-w-screen-xl justify-between">
        <section>
          <Link href={`/`}>
            <h1 className="flex p-4 font-satoshi text-2xl font-extrabold tracking-wide text-[#F5EFD1]">
              <div className="px-1 ">
                <LocalLibraryIcon fontSize="large" />
              </div>
              SIPE
            </h1>
          </Link>
        </section>
        <section className="mr-3 flex items-center text-xl font-semibold text-[#F5EFD1] hover:opacity-90">
          <div className="mr-4 flex flex-col items-center">
            <AuthButton />
          </div>
        </section>
      </nav>
    </div>
  );
};

export default Nav;
