"use client";

import { Grid, Typography } from "@mui/material";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackBotton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showLocal?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showLocal,
}: CardWrapperProps) => {
  return (
    <>
      <Card className="mx-12 w-full">
        <CardHeader>
          <Header label={headerLabel} />
        </CardHeader>
        <CardContent>{children}</CardContent>
        {showLocal && (
          <CardFooter className="flex flex-col">
            <Grid container alignItems="center" sx={{ mb: 2 }}>
              <Grid item xs>
                <hr />
              </Grid>
              <Grid item>
                <Typography variant="body2" px={2}>
                  Or continue with
                </Typography>
              </Grid>
              <Grid item xs>
                <hr />
              </Grid>
            </Grid>
            <Social />
          </CardFooter>
        )}
        <CardFooter>
          <BackBotton
            label={backButtonLabel}
            href={backButtonHref}
          ></BackBotton>
        </CardFooter>
      </Card>
    </>
  );
};
