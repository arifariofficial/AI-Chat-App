"use client";

import { Grid, Typography } from "@mui/material";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackBotton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonHref?: string;
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
    <Card
      className={cn(
        "mt-[100px] w-full max-w-sm rounded-md p-5 brightness-100 filter sm:bg-backgroundSecondary md:border md:border-border md:p-7 md:shadow-xl",
        className,
      )}
    >
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
                Tai jatka käyttäen
              </Typography>
            </Grid>
            <Grid item xs>
              <hr />
            </Grid>
          </Grid>
          <Social />
        </CardFooter>
      )}
      {backButtonLabel && backButtonHref && (
        <CardFooter>
          <BackBotton
            label={backButtonLabel}
            href={backButtonHref}
          ></BackBotton>
        </CardFooter>
      )}
    </Card>
  );
};
