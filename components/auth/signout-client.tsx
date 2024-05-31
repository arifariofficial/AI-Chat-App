"use client";

import { Button } from "@components/ui/button";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/logout" });
  };

  return (
    <Button variant="ghost" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
