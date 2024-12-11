"use client";

import { Grid, Typography } from "@mui/material";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackBotton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";
import { cn } from "@/lib/utils";
import React from "react";
import { Dictionary } from "@/lib/types";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showLocal?: boolean;
  className?: string;
  dictionary?: Dictionary;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showLocal,
  className,
  dictionary,
}: CardWrapperProps) => {
  return (
    <Card
      className={cn(
        "mt-[100px] w-full max-w-sm rounded-md p-5 brightness-100 filter sm:border sm:border-border sm:bg-backgroundSecondary sm:p-7 sm:shadow-xl",
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
                {dictionary?.login.orContinueButtonLabel}
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
