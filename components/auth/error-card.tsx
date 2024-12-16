"use client";

import { Card, CardFooter, CardHeader } from "../ui/card";
import { BackBotton } from "./back-button";
import { Header } from "./header";

export const ErrorCard = () => {
  return (
    <Card>
      <CardHeader className="w-[400px] shadow-md">
        <Header label="Hups! Jotain meni pieleen!" />
      </CardHeader>
      <CardFooter>
        <BackBotton label="Takaisin kirjautumiseen" href="/auth/login" />
      </CardFooter>
    </Card>
  );
};
