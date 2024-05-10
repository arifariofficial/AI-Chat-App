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
          className="text-[#F5EFD1] focus-visible:border-none focus-visible:ring-0"
        >
          <Button className="h-14 gap-2 border-none bg-[#344d4d] px-4 shadow-none hover:bg-[#3f6565] focus-visible:ring-0 active:bg-[#2c3e3e]">
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

            <DropdownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2 w-64 rounded-xl shadow-xl">
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
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                className="h-12 w-full  py-2 focus-visible:ring-0"
              >
                <a
                  href="/profile"
                  className="relative flex w-full cursor-pointer select-none items-center justify-between rounded-sm py-1.5 pl-4 pr-14 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <UserIcon />
                  <p>Account</p>
                </a>
              </Button>
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
    <Button className="h-full border-none bg-[#344d4d] px-4 shadow-none hover:bg-[#3f6565] active:bg-[#2c3e3e]">
      <Link
        href={"/auth/login"}
        className="flex h-full flex-row items-center gap-2 font-bold"
      >
        <LockIcon className="text-[#F5EFD1]" />
        <p className="text-sm text-[#F5EFD1]">Log in</p>
      </Link>
    </Button>
  );
}
