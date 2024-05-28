"use client";

import React from "react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { SessionProviderProps } from "next-auth/react";

const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
  ...props
}) => {
  return (
    <NextAuthSessionProvider {...props}>{children}</NextAuthSessionProvider>
  );
};

export default SessionProvider;
