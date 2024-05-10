"use client";

import { getSession, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { EditIcon } from "@components/ui/icons";
import { Button } from "@components/ui/button";
import { TextField } from "@mui/material";
import { updateName } from "@actions/update";
import { useToast } from "@components/ui/use-toast";

export default function Account() {
  const { data: session, status } = useSession();

  const [editName, setEditName] = useState(false);
  const [name, setName] = useState(session?.user.name || "");

  const { toast } = useToast();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status !== "authenticated") {
    redirect("/auth/signin");
  }

  const handleNameUpdate = async () => {
    const newName = name.trim();
    const userId = session.user.id;

    if (typeof userId === "string") {
      try {
        const result = await updateName(newName, userId);
        console.log(result);

        if (result.success) {
          await getSession();
          setEditName(false);
          toast({
            description: result.message,
          });
        }
      } catch (error) {
        toast({
          description:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        });
      }
    } else {
      console.error("User ID is undefined. Cannot update name.");
    }
  };

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
        <section className="mb-10 h-20">
          <h2 className="border-b  border-gray-200 text-base font-semibold">
            Name
          </h2>
          <div className="m-2 flex w-full flex-row justify-between gap-2">
            {editName ? (
              <TextField
                fullWidth
                size="small"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <p>{session.user.name || "Not available"}</p>
            )}
            {!editName ? (
              <Button variant="ghost" onClick={() => setEditName(true)}>
                <EditIcon className="size-5" />
              </Button>
            ) : (
              <Button variant="outline" onClick={handleNameUpdate}>
                Upate
              </Button>
            )}
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
