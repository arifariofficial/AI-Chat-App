import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { DropdownIcon, LockIcon, UserIcon } from "@components/ui/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Session } from "next-auth";
import SignOutButton from "@components/auth/signout-client";
import { cn } from "@lib/utils";

interface UserButtonDesktopProps {
  session: Session | null;
  className?: string;
}

export default function UserButtonDesktop({
  session,
  className,
}: UserButtonDesktopProps) {
  if (session) {
    return (
      <div className={cn(className)}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="text-foregroundNav sm:px-6">
            <Button variant="nav" className=" w-42 h-full">
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
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2 rounded-xl border border-border/30 shadow-xl sm:w-64">
            <DropdownMenuLabel className="flex w-full items-center justify-center gap-4">
              <Avatar className="size-12 border shadow-md">
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
              <div>
                <p className="text-xl">{session.user.name || "No Name"}</p>
                <p>{session.user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="flex size-full hover:cursor-pointer"
                asChild
              >
                <Link
                  className="flex h-[48px] w-full items-center justify-evenly"
                  href="/profile"
                >
                  <p>Account</p>
                  <UserIcon />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <SignOutButton className="flex h-[48px] w-full justify-evenly hover:cursor-pointer" />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
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
