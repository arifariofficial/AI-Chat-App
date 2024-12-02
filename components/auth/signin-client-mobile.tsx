"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import LoginIcon from "@mui/icons-material/Login";
import { cn } from "@/lib/utils";

interface SignInButtonMobileProps {
  className?: string;
  spanClassName?: string;
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

const SignInButtonMobile = ({
  className,
  spanClassName,
  variant,
}: SignInButtonMobileProps) => {
  const handleSignOut = async () => {
    await signIn();
  };

  return (
    <Button
      variant={variant}
      onClick={handleSignOut}
      className={cn(className)}
      spanClassName={spanClassName}
      iconRight={<LoginIcon />}
    >
      <p className="text-2xl font-bold">Sign In</p>
    </Button>
  );
};

export default SignInButtonMobile;
