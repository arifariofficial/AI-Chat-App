import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";

export default async function AuthButton({
  session,
}: {
  session: Session | null;
}) {
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
            <AccountCircleIcon className="size-8 rounded-full bg-white" />
          )}
        </Link>
      </>
    );
  }

  return (
    <>
      <AccountCircleIcon />
      <Link href="/auth/login">
        <p className="m-0 flex h-[20px] w-[70px] items-center  justify-center  bg-inherit text-xs ">
          Login
        </p>
      </Link>
    </>
  );
}
