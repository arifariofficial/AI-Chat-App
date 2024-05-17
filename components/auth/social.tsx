"use client";

import { signIn } from "next-auth/react";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import FacebookIcon from "@public/images/FacebookIcon";
import GoogleIcon from "@public/images/GoogleIcon";
import { useState } from "react";

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
    <div className="flex w-full items-center ">
      <Grid
        container
        spacing={1}
        justifyContent="space-around"
        flexDirection="column"
      >
        <Grid item xs>
          <Button
            className="dark:bg-[#334155] dark:text-white/90"
            variant="outlined"
            fullWidth
            onClick={() => onClick("google")}
            startIcon={<GoogleIcon />}
            sx={{
              height: 37,
              display: "flex",
              bgcolor: "white",
              color: "primary.main",
              boxShadow: "none",
              ":hover ": { bgcolor: "#ccced2" },
              ".MuiTouchRipple-child ": { bgcolor: "#4b5563" },
            }}
          >
            <Typography variant="inherit" sx={{ mx: 3 }}>
              Google
            </Typography>
            {pendingGoogle && (
              <CircularProgress size="20px" className="text-[#506e70]" />
            )}
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            className="dark:bg-[#334155] dark:text-white/90"
            variant="outlined"
            fullWidth
            onClick={() => onClick("facebook")}
            startIcon={<FacebookIcon />}
            sx={{
              height: 37,
              display: "flex",
              bgcolor: "white",
              boxShadow: "none",
              color: "primary.main",
              ":hover ": { bgcolor: "#ccced2" },
              ".MuiTouchRipple-child ": { bgcolor: "#4b5563" },
            }}
          >
            <Typography variant="inherit" sx={{ mx: 2 }}>
              Facebook
            </Typography>
            {pendingFacebook && (
              <CircularProgress size="20px" className="text-[#506e70]" />
            )}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
