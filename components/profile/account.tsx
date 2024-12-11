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
import { Locale } from "@/i18n.config";
import { Dictionary } from "@/lib/types";
import { localizedRoutes } from "@/lib/localized-routes";

interface AccountProps {
  lang: Locale;
  dictionary: Dictionary;
}

export default function Account({ lang, dictionary }: AccountProps) {
  const { data: session, status } = useSession();
  const [editName, setEditName] = useState(false);
  const [name, setName] = useState(session?.user.name || "");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSend, setVerificationSend] = useState(false);
  const routes = localizedRoutes[lang];

  const { toast } = useToast();

  if (status === "loading") {
    return <p>{dictionary.notifications.loading}</p>;
  }

  if (status !== "authenticated") {
    redirect(`/${lang}${routes.auth.signIn}?next=/${lang}${routes.account}`);
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
        <h1 className="mb-1 text-2xl font-semibold">
          {dictionary.profile.account.header}
        </h1>
        <p>{dictionary.profile.account.description}</p>
      </div>

      <div className="w-full">
        <section className="mb-10">
          <h2 className="border-b border-border text-base font-semibold">
            {dictionary.profile.account.profile}
          </h2>
          <div className="flex flex-row px-0 py-4">
            <Avatar className="size-32 rounded-sm border shadow-md">
              {session.user.image && (
                <AvatarImage
                  src={session.user.image}
                  alt={session.user.name || dictionary.image.imageError}
                />
              )}
              <AvatarFallback className="size-32 rounded-none">
                {dictionary.image.imageError}
              </AvatarFallback>
            </Avatar>
          </div>
        </section>
        <section className="mb-10 h-20">
          <h2 className="border-b border-border text-base font-semibold">
            {dictionary.profile.account.name}
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
              <p>
                {session.user.name ||
                  dictionary.profile.account.nameNotAvailable}
              </p>
            )}
            {!editName ? (
              <Button variant="ghost" onClick={() => setEditName(true)}>
                <EditIcon className="size-5" />
              </Button>
            ) : (
              <Button variant="outline" onClick={handleNameUpdate}>
                {dictionary.input.updateButtonLabel}
              </Button>
            )}
          </div>
        </section>
        <section className="mb-10">
          <h2 className="border-b border-border text-base font-semibold">
            {dictionary.input.emailAddress}
          </h2>
          <div className="m-2 flex w-full flex-row items-center justify-between">
            <p className="h-8">{session.user.email}</p>
            {!session.user.emailVerified && (
              <Button
                variant="default"
                onClick={handleSendVerificationEmail}
                className="m-1"
                disabled={verificationSend || isLoading}
              >
                {dictionary.profile.account.emailButtonConfirm}
              </Button>
            )}
            {session.user.emailVerified && (
              <p className="m-1 rounded-md border bg-background p-1 text-center text-[9px] font-bold text-foreground">
                {dictionary.profile.account.emailButtonConfirmation}
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
