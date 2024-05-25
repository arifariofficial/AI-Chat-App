import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import { auth } from "@auth";
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
import { SignOut } from "@components/auth/auth-components";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";

export default async function UserButton() {
  const session = await auth();

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="text-foregroundNav focus-visible:border-none focus-visible:ring-0"
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
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2 w-64 rounded-xl border border-border/30 shadow-xl">
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
            <DropdownMenuItem asChild className="gap-4 px-8">
              <Link
                className="inline-flex h-12 w-full items-center justify-between whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors hover:cursor-pointer hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                href="/profile"
              >
                <UserIcon className="" />
                <p className="mr-[45px]">Account</p>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-4 px-8">
            <LogoutIcon />
            <SignOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button variant="nav" className="h-full">
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
