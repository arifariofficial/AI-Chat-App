"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import LoginIcon from "@mui/icons-material/Login";
import { cn } from "@/lib/utils";

interface SignInButtonMobileProps {
  className?: string;
  variant?:
    | "nav"
    | "outline"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

const SignInButtonMobile = ({
  className,
  variant,
}: SignInButtonMobileProps) => {
  const handleSignOut = async () => {
    await signIn();
  };

  return (
    <Button variant={variant} onClick={handleSignOut} className={cn(className)}>
      <p className="text-2xl font-bold"> Sign In</p>
      <LoginIcon className="mr-2" />
    </Button>
  );
};

export default SignInButtonMobile;
