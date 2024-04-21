"use client";

import { FcGoogle } from "react-icons/fc";

import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { Button, Grid } from "@mui/material";
import FacebookIcon from "@public/images/FacebookIcon";
import GoogleIcon from "@public/images/GoogleIcon";

export const Social = () => {
  const onClick = (provider: "facebook" | "google") => {
    signIn(provider, {
      callbackUrl: "/settings",
    });
  };

  return (
    <div className="flex w-full items-center ">
      <Grid
        container
        spacing={2}
        justifyContent="space-around"
        style={{ marginBottom: 8 }}
      >
        <Grid item xs={6}>
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            fullWidth
            onClick={() => onClick("google")}
            sx={{
              bgcolor: "white",
              color: "primary.main",
              ":hover ": { bgcolor: "#ccced2" },
              ".MuiTouchRipple-child ": { bgcolor: "#4b5563" },
            }}
          >
            Google
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => onClick("facebook")}
            startIcon={<FacebookIcon />}
            sx={{
              bgcolor: "white",
              color: "primary.main",
              ":hover ": { bgcolor: "#ccced2" },
              ".MuiTouchRipple-child ": { bgcolor: "#4b5563" },
            }}
          >
            Facebook
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
