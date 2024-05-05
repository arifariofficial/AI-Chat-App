"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import React from "react";
import { PersonOutline } from "@mui/icons-material";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";

export default function Account() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status !== "authenticated") {
    redirect("/auth/signin");
  }

  return (
    <main className="rounded-lg bg-white ">
      <div className="mb-10">
        <h1 className="mb-1 text-2xl font-semibold text-gray-800">Account</h1>
        <p className="text-gray-600">Manage your account settings</p>
      </div>

      <div>
        <section className="mb-10">
          <h2 className="border-b  border-gray-200 text-base font-semibold">
            Profile
          </h2>
          <div className="flex flex-row px-0 py-4">
            <Avatar className="size-32 rounded-sm border shadow-md">
              {session.user.image && (
                <AvatarImage
                  src={session.user.image}
                  alt={session.user.name || "Name not available"}
                />
              )}
              <AvatarFallback className="size-32 rounded-none">
                No Image
              </AvatarFallback>
            </Avatar>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="border-b  border-gray-200 text-base font-semibold">
            Name
          </h2>
          <div className="m-2 flex w-full flex-row justify-between">
            <p>{session.user.name || "Not available"}</p>
            <PersonOutline />
          </div>
        </section>
        <section className="mb-10">
          <h2 className="border-b  border-gray-200 text-base font-semibold">
            Email addresses
          </h2>
          <div className="m-2 flex w-full flex-row items-center justify-between">
            <p className="h-8">{session.user.email}</p>
            <p className=" m-1 rounded-md bg-gray-200 p-1  text-center text-[9px] font-bold ">
              Primary
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
