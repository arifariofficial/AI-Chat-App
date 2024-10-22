"use client";

import { Button } from "@components/ui/button";
import { signOut } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";
import { cn } from "@lib/utils";

interface SignOutButtonMobileProps {
  className?: string;
  variant?:
    | "nav"
    | "outline"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | "link"
    | "navMobile"
    | null
    | undefined;
}

const SignOutButtonMobile = ({
  className,
  variant,
}: SignOutButtonMobileProps) => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/logout" });
  };

  return (
    <Button variant={variant} onClick={handleSignOut} className={cn(className)}>
      <p className="text-2xl font-bold">Kirjaudu ulos</p>
      <LogoutIcon />
    </Button>
  );
};

export default SignOutButtonMobile;
