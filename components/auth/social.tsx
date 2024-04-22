"use client";

import { signIn } from "next-auth/react";
import { Button, Grid, Typography } from "@mui/material";
import FacebookIcon from "@public/images/FacebookIcon";
import GoogleIcon from "@public/images/GoogleIcon";
import IconSpinner from "@components/ui/icons";
import { useState } from "react";

export const Social = () => {
  const [pendingGoogle, setPendingGoogle] = useState(false);
  const [pendingFacebook, setPendingFacebook] = useState(false);

  const onClick = (provider: "facebook" | "google") => {
    provider === "facebook" ? setPendingFacebook(true) : setPendingGoogle(true);

    signIn(provider, {
      callbackUrl: "/profile",
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
            fullWidth
            onClick={() => onClick("google")}
            startIcon={<GoogleIcon />}
            sx={{
              height: 37,
              display: "flex",
              bgcolor: "white",
              color: "primary.main",
              ":hover ": { bgcolor: "#ccced2" },
              ".MuiTouchRipple-child ": { bgcolor: "#4b5563" },
            }}
          >
            <Typography variant="inherit" sx={{ m: 2 }}>
              Google
            </Typography>
            {pendingGoogle && <IconSpinner />}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => onClick("facebook")}
            startIcon={<FacebookIcon />}
            sx={{
              height: 37,
              display: "flex",
              bgcolor: "white",
              color: "primary.main",
              ":hover ": { bgcolor: "#ccced2" },
              ".MuiTouchRipple-child ": { bgcolor: "#4b5563" },
            }}
          >
            <Typography variant="inherit" sx={{ m: 2 }}>
              Facebook
            </Typography>
            {pendingFacebook && <IconSpinner />}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
