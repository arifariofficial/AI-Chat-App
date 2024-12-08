import { signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  const handleSignIn = async () => {
    "use server";
    await signIn(provider);
  };

  return (
    <Button onClick={handleSignIn} {...props}>
      Sign In
    </Button>
  );
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/auth/logout" });
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="ghost"
      className="w-full p-0"
      {...props}
    >
      Sign Out
    </Button>
  );
}
