"use client";

import { Grid, Typography } from "@mui/material";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackBotton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";
import { cn } from "@lib/utils";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showLocal?: boolean;
  className?: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showLocal,
  className,
}: CardWrapperProps) => {
  return (
    <>
      <Card className={cn("mx-6 -mt-16 w-full max-w-lg", className)}>
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
