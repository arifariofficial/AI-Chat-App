import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import { Button } from "@components/ui/button";
import {
  DropdownIcon,
  IconAboutUs,
  LockIcon,
  UserIcon,
} from "@components/ui/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Session } from "next-auth";
import { ThemeToggle } from "@components/theme-toggle-mobile";
import { cn } from "@lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@components/ui/sheet";
import { Separator } from "@components/ui/separator";
import SignOutButtonMobile from "@components/auth/signout-client-mobile";

interface UserButtonMobileProps {
  session: Session | null;
  className?: string;
}

export default function UserButtonMobile({
  session,
  className,
}: UserButtonMobileProps) {
  if (session) {
    return (
      <div className={cn(className)}>
        <Sheet>
          <SheetTrigger
            asChild
            className="flex items-center justify-center !px-2 text-foregroundNav"
          >
            <Button variant="nav" className=" h-full">
              <Avatar className="size-7">
                {session.user.image && (
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name || "Name not available"}
                  />
                )}
                <AvatarFallback className="size-8">
                  <AccountCircleIcon />
                </AvatarFallback>
              </Avatar>
              <DropdownIcon className="ml-1 hidden sm:block" />
            </Button>
          </SheetTrigger>
          <SheetContent className="inset-y-0 flex h-auto w-full flex-col border sm:hidden">
            <SheetHeader className="flex w-full items-center justify-center gap-2">
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
                <p className="text-xl">
                  Name: {session.user.name || "No Name"}
                </p>
                <p>Email: {session.user.email}</p>
              </div>
            </SheetHeader>
            <Separator />
            <SheetClose asChild>
              <Button
                variant="ghost"
                asChild
                className="flex w-full justify-between p-8"
              >
                <Link className="" href="/about">
                  <p className="text-2xl font-bold">About</p>
                  <IconAboutUs />
                </Link>
              </Button>
            </SheetClose>
            <Separator />
            <SheetClose asChild>
              <Button
                variant="ghost"
                asChild
                className="flex w-full justify-between p-8"
              >
                <Link className="" href="/profile">
                  <p className="text-2xl font-bold">Account</p>
                  <UserIcon />
                </Link>
              </Button>
            </SheetClose>
            <Separator />
            <SheetClose className="outline-none focus:outline-none focus-visible:outline-none">
              <ThemeToggle className="flex w-full justify-between p-8 outline-none focus:outline-none focus-visible:outline-none" />
            </SheetClose>
            <Separator />
            <SheetClose>
              <SignOutButtonMobile
                className="flex w-full justify-between p-8"
                variant="ghost"
              />
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <Button variant="nav" className={cn(className, "h-full")}>
      <Link
        href={"/auth/login"}
        className="flex h-full flex-row items-center gap-2 font-bold"
      >
        <LockIcon />
        <p className="text-foregroundNav">Log in</p>
      </Link>
    </Button>
  );
}
