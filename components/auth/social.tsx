"use client";

import { getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FacebookIcon, GoogleIcon, IconSpinner } from "@/components/ui/icons";
import { Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { Locale } from "@/i18n.config";

interface SocialProps {
  lang: Locale;
}

export const Social = ({ lang }: SocialProps) => {
  const [pendingGoogle, setPendingGoogle] = useState(false);
  const [pendingFacebook, setPendingFacebook] = useState(false);
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirect") || `/${lang}`;

  console.log("Redirect URL:", redirectUrl);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session) {
        window.location.href = redirectUrl;
      }
    };
    fetchSession();
  }, [redirectUrl]);

  const onClick = async (provider: "facebook" | "google") => {
    if (provider === "facebook") {
      setPendingFacebook(true);
    } else {
      setPendingGoogle(true);
    }

    try {
      console.log(
        "Signing in with provider:",
        provider,
        "Redirecting to:",
        redirectUrl,
      );
      await signIn(provider, { callbackUrl: redirectUrl });
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
        iconRight={<GoogleIcon />}
        spanClassName="flex"
      >
        <Typography variant="inherit" sx={{ mx: 3 }}>
          Google
        </Typography>
        {pendingGoogle && <IconSpinner className="text-foreground" />}
      </Button>

      <Button
        variant="outline"
        className="w-full bg-background text-foreground"
        onClick={() => onClick("facebook")}
        iconRight={<FacebookIcon />}
        spanClassName="flex"
      >
        <Typography variant="inherit" sx={{ mx: 2 }}>
          Facebook
        </Typography>
        {pendingFacebook && <IconSpinner className="text-foreground" />}
      </Button>
    </div>
  );
};
