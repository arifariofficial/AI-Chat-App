// lib/lang-context.tsx

"use client";

import { Locale } from "@/i18n.config";
import React, { createContext, useContext } from "react";

type LangContextType = {
  lang: Locale;
};

const LangContext = createContext<LangContextType | undefined>(undefined);

export const LangProvider = ({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Locale;
}) => {
  return (
    <LangContext.Provider value={{ lang }}>{children}</LangContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used within a LangProvider");
  }
  return context;
};
