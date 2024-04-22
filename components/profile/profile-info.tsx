"use client";

import { Card, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

import React from "react";

export default function ProfileInfo() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status !== "authenticated") {
    redirect("/api/auth/signin");
  }

  return (
    <div className="m-2 mx-10 mt-10 flex w-[200px] flex-col drop-shadow-2xl">
      <Card className="mb-4 flex size-[150px]  items-center justify-center place-self-center border border-gray-600 shadow-md">
        {session.user?.image ? (
          <Image
            alt={session.user?.name || "Default Name"}
            src={session.user?.image}
            width={400}
            height={400}
          />
        ) : (
          <Typography variant="h6">No image</Typography>
        )}
      </Card>
      <Typography>Name: {session.user?.name || "Not available"}</Typography>

      <Typography color="text.secondary" className="mb-4">
        {session.user?.email || "Email not available"}
      </Typography>
    </div>
  );
}
