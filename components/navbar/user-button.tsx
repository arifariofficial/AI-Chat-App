import React from "react";
import { Button } from "@components/ui/button";
import { SignOut } from "@components/auth/auth-components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { auth } from "@auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default async function UserButton() {
  const session = await auth();
  if (!session?.user) return null;
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative size-8 rounded-full hover:bg-white"
          >
            <Avatar className="size-8">
              {session.user.image && (
                <AvatarImage
                  src={session.user.image ?? ""}
                  alt={session.user.name ?? ""}
                />
              )}
              <AvatarFallback>
                <AccountCircleIcon className="size-8 rounded-full bg-white" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <SignOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
