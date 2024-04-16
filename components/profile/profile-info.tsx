"use client";
import { Avatar, Button, Card, CardContent, Typography } from "@mui/material";
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
    <div className="flex flex-col mx-10 w-[200px] m-2 mt-10 drop-shadow-2xl">
      <Card className="border border-gray-600 shadow-md  h-[150px] w-[150px] flex items-center justify-center mb-4 place-self-center">
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
