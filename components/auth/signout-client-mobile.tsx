"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";
import { cn } from "@/lib/utils";

interface SignOutButtonMobileProps {
  className?: string;
  spanClassName?: string;
  variant?:
    | "nav"
    | "outline"
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "inherit"
    | "black"
    | "navMobile";
}

const SignOutButtonMobile = ({
  className,
  spanClassName,
  variant,
}: SignOutButtonMobileProps) => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/logout" });
  };

  return (
    <Button
      variant={variant}
      onClick={handleSignOut}
      className={cn(className)}
      spanClassName={spanClassName}
      iconRight={<LogoutIcon />}
    >
      <p className="text-2xl font-bold">Sign Out</p>
    </Button>
  );
};

export default SignOutButtonMobile;
