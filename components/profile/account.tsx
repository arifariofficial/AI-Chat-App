"use client";

import { getSession, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { TextField } from "@mui/material";
import { updateName } from "@/actions/update";
import { useToast } from "@/components/ui/use-toast";
import { sendNewVerificationEmail } from "@/actions/send-verification";

export default function Account() {
  const { data: session, status } = useSession();

  const [editName, setEditName] = useState(false);
  const [name, setName] = useState(session?.user.name || "");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSend, setVerificationSend] = useState(false);

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
            variant: "default",
            description: result.message,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
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

  const handleSendVerificationEmail = async () => {
    // Check if email is a string and not empty
    if (typeof session.user.email === "string" && session.user.email) {
      try {
        setIsLoading(true);

        const result = await sendNewVerificationEmail(session.user.email);

        toast({
          className: "bg-sipeButton text-sipeText",
          variant: "default",
          description: result.message,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          description:
            error instanceof Error
              ? error.message
              : "Failed to send verification email",
        });
      } finally {
        setIsLoading(false);
        setVerificationSend(true);
      }
    } else {
      // Handle the case where email is not a valid string
      toast({
        variant: "destructive",
        description: "Cannot send verification email.",
      });
    }
  };

  return (
    <main className="mx-auto flex size-full flex-col items-center rounded-lg bg-background text-foreground">
      <div className="mb-10 w-full">
        <h1 className="mb-1 text-2xl font-semibold">Tili</h1>
        <p>Hallitse tilin asetuksia</p>
      </div>

      <div className="w-full">
        <section className="mb-10">
          <h2 className="border-b border-border text-base font-semibold">
            Profiili
          </h2>
          <div className="flex flex-row px-0 py-4">
            <Avatar className="size-32 rounded-sm border shadow-md">
              {session.user.image && (
                <AvatarImage
                  src={session.user.image}
                  alt={session.user.name || "Kuva ei ole saatavilla"}
                />
              )}
              <AvatarFallback className="size-32 rounded-none">
                Ei kuvaa
              </AvatarFallback>
            </Avatar>
          </div>
        </section>
        <section className="mb-10 h-20">
          <h2 className="border-b border-border text-base font-semibold">
            Nimi
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
              <p>{session.user.name || "Ei saatavilla"}</p>
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
          <h2 className="border-b border-border text-base font-semibold">
            Sähköpostiosoite
          </h2>
          <div className="m-2 flex w-full flex-row items-center justify-between">
            <p className="h-8">{session.user.email}</p>
            {!session.user.emailVerified && (
              <Button
                variant="outline"
                onClick={handleSendVerificationEmail}
                className="m-1"
                disabled={verificationSend || isLoading}
              >
                Vahvista sähköposti
              </Button>
            )}
            {session.user.emailVerified && (
              <p className="m-1 rounded-md border bg-background p-1 text-center text-[9px] font-bold text-foreground">
                Vahvistettu
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
