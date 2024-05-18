"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@components/ui/button";
import IconSpinner, { FacebookIcon, GoogleIcon } from "@components/ui/icons";
import { Typography } from "@mui/material";

export const Social = () => {
  const [pendingGoogle, setPendingGoogle] = useState(false);
  const [pendingFacebook, setPendingFacebook] = useState(false);

  const onClick = async (provider: "facebook" | "google") => {
    provider === "facebook" ? setPendingFacebook(true) : setPendingGoogle(true);

    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <Button
        variant="outline"
        className="w-full bg-background text-foreground"
        onClick={() => onClick("google")}
      >
        <GoogleIcon />
        <Typography variant="inherit" sx={{ mx: 3 }}>
          Google
        </Typography>
        {pendingGoogle && <IconSpinner className="text-foreground" />}
      </Button>

      <Button
        variant="outline"
        className="w-full bg-background text-foreground"
        onClick={() => onClick("facebook")}
      >
        <FacebookIcon />
        <Typography variant="inherit" sx={{ mx: 2 }}>
          Facebook
        </Typography>
        {pendingFacebook && <IconSpinner className="text-foreground" />}
      </Button>
    </div>
  );
};
