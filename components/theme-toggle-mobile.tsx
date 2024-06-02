"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { IconMoon, IconSun } from "./ui/icons";
import { cn } from "@lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();
  const [, startTransition] = React.useTransition();

  return (
    <Button
      className={cn(className, "w-full")}
      variant="ghost"
      onClick={() => {
        startTransition(() => {
          setTheme(theme === "light" ? "dark" : "light");
        });
      }}
    >
      <p className="text-2xl font-bold">Switch Theme</p>
      <div>
        {!theme ? null : theme === "dark" ? (
          <IconMoon className="size-6 transition-all" />
        ) : (
          <IconSun className="size-6 transition-all" />
        )}
        <span className="sr-only">Toggle theme</span>
      </div>
    </Button>
  );
}
