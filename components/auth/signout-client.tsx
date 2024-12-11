"use client";

import { signOut } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dictionary } from "@/lib/types";

interface SignOutButtonProps {
  className?: string;
  dictionary?: Dictionary;
}

const SignOutButton = ({ className, dictionary }: SignOutButtonProps) => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/logout" });
  };

  return (
    <DropdownMenuItem onClick={handleSignOut} className={cn(className)}>
      <p>{dictionary?.auth.signout}</p>
      <LogoutIcon />
    </DropdownMenuItem>
  );
};

export default SignOutButton;
