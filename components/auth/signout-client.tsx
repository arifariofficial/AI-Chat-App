"use client";

import { signOut } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";
import { cn } from "@lib/utils";
import { DropdownMenuItem } from "@components/ui/dropdown-menu";

interface SignOutButtonProps {
  className?: string;
}

const SignOutButton = ({ className }: SignOutButtonProps) => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/logout" });
  };

  return (
    <DropdownMenuItem onClick={handleSignOut} className={cn(className)}>
      <p>Sign Out</p>
      <LogoutIcon />
    </DropdownMenuItem>
  );
};

export default SignOutButton;
