import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { ThemeToggle } from "@/components/theme-toggle-mobile";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import SignOutButtonMobile from "@/components/auth/signout-client-mobile";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { UserIcon } from "../ui/icons";
import SignInButtonMobile from "@components/auth/signin-client-mobile";

interface UserButtonMobileProps {
  session?: Session | null;
  className?: string;
}

export default function UserButtonMobile({
  session,
  className,
}: UserButtonMobileProps) {
  return (
    <div className={cn(className)}>
      <Sheet>
        <SheetTrigger
          asChild
          className="flex min-w-0 items-center justify-center px-2"
        >
          <Button variant="nav" className={cn(className, "mr-1")}>
            <HamburgerMenuIcon className="size-7" />
          </Button>
        </SheetTrigger>
        <SheetContent className="inset-y-0 flex max-h-screen w-full flex-col justify-start gap-1 sm:hidden">
          <DialogTitle className="sr-only">Mobile Navigation Menu</DialogTitle>
          <DialogDescription className="sr-only">
            Navigate through the menu options using the buttons.
          </DialogDescription>
          {session && (
            <SheetHeader className="flex w-full items-center justify-center">
              <Avatar className="size-28 border shadow-md">
                {session.user.image && (
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name || "Name not available"}
                  />
                )}
                <AvatarFallback className="size-28 rounded-none">
                  No Image
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xl">{session.user.name || "No Name"}</p>
                <p>{session.user.email}</p>
              </div>
            </SheetHeader>
          )}

          {/* { Account } */}
          {session && (
            <>
              <SheetClose asChild className="h-[60px]">
                <Button
                  variant="ghost"
                  asChild
                  className="flex justify-between px-7"
                >
                  <Link className="" href="/profile">
                    <p className="text-2xl font-bold">Account</p>
                    <UserIcon />
                  </Link>
                </Button>
              </SheetClose>
            </>
          )}
          {/* Etusivu */}
          {!session && <div className="h-[50px]" />}
          <SheetClose asChild className="h-[60px]">
            <Button
              variant="ghost"
              asChild
              className="flex justify-between px-7"
            >
              <Link className="" href="/">
                <p className="text-2xl font-bold">Etusivu</p>
                <UserIcon />
              </Link>
            </Button>
          </SheetClose>
          <div>
            {session ? (
              <SheetClose asChild>
                <SignOutButtonMobile
                  className="flex h-[60px] w-full justify-between px-7"
                  variant="ghost"
                />
              </SheetClose>
            ) : (
              <SheetClose asChild>
                <SignInButtonMobile
                  className="flex h-[60px] w-full justify-between px-7"
                  variant="ghost"
                />
              </SheetClose>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
