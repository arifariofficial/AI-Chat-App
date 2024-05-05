import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@auth";
import { Button } from "@components/ui/button";
import { DropdownIcon, LockIcon } from "@components/ui/icons";
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

export default async function UserButton() {
  const session = await auth();

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="focus-visible:border-none focus-visible:ring-0"
        >
          <Button className="h-full gap-2 border-none bg-[#344d4d] px-4 shadow-none hover:bg-[#3f6565] focus-visible:ring-0 active:bg-[#2c3e3e]">
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt="profile"
                width={30}
                height={30}
                className="rounded-full"
              />
            ) : (
              <AccountCircleIcon className="size-8 rounded-full bg-white" />
            )}
            <DropdownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="flex w-full items-center justify-center">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                className="h-12 w-full px-4 py-2 focus-visible:ring-0"
              >
                <a href="/profile" className="flex h-9 items-center p-6">
                  Profile
                </a>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
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
        <LockIcon />
        <p className="text-sm ">Log in</p>
      </Link>
    </Button>
  );
}
